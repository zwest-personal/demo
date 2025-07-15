/*
Second version of the 'test', stripped down to a very basic (but faster) option.
This is what you'd use if you wanted to do a bunch of text strings at once - send each full
string to a worker
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

// worker counts how many times word appeared in the raw string, pipes it back
func worker(out chan map[string]int, textData string) {
	splitData := strings.Fields(textData)
	result := make(map[string]int)

	for _, w := range splitData {
		if _, ok := result[w]; !ok {
			result[w] = 1
		} else {
			result[w]++
		}
	}

	out <- result
}

func main() {
	textData := []string{
		"This is a document with some words Here are more words in another " +
			"document This document repeats some words",
		"This is a second document with many more words We are only looking at one document at a time" +
			"in this case but going to make this one far longer",
	}

	// out will contain response from the worker on the word count for provided string.
	// If parsing many strings you'd basically fork off a worker for each string
	out := make(chan map[string]int)
	for _, d := range textData {
		go worker(out, d)
	}

	fmt.Println("Word counts:")
	for range len(textData) {
		result := <-out
		fmt.Println(result)
	}
	close(out)
}
