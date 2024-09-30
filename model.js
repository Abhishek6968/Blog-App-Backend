const mongoose = require("mongoose");

const schema = mongoose.Schema({
  author: {
    type: String,
    required: true, // Make author field mandatory
  },
  content: {
    type: String,
    required: true, // Make content field mandatory
  },
  category: {
    type: String,
    required: true, // Make category field mandatory
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation time
  }
});

const postModel = mongoose.model('Post', schema);
module.exports = postModel;