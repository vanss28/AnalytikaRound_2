const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: async (req,file,cb) => {
        cb(null,Date.now() + '-' + file.originalname)
    }
})


const upload = multer({
    storage:storage,
    limits: { 
        fileSize: 7 * 1024 * 1024
    },
    
})



module.exports = { upload }