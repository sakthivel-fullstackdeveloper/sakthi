const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const Todo = require('./Todo');
require('dotenv').config()

// Mongo DB Connections
mongoose.connect(process.env.MONGODB_URI).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())


// Routes
app.post('/students', async(req, res) => {
    try {
       const{title}=req.body
       const data= new Todo({title:title})
       await data.save();
       res.status(201).json({mesage:"created!",data:data})
       
    } catch (error) {
        res.status(500).json({mesage:"Error:",data:error.mesage})
    }
})

app.get('/students', async(req, res) => {
    try {
       const data= await Todo.find();
       res.status(200).json({mesage:"fetched!",data:data})
       
    } catch (error) {
        res.status(500).json({mesage:"Error:",data:error.mesage})
    }
})
app.put('/students/:id', async(req, res) => {
    try {
       const id =req.params.id;
       const{title}=req.body
       const data= await Todo.findByIdAndUpdate(id,{title:title},{new:true})
       res.status(200).json({mesage:"updated!",data:data})
    } catch (error) {
        res.status(500).json({mesage:"Error:",data:error.mesage})
    }
})
app.delete('/students/:id', async(req, res) => {
    try {
       const id =req.params.id;
       const data= await Todo.findByIdAndDelete(id);
       res.status(204).json({mesage:"Deleted!",data:data})
    } catch (error) {
        res.status(500).json({mesage:"Error:",data:error.mesage})
    }
})
// Connection
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})