const jwt = require('jsonwebtoken')

const IsUser = async (req, res, next) => {
   try {
       
        const token = await req.headers.authorization
        if (!token) return res.status(404).json({
            status: false,
            errors: { message: 'Token not found' }
        })

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, process.env.JWT_SECRET)

        if (decode.role == "user") {
            req.user = decode
            next()
        }else {
            return res.status(410).json({
                status: false,
                errors: { message: 'You have no permission to access. sss' }
            })
        }
   } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({
                    status: false,
                    errors: { message: 'Token expired' }
                })
            }
            return res.status(501).json({
                status: false,
                errors: { message: 'Unauthorized request' }
            })
        }
   }
}
module.exports = {
    IsUser,
}

