const express = require('express');
const { default: mongoose } = require('mongoose');
const Todo = require('./Todo');
const router = express.Router();
router.get('/fetched', (req, res) => {

try {
   const data= await Todo.find();
   res.status(200).json({message:"data fetched",data:data}) 
} catch (error) {
    
}
});