const {UserModel}= require("../Model/user.model")



const authorization=async(req,res,next)=>{
    const{email}=req.body
    const user=await UserModel.findOne({email:email})
    if(user.role!=="admin"){
        res.send("You are not authorized")
    }else{
        next()
    }
}


module.exports={
    authorization
}