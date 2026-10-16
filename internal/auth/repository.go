package auth

import (
	"context"
	"database/sql"
	"errors"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r Repository) Create(ctx context.Context, user *User) error {
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO users (email, password) VALUES (?, ?) RETURNING id`, user.Email, user.Password).Scan(&user.ID)
	return err
}

func (r Repository) FindByEmail(ctx context.Context, email string) (*User, error) {
	var user User
	err := r.db.QueryRowContext(ctx,
		`SELECT id, email, password FROM users WHERE email = ?`, email).Scan(&user.ID, &user.Email, &user.Password)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r Repository) CreateSession(ctx context.Context, session *Session) error {
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO sessions (token, user_id) VALUES (?, ?) RETURNING created_at, expires_at`,
		session.Token, session.userId,
	).Scan(&session.createdAt, &session.expiresAt)
	return err
}
