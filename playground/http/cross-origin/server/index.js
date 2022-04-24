const express = require('express')
const server = express()

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

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