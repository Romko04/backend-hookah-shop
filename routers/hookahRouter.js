const Router = require('express')
const router = new Router()
const hookahController = require('../controllers/hookahController')
const roleMidleware = require('../midleware/CheckRoleMidleware')

router.post('/',roleMidleware("ADMIN"),hookahController.create)
router.get('/',hookahController.getAll)
router.get('/:id',hookahController.getOne)

module.exports = router