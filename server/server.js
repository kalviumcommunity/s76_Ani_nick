const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./database"); // Only connectDatabase is needed
// const router = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDatabase();
// Use Routes
app.use("/api", require("./routes"));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
