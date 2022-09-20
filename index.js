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
const authentication=(req,res,next)=>{
    if(req.headers.authorization){
        return res.send("Please login")
    }
        const token=req.headers?.authorization?.split(" ")[1]
        jwt.verify(token,"secret",(err,decoded)=>{
            if(err){
                return res.send("Please login")
                // res.send(err)
            } 
            else{
                req.body.email=decoded.email
                next()
            } 
        })
    
   
}

const authorization=async(req,res,next)=>{
    const{email}=req.body
    const user=await UserModel.findOne({email:email})
    if(user.role!=="admin"){
        res.send("You are not authorized")
    }else{
        next()
    }
}

app.post("/signup",async(req,res)=>{
    //we are not taking role here for validation,as role by 
    //default should be customer.
    let {email,password}=req.body
    let new_password=""
    bcrypt.hash(password,6).then(async(hash)=>
    {
            new_password=hash
            const user=new UserModel({email,password:new_password,role})
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
            res.send({msg:"Login Succesful",token:token})
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
    const token=req.headers?.authorization?.split("  ")[1]
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
app.get("/products",authentication,(req,res)=>{
    res.send("The Products")
})
app.post("/products/create",authentication,authorization,async(req,res)=>{
    const {email}=req.body
    const user=await UserModel.findOne({email:email})
    if(user.email==="admin"){
        res.send("Product created")
    }else{
        res.send("You are not authorized")
    }

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