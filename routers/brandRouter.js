const Router = require('express')
const roleMidleware = require('../midleware/CheckRoleMidleware')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/',roleMidleware('ADMIN'),brandController.create)
router.get('/',brandController.getAll)
//delete
module.exports = router