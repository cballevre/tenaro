package auth

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"
)

var ErrNotFound = errors.New("User not found")
var ErrUnauthentificated = errors.New("User unauthentificated")

const sessionTTL = 24 * time.Hour

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

type RegisterUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required,min=8"`
}

func (s *Service) Register(ctx context.Context, in RegisterUserInput) (*User, error) {
	user := &User{Email: in.Email, Password: in.Password}
	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required,min=8"`
}

type LoginResult struct {
	User  *User
	Token string
}

func (s *Service) Login(ctx context.Context, in LoginInput) (LoginResult, error) {
	user, err := s.repo.FindByEmail(ctx, in.Email)

	if err != nil {
		return LoginResult{}, ErrUnauthentificated
	}

	if in.Password != user.Password {
		return LoginResult{}, ErrUnauthentificated
	}

	b := make([]byte, 32)
	rand.Read(b)
	token := hex.EncodeToString(b)

	session := &Session{
		TokenHash: hashToken(token),
		UserID:    user.ID,
		ExpiresAt: time.Now().UTC().Add(sessionTTL),
	}

	if err := s.repo.CreateSession(ctx, session); err != nil {
		return LoginResult{}, ErrUnauthentificated
	}

	return LoginResult{
		User:  user,
		Token: token,
	}, nil
}

func hashToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}
