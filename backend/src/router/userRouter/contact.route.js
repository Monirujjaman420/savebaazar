const UserContactRoute = require('express').Router()
const ContactController = require('../../controller/userController/ContactController')
    
    UserContactRoute.post('/', ContactController.Store)

module.exports = UserContactRoute 