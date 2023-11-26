const express=require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const EventModel=require('./Models/Event')
const LoginModel=require('./Models/Login')
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
app.get('/',(req,res)=>{
    EventModel.find()
    .then(events=>res.json(events))
    .catch(err=>res.json(err))
})
app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    LoginModel.findOne({email:email})

    .then(user=>{
        if(user){
            if(user.password == password){
                res.json("Success")
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{res.json("no user record founded")}
    })
    .catch(err=>res.json(err))
})
app.post('/create',(req,res)=>{
    EventModel.create(req.body)
    .then(event=>res.json(event))
    .catch(err=>res.json(err))
})
app.listen(3002,()=>{
    console.log("serve is running")
})