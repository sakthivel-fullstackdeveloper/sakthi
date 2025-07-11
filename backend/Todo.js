const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {type:String, required:true},
    credatedAt:{type:Date,default:Date.now()}
});

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo