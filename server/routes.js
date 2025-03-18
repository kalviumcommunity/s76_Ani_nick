const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { getUsers } = require("./models/User");
const NicknameModel = require("./models/Nickname");

const nicknameSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  character: Joi.string().min(3).max(50).required(),
  anime: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
});


router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
      return res.status(400).json({ message: 'Username is required' });
  }

  // Set the cookie with the username
  res.cookie('username', username, {
      httpOnly: true,  // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000  // 1 day expiration
  });

  res.status(200).json({ message: 'Login successful', username });
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // Clear the username cookie
  res.clearCookie('username', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
  });

  res.status(200).json({ message: 'Logout successful' });
});


router.get("/users", async (req, res) => {
  try {
      const users = await getUsers();
      res.json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
router.get("/nicknames/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const nicknames = await NicknameModel.find({ created_by: userId });
    res.json(nicknames);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
