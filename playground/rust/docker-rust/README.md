```
// 编译为image
docker build -t docker-rust-test .

// 启动一个容器
docker run -d -p 8084:8083 --name running-docker-rust-test docker-rust-test
```