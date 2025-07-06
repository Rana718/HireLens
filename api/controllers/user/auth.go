package user

import (
	"apiserver/db"
	"apiserver/middleware"
	"apiserver/repo"
	"context"
	"database/sql"
	"log"

	"apiserver/models"
	"apiserver/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
)

func respondWithTokens(user repo.User, message string) (fiber.Map, error) {
	tokens, err := middleware.GenerateTokenPair(
		int(user.ID),
		user.Email,
		user.Name,
		string(user.Provider),
		user.Emailverified,
	)
	if err != nil {
		return nil, err
	}

	return fiber.Map{
		"user": fiber.Map{
			"id":        int(user.ID),
			"name":      user.Name,
			"email":     user.Email,
			"image_url": user.Imageurl,
		},
		"access_token":  tokens.AccessToken,
		"refresh_token": tokens.RefreshToken,
		"access":        *tokens,
		"message":       message,
	}, nil
}

func Login(c fiber.Ctx) error {
	var req models.LoginRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	user, err := db.DBStore.GetUserByEmail(context.Background(), req.Email)
	if err != nil {
		status := 500
		msg := "Database error"
		if err == sql.ErrNoRows {
			status = 401
			msg = "Invalid credentials"
		}
		return c.Status(status).JSON(fiber.Map{"error": msg})
	}

	if user.Provider != "CREDENTIALS" {
		return c.Status(400).JSON(fiber.Map{"error": "Please use OAuth login for this account"})
	}

	if !user.Password.Valid || !utils.CheckPassword(req.Password, user.Password.String) {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	utils.SetUserInCache(user.Email, &user)

	_, err = db.DBStore.UpdateUserLastLogin(context.Background(), user.ID)
	if err != nil {
		log.Printf("Failed to update last login: %v\n", err)
	}

	resp, err := respondWithTokens(user, "Login successful")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Token generation failed"})
	}
	return c.Status(200).JSON(resp)
}

func Signup(c fiber.Ctx) error {
	var req models.SignupRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	existingUser, err := db.DBStore.GetUserByEmail(context.Background(), req.Email)
	if err == nil && existingUser.ID != 0 {
		return c.Status(409).JSON(fiber.Map{"error": "User already exists with this email"})
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user, err := db.DBStore.CreateUser(context.Background(), repo.CreateUserParams{
		Name:     req.Name,
		Email:    req.Email,
		Password: pgtype.Text{String: hashedPassword, Valid: true},
		Imageurl: utils.BuildImageURL(req.ImageUrl),
	})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	utils.SetUserInCache(user.Email, &user)

	resp, err := respondWithTokens(user, "Signup successful")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Token generation failed"})
	}
	return c.Status(201).JSON(resp)
}

func OAuthSignup(c fiber.Ctx) error {
	var req models.OAuthSignupRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	if req.Name == "" || req.Email == "" || req.Provider == "" || req.ProviderAccountId == "" {
		return c.Status(400).JSON(fiber.Map{"error": "All fields are required"})
	}

	ctx := context.Background()
	existingUser, err := db.DBStore.GetUserByProviderAccount(ctx, repo.GetUserByProviderAccountParams{
		Provider:          repo.AuthProvider(req.Provider),
		Provideraccountid: pgtype.Text{String: req.ProviderAccountId, Valid: true},
	})

	if err == nil && existingUser.ID != 0 {
		db.DBStore.UpdateUserLastLogin(ctx, existingUser.ID)
		resp, err := respondWithTokens(existingUser, "OAuth login successful")
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Token generation failed"})
		}
		return c.Status(200).JSON(resp)
	}

	user, err := db.DBStore.CreateOAuthUser(ctx, repo.CreateOAuthUserParams{
		Name:              req.Name,
		Email:             req.Email,
		Imageurl:          utils.BuildImageURL(req.ImageUrl),
		Provider:          repo.AuthProvider(req.Provider),
		Provideraccountid: pgtype.Text{String: req.ProviderAccountId, Valid: true},
	})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create OAuth user"})
	}

	utils.SetUserInCache(user.Email, &user)

	resp, err := respondWithTokens(user, "OAuth signup successful")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Token generation failed"})
	}
	return c.Status(201).JSON(resp)
}

func RefreshTokens(c fiber.Ctx) error {
	var req models.RefreshRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}
	if req.RefreshToken == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Refresh token required"})
	}

	refreshData, err := middleware.ValidateRefreshToken(req.RefreshToken)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired refresh token"})
	}

	user, err := db.DBStore.GetUserById(context.Background(), int32(refreshData.UserID))
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	tokens, err := middleware.GenerateTokenPair(
		refreshData.UserID,
		refreshData.Email,
		user.Name,
		string(user.Provider),
		user.Emailverified,
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Token generation failed"})
	}

	return c.Status(200).JSON(fiber.Map{
		"access_token":  tokens.AccessToken,
		"refresh_token": tokens.RefreshToken,
		"message":       "Tokens refreshed",
	})
}
