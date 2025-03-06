const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

// MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


const db = pool.promise();

// Check MySQL connection
db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL (ainickusr)");
    connection.release(); // Release the connection
  })
  .catch((err) => {
    console.error("MySQL Connection Failed:", err);
    process.exit(1);
  });

// MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ASAP_DB",
    });
    console.log("Connected to MongoDB (ASAP_DB)");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDatabase, db };
