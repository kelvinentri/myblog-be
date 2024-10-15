const USER = require("../models/usermodel");
const BOOKS = require("../models/books");
const jwt= require('jsonwebtoken')

const doSignup = (req, res, next) => {
  console.log(req.body);
  const doc = {
    name: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
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
};
const doLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await USER.findOne({ email: email });
    if (userData) {
      if (userData.password === password) {
        const token =jwt.sign({id:userData._id,name:userData.name,email:userData.email},process.env.JWT_PASS,{expiresIn:"1d"})
        res.status(200).json({ message: "Login  successfull",token:token });
      } else {
        res.status(403).json({ message: "invalid credentials" });
      }
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
