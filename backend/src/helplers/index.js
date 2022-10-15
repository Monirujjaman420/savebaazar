const fs = require("fs")

// E-mail validator 
const isEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

// BD phone number validator 
const isPhone = phone => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i
    return regex.test(phone)
}
 
// Empty value check
const isEmpty = data => {
    return (data == null || data === '' || data.length === 0)
}
 
// Get dynamically host URL
const Host = (req) => {
    return req.protocol + '://' + req.get('host') + '/'
}
 

const FileUpload = async (data, path) => {
    try {
        const image = data

        const newName = Date.now() + '.jpg'
        uploadPath = path + newName
        const moveFile = image.mv(uploadPath)

        if (moveFile) return newName
    } catch (error) {
        if (error) return error
    }
}

// Delete file from directory
const DeleteFile = (destination, file) => {
    fs.unlink(destination + file, function (error) {
        if (error) {
            return error
        }
        return
    })
}

module.exports = { 
    isEmail, 
    isPhone, 
    isEmpty,
    Host,
    FileUpload,
    DeleteFile
}