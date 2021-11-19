const express = require('express')
const server = express()
const auth = require('./auth/router')

// 全局设置跨域访问
// server.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

server.use('/auth', auth)

server.get('/test', (req, res) => {
    res.send('test call')
})

server.listen(8000, () => console.log('map file server listening on 8000'))
