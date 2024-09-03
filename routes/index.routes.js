const router = require('express').Router()
const userRoutes = require('./user.routes')

router.user([userRoutes])

module.exports = router