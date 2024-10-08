
const USER=require('../models/usermodel')

const doSignup=(req,res,next)=>{
    console.log(req.body);
    const doc={name:req.body.name,email:req.body.email,password:req.body.password}
    USER(doc).save().then((result)=>{
        res.status(200).json("signup successfull")
    })
    .catch((err)=>{
        console.log(err);
        next(err)
        
    })
}

module.exports={doSignup}