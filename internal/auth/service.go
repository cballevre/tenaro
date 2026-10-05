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

// A la fin d'une inscription l'utilisateur est-il directement connecter ? non
func (s *Service) Register(ctx context.Context) (*User, error) {

}
