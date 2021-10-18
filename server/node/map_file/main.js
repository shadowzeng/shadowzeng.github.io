const express = require('express')
const server = express()
const auth = require('./auth/router')

server.use('/auth', auth)

server.listen(8000, () => console.log('map file server listening on 8000'))
