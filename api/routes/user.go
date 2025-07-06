package routes

import (
	"apiserver/controllers/user"

	"github.com/gofiber/fiber/v3"
)

func UserRoutes(app fiber.Router) {
	auth := app.Group("/auth")

	auth.Post("/login", user.Login)
	auth.Post("/signup", user.Signup)
	auth.Post("/oauth", user.OAuthSignup)
	auth.Post("/refresh", user.RefreshTokens)

}