package listeners

import "github.com/nats-io/nats.go"

// TODO Ready listener waits for a check from the Conductor and responds in the positive if it's good
// This is akin to a ready check in Kubernetes
func readyListener(m *nats.Msg) {

}
