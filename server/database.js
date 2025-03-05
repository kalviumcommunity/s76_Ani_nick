const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

// MySQL connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "222007",
  database: "ainickusr",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
