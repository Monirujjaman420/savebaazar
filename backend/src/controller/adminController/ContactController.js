const contacts = require('../../models/contact.model')

/**----------contact list---- */
const List = async(req, res, next) => {
    try {
        const results = await contacts.find()
        res.status(201).json({
            status: true,
            data: results
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/**------------seen unseen update --------------- */
const Status = async(req, res, next) => {
    try {
        const { id } = req.params
        const status = await contacts.findById(id)
        if(status.contactStatus == false){
            status.contactStatus = true
            status.save()

            res.status(201).json({
                status:true,
                message: "Active Successfully Update"
            })
        }else{
            status.contactStatus = false
            status.save()

            res.status(201).json({
                status:true,
                message: "InActive Successfully Update"
            }) 
        }     
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/**contact destroy */
const Destroy = async(req, res, next) => {
    try {
        const {id} = req.params
        const isDelete =  await contacts.findByIdAndDelete(id)
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

module.exports = {
    List,
    Status,
    Destroy
}