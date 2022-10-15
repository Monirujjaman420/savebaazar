const AdminOrderRoute = require('express').Router()
const OrderController = require('../../controller/adminController/orderController')

    AdminOrderRoute.get('/', OrderController.Index);
    AdminOrderRoute.get('/:id', OrderController.Show);
    AdminOrderRoute.delete('/:id', OrderController.Destroy);
    AdminOrderRoute.get("/status/:id", OrderController.status);

module.exports = AdminOrderRoute
