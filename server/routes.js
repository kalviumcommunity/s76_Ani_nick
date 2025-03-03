const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const NicknameModel = require("./models/Nickname");

const nicknameSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  character: Joi.string().min(3).max(50).required(),
  anime: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
});
router.get("/nicknames/user/:created_by", async (req, res) => {
  try {
    const nicknames = await NicknameModel.find({ created_by: req.params.created_by });

    if (nicknames.length === 0) {
      return res.status(404).json({ message: "No nicknames found for this user" });
    }

    res.status(200).json(nicknames);
  } catch (error) {
    console.error("Error fetching nicknames:", error);
    res.status(500).json({ message: "Error fetching nicknames", error: error.message });
  }
});


router.get("/nicknames", async (req, res) => {
  try {
    const nicknames = await NicknameModel.find({});
    if (nicknames.length === 0) {
      return res.status(404).json({ message: "No nicknames found" });
    }
    res.status(200).json(nicknames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nicknames", error: error.message });
  }
});

router.get("/nicknames/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const nickname = await NicknameModel.findById(req.params.id);
    if (!nickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }
    res.status(200).json(nickname);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nickname", error: error.message });
  }
});

router.post("/nicknames", async (req, res) => {
  try {
    const { nickname, character, anime, description, created_by } = req.body;

    if (!nickname || !character || !anime || !description || !created_by) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNickname = new NicknameModel({ nickname, character, anime, description, created_by });
    await newNickname.save();

    res.status(201).json({ message: "Nickname added successfully", nickname: newNickname });
  } catch (error) {
    console.error("Error adding nickname:", error);
    res.status(500).json({ message: "Error adding nickname", error: error.message });
  }
});


router.put("/nicknames/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const { error } = nicknameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation failed", errors: error.details });
    }
    const updatedNickname = await NicknameModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }
    res.status(200).json({ message: "Nickname updated successfully", nickname: updatedNickname });
  } catch (error) {
    res.status(500).json({ message: "Error updating nickname", error: error.message });
  }
});

router.delete("/nicknames/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const deletedNickname = await NicknameModel.findByIdAndDelete(req.params.id);
    if (!deletedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }
    res.status(200).json({ message: "Nickname deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nickname", error: error.message });
  }
});

module.exports = router;
