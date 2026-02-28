const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./database");

const app = express();

// Auth is now handled via Firebase ID tokens in the Authorization header —
// no cookies needed, so credentials: true is no longer required.
app.use(cors({
  origin: ['https://ani-nick.pages.dev', 'http://localhost:5173'],
}));

app.use(express.json());

connectDatabase(); // Connect MongoDB
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
