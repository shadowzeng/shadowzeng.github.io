package http

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/mindmap_go/constant"
	"github.com/mindmap_go/internal/config"
	"github.com/mindmap_go/internal/http/repo"
	"github.com/mindmap_go/internal/http/router"
	"github.com/mindmap_go/internal/http/service"
)

func Start() {
	InitService()
	StartHttpServer()
}

func InitService() {
	mindRepo := repo.NewMindmap()
	service.InitMindService(mindRepo)
}

func StartHttpServer() {
	api := InitRouter()

	pprof.Register(api)
	port := config.Config.Port
	log.Printf("Listening and serving http on: %d", port)
	err := api.Run(fmt.Sprintf(":%v", port))
	panic(err)
}

func InitRouter() *gin.Engine {
	if config.Config.IsLive {
		gin.SetMode(gin.ReleaseMode)
	}
	api := gin.Default()
	supportCors(api)
	api.Any("/ping", func(c *gin.Context) { c.JSON(http.StatusOK, "pong") })

	v1 := api.Group("/mindmap/v1")
	router.Init(v1)

	return api
}

func supportCors(api *gin.Engine) {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowCredentials = true
	corsConfig.AllowAllOrigins = false
	corsConfig.AllowOriginFunc = func(origin string) bool {
		return true
	}
	corsConfig.AddAllowHeaders(
		constant.UserId,
	)
	middleware := cors.New(corsConfig)
	api.Use(middleware)
}
