const Router = require('express')
const router = new Router()
const commentController = require('../controllers/comment.controller')
const { checkAuth } = require('../middleware/authMiddleware')
const { checkRole } = require('../middleware/checkRoleMiddleware')

router.post('/', checkAuth, commentController.create)
router.post('/:id', checkAuth, commentController.update)
router.post('/:id', checkAuth, commentController.delete)
router.get('/', checkRole('ADMIN'), commentController.getAll)

module.exports = router