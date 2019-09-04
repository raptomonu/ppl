const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"upload")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const Upload = multer({ storage: storage})
module.exports = Upload;