const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send("Please login")
    }
        const token=req.headers?.authorization?.split(" ")[1]
        jwt.verify(token,"secret",(err,decoded)=>{
            if(err){
                return res.send("Please login")
            } 
            else{
                req.body.email=decoded.email
                next()
            } 
        })
    
   
}


module.exports={
    authentication
}