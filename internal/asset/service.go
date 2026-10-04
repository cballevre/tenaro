package asset

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

func (s *Service) List(ctx context.Context) ([]Asset, error) {
	return s.repo.FindAll(ctx)
}

func (s *Service) Create(ctx context.Context, name string) (*Asset, error) {
	a, err := s.repo.Create(ctx, name)
	if err != nil {
		return nil, err
	}

	return a, nil
}

func (s *Service) Get(ctx context.Context, id int64) (*Asset, error) {
	a, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err // ErrNotFound traverse tel quel
	}

	return a, nil
}
