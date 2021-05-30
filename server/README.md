// 根据 docker-compose.yaml 文件创建 image 并后台启动网络和容器示例
docker-compose up -d  (加上--build会重新build image)

// 停止并关闭容器和网络
docker-compose down