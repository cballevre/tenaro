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

func (r Repository) FindByEmail(ctx context.Context, email string) (*User, error) {
	var user User
	err := r.db.QueryRowContext(ctx,
		`SELECT id, email, password, created_at, updated_at FROM users WHERE email = ?`, email).Scan(&user.ID, &user.Email, &user.password)

	if err != nil {
		return nil, ErrNotFound
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
