const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase,db } = require("./database");
const app = express();

app.use(express.json());
app.use(cors());
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL!");
        connection.release();
    }
});

connectDatabase();
app.use("/api", require("./routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
