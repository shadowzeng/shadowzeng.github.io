package reqmodel

import (
	"github.com/mindmap_go/internal/http/model"
)

type CreateRequest struct {
	FileName    string `json:"file_name" form:"file_name"`
	FileContent string `json:"file_content" form:"file_content"`
}

func (c *CreateRequest) Validate() *model.ErrorInfo {
	if c.FileContent == "" || c.FileName == "" {
		return &model.ErrorInfo{
			Code:     4001,
			Msg:      "file_name or file_content is empty",
			HttpCode: 400,
		}
	}
	return nil
}
