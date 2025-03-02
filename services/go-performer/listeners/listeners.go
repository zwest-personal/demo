package listeners

import (
	"github.com/nats-io/nats.go"
	"github.com/zwest-personal/demo/services/go-performer/common"
)

var Svc *common.Service

// Initialize preps our Nats listeners
func Initialize(s *common.Service) {
	Svc = s

	// Subscribe to all known subjects
	subscribeThread(common.Broadcast, broadcastListener)
	subscribeThread(common.Ready, readyListener)
}

// subscribeThread is a simple wrapper to handle each Nats request in a new goroutine
// The Nats subscriptions by default do not start up in goroutines, so they will block
func subscribeThread(subject common.Subject, handler func(m *nats.Msg)) {
	// Not handling the subscriber here just since this is demo code
	// Real world you'd want to track your subscriptions and close them if needed
	_, err := Svc.NatsCli.QueueSubscribe(subject.String(), Svc.Name, func(m *nats.Msg) {
		go handler(m)
	})
	if err != nil {
		Svc.Log.Fatal().Err(err).Msg("Failed to subscribe to Nats thread, bailing out")
	}
}
