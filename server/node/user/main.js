const Koa = require('koa')
const Router = require('@koa/router')
const userAction = require('./db/test')

const app = new Koa()
const router = new Router()

router.get('/test', (ctx) => {
    ctx.response.body = 'Hello world'
})

router.get('/get', async (ctx) => {
    const users = await userAction.query()
    ctx.body = users
})

router.post('/save', async (ctx) => {
    console.log(ctx.request.body)
    const users = await userAction.save()
    ctx.body = users
})

app.use(router.routes())

app.listen(10123, () => {
    console.log('server is running')
})
