const Router = require('express')
// const roleMidleware = require('../midleware/CheckRoleMidleware')
const router = new Router()
const basketController = require('../controllers/basketContoller')

router.post('/:id',basketController.create)
router.get('/',basketController.getAll)
router.delete('/:id',basketController.deleteOne)
router.delete('/',basketController.deleteAll)
router.put('/increment/:id',basketController.incrementHookah)
router.put('/decrement/:id',basketController.decrementHookah)
module.exports = router