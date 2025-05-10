const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./database"); // Use PostgreSQL pool

const app = express();

app.use(express.json());
app.use(cors());

connectDatabase(); // Connect MongoDB
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
