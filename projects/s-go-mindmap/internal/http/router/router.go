package router

import (
	"github.com/gin-gonic/gin"
	"github.com/mindmap_go/internal/http/controller"
)

func Init(g *gin.RouterGroup) {
	mindmapController := controller.NewMindmapController()
	g.POST("/save", mindmapController.Create)
}
