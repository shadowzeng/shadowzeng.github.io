const http = require('http')
const server = http.createServer((req, res) => {
    // res.statusCode = 400
    res.setHeader('Content-type', 'text/json')
    res.setHeader('Cache-Control', 'max-age=10000')
    res.end('base http module')
})

server.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})