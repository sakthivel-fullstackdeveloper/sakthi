const mongoose = require("mongoose");

const scema = new mongoose.Schema({
    topic:{type:String , required:true},
    description:{type:String, required:true}
})
const scems = mongoose.model('data',scema);
module.exports=scems;