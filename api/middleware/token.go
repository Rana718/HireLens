package middleware

import (
	"apiserver/utils"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"time"
)

var (
	SECRET_KEY             = utils.GetEnv("SECRET_KEY", "top_secret")
	ACCESS_TOKEN_VALIDITY  = 20 * 24 * time.Hour
	REFRESH_TOKEN_VALIDITY = 30 * 24 * time.Hour
)

type AccessTokenData struct {
	UserID     int    `json:"user_id"`
	Email      string `json:"email"`
	Name       string `json:"name"`
	Provider   string `json:"provider"`
	IsVerified bool   `json:"is_verified"`
	ExpiresAt  int64  `json:"expires_at"`
}

type RefreshTokenData struct {
	UserID    int    `json:"user_id"`
	Email     string `json:"email"`
	ExpiresAt int64  `json:"expires_at"`
}

type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func encrypt(data []byte) (string, error) {
	block, err := aes.NewCipher([]byte(SECRET_KEY))
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func decrypt(encryptedData string) ([]byte, error) {
	data, err := base64.StdEncoding.DecodeString(encryptedData)
	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher([]byte(SECRET_KEY))
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(data) < nonceSize {
		return nil, errors.New("ciphertext too short")
	}

	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}

func GenerateTokenPair(userID int, email, name, provider string, isVerified bool) (*TokenPair, error) {
	now := time.Now()

	accessData := AccessTokenData{
		UserID:     userID,
		Email:      email,
		Name:       name,
		Provider:   provider,
		IsVerified: isVerified,
		ExpiresAt:  now.Add(ACCESS_TOKEN_VALIDITY).Unix(),
	}

	refreshData := RefreshTokenData{
		UserID:    userID,
		Email:     email,
		ExpiresAt: now.Add(REFRESH_TOKEN_VALIDITY).Unix(),
	}

	accessJSON, err := json.Marshal(accessData)
	if err != nil {
		return nil, err
	}

	refreshJSON, err := json.Marshal(refreshData)
	if err != nil {
		return nil, err
	}

	accessToken, err := encrypt(accessJSON)
	if err != nil {
		return nil, err
	}

	refreshToken, err := encrypt(refreshJSON)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func ValidateAccessToken(token string) (*AccessTokenData, error) {
	decryptedData, err := decrypt(token)
	if err != nil {
		return nil, errors.New("invalid token")
	}

	var accessData AccessTokenData
	if err := json.Unmarshal(decryptedData, &accessData); err != nil {
		return nil, errors.New("invalid token format")
	}

	if time.Now().Unix() > accessData.ExpiresAt {
		return nil, errors.New("token expired")
	}

	return &accessData, nil
}

func ValidateRefreshToken(token string) (*RefreshTokenData, error) {
	decryptedData, err := decrypt(token)
	if err != nil {
		return nil, errors.New("invalid token")
	}

	var refreshData RefreshTokenData
	if err := json.Unmarshal(decryptedData, &refreshData); err != nil {
		return nil, errors.New("invalid token format")
	}

	if time.Now().Unix() > refreshData.ExpiresAt {
		return nil, errors.New("token expired")
	}

	return &refreshData, nil
}

func RefreshAccessToken(refreshToken string, name, provider string, isVerified bool) (*TokenPair, error) {
	refreshData, err := ValidateRefreshToken(refreshToken)
	if err != nil {
		return nil, err
	}

	return GenerateTokenPair(refreshData.UserID, refreshData.Email, name, provider, isVerified)
}
