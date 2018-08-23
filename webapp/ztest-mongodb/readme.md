#### 安装配置
##### windows环境
安装`MongoDB 3.2`版本`msi`（尝试安装过4.0以上版本，但是可视化工具MongoVUE使用有问题）

安装后到bin目录下输入如下命令安装windows服务（事先创建一个`data`和`log`目录）
```
mongod.exe -install --dbpath=C:\MongoDB\Server\3.2\data --logpath=C:\MongoDB\Server\3.2\log\log.log
```

然后去启动服务（4.0版本可以在安装时附带安装windows服务）

采用`MongoVue`可视化工具连接的，版本`1.6.9`

可以连上，但是创建 `Collection` 失败

参考网上解决方案，修改存储引擎

先把之前的data目录删掉（先关闭服务），然后重新建data目录，再在bin下输入命令
```
mongod --storageEngine mmapv1 --dbpath=C:\MongoDB\Server\3.2\data
```

然后再去启动服务，结果启动失败。。

刚那个命令似乎运行完成后没有退出，直接`Ctrl C`强退了，就可以启动服务了

再用`MongoVue`连接后，可以创建集合了


