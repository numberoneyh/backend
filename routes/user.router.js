const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const { checkAuth } = require("../middleware/authMiddleware");


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/update', checkAuth, userController.update)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.get('/auth', checkAuth, userController.check)

module.exports = router
