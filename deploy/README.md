构建镜像
```
docker build -t <image-name> .  // 当前目录的Dockerfile
```

根据 docker-compose.yaml 文件创建 image 并后台启动网络和容器示例
```
docker-compose up -d  (加上--build会重新build image)
```

// 停止并关闭容器和网络
```
docker-compose down
```

交互方式进入后台运行的容器
```
docker exec -it container-name /bin/bash
```
