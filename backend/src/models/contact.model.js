const {Schema, model} = require('mongoose')

/**filed create */
const newSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    contactStatus: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

/**database name create */
const contact = model("contacts", newSchema)
module.exports = contact