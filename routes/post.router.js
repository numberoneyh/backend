const Router = require('express')
const router = new Router()
const postController = require('../controllers/post.controller')
const { checkAuth } = require("../middleware/authMiddleware");

router.post('/', checkAuth, postController.create)
router.get('/', postController.getAll)
router.get('/myposts/:id', checkAuth, postController.getByOwner)
router.get('/:id', postController.getOne)
router.put('/:id', checkAuth, postController.update)
router.delete('/:id', checkAuth, postController.delete)

module.exports = router
