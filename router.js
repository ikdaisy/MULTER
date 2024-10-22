import { Router } from "express";
import * as rh from "./requestHandler.js";
import multer from "multer"
const router=Router()

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
  })
  const upload = multer({ storage: storage })
//upload single file
// router.route("/upload").post( upload.single('pic'),fileUpload)
//upload multiple files
router.route("/upload").post( upload.single('pic'),rh.addUser)



export default router