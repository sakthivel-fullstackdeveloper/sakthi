const express =require('express');
const mongoose = require('mongoose');
const schema = require('./schema')
const app =express();
app.use(express.json());

app.get("/",(req,res)=>{res.send("<h1>hello world this is hompage</h1>")});
mongoose.connect("mongodb+srv://hemamalini2j:LruzpxavU4Mi267v@cluster0.7eh9rhn.mongodb.net/")
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log(err.message)})

app.post("/create",
  async (req,res)=>{
        const{topic,description}=  req.body;
        let db = await new schema({topic,description});
        db.save();
        res.status(201).send("ok");});
  app.get("/show",async (req,res)=>{
    const data = await schema.find();
    res.status(201).send(data);
  })

  app.put("/update/:id",async(req,res)=>{
    const id=req.params.id;
    const{topic, description}=req.body;
   try{
     const data= await schema.findByIdAndUpdate(id,{topic,description});
     (!data)? res.status(404).send("notfound"):res.status(200).send("updated");}
   catch(err){
    res.status(500).send(err.message);}});

    app.delete("/delete/:id",async(req,res)=>{
      const id=req.params.id;
      try{await schema.findByIdAndDelete(id);
      return res.status(204).send("deleted");}
      catch(err){
        return res.status(500).send(err.message);
      }

    })
app.listen(3000,()=>{console.log("app is running")});