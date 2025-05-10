const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { getUsers } = require("./models/User");
const NicknameModel = require("./models/Nickname");
const MongoUser = require("./models/MongoUser");

const nicknameSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  character: Joi.string().min(3).max(50).required(),
  anime: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
});

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await MongoUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Create new user
    const newUser = new MongoUser({
      username,
      email,
      password
    });

    await newUser.save();

    // Set cookie
    res.cookie('username', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ 
      message: 'Signup successful', 
      username 
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await MongoUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Set cookie
    res.cookie('username', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful', username });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
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
    const userId = req.params.userId;
    
    // Check if the ID is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    // Populate created_by with username
    const nicknames = await NicknameModel.find({ created_by: userId }).populate("created_by", "username");
    res.json(nicknames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/nicknames", async (req, res) => {
  try {
    // Populate created_by with username and createdAt
    const nicknames = await NicknameModel.find({}).populate("created_by", "username");
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

// Update the POST /nicknames route to better handle authorization
router.post("/nicknames", async (req, res) => {
  try {
    console.log("Received nickname creation request:", req.body);
    console.log("Headers:", req.headers);
    
    const { nickname, character, anime, description } = req.body;
    
    // Check required fields first
    if (!nickname || !character || !anime || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Get username from authorization header
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const username = authHeader.split(' ')[1];
    console.log("Extracted username:", username);
    
    if (!username) {
      return res.status(401).json({ message: "Invalid authentication credentials" });
    }
    
    // Find the user by username
    const user = await MongoUser.findOne({ username });
    console.log("Found user:", user ? "Yes" : "No");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save nickname with user ID
    const newNickname = new NicknameModel({ 
      nickname, 
      character, 
      anime, 
      description, 
      created_by: user._id  // Set the user ID as created_by
    });
    
    const savedNickname = await newNickname.save();
    console.log("Nickname saved successfully:", savedNickname._id);

    res.status(201).json({ 
      message: "Nickname added successfully", 
      nickname: savedNickname 
    });
  } catch (error) {
    console.error("Error adding nickname:", error);
    res.status(500).json({ message: "Error adding nickname", error: error.message });
  }
});

// Update the PUT endpoint to handle authentication and check created_by

router.put("/nicknames/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    console.log("Received update request with data:", req.body);
    
    // Get the nickname first to check ownership
    const existingNickname = await NicknameModel.findById(req.params.id);
    if (!existingNickname) {
      return res.status(404).json({ message: "Nickname not found" });
    }
    
    // Get username from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const username = authHeader.split(' ')[1];
    
    if (!username) {
      return res.status(401).json({ message: "Invalid authentication credentials" });
    }
    
    // Find the user by username
    const user = await MongoUser.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if all required fields are provided
    const { nickname, character, anime, description } = req.body;
    if (!nickname || !character || !anime || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check field lengths instead of using Joi
    if (nickname.length < 3 || nickname.length > 50) {
      return res.status(400).json({ message: "Nickname must be between 3 and 50 characters" });
    }
    
    if (character.length < 3 || character.length > 50) {
      return res.status(400).json({ message: "Character name must be between 3 and 50 characters" });
    }
    
    if (anime.length < 3 || anime.length > 100) {
      return res.status(400).json({ message: "Anime name must be between 3 and 100 characters" });
    }
    
    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({ message: "Description must be between 10 and 500 characters" });
    }
    
    // Update the nickname
    const updatedNickname = await NicknameModel.findByIdAndUpdate(
      req.params.id,
      {
        nickname,
        character,
        anime,
        description,
        // Keep the original created_by
        created_by: existingNickname.created_by
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ message: "Nickname updated successfully", nickname: updatedNickname });
  } catch (error) {
    console.error("Error updating nickname:", error);
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
