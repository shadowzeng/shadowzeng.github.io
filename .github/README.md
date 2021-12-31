使用jenkins
https://github.com/muyinchen/woker/blob/master/%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E6%90%AD%E5%BB%BAJenkins%2BGithub%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%E7%8E%AF%E5%A2%83.md

```
需安装java环境，并有/usr/bin/java可执行文件
我是下载安装了jre后，在/usr/bin目录创建软链接
后面显示启动成功，但是端口没监听

换docker方式安装
docker pull jenkinsci/blueocean
docker run -p 8080:8080 jenkinsci/blueocean
```
