const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req)
    res.send({success: true, code: 1, message: '登陆成功'})
})

module.exports = router
