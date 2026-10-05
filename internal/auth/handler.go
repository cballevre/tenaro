package auth

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	svc *Service
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{svc: NewService(NewRepository(db))}
}

func (h *Handler) RegisterRoutes(rg *gin.RouterGroup) {
	assets := rg.Group("/auth")
	{
		assets.POST("/register", h.register)
		// assets.GET("/login", h.login)
		// assets.POST("/post", h.logout)
	}
}

func (h *Handler) register(c *gin.Context) {

}
