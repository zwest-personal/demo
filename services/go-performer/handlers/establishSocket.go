package handlers

import (
	"github.com/gorilla/websocket"
	"net/http"
)

// Upgrader is used to upgrade HTTP connections to WebSocket connections.
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// establishSocket sets up a Websocket connection to the UI
func establishSocket(w http.ResponseWriter, r *http.Request) {
	// TODO Track the socket back to the user - likely will want to take in some sort of UUID that can be sent back
	// to the Composer so if the Composer sends out a command it can tell all the Performers which front end should see it

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		Svc.Log.Error().Err(err).Msg("socket upgrade failed")
		return
	}
	defer conn.Close()
}
