
const mongoose =require('mongoose')

const DBURI='mongodb://127.0.0.1:27017/e44Blog'
 function connectDB (){
    mongoose.connect(DBURI,{}).then((res)=>{
        console.log("connected To DB");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
 }

 module.exports=connectDB
