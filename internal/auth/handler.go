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
		assets.POST("/login", h.login)
		assets.POST("/post", h.logout)
		assets.GET("/me", h.me)
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

	c.JSON(http.StatusOK, user)
}

func (h *Handler) login(c *gin.Context) {
	var in LoginInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := h.svc.Login(c.Request.Context(), in)
	if err == ErrUnauthentificated {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized access"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erreur interne"})
		return
	}

	secure := false

	maxAge := int(sessionTTL.Seconds())
	c.SetCookie("session", result.Token, maxAge, "/", "", secure, true)

	c.JSON(http.StatusOK, gin.H{"accepted": "ok"})
}

func (h *Handler) logout(c *gin.Context) {
	// Doit-être authentifier pour supprimer ça session
	// Supprimer la session en base de donnée
	// Retourne un cookie avec ageMax à -1
}

func (h *Handler) me(c *gin.Context) {
	// Doit-être authentifier pour récupérer son profil
	// Va récupérer les informations de l'utilisateur courant
	//
}
