const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const NicknameModel = require("./models/Nickname");
const { verifyFirebaseToken } = require("./middleware/firebaseAdmin");

// ─── Validation schema (now actually used) ──────────────────────────────────
const nicknameSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  character: Joi.string().min(3).max(50).required(),
  anime: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
});

// ─── Public routes ───────────────────────────────────────────────────────────

// GET all nicknames
router.get("/nicknames", async (req, res) => {
  try {
    const nicknames = await NicknameModel.find({}).sort({ createdAt: -1 });
    if (nicknames.length === 0) {
      return res.status(404).json({ message: "No nicknames found" });
    }
    res.status(200).json(nicknames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nicknames", error: error.message });
  }
});

// GET nicknames by Firebase UID
router.get("/nicknames/user/:userId", async (req, res) => {
  try {
    const nicknames = await NicknameModel.find({ created_by: req.params.userId }).sort({ createdAt: -1 });
    res.json(nicknames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single nickname by MongoDB _id
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

// ─── Protected routes (require valid Firebase ID token) ──────────────────────

// POST create nickname
router.post("/nicknames", verifyFirebaseToken, async (req, res) => {
  try {
    const { error, value } = nicknameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newNickname = new NicknameModel({
      ...value,
      created_by: req.user.uid,
      created_by_name: req.user.name,
    });

    const saved = await newNickname.save();
    res.status(201).json({ message: "Nickname added successfully", nickname: saved });
  } catch (error) {
    console.error("Error adding nickname:", error);
    res.status(500).json({ message: "Error adding nickname", error: error.message });
  }
});

// PUT update nickname (owner only)
router.put("/nicknames/:id", verifyFirebaseToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existing = await NicknameModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Nickname not found" });

    // Ownership check — compare Firebase UIDs
    if (existing.created_by !== req.user.uid) {
      return res.status(403).json({ message: "You can only edit your own nicknames" });
    }

    const { error, value } = nicknameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await NicknameModel.findByIdAndUpdate(
      req.params.id,
      { ...value, created_by: existing.created_by, created_by_name: existing.created_by_name },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Nickname updated successfully", nickname: updated });
  } catch (error) {
    console.error("Error updating nickname:", error);
    res.status(500).json({ message: "Error updating nickname", error: error.message });
  }
});

// DELETE nickname (owner only)
router.delete("/nicknames/:id", verifyFirebaseToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existing = await NicknameModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Nickname not found" });

    // Ownership check
    if (existing.created_by !== req.user.uid) {
      return res.status(403).json({ message: "You can only delete your own nicknames" });
    }

    await NicknameModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Nickname deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nickname", error: error.message });
  }
});

module.exports = router;
