const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    post: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number },
    dislikes: { type: Number},
    usersLiked: { type: [ String ] },
    usersDisliked : { type: [ String ] }
  });

  postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("post", postSchema);