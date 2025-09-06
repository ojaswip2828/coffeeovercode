const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

// Create task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate, assignee, project } = req.body;
    const task = new Task({ title, description, status, dueDate, assignee, project });
    await task.save();
    res.json({ message: "✅ Task created", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignee", "firstName lastName email")
      .populate("project", "name description");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
