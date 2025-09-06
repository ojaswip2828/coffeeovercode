const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");

// ⬇️ NEW ROUTES
const messageRoutes = require("./routes/messages");
const notificationRoutes = require("./routes/notifications");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/synergy-backend")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ⬇️ MOUNT NEW FEATURES
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "✅ Synergy Backend Running", time: new Date() });
});