const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, default: "Anonymous" },
  text: { type: String, required: true, maxlength: 300 },
}, { timestamps: true });

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
  // Array of Firebase UIDs who liked this nickname
  likes: {
    type: [String],
    default: [],
  },
  // Embedded comments
  comments: {
    type: [commentSchema],
    default: [],
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const NicknameModel = mongoose.model("Nickname", nicknameSchema);

module.exports = NicknameModel;
