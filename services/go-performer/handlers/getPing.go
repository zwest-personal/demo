package handlers

import (
	"net/http"
)

// getPingHandler outputs a 200 message
func getPingHandler(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}
