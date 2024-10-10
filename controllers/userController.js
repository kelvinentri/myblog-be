const bcrypt = require("bcrypt");
const saltRounds = 10;
const USER = require("../models/usermodel");
const jwt =require('jsonwebtoken')

const doSignup =  (req, res, next) => {
  const { username, email, mob, password } = req.body;
  bcrypt.hash(password, saltRounds).then(function (hash) {
    USER({ name: username, email, password:hash })
      .save()
      .then((result) => {
        res.status(200).json("signup successfull"); 
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
};
const dologin = async(req, res, next) => {
const {password,email}=req.body

const userData= await USER.findOne({email:email})
if(userData){
    bcrypt.compare(password, userData.password).then(function(result) {
        if(result){
            const token =jwt.sign({name:userData.name,email:userData.email,_id:userData._id},process.env.JWT_PASSWORD,{expiresIn:"1d"})
            res.status(200).json({message:'login successful',token})
        }else{
            res.status(403).json("invalid credentials")
        }
    });
} else{
    res.status(403).json("invalid credentials")
}

};

module.exports = { doSignup, dologin };
