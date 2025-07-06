package utils

import (
	"apiserver/repo"
	"encoding/json"
	"time"

	"apiserver/config"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func BuildImageURL(input string) pgtype.Text {
	if input != "" {
		return pgtype.Text{String: input, Valid: true}
	}
	return pgtype.Text{}
}

func GetUserFromCache(email string) (*repo.User, error) {
	data, err := config.Client.Get(config.Ctx, "user:"+email).Result()
	if err != nil {
		return nil, err
	}
	var user repo.User
	if err := json.Unmarshal([]byte(data), &user); err != nil {
		return nil, err
	}
	return &user, nil
}

func SetUserInCache(email string, user *repo.User) {
	data, err := json.Marshal(user)
	if err != nil {
		return
	}
	_ = config.Client.Set(config.Ctx, "user:"+email, data, 15*time.Minute).Err()
}
