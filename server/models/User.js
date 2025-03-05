const { db } = require("../database");

const getUsers = async () => {
    try {
      console.log("Fetching users...");
      const [users] = await db.query("SELECT * FROM users"); 
      console.log("Fetched users:", users);
      return users;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      throw new Error("Failed to fetch users from database");
    }
  };
  

module.exports = { getUsers };
