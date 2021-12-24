package dbmodel

import (
	"time"

	"github.com/jinzhu/gorm"
	"github.com/mindmap_go/constant"
)

type MindmapTab struct {
	Id          int64  `json:"id" gorm:"column:id;primary_key"`
	UserId      int64  `json:"user_id" gorm:"column:user_id"`
	FileName    string `json:"file_name" gorm:"column:file_name"`
	FileContent string `json:"file_content" gorm:"column:file_content"`
	StatusFlag  int8   `json:"status_flag" gorm:"column:status_flag"`
	Ctime       int64  `json:"ctime" gorm:"column:ctime"`
	Mtime       int64  `json:"mtime" gorm:"column:mtime"`
}

func (m MindmapTab) TableName() string {
	return "mindmap_tab"
}

func (m MindmapTab) BeforeUpdate(scope *gorm.Scope) error {
	return scope.SetColumn("mtime", time.Now().Unix())
}

func (m MindmapTab) BeforeCreate(scope *gorm.Scope) (err error) {
	now := time.Now().Unix()
	if m.Ctime == 0 {
		err = scope.SetColumn("ctime", now)
	}
	if m.Mtime == 0 {
		err = scope.SetColumn("mtime", now)
	}
	if m.StatusFlag == 0 {
		err = scope.SetColumn("status_flag", constant.StatusFlagEnable)
	}
	return err
}
