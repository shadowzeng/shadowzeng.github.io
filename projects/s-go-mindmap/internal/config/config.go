package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"runtime"
)

type Configuration struct {
	DB     DB   `json:"db"`
	Port   int  `json:"port"`
	IsLive bool `json:"is_live"`
}

type DB struct {
	Username     string `json:"user_name"`
	Password     string `json:"password"`
	IP           string `json:"ip"`
	Port         int    `json:"port"`
	DBName       string `json:"db_name"`
	MaxOpenConns int    `json:"max_open_conns"`
	MaxIdleConns int    `json:"max_idle_conns"`
	MaxLifetime  int    `json:"max_lifetime"`
}

var Config Configuration

func Init() {
	_, file, _, _ := runtime.Caller(0)
	basepath := filepath.Dir(file)
	path := fmt.Sprintf("%s/../../internal/config/config_data.json", basepath)

	configData, _ := ioutil.ReadFile(path)

	if err := json.Unmarshal([]byte(configData), &Config); err != nil {
		fmt.Println("init configuration error!")
		panic(fmt.Sprintf("%v", err))
	}

}
