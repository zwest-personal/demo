package listeners

import "github.com/nats-io/nats.go"

// broadcastListener listens in for any generic 'broadcast' instructions from the conductor and pipes them up through
// all websocket connections.  Used primarily for testing/debugging
func broadcastListener(m *nats.Msg) {

}
