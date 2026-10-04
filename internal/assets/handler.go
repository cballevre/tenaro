package assets

import (
	"database/sql"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	svc *Service
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{svc: NewService(NewRepository(db))}
}

func RegisterRoutes(rg *gin.RouterGroup) {
	assets := rg.Group("/assets")
	{
		// assets.GET("/", listUsers)
		// assets.POST("/", createUser)
		assets.GET("/:id", get)
		// assets.PUT("/:id", updateUser)
		// assets.DELETE("/:id", deleteUser)
	}
}

func (h *Handler) get(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id invalide"})
		return
	}

	t, err := h.svc.Get(c.Request.Context(), id)
	switch {
	case errors.Is(err, ErrNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": "task introuvable"})
	case err != nil:
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
	default:
		c.JSON(http.StatusOK, t)
	}
}
