const contacts = require('../../models/contact.model')

/**----------store------ */
const Store = async(req, res, next) => {
    try {
        const { name, email, subject, message }= req.body

        const newContact = new contacts({
            name,email,subject,message
        })
        await newContact.save()

        res.status(201).json({
            status: true,
            message: "Contact Created Successfully"
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = {
    Store
}