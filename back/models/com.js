const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const comSchema = mongoose.Schema({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    text: { type: String, required: false },
    imageUrl: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: [ String ] },
    usersDisliked: { type: [ String ] }
});

comSchema.plugin(uniqueValidator);

module.exports = mongoose.model("com", comSchema);