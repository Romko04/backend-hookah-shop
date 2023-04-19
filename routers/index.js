const Router = require('express')
const router = new Router()
const hookahRouter = require('./hookahRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require('./basketRouter')



router.use('/user',userRouter)
router.use('/brand',brandRouter)
router.use('/hookah',hookahRouter)
router.use('/basket',basketRouter)


module.exports = router