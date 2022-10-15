const cartRoute = require('express').Router()
const cartController = require("../../controller/userController/cartController")

cartRoute.get('/', cartController.list)
cartRoute.get('/increment/:id', cartController.increment)
cartRoute.get('/decrement/:id', cartController.decrement)
cartRoute.post('/:id', cartController.store)
cartRoute.delete('/:id', cartController.destroy)
cartRoute.get('/number', cartController.Number)

module.exports = cartRoute   
