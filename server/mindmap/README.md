# 整理

sample
https://auth0.com/blog/build-an-api-in-rust-with-jwt-authentication-using-actix-web/

## 环境

cargo build blocking
https://stackoverflow.com/questions/47565203/cargo-build-hangs-with-blocking-waiting-for-file-lock-on-the-registry-index-a

运行 cargo install diesel_cli --no-default-features --features postgres 报错, cannot find -lpq
需安装 sudo apt install libpq-dev
https://github.com/sgrif/pq-sys/issues/34#issuecomment-738561217

## 关于 Rust
模块介绍
https://zhuanlan.zhihu.com/p/164556350

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
diesel setup  创建数据库(如果不存在)，生成 migrations 目录和 diesel.toml 文件
diesel migration generate add_users  在 migrations 目录中新建一个包含两个空文件(up.sql/down.sql)的目录
diesel migration run  根据up.sql创建数据库表(如果不存在) 同事会更新 diesel.toml指定的print_schema 文件

print_schema 文件是由 diesel 来控制更新

https://stackoverflow.com/questions/65858396/how-to-re-run-diesel-migrations
执行 diesel migration redo 会执行 down.sql中的操作然后再执行 up.sql，一般就是删除表格然后重新创建

```
