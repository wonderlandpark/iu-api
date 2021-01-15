const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new Router()

const imageTag = fs.readdirSync('./images')
const images = imageTag.map(el=> ({ type: el, list: fs.readdirSync(path.join('./images', el)) }))

router.get('/', (ctx) => {
    ctx.body = { hello: 'iu' }
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
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000')
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
