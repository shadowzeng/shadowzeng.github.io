package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mindmap_go/internal/http/service"
)

type MindmapController struct {
	service *service.MindmapHandler
}

func NewMindmapController() *MindmapController {
	return &MindmapController{service: service.MindmapService}
}

func (m *MindmapController) Create(c *gin.Context) {
	m.service.Create(c)
}
