const mongoose = require("mongoose");

const nicknameSchema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true },
  description: { type: String, required: true },
  // Firebase UID of the creator (string, not ObjectId)
  created_by: {
    type: String,
    required: true,
  },
  // Denormalised display name so we never need a join
  created_by_name: {
    type: String,
    default: "Anonymous",
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const NicknameModel = mongoose.model("Nickname", nicknameSchema);

module.exports = NicknameModel;
