const {Schema, model, mongoose } = require('mongoose')


const newSchema = new Schema({
    product_id:{
        type: mongoose.Types.ObjectId,
        ref: "products",
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        require: false,
        default: null
    },
    quantity:{
        type:Number,
        require: true,
        default: 1
    },
    cart_Status:{
        type:Boolean,
        default: true
    }
},{
    timestamps:true
})

const carts = model('carts', newSchema)
module.exports = carts

