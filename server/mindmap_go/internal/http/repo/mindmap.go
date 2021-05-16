package repo

import (
	"github.com/mindmap_go/internal/db"
	"github.com/mindmap_go/internal/http/model/dbmodel"
)

type MindmapRepository interface {
	Create(m *dbmodel.MindmapTab) (*dbmodel.MindmapTab, error)
}

type MindmapRepo struct{}

func NewMindmap() *MindmapRepo {
	return new(MindmapRepo)
}

func (r *MindmapRepo) Create(m *dbmodel.MindmapTab) (*dbmodel.MindmapTab, error) {
	err := db.DB.Create(m).Error
	return m, err
}
