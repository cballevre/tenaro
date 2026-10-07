package auth

import (
	"context"
	"database/sql"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r Repository) Create(ctx context.Context, user *User) error {
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO users (email, password) VALUES (?, ?) RETURNING id`, user.Email, user.password).Scan(&user.ID)
	return err
}
