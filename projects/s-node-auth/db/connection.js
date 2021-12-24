const mongoose = require('mongoose')

// 'mongodb://127.0.0.1:27017/test'
const DB_URL = process.env.MONGODB_URI

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => {
    console.log('mongodb connected')
})

mongoose.connection.on('error', err => {
    console.log('mongodb connect error' + err)
})

module.exports = mongoose
