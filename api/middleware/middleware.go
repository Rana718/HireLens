package middleware

import (
	"apiserver/config"
	"apiserver/db"
	"apiserver/utils"
	"context"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5"
)

var PUBLIC_URLS = []string{
	"/",
	"/api/auth/*",
}

func isPublicPath(path string) bool {
	for _, pattern := range PUBLIC_URLS {
		if strings.HasSuffix(pattern, "/*") {
			prefix := strings.TrimSuffix(pattern, "/*")
			if strings.HasPrefix(path, prefix) {
				return true
			}
		} else if matched, _ := filepath.Match(pattern, path); matched || pattern == path {
			return true
		}
	}
	return false
}

func createCurrentUser(accessData *AccessTokenData) *AccessTokenData {
	currentUser := &AccessTokenData{
		UserID:          accessData.UserID,
		Email:           accessData.Email,
		Name:            accessData.Name,
		Provider:        accessData.Provider,
		IsVerified:      accessData.IsVerified,
		ExpiresAt:       accessData.ExpiresAt,
	}

	return currentUser
}

func AuthMiddleware() fiber.Handler {
	return func(c fiber.Ctx) error {
		path := c.Path()

		if c.Method() == "OPTIONS" || isPublicPath(path) {
			return c.Next()
		}

		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{
				"error": "Authorization header required",
			})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(401).JSON(fiber.Map{
				"error": "Invalid authorization header format. Use: Bearer <token>",
			})
		}

		tokenString := parts[1]

		accessData, err := ValidateAccessToken(tokenString)
		if err != nil {
			return c.Status(401).JSON(fiber.Map{
				"error": "Invalid or expired token",
			})
		}

		_, err = config.Client.Get(config.Ctx, "user:"+accessData.Email).Result()

		if err != nil {
			data, err := db.DBStore.GetUserByEmail(context.Background(), accessData.Email)
			if err != nil {
				if err == pgx.ErrNoRows {
					return c.Status(404).JSON(fiber.Map{
						"error": "User not found",
					})
				}
				return c.Status(500).JSON(fiber.Map{
					"error": "Database error",
				})
			}
			utils.SetUserInCache(data.Email, &data)
		}

		currentUser := createCurrentUser(accessData)
		c.Locals("current_user", currentUser)

		return c.Next()
	}
}

func GetCurrentUser(c fiber.Ctx) *AccessTokenData {
	if data := c.Locals("current_user"); data != nil {
		if currentUser, ok := data.(*AccessTokenData); ok {
			return currentUser
		}
	}
	return nil
}
