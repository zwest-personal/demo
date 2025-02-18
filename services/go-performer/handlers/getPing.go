package handlers

import (
	"fmt"
	"net/http"
)

func getPingHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DOING NOTHIN")
	_, _ = w.Write([]byte("pong"))
}
