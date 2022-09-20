const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    email:String,
    password:String,
    age:Number,
    role:{type:String,enum:["customer","seller"],default:"Customer"}
})

//num:["customer"] it will take only these values that are passed in enum, so that are the only options, other than that it will not ake any other value.

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}