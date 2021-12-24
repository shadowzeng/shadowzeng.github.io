package service

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mindmap_go/constant"
	"github.com/mindmap_go/internal/http/model/dbmodel"
	"github.com/mindmap_go/internal/http/model/reqmodel"
	"github.com/mindmap_go/internal/http/repo"
)

type MindmapHandler struct {
	mindRepo repo.MindmapRepository
}

var MindmapService *MindmapHandler

func InitMindService(repo repo.MindmapRepository) *MindmapHandler {
	MindmapService = &MindmapHandler{mindRepo: repo}
	return MindmapService
}

func (m *MindmapHandler) Create(c *gin.Context) {
	var userId int64
	var err error
	//todo header拿不到
	if id := c.Request.Header[constant.UserId]; len(id) > 0 {
		userId, err = strconv.ParseInt(id[0], 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		userId = 1
	}

	var req *reqmodel.CreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := req.Validate(); err != nil {
		c.JSON(err.HttpCode, gin.H{"code": err.Code, "msg": err.Msg})
		return
	}

	mindmap := &dbmodel.MindmapTab{
		UserId:      userId,
		FileName:    req.FileName,
		FileContent: req.FileContent,
	}
	mindmap, err = m.mindRepo.Create(mindmap)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"code": 5001, "msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "id": mindmap.Id})
	return
}
