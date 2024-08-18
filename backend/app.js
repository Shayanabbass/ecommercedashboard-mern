const express= require('express');
const app=express();
const cors=require('cors')
const dbconnect= require('./db/config');
const user=require('./db/users');
const bcrypt =require('bcryptjs');

dbconnect();
app.use(express.json());
app.use(cors());
app.post('/register',async (req,res)=>{
    const{username,email,password}=req.body;
    const userExsist = await user.findOne({email});
    if(userExsist){
        return res.status(402).json({message:'User already exsisit'})
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const data=new user({
        username,
        email,
        password:hashedpassword
    });
    const result=await data.save();
    res.status(200).send(result);
  

});
app.listen(4000);
