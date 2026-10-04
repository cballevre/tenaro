package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/cballevre/tenaro/internal/db"
)

func main() {
	ctx := context.Background()

	sqlDB, err := db.Open(ctx, "app.db")
	if err != nil {
		log.Fatalf("db: %v", err)
	}
	defer sqlDB.Close()

	if err := db.Migrate(sqlDB); err != nil {
		log.Fatalf("migrate: %v", err)
	}

	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run() // listens on 0.0.0.0:8080 by default
}
