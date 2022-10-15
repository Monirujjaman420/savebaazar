const userRoute = require('express').Router()
const userController = require('../../controller/userController/userController')
const { IsUser } = require('../../middleware/userMiddleware')

userRoute.get('/', userController.List)
userRoute.post('/login', userController.login)
userRoute.post('/register', userController.register)
userRoute.get('/profile', IsUser, userController.Profile)

module.exports = userRoute