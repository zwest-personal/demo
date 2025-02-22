package helpers

import (
	"github.com/zwest-personal/demo/services/go-performer/common"
	"go.temporal.io/sdk/client"
)

// initializeTemporal establishes a connection to the Temporal workflow server
func initializeTemporal(s *common.Service) {
	options := client.Options{
		HostPort:  s.Cfg.TemporalCN,
		Namespace: "demo",

		// TODO Allow zerolog to work with Temporal logger
		// Logger:                     s.Log,
	}

	c, err := client.Dial(options)
	if err != nil {
		s.Log.Fatal().Err(err).Msg("Unable to create Temporal client")
	}

	// TODO Handle the close - can't defer in this function
	// defer c.Close()
	s.Workflow = &c
}
