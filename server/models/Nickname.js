const mongoose = require("mongoose");

const nicknameSchema = new mongoose.Schema({
  nickname: { type: String,unique: true, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: Number, required: true }
  
});


const NicknameModel = mongoose.model("users", nicknameSchema, "users");

module.exports = NicknameModel;
