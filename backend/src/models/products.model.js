const {Schema, model} = require('mongoose')

const newSchema = new Schema({
    name:{
        type:String,
        min : 3,
        trim: true,
        require: true,
    },
    image:{
        type: String,
        require:true
    },
    category_id:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type: Number,
        require:true
    },
    product_status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps:true
})

const products = model("products", newSchema)
module.exports = products