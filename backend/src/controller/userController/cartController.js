const carts = require('../../models/cart.model')

/*cart list */

const list = async(req, res, next) => {
    try {
        console.log('test', 'test')
        const results = await carts.find()
                            .where('user_id', req.user.id)
                            .where('order_id', null)
                            .populate('product_id', "name image price -_id")
                            .populate('user_id')
        
        res.status(200).json({
            status:true,
            data:results
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/*store cart */
const store = async(req, res, next) => {
    try {
        const { id } = req.params;
        const newCart = new carts({
            product_id: id,
            user_id : req.user.id,
        })
        await newCart.save()
        res.status(201).json({
            status: true,
            message: "Cart Added Successfully...!"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/*destroy */
const destroy = async(req, res, next) => {
    try {
        const { id } = req.params
         await carts.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message : "Cart Item Deleted...!"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/**cart item quantity increment  */
const increment = async(req, res, next) => {
    try {
        const { id } = req.params
        const result = await carts.findById(id)
        const qty = result.quantity + 1
        result.quantity = qty
        result.save()
        
        res.status(201).json({
            status: true,
            data: qty,
            message: "Quantity Updated Successfully."
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/**decrement cart quantity update */
const decrement = async(req, res, next) => {
    try {
        const {id} = req.params        
        const result = await carts.findById(id)
        const qty = result.quantity - 1
        result.quantity = qty
        result.save()
        res.status(201).json({
            status: true,
            message: "Quntity Decrement Successfully."
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

/**auth user cart item number */
const Number = async(req, res, next) => {
    try {
        const items = await carts.find()
                            .where('user_id', req.user.id)
                            .where('order_id', null)
                            .count()
        console.log("item sd",items)
        res.status(201).json({
            status: true,
            data: items
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    store,
    list,
    increment,
    decrement,
    destroy,
    Number
}