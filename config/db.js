const mongoose=require('mongoose')


const DBconnect=()=>{
    const mongoDB_URI='mongodb+srv://kelvingeorge:LCdKCMMpHUSXarWN@cluster0.w1n2t.mongodb.net/e42-blog'
    mongoose.connect(mongoDB_URI).then((res)=>{
        console.log('DB connection successfull');
        
    })
    .catch(err=>{
        console.log(err);
        
        console.log('db connection failed'); 
    })
}
module.exports=DBconnect