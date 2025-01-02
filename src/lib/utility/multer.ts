import multer from "multer"
import { v4 } from "uuid"
import path from "path"


const getMulterStorage = (address: string) => {
    return multer.diskStorage({
        destination: (req, file, cd) => {
            const path = `./uploads/${address}`
            cd(null, path)
        },
        filename: (req, file, cb) => {
            const ext = path.parse(file.originalname).ext
            const newName = v4() + ext
            cb(null, newName)
        }
    })
}
const targetUploader=(address:string)=>{
    const storage = getMulterStorage(address);
    return multer({storage}) 
}
 export default targetUploader