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
	textData := "This is a document with some words Here are more words in another " +
		"document This document repeats some words"

	// out will contain response from the worker on the word count for provided string.
	// If parsing many strings you'd basically fork off a worker for each string
	out := make(chan map[string]int)
	go worker(out, textData)
	result := <-out
	close(out)

	// Result
	fmt.Println("Word count:", result)
}
