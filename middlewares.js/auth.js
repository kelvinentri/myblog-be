const jwt = require("jsonwebtoken");


const verifyUser=(req,res,next)=>{
const token =req.headers['authorization'].split(' ')[1]
jwt.verify(token,process.env.JWT_PASSWORD,(err,decodedToken)=>{
    if(decodedToken){
    req.userId=decodedToken._id
        next()
    }else{
        res.status(401).json({message:"unauthorised user"})
    }
})

}

module.exports=verifyUser