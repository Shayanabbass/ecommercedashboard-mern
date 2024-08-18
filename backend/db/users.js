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
    }
})
const usermodel= mongoose.model('users',Schema)
module.exports=usermodel;