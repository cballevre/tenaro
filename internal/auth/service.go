package auth

import (
	"context"
)

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
	user := &User{Email: in.Email, password: in.Password}
	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}
