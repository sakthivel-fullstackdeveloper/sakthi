require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const students = require('./Students');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log("DB connected") })
  .catch((err) => { console.log(err.message) })

app.post('/students', async (req, res) => {
  const { name, rollno, dept } = req.body;
  try {
    const check = await students.findOne({rollno:rollno});
    if (!name || !rollno || !dept) res.status(400).json({message:"All fields are required!"});
    if (check) res.status(400).json({message:"rollno already registed!"});
    const data = new students({ name, rollno, dept });
    await data.save();
    res.status(201).json({message:"students data's are registered",Data:data})
  }
  catch (err) { res.status(500).json({message:"students data are not registed",err:err.message}); }
});

app.get('/students', async (req, res) => {
  try {
    const data = await students.find();
    (!data) ? res.status(404).json({message:"no record about student's"}) :
     res.status(200).json({message:"students data's are fetched",Data:data});
  }
  catch (err) { res.status(500).json({message:"students data are not fetched",err:err.message}); }
});

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await students.findById(id);
     (!data) ? res.status(404).json({message:"Not a valid ID"}) :
     res.status(200).json({message:"student data are fetched",Data:data});
  }
  catch (err) { res.status(500).json({message:"student data are not fetched",err:err.message}); }
});

app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  const { name, rollno, dept } = req.body;
  try {
    const updated = await students.findByIdAndUpdate(id, { name, rollno, dept });
     (!updated) ? res.status(404).json({message:"not a valid Id"}) :
     res.status(200).json({message:"student data's are updated",Data:updated});
  }
  catch (err) { res.status(500).json({message:"student data are not updated",err:err.message}); }
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await students.findByIdAndDelete(id);
     (!deleted) ? res.status(404).json({message:"not a valid Id"}) :
     res.status(200).json({message:"student data's are deleted",Data:deleted});
  }
  catch (err) { res.status(500).json({message:"student data are not deleted",err:err.message}); }
})

app.listen(process.env.PORT || 3000, () => { console.log(`App is running ${process.env.PORT}`) })

