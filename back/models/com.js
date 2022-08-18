const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const comSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    com: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number },
    dislikes: { type: Number},
    usersLiked: { type: [ String ] },
    usersDisliked : { type: [ String ] }
  });

  comSchema.plugin(uniqueValidator);

module.exports = mongoose.model("com", comSchema);