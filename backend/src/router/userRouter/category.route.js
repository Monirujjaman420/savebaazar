const UserCategoryRoute = require('express').Router()
const ProductController = require('../../controller/userController/ProductController')


    UserCategoryRoute.get('/product/:id', ProductController.CategoryProduct)
    UserCategoryRoute.get('/product/', ProductController.CategoryProductList)


    
module.exports = UserCategoryRoute