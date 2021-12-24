构建镜像
```
docker build -t <image-name> .  // 当前目录的Dockerfile
```

```
根据 docker-compose.yaml 文件创建 image 并后台启动网络和容器示例
docker-compose up -d  (加上--build会重新build image)

// 停止并关闭容器和网络
docker-compose down

// 运行单个service
docker-compose up <service_name>
```

交互方式进入后台运行的容器
```
docker exec -it container-name /bin/bash
```

查看日志
```
docker logs <container_id>
```

关于Github Action
```
Github Action是Github推出的一个CI/CD持续集成服务
可以在仓库的.github/workflows目录中通过yml文件来定义工作流
几个概念：
workflow(工作流): 由多个job构成
job(任务): 由多个step构成
step(步骤): 可以执行多个action
action(动作)
```
