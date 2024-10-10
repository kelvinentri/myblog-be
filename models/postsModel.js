const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  cretatedAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    req: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
  },
  imagePath: {
    type: String,
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
