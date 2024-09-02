const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const multer = require('multer')
const upload = multer()

router.get("/users", userController.getUsers)
router.get('/users/:id', userController.getUserByID)
router.post('/users', upload.none(), userController.postUser)
router.put('/users/:id', upload.none(), userController.editUser)

module.exports = router