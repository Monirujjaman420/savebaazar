const adminRoute = require('express').Router()
const authController = require('../../../controller/adminController/authController')

adminRoute.get('/list', authController.list)
adminRoute.post('/login', authController.login)
adminRoute.post('/register', authController.register)

module.exports = adminRoute