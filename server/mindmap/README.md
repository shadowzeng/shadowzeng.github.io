# 整理

sample
https://auth0.com/blog/build-an-api-in-rust-with-jwt-authentication-using-actix-web/

## 环境

cargo build blocking
https://stackoverflow.com/questions/47565203/cargo-build-hangs-with-blocking-waiting-for-file-lock-on-the-registry-index-a

运行 cargo install diesel_cli --no-default-features --features postgres 报错, cannot find -lpq
需安装 sudo apt install libpq-dev
https://github.com/sgrif/pq-sys/issues/34#issuecomment-738561217

## 关于 PostgreSQL

查询 postgres 端口 `sudo netstat -plunt |grep postgres`

启动 postgresql (Mac) `brew services restart postgres`

连接字符串

```
DATABASE_URL=postgres://username:password@ip:port/dbname
```

## 关于Diesel

diesel 配置命令

```
diesel setup  创建数据库，生成 migrations 目录和 diesel.toml 文件
diesel migration generate add_users  在 migrations 目录中新建一个包含两个空文件的目录
diesel migration run 创建数据库表？
```
