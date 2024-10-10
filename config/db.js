
const mongoose =require('mongoose')

 function connectDB (){
    mongoose.connect(process.env.DBURI,{}).then((res)=>{
        console.log("connected To DB");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
 }

 module.exports=connectDB
