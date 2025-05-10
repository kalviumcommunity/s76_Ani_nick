const mongoose = require("mongoose");

const nicknameSchema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MongoUser',
    required: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const NicknameModel = mongoose.model("Nickname", nicknameSchema);

module.exports = NicknameModel;
