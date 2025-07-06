package db

import (
	"apiserver/repo"
	"context"
	"log"

	"apiserver/utils"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var DBStore *repo.Queries
var DBPool *pgxpool.Pool

func ConnectDatabase() {
	dbURL := utils.GetEnv("DATABASE_URL", "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb")

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		log.Fatal("Failed to parse database URL:", err)
	}
	config.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol

	ctx := context.Background()
	DBPool, err = pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatal("Failed to create connection pool:", err)
	}

	if err := DBPool.Ping(ctx); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	DBStore = repo.New(DBPool)

	log.Println("Database connection established with optimized settings")
}

func CloseDatabase() {
	if DBPool != nil {
		DBPool.Close()
		log.Println("Database connection closed")
	}
}
