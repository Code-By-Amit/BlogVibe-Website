import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url'
import fs from 'fs'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

export default upload