const router = require('express').Router()
const avatarController = require('../controllers/avatar.controllers')
const imgMulter = require('../middlewares/imgMulter')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/avatar', avatarController.getAvatars)
router.post('/avatar', [ imgMulter, auth, isAdmin ] , avatarController.postAvatar)
router.delete('/avatar/:id', [ auth, isAdmin ] , avatarController.deleteAvatar)

module.exports = router