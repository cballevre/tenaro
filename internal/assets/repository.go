package task

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) FindByID(ctx context.Context, id int64) (*Task, error) {
	var t Task
	var due sql.NullTime
	err := r.db.QueryRowContext(ctx,
		`SELECT id, name, created_at, updated_at
           FROM assets WHERE id = ?`, id,
	).Scan(&t.ID, &t.Name, &t.CreatedAt, &t.UpdatedAt)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("select task %d: %w", id, err) // %w = wrap, conserve la cause
	}
	return &t, nil
}
