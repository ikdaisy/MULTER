import { Router } from "express";
import * as rh from "./requestHandler.js";
import multer from "multer"
import path from "path"

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
router.route("/getusers").get(rh.getUsers)
//load image from server to front-end
router.route("/image/:filename").get((req,res)=>{
  const {filename}=req.params;
  return res.sendFile(path.resolve(`./uploads/${filename}`))
})

//delete user

router.route("/deleteuser/:_id").delete(rh.deleteUser)
router.route("/getuser/:_id").get(rh.getUser)



export default router