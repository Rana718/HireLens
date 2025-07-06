package config

import (
	"apiserver/utils"
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var (
	Ctx    = context.Background()
	Client *redis.Client
)

func InitRedis() {

	redisURL := utils.GetEnv("REDIS_URL", "redis://localhost:6379")
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Invalid REDIS_URL: %v", err)
	}

	Client = redis.NewClient(opt)

	log.Println("Redis client initialized")
}
