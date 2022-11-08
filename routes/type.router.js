const Router = require('express')
const router = new Router()
const typeController = require('../controllers/type.controller')
const { checkRole } = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', checkRole('ADMIN'), typeController.delete)

module.exports = router
