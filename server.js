// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic test route – this should always respond
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Project routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
