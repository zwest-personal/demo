package helpers

import (
	"time"

	"github.com/nats-io/nats.go"

	"github.com/zwest-personal/demo/services/go-performer/common"
)

// initializeNats establishes a runtime singleton connection with Nats pub/sub
// Uses some defaults but this could all very easily but put into a shared config
func initializeNats(s *common.Service) {
	// TODO Custom dialer?  Been useful in the past
	opts := []nats.Option{
		nats.ReconnectWait(2 * time.Second), // TODO Move to Config
		nats.PingInterval(20 * time.Second), // TODO Move to Config
		nats.ReconnectHandler(func(c *nats.Conn) {
			s.Log.Info().Msgf("Nats reconnected to %s", c.ConnectedUrl())
		}),
		nats.DisconnectErrHandler(func(c *nats.Conn, err error) {
			s.Log.Error().Err(err).Msg("Nats disconnect error")
		}),
		nats.ClosedHandler(func(c *nats.Conn) {
			s.Log.Info().Msgf("Nats connection closed")
		}),
	}

	cli, err := nats.Connect(s.Cfg.NatsCN, opts...)
	if err != nil {
		// TODO Provide a retry mechanism for Healthcheck to monitor
		s.Log.Fatal().Msgf("Failed to connect to nats, bailing out")
	}

	s.NatsCli = cli
}
