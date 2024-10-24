import {promises as fs} from 'fs';
import userSchema from "./models/user.model.js"
import{fileURLToPath} from "url"
import { join,dirname } from "path";

// Add user
export async function addUser(req,res){
   const profile=req.file
//    console.log(req.body);
   
   const {username,email}=req.body;
  
   await userSchema
       .create({email,username,profile})
       .then(()=>{
           return res.status(201).send({msg:"Successs"})
       })
       .catch((error)=>{
           return res.status(404).send({msg:"Failed"})
       })

   
}

// Display users
export async function getUsers(req,res) {
    const users = await userSchema.find()
    // console.log(users);
    
    res.status(200).send(users)
    
}

// Delete user
export async function deleteUser(req,res) {
   try{
    const {_id}=req.params
    const user = await userSchema.findOne({_id})
    // console.log(user);
    
    if(!user)
        return res.status(500).send({msg:"User is unavailable"})
    const __filename=fileURLToPath(import.meta.url)
    const __dirname=dirname(__filename)
    const fullpath=join(__dirname,"/uploads/",user.profile.filename)
    //delete the image from the server
    await fs.unlink(fullpath)
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send({msg:"Successfully deleted"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })
    
    

   }
   catch(error){
    console.log(error);
    
   }
    
    
}

//get single user data

export async function getUser(req,res) {
   try {
    const {_id}=req.params
    const data= await userSchema.findOne({_id})
    res.status(200).send(data)
   } catch (error) {
    res.status(404).send({msg:"Failed"})
   }
}

// Update user  data

export async function updateUser(req,res) {
    // console.log(req.params);
    const {_id}=req.params
    // console.log(_id);
    const profile=req.file
    // console.log(req.body);
   const {username,email}=req.body;
   const user = await userSchema.findOne({_id})
   if(!user)
       return res.status(500).send({msg:"User is unavailable"})
  
    const __filename=fileURLToPath(import.meta.url)
    const __dirname=dirname(__filename)
    const fullpath=join(__dirname,"/uploads/",user.profile.filename)
    //delete the image only if the user has chosen the file
  if(profile)
    await fs.unlink(fullpath)

    await userSchema.updateOne({_id},{$set:{username,email,profile}}).then(()=>{
    res.status(200).send({msg:"Successfully updated"})
}).catch((error)=>{
    res.status(404).send({error:error})
})
  



    
}