package helpers

import (
	"context"
	"github.com/redis/go-redis/v9"
	"time"
)

// connectToRedis establishes our Redis client for the demo
func connectToRedis() {
	clientOpts := &redis.UniversalOptions{
		//DB:         Svc.Cfg.RedisDB, // '0' is fine for our demo app
		MaxRetries: 5,
	}

	Svc.Log.Info().Str("func", "connectToRedis").Msg("Connecting to Redis...")

	// Nab our CN out of the common config
	clientOpts.Addrs = []string{Svc.Cfg.RedisCN}
	//clientOpts.Password = Svc.Cfg.RedisPW // Not using PW for demo, but if talking to AWS Elastic we'd need it

	Svc.RedisCli = redis.NewUniversalClient(clientOpts)

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	res, err := Svc.RedisCli.Ping(ctx).Result()
	if err != nil {
		Svc.Log.Panic().Err(err).Str("func", "connectToRedis").Msg("failed to connect to Redis, throwing panic")
	} else {
		Svc.Log.Info().Str("ping", res).Msg("Redis connection established, ping successful.")
	}
}
