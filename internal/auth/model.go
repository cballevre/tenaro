package auth

import "time"

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Password string
}

type Session struct {
	TokenHash string
	UserID    int64
	CreatedAt time.Time
	ExpiresAt time.Time
}
