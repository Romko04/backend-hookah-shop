const Router = require('express')
const router = new Router()
const hookahController = require('../controllers/hookahController')

router.post('/',hookahController.create)
router.get('/',hookahController.getAll)
router.get('/:id',hookahController.getOne)

module.exports = router