package asset

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

func (r *Repository) FindAll(ctx context.Context) ([]Asset, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, name, created_at, updated_at
			FROM assets`)
	if err != nil {
		return nil, fmt.Errorf("select tasks: %w", err)
	}
	defer rows.Close()

	assets := make([]Asset, 0)
	for rows.Next() {
		var a Asset
		if err := rows.Scan(&a.ID, &a.Name, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan task: %w", err)
		}
		assets = append(assets, a)
	}
	return assets, rows.Err()
}

func (r *Repository) Create(ctx context.Context, name string) (*Asset, error) {
	something, err := r.db.ExecContext(ctx, `INSERT INTO assets (name) VALUES (?)`, name)

	print(something)

	if err != nil {
		return nil, fmt.Errorf("select asset %d: %w", name, err)
	}

	return nil, nil
}

func (r *Repository) FindByID(ctx context.Context, id int64) (*Asset, error) {
	var a Asset
	err := r.db.QueryRowContext(ctx,
		`SELECT id, name, created_at, updated_at
           FROM assets WHERE id = ?`, id,
	).Scan(&a.ID, &a.Name, &a.CreatedAt, &a.UpdatedAt)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("select task %d: %w", id, err) // %w = wrap, conserve la cause
	}
	return &a, nil
}
