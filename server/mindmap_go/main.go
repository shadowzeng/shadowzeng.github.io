package main

import (
	"github.com/mindmap_go/internal/config"
	"github.com/mindmap_go/internal/db"
	"github.com/mindmap_go/internal/http"
)

func main() {
	InitEnv()
	http.Start()
}

func InitEnv() {
	InitConfig()
	InitDB()
}

func InitConfig() {
	config.Init()
}

func InitDB() {
	db.Init()
}
