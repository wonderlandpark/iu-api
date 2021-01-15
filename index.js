const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const ratelimit = require('koa-ratelimit')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new Router()

const imageTag = fs.readdirSync('./images')
const images = imageTag.map(el=> ({ type: el, list: fs.readdirSync(path.join('./images', el)) }))

router.get('/', (ctx) => {
    ctx.body = { love: 'iu', document: 'https://github.com/wonderlandpark/iu-api' }
})

router.get('/images/:type', (ctx) => {
  const type = images.find(e=> e.type === ctx.params.type)
  if(!type) {
    ctx.status = 404
    ctx.body = 'Not Foundd'
    return
  }
  const src = random(type.list)
  const image = fs.createReadStream(path.join(`./images/${type.type}`, src))
  ctx.response.set('content-type', ContentType[src.split('.').pop()] ?? 'image/png')
  ctx.body = image
})

app.use(logger())
app.use(ratelimit({
  driver: 'memory',
  duration: 2000,
  errorMessage: { error: 'Slowdown' },
  db: new Map(),
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 1,
  whitelist: (ctx) => {
    if(process.env.IU_API_TOKEN === (ctx.get('Authorization') ?? 'MUST_NOT_BE_A_KEY')) return true
    return false
  }
  
}))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000, () => {
    console.log('iu api server is listening to port 4000')
})

function random(items){
  return items[Math.floor(Math.random() * items.length)]
}

const ContentType = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  gif: 'image/gif'
}
