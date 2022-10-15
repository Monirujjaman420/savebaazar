const {Schema, model, mongoose } = require('mongoose')

const newSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    email: {
        type: String,
        require: true
    },
    f_name:{
        type: String,
        require: true
    },

    l_name:{
        type: String,
        require: false,
    },

    location: {
        type: String,
        require: true
    },

    location2: {
        type: String,
        require: true
    },

    postCode: {
        type: String,
        require: true
    },
    
    phone: {
        type: Number,
        require: true
    },
    
    payment_type: {
        type: String,
        require: true,
        trim: true,
    },

    
    transection_id: {
        type: String,
        require: true
    },

    payment_number: {
        type: String,
        require: true
    },

    note: {
        type: String,
        require: true
    },
    
    order_Status:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
})

const orders = model('orders', newSchema)
module.exports = orders

