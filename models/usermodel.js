const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  status: {
    type: Boolean,
  default:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel =mongoose.model('users',userSchema)
module.exports=userModel
