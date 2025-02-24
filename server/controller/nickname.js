const NicknameModel = require("../models/Nickname"); // Import the model

// ✅ Get all nicknames
exports.getNicknames = async (req, res) => {
  try {
    const nicknames = await Nickname.find();
    res.json(nicknames);
  } catch (err) {
    res.status(500).json({ message: "Error fetching nicknames", error: err });
  }
};

// ✅ Add a new nickname
exports.addNickname = async (req, res) => {
    try {
      const { nickname, character, anime, description } = req.body;
  
      if (!nickname || !character || !anime || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newNickname = new NicknameModel({
        nickname,
        character,
        anime,
        description,
      });
  
      await newNickname.save();
      res.status(201).json({ message: "Nickname added successfully", newNickname });
    } catch (error) {
      console.error("Error adding nickname:", error); // 🔍 Log full error details
      res.status(500).json({ message: "Error adding nickname", error: error.message });
    }
  
  
};

// ✅ Update a nickname
exports.updateNickname = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, character, anime, description } = req.body;

    const updatedNickname = await Nickname.findByIdAndUpdate(
      id,
      { nickname, character, anime, description },
      { new: true }
    );

    if (!updatedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }

    res.json({ message: "Nickname updated successfully!", updatedNickname });
  } catch (err) {
    res.status(500).json({ message: "Error updating nickname", error: err });
  }
};

// ✅ Delete a nickname
exports.deleteNickname = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNickname = await Nickname.findByIdAndDelete(id);

    if (!deletedNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }

    res.json({ message: "Nickname deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting nickname", error: err });
  }
};
