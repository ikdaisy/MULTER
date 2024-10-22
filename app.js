
import express from "express"
import router from "./router.js"
import Connection from "./connection.js"
import env from "dotenv"
env.config()
const app= express()

app.use("/api",router)
app.use(express.static("client-side"))


Connection().then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server running at http://localhost:${process.env.PORT}`);
    })
    
}).catch((error)=>{
    console.log(error);
})

