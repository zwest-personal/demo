/*
*
More 'proper' version of the CW live coding challenge, now without jitters!
*/
package main

import (
	"fmt"
	"strings"
)

/**
Summary of problem:
Given a string, count how many times each 'word' appears, delimited by any whitespace.

As this is meant to demo channels/goroutines, use at least two routines and channels for comms.
*/

// Count
type Count struct {
	Word  string
	Count int
}

// worker counts how many times word appeared in the raw string, pipes it back
func worker(out chan Count, word string, data []string) {
	result := 0
	for _, w := range data {
		if word == w {
			result++
		}
	}

	ret := Count{
		Word:  word,
		Count: result,
	}

	out <- ret
}

// wordCount is our final result
var wordCount map[string]int

func main() {
	textData := "This is a document with some words Here are more words in another " +
		"document This document repeats some words"

	// Fields handles all whitespace (rather than using " ")
	splitData := strings.Fields(textData)

	// Final result data
	wordCount = make(map[string]int)
	unique := 0

	// out will contain response from worker of how many
	out := make(chan Count, len(splitData))

	for _, v := range splitData {
		// Only do the word if we haven't checked for it yet
		if _, ok := wordCount[v]; !ok {
			unique++
			wordCount[v] = 0
			go worker(out, v, splitData)
		}
	}

	// Build out our results map
	for range unique {
		result := <-out
		wordCount[result.Word] = result.Count
	}
	close(out)

	// Result
	fmt.Println("Word count:", wordCount)
}
