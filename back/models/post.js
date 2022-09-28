const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    likes: { type: Number },
    dislikes: { type: Number},
    usersLiked: { type: [ String ] },
    usersDisliked : { type: [ String ] }
  });

  postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("post", postSchema);