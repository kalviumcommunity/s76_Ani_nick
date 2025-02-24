const mongoose = require("mongoose");

const nicknameSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true },
  description: { type: String, required: true },
});

// ⚠️ Ensure it fetches from "ASAP_DB.users"
const NicknameModel = mongoose.model("users", nicknameSchema, "users");

module.exports = NicknameModel;
