const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/api/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 配置session
app.kes = ['lee session keys'];
app.use(session({
  key: 'basic.sid', // cookie name, 默认koa.sid
  prefix: 'basicBackend:sess:', // redis key的前缀，默认koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // ms
  },
  store: redisStore({
    all: `127.0.0.1:6379`
  }),
}))

app.use(async(ctx, next) => {
  var session = ctx.session;
  session.count = session.count || 0;
  session.count++;
  console.log(session.count, 'count');
  next();
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
