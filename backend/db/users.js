const mongoose= require('mongoose');

const Schema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:String
    },
    otpExpiration:{
        type:String
    },
    isVerified:{
        type:Boolean
    }
})
const usermodel= mongoose.model('users',Schema)
module.exports=usermodel;