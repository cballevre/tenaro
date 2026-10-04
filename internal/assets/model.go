package task

import "time"

type Asset struct {
	ID        int64     `json:"id"`
	Name      string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
