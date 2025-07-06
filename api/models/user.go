package models

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
	Provider string `json:"provider"`
}

type SignupRequest struct {
	Name     string `json:"name" validate:"required,min=2"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
	ImageUrl string `json:"imageUrl"`
}

type OAuthSignupRequest struct {
	Name              string `json:"name" validate:"required"`
	Email             string `json:"email" validate:"required,email"`
	ImageUrl          string `json:"imageUrl"`
	Provider          string `json:"provider" validate:"required"`
	ProviderAccountId string `json:"provider_account_id" validate:"required"`
}

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token" validate:"required"`
}
