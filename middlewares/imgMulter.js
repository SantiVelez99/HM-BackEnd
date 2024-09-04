const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = 'public/assets/profile-icon/icons'
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (error, buffer) => { 
            if(error) return cb(error)
                const filename = buffer.toString('hex') + path.extname(file.originalname)
            cb(null, filename)
        })
    }
})

const imgMulter = multer({ storage: storage }).single('image')
module.exports = imgMulter