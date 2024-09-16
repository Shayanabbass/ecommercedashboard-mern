const express= require('express');
const app=express();
const cors=require('cors')
const dbconnect= require('./db/config');
const user=require('./db/users');
const product=require('./db/product')
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken')
const sendmail=require('./emailservice');
const ottGenerator=require('otp-generator');
const mongoose=require('mongoose')
dbconnect();
app.use(express.json());
app.use(cors());
app.post('/register',async (req,res)=>{
    const{username,email,password}=req.body;
    const userExsist = await user.findOne({email});
    if(userExsist){
        return res.status(402).json({message:'User already exsisit'})
    }
    const otp =ottGenerator.generate(6,{digits:true , lowerCaseAlphabets:true , upperCaseAlphabets:false , specialChars:true});
    const otpExpiration = Date.now() + 10 * 60 * 1000;
   
    const data=new user({
        username,
        email,
        password,
        otp,
        otpExpiration,
        isVerified:false
    });
    const subject = 'Your OTP for Registration';
    const text = `Hello ${username},\n\nYour OTP for registration is: ${otp}\n\nPlease enter this OTP to complete your registration.\n\nBest regards,\nYour Company`;
    await sendmail(email,subject,text);
    let result=await data.save();
    result=result.toObject();
    delete result.password;
    res.status(200).send(result);
  

});
app.post('/login', async (req,res)=>{
    
    try {
    const{email,password}=req.body;
    const userexsist=await user.findOne({email});

    if(!userexsist){
        return res.status(400).json({message:'User Not Exsist'});
    }

    const isMatch=await bcrypt.compare(password,userexsist.password);
    if(!isMatch){
        return res.status(401).json({message:'Password Not Match'});
    }

    const token=jwt.sign({userId:userexsist._id},'AUTHFORM',{expiresIn:'1h'});
    const{password: _, ...userWithoutSensitiveInfo}=userexsist.toObject();
    res.status(200).json([{message:'User Logged In Successfully'},{user:userWithoutSensitiveInfo},{token}]);

        
    } catch (error) {
        return res.status(500).json({message:'Sever Error'});
        
    }

    

})

app.post('/verifyotp',async (req,res)=>{
    const{email,password,otp}=req.body;
    const exsistingUser=await user.findOne({email});
    if(!exsistingUser){
        return res.status(400).json({message:"User Not Found"});
    }
   
    
    if (exsistingUser.otp !== otp ) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    exsistingUser.password = hashedPassword;
    exsistingUser.isVerified = true; 
    exsistingUser.otp = undefined; 
    exsistingUser.otpExpiration = undefined;

    let result= await exsistingUser.save();
    
    res.status(200).send(result);
    const subject = 'Registration Successful';

    const text = `Hello ${exsistingUser.username},\n\nYou have successfully registered with us.\n\nBest regards,\nYour Company`;
    await sendmail(email,subject,text);


});
app.post('/add-product', async (req,res)=>{
    try {
        const data=new product(req.body);
        const result= await data.save();
        res.status(200).send(result)
        
    } catch (error) {
        res.send(error);
        
    }
   


})
app.get('/showproducts',async (req,res)=>{
    try {
        let result= await product.find();
        res.json(result)
        
    } catch (error) {
        res.json(error);
    }
});
app.delete('/deleteproduct/:_id', async (req, res) => {
    try {
         // Get the product ID from the URL
         const objectId = new mongoose.Types.ObjectId(req.params._id);

         // Find product by ID and delete it
         const result = await product.deleteOne({ _id: objectId });

         if (result.deletedCount > 0) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put('/updateproduct/:_id', async (req, res) => {
    try {
        // Get the product ID from the URL
        const objectId = new mongoose.Types.ObjectId(req.params._id);
        console.log(objectId);
        

        // Update the product with the new data
        const result = await product.updateOne(
            { _id: objectId },
            { $set: req.body } // Set the new values from the request body
        );

        if (result.modifiedCount> 0) {
            res.status(200).json({ message: "Product updated successfully",result });
        } else {
            res.status(404).json({ message: "Product not found or no changes made",result });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.listen(4000);
