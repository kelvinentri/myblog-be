const mongoose=require('mongoose')


const DBconnect=()=>{
    mongoose.connect(process.env.mongoDB_URI).then((res)=>{
        console.log('DB connection successfull');
        
    })
    .catch(err=>{
        console.log(err);
        
        console.log('db connection failed'); 
    })
}
module.exports=DBconnect