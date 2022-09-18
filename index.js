const express=require("express")
const connection=require("./config/db")
const { UserModel } = require("./Model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    
    res.send("Welcome")
})

app.post("/signup",async(req,res)=>{
    let {email,password}=req.body
    let new_password=""
    bcrypt.hash(password,6).then(async(hash)=>
    {
            new_password=hash
            const user=new UserModel({email,password:new_password})
            await user.save()
            res.send("Signup successful")
        
    }).catch((err)=>{
        console.log(err)
    })
    console.log(req.body)
   

    
})

app.post("/login",async(req,res)=>{
    console.log(req.body)
    const{email,password}=req.body
    let user=await UserModel.findOne({email})
    let hash=user.password
    bcrypt.compare(password,hash,(err,result)=>{
        if(result){
            var token=jwt.sign({email:email},"secret")
            console.log(token)
            res.send({msg:"Login in Succesful",token:token})
        }else{
            res.send("Login failed")
        }
    })

//    const isValid=await UserModel.findOne({email,password:new_password})
//    if(isValid){
   
//    }else{
    
//    }
})

app.get("/dashboard",(req,res)=>{
    console.log(req.headers.authorization)
    // if(Number(req.headers.authorization.split(" ")[1])===1987){
    //     res.send("Some important data ahead...")
    // }else{
    //     res.send("Login first")
    // }
    const token=req.headers.authorization.split("  ")[1]
//     let decoded=jwt.verify(token,"Secret")
//    console.log(decoded)
    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            return res.send("Please login")
            // res.send(err)
        } 
        else{
            return res.send("Important data ahead")
        } 
    })
})

app.listen(7300,async()=>{

    try{
        await connection
        console.log("Listening on port 7300")
    }catch(err){
        console.log("Connection Failed")
        console.log(err)
    }
   
})