const mongoose = require("mongoose");
// const dotenv=require("dotenv");
// require(dotenv.config());
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ASAP_DB", // Explicitly set the database name
    });
    console.log("Connected to MongoDB (ASAP_DB)");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
