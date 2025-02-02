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

func establishSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		Svc.Log.Error().Err(err).Msg("socket upgrade failed")
		return
	}
	defer conn.Close()
}
