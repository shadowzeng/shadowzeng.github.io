const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    res.cookie('test', 'foo', {maxAge: 10000000000})

    res.send({success: true, code: 1, message: '登陆成功'})
})

module.exports = router
