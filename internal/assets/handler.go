package assets

import (
	"github.com/gin-gonic/gin"
)

func RegisterAssetRoutes(rg *gin.RouterGroup) {
	assets := rg.Group("/assets")
	{
		assets.GET("/", listUsers)
		assets.POST("/", createUser)
		assets.GET("/:id", getUser)
		assets.PUT("/:id", updateUser)
		assets.DELETE("/:id", deleteUser)
	}
}
