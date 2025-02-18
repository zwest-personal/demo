/*
Go 'Performer'

Go is probably the top of my skill chart language wise, somewhere around where I am with JS/NodeJS, so will
be doing a few 'extras' in this service
*/
package main

import (
	"context"
	"fmt"
	"github.com/zwest-personal/demo/services/go-performer/listeners"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"

	"github.com/zwest-personal/demo/services/go-performer/common"
	"github.com/zwest-personal/demo/services/go-performer/handlers"
	"github.com/zwest-personal/demo/services/go-performer/helpers"
)

// Common vars, though in practice it's just the one that has everything else in it...
var (
	// Svc has all our shared configuration and connectors
	Svc common.Service
)

func init() {
	Svc.Log = zerolog.New(os.Stdout)
}

func main() {
	// This is purely to make it easier to see a restart in logging
	// In a prod env, ditch it
	fmt.Println("========== GO PERFORMER (RE)STARTING ==========")

	// Process configuration file (.env), allow passing in a specific on for stuff like local development
	envFile := os.Getenv("ENV_FILE")
	if envFile != "" {
		err := godotenv.Load(os.Getenv("ENV_FILE"))
		if err != nil {
			Svc.Log.Fatal().Err(err).Msg("failed to load env file")
		}
	} else {
		// Load in plain .env by default, but eat the error if it comes
		// If we're deploying to K8S for example we may get environmental variables from elsewhere (such
		// as the config maps)
		_ = godotenv.Load()
	}

	// Process our environment
	defer catchPanic()
	cfg := common.Config{}
	envconfig.MustProcess("", &cfg)
	Svc.Cfg = &cfg

	// Spin things up
	helpers.Initialize(&Svc)
	listeners.Initialize(&Svc)

	router := handlers.Initialize(&Svc)

	defaultTimeout := 10 * time.Second
	muxServer := &http.Server{
		Handler:      router,
		Addr:         Svc.Cfg.ServerAddr,
		ReadTimeout:  defaultTimeout,
		WriteTimeout: defaultTimeout,
	}

	// Start Server, watch for closure
	go func() {
		Svc.Log.Info().Msgf("Starting Server on " + Svc.Cfg.ServerAddr)
		if err := muxServer.ListenAndServe(); err != nil {
			Svc.Log.Fatal().Err(err)
		}
	}()

	// Need to hang around here or the app will just close out before the goroutine that spins
	// up the Mux even gets anywhere
	watch()
}

// catchPanic is just here to help us out if we did something dumb in runtime
// Panics sent by third party components don't always provide good debugging info
// Panic in Go is pretty much always a bad thing
func catchPanic() {
	if r := recover(); r != nil {
		Svc.Log.Fatal().Msgf("Panic: %v", r)
	}
}

// watch keeps an eye on the server thread and closes out if there's an exit signal (eg ctrl-c)
func watch() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop

	_, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
}
