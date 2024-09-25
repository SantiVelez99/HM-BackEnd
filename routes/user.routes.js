const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const multer = require('multer')
const upload = multer()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get("/users", userController.getUsers)
router.get('/users/:id', userController.getUserByID)
router.post('/users', upload.none(), userController.postUser)
router.put('/users/:id', [ auth, upload.none() ] , userController.editUser)
router.delete('/user/:id', [ auth, isAdmin ] , userController.deleteUser)
router.post('/login', upload.none() , userController.logIn)

module.exports = router