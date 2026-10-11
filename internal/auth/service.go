package auth

import (
	"context"
	"errors"
)

var ErrNotFound = errors.New("User not found")
var ErrUnauthentificated = errors.New("User unauthentificated")

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

type LoginUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required,min=8"`
}

func (s *Service) Login(ctx context.Context, in LoginUserInput) (*User, error) {
	user, err := s.repo.FindByEmail(ctx, in.Email)
	if err != nil {
		return nil, ErrUnauthentificated

	}

	// Vérifier que le mot de passe est le même que celui enregistrer

	// Si oui créer une session pour l'utilisateur et la renvoyer au handler

	return user, nil
}
