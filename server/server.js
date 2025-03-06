const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase, pool } = require("./database"); // Use PostgreSQL pool

const app = express();

app.use(express.json());
app.use(cors());

// Check PostgreSQL connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed:", err);
    process.exit(1);
  });

connectDatabase(); // Connect MongoDB
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
