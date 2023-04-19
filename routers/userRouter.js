const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMidleware = require('../midleware/AuthMidleware')
router.post('/registration', userController.redistration)
router.post('/login', userController.login)
router.get('/auth',authMidleware, userController.check)

module.exports = router