package asset

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

func (h *Handler) RegisterRoutes(rg *gin.RouterGroup) {
	assets := rg.Group("/assets")
	{
		assets.GET("/", h.list)
		assets.POST("/", h.create)
		assets.GET("/:id", h.get)
		// assets.PUT("/:id", updateUser)
		// assets.DELETE("/:id", deleteUser)
	}
}

func (h *Handler) create(c *gin.Context) {
	name := c.PostForm("name")

	a, err := h.svc.Create(c.Request.Context(), name)

	print(a)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"hello": "I'm happy"})
}

func (h *Handler) list(c *gin.Context) {
	assets, err := h.svc.List(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
		return
	}
	c.JSON(http.StatusOK, assets)
}

func (h *Handler) get(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id invalide"})
		return
	}

	a, err := h.svc.Get(c.Request.Context(), id)
	switch {
	case errors.Is(err, ErrNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": "task introuvable"})
	case err != nil:
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
	default:
		c.JSON(http.StatusOK, a)
	}
}
