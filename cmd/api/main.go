package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/cballevre/tenaro/internal/asset"
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
	api := router.Group("/api/v1")

	asset.NewHandler(sqlDB).RegisterRoutes(api)

	router.Run() // listens on 0.0.0.0:8080 by default
}
