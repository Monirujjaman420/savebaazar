const orders = require('../../models/order.model')
const carts = require('../../models/cart.model')

const Index = async(req, res, next) =>{
    try {
        const results = await orders.find()
        res.status(200).json({
            status: true,
            data: results,
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const Show = async(req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orders.findById(id)
        const orderItems = await carts.find()
                            .where('order_id', id)
                            .populate('product_id')
        res.status(200).json({
            status:true,
            order : order,
            orderItems: orderItems
        })
    } catch (error) {
        console.log(error);
        next(error)   
    }
}

/**order destroy */
const Destroy = async(req, res, next) => {
    try {
        const {id} = req.params
        const isDelete =  await orders.findByIdAndDelete(id)
        if(!isDelete){
            res.status(404).json({
                status: false,
                message : "Someting wrong"
            })
        }
        res.status(200).json({
            status:true,
            message: "Delete Successfully Done"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

/**order status */
/*status change*/
const status = async (req, res, next) => {
    try {
      const { id } = req.params
     console.log('test')
      const IsStatus = await orders.findById(id)
        console.log("asda",IsStatus)
      if (IsStatus.order_Status == false) {
        IsStatus.order_Status = true
        IsStatus.save()
        res.status(200).json({ 
          status: true,
          message: "Order Status Is Active...!",
        });
      } else {
        IsStatus.order_Status = false
        IsStatus.save();
        res.status(200).json({ 
          status: true,
          message: "Order Status Is Deactive...!",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

module.exports ={Index,Show, Destroy, status}
    
