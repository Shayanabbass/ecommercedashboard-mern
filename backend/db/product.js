const mongoose= require('mongoose');

const Product=new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    },
    company:{
        type:String
    },
    Added_by:{
        type:String
    },
    
    user_id:{
        type:String
    }
})
const productmodel= mongoose.model('products',Product)
module.exports=productmodel;