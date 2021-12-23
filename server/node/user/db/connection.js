const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => {
    console.log('mongodb connected')
})

mongoose.connection.on('error', err => {
    console.log('mongodb connect error' + err)
})

module.exports = mongoose
