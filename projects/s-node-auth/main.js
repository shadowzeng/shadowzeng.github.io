const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const userAction = require('./db/user')

const app = new Koa()
const router = new Router()

router.get('/api/test', (ctx) => {
    ctx.response.body = 'Hello world'
})

router.get('/api/get', async (ctx) => {
    const users = await userAction.query()
    ctx.body = users
})

router.post('/api/save', async (ctx) => {
    const user = ctx.request.body
    await userAction.save(JSON.parse(user))
    ctx.body = 'save success'
    ctx.set("Access-Control-Allow-Origin", "*")
})

app.use(koaBody())
app.use(router.routes())

app.listen(process.env.PORT, () => {
    console.log('server is running')
})
