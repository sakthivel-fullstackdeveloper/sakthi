const mongoose = require('mongoose')
const Student = new mongoose.Schema({
    name:{type:String,required:true},
    rollno:{type:Number,required:true,unique:true},
    dept:{type:String,required:true},
    createdAT:{type:Date,default:Date.now()}
})
const students= mongoose.model('student',Student);
module.exports = students ;