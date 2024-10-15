const jwt= require("jsonwebtoken")

   const verifyUser=(req,res,next)=>{
    console.log(req.headers);
    
    const token =req.headers['authorization'].split(' ')[1]
    console.log(token);
    
    jwt.verify(token,process.env.JWT_PASS,(err,decodeToken)=>{
        console.log(decodeToken);
        if(err){
res.status(401).json({message:"unauthorized user"})
        }else{
next()
        }
    })
   }


   module.exports=verifyUser
   