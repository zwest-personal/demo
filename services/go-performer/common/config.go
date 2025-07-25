package common

import (
	"github.com/nats-io/nats.go"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
)

// Config holds all configuration data that is going to be pulled from the environment
type Config struct {
	ENV     string `envconfig:"ENV" required:"true"`
	APIPath string `envconfig:"API_PATH" required:"true"`

	// ServerAddr is our host:port for the service, host can be dropped if you're to listen in on any IP
	ServerAddr string `envconfig:"SERVER_ADDR" required:"true"`

	RedisCN    string `envconfig:"REDIS_CN" required:"true"`
	MongoCN    string `envconfig:"MONGO_CN" required:"true"`
	NatsCN     string `envconfig:"NATS_CN" required:"true"`
	TemporalCN string `envconfig:"TEMPORAL_CN" required:"true"`
}

// Service defines our shared connections/clients
type Service struct {
	Name string

	Cfg *Config

	// RedisCli is our redis (db) client
	RedisCli redis.UniversalClient

	// NatsCli is our Nats (pub/sub) client
	NatsCli *nats.Conn

	// MongoCli is our MongoDB (NoSQL) client
	// MongoCli *mongo.Client

	// Log is the shared zerolog logging system, which does some nice JSON logs useful for Kibana/Elastic searching
	Log zerolog.Logger
}

// Subject stores all our Nats listeners
// In a microservice setup, you'd opt for some sort of discovery or shared configuration to make sure all services
// know what subjects to watch/use

//go:generate stringer -type Subject
type Subject int

const (
	Broadcast Subject = iota
	Ready
	Action
)
