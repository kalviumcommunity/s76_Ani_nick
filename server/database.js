const { Pool } = require("pg");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});

// Check PostgreSQL connection
pool.connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed:", err);
    process.exit(1);
  });

// MongoDB Connection
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ASAP_DB",
    });
    console.log("✅ Connected to MongoDB (ASAP_DB)");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDatabase, pool };
