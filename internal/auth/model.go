package auth

import "time"

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Password string
}

type Session struct {
	Token     string
	userId    string
	createdAt time.Time
	expiresAt time.Time
}
