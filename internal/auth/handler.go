package auth

import (
	"database/sql"
	"net/http"

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
	var in RegisterUserInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.svc.Register(c.Request.Context(), in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
		return
	}

	c.JSON(http.StatusCreated, user)
}
