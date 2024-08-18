const mongoose= require('mongoose');
const url='mongodb://localhost:27017/Ecommrce';


const result=async ()=>{
    try {
        await mongoose.connect(url)
        console.log('Databaseconnected');
        
    }
        
     catch (error) {
        console.log(error);
        
        
    }
}
module.exports=result