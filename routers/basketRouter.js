const Router = require('express')
// const roleMidleware = require('../midleware/CheckRoleMidleware')
const router = new Router()
const basketController = require('../controllers/basketContoller')

router.post('/:id',basketController.create)
router.get('/',basketController.getAll)
//delete
module.exports = router