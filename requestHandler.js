import userSchema from "./models/user.model.js"

// Add user
export async function addUser(req,res){
   const profile=req.file
   console.log(req.body);
   
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
    console.log(users);
    
    res.status(200).send(users)
    
}