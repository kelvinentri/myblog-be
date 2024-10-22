const USER = require("../models/usermodel");
const BOOKS = require("../models/books");
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');

const doSignup = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password,saltRounds).then((hash)=>{
    console.log(req.body.password,hash);
    const doc = {
      name: req.body.fullname,
      email: req.body.email,
      password: hash,
      mob: req.body.mob,
    };
    USER(doc)
      .save()
      .then((result) => {
        res.status(200).json("signup successfull");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  })
  .catch((err)=>{
    next(err)
  })

 
};
const doLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await USER.findOne({ email: email });
    if (userData) {
      bcrypt.compare(password,userData.password).then((match)=>{
        if(!userData.status){
          res.status(403).json({ message: "blocked user " });
          return
        }
        if (match) {
          const token =jwt.sign({id:userData._id,name:userData.name,email:userData.email},process.env.JWT_PASS,{expiresIn:"1d"})
          res.status(200).json({ message: "Login  successfull",token:token });
        } else {
          res.status(403).json({ message: "invalid credentials" });
        }
      })
  
    } else {
        res.status(403).json({message:"invalid credentials"})
    }
  } catch (error) {}
};
const getData=(req,res,next)=>{
BOOKS.find().limit(100).then((result)=>{
  res.status(200).json(result)
})
}
module.exports = { doSignup, doLogin,getData };
