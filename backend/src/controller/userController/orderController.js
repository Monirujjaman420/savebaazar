const orders = require('../../models/order.model')
const carts = require('../../models/cart.model')


/*list */
const list = async(req, res, next) => {
    try {
        const results = await orders.find()
                            .where('user_id', req.user.id)
        res.status(201).json({
            status: true,
            data : results
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


/*order store done */
const store = async(req, res, next) => {
    try {
        const {
            f_name, l_name, email, phone, 
            location, location2, payment_number, 
            postCode, payment_Type, transection_id,
            note
        }=req.body

        const results = await carts.find()
                            .where('user_id', req.user.id)
                            .where('order_id', null)
        console.log(results)

        if(results.length ===0){
            res.status(201).json({
                status: true,
                message: "Cart Item Not Availabe...!"
            })
        }
        const newOrder = new orders({
            f_name,
            l_name,
            email,
            phone,
            location,
            location2,
            postCode,
            payment_number,
            transection_id,
            payment_Type,
            note,
            user_id: req.user.id,
        })
        
        if(newOrder){
            results.forEach(element => {
                element.order_id = newOrder._id
                element.save()
            });
        }
        await newOrder.save()
        res.status(201).json({
            status: true,
            message: "Order Successfully Done...!"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


/**order delete */
const Destroy = async(req, res, next) => {
    try {
        const { id } = req.params;
        /**exist orders */
        const isRemoved = await orders.findByIdAndDelete(id)
        if (!isRemoved) {
            return res.status(501).json({
              status: false,
              message: "Something going wrong.",
            });
        }
        res.status(201).json({
            status: true,
            message: "Order deleted successffully"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}



module.exports = {
    store,
    list,
    Destroy,
    
} 