/*
Go 'Performer'

Go is probably the top of my skill chart language wise, somewhere around where I am with JS/NodeJS, so will
be doing a few 'extras' in this service
*/
package main

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"

	"github.com/zwest-personal/demo/services/go-performer/common"
	"github.com/zwest-personal/demo/services/go-performer/handlers"
	"github.com/zwest-personal/demo/services/go-performer/helpers"
)

// Common vars across all parts of service
var (
	// Svc has all our shared configuration and connectors
	Svc common.Service
)

func init() {
	Svc.Log = zerolog.New(os.Stdout)
}

func main() {
	// Process local configuration, will panic if something is not found
	envconfig.MustProcess("", &Svc.Cfg)

	// Spin things up
	helpers.Init(&Svc)
	handlers.Init(&Svc)
}
