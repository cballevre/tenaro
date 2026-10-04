package task

import (
	"context"
	"errors"
)

var ErrNotFound = errors.New("task not found")

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Get(ctx context.Context, id int64) (*Task, error) {
	t, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err // ErrNotFound traverse tel quel
	}
	// Quand vous aurez l'auth : l'équivalent de la RLS Supabase vit ICI.
	// if t.UserID != userIDFromContext(ctx) { return nil, ErrForbidden }
	return t, nil
}
