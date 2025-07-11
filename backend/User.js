import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Date,default:new Date.now}
})

module.exports = mongoose.model('user',userSchema);