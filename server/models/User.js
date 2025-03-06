const { pool } = require("../database"); // Import PostgreSQL pool

const getUsers = async () => {
  try {
    console.log("Fetching users...");
    const result = await pool.query("SELECT * FROM users"); // Corrected for PostgreSQL
    console.log("Fetched users:", result.rows); // Use `result.rows` in PostgreSQL
    return result.rows;
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    throw new Error("Failed to fetch users from database");
  }
};

module.exports = { getUsers };
