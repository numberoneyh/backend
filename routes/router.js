const Router = require('express')
const router = new Router()

const userRouter = require('./user.router')
const typeRouter = require('./type.router')
const brandRouter = require('./brand.router')
const productRouter = require('./product.router')
const postRouter = require('./post.router')
const commentRouter = require('./comments.router')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

module.exports = router
