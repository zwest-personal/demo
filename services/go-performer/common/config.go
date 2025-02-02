package common

import (
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
)

// Config holds all configuration data that is going to be pulled from the environment
type Config struct {
	ENV     string `envconfig:"ENV" required:"true"`
	APIPath string `envconfig:"API_PATH" required:"true"`

	// ServerAddr is our host:port for the service, host can be dropped if you're to listen in on any IP
	ServerAddr string `envconfig:"SERVER_ADDR" required:"true"`

	RedisCN string `envconfig:"REDIS_CN" required:"true"`
	MongoCN string `envconfig:"MONGO_CN" required:"true"`
}

// Service defines our shared connections/clients
type Service struct {
	Cfg *Config

	// RedisCli is our redis (db) client
	RedisCli redis.UniversalClient

	// NatsCli is our Nats (pub/sub) client
	// NatsCli *nats.Client

	// MongoCli is our MongoDB (NoSQL) client
	// MongoCli *mongo.Client

	// Log is the shared zerolog logging system, which does some nice JSON logs useful for Kibana/Elastic searching
	Log zerolog.Logger
}
