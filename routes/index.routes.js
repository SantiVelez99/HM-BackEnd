const router = require('express').Router()
const userRoutes = require('./user.routes')
const avatarRoutes = require('./avatar.routes')


router.use([userRoutes, avatarRoutes])

module.exports = router