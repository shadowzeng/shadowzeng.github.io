package db

import (
	"fmt"
	"log"
	"time"

	"github.com/mindmap_go/internal/config"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func Init() {
	db, err := gorm.Open("mysql", fmt.Sprintf("%s:%s@(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.Config.DB.Username,
		config.Config.DB.Password,
		config.Config.DB.IP,
		config.Config.DB.Port,
		config.Config.DB.DBName))
	if err != nil {
		fmt.Println("init db error!")
		panic(fmt.Sprintf("%v", err))
	}
	DB = db
}

func HealthCheck() {
	t := time.NewTicker(time.Second * 10)
	for range t.C {
		if DB.DB().Ping() != nil {
			log.Fatalf("db no response")
		}
	}
}
