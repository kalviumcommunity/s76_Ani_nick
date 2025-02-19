const express = require("express");
const router = express.Router();
const NicknameModel = require("./models/Nickname"); // Import the model

// ✅ Get all nicknames
router.get("/nicknames", async (req, res) => {
  try {
    const nicknames = await NicknameModel.find({});
    
    if (nicknames.length === 0) {
      return res.status(404).json({ message: "No nicknames found" });
    }

    res.status(200).json(nicknames);
  } catch (error) {
    console.error("❌ Error fetching nicknames:", error);
    res.status(500).json({ message: "Error fetching nicknames", error: error.message });
  }
});

// ✅ Get a specific nickname by ID
router.get("/nicknames/:id", async (req, res) => {
  try {
    const nickname = await NicknameModel.findById(req.params.id);
    if (!nickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }
    res.status(200).json(nickname);
  } catch (error) {
    console.error("❌ Error fetching nickname:", error);
    res.status(500).json({ message: "Error fetching nickname", error: error.message });
  }
});

// ✅ Add a new nickname
router.post("/nicknames", async (req, res) => {
  try {
    const { nickname, character, anime, description } = req.body;

    if (!nickname || !character || !anime || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
    const newNickname = new NicknameModel({ nickname, character, anime, description });
    await newNickname.save();

    res.status(201).json({ message: "Nickname added successfully", nickname: newNickname });
  } catch (error) {
    console.error("❌ Error adding nickname:", error);
    res.status(500).json({ message: "Error adding nickname", error: error.message });
  }
});

// ✅ Update an existing nickname
router.put("/nicknames/:id", async (req, res) => {
  try {
    const { nickname, character, anime, description } = req.body;

    const updatedNickname = await NicknameModel.findByIdAndUpdate(
      req.params.id,
      { nickname, character, anime, description },
      { new: true, runValidators: true }
    );

    if (!updatedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }

    res.status(200).json({ message: "Nickname updated successfully", nickname: updatedNickname });
  } catch (error) {
    console.error("❌ Error updating nickname:", error);
    res.status(500).json({ message: "Error updating nickname", error: error.message });
  }
});

// ✅ Delete a nickname
router.delete("/nicknames/:id", async (req, res) => {
  try {
    const deletedNickname = await NicknameModel.findByIdAndDelete(req.params.id);
    if (!deletedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }

    res.status(200).json({ message: "Nickname deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting nickname:", error);
    res.status(500).json({ message: "Error deleting nickname", error: error.message });
  }
});

module.exports = router;
