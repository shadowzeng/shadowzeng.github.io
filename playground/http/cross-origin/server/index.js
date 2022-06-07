const express = require('express')
const server = express()

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // 增加 Content-Type 就能允许前端 application/json 形式的复杂跨域请求
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/index.html`)
})

server.get('/user/get', (req, res) => {
    console.log('get user')
    res.cookie('mycookie', 'cool')
    res.send('response of get user')
})

server.get('/test', (req, res) => {
    res.send('response of test')
})

server.post('/user/post', (req, res) => {
    console.log('post user')
    res.send('response of post user')
})

server.listen(4321, () => {
    console.log('Server listen on 4321')
})