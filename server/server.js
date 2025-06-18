const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./database"); // Use MongoDB
const cookieParser = require('cookie-parser'); // Add cookie-parser

const app = express();

// Set up CORS with credentials support
app.use(cors({
  origin: ['https://ani-nick.pages.dev', 'http://localhost:5173'], // Whitelist your frontend URLs
  credentials: true // Allow cookies to be sent cross-origin
}));

app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware

connectDatabase(); // Connect MongoDB
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
