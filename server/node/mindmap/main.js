const Koa = require('koa')

const app = new Koa()

app.use(async(ctx, next) => {
    ctx.response.body = 'hello koa'
})

app.listen(3333, () => {
    console.log('server is running')
})