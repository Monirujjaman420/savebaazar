const productRoute = require('express').Router()
const productController = require('../../controller/adminController/productController')

productRoute.get('/', productController.list)
productRoute.post('/', productController.store)
productRoute.get('/:id', productController.show)
productRoute.put('/:id', productController.update)
productRoute.delete('/:id', productController.destroy)

module.exports = productRoute