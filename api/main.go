package main

import (
	"apiserver/config"
	"apiserver/db"
	"apiserver/routes"
	"apiserver/utils"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file, using default values")
	}
	config.InitRedis()
	db.ConnectDatabase()
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"*"},
		AllowHeaders: []string{"*"},
	}))

	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip} ${status} - ${method} ${path} (${latency})\n",
	}))

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// api routes
	api := app.Group("/api")
	routes.UserRoutes(api)

	port := utils.GetEnv("PORT", "8000")

	log.Printf("Server starting on port %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
