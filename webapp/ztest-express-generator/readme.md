#### 处理请求的回调函数
```
app.get(path, function(req, res){
    req.query    // get请求的参数
    req.body     // post请求体
    req.params   // 处理/user/date形式请求的get、post参数
    req.param()  // 统一获取参数的方法，查找的优先级为req.params -> req.body -> req.query
});
```