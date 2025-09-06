const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

// Create new project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = new Project({ 
      name, 
      description, 
      members: members || [],
      createdBy: req.user.id 
    });
    await project.save();
    res.json({ message: "✅ Project created", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "firstName lastName email")
      .populate("createdBy", "firstName lastName email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get project by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "firstName lastName email")
      .populate("createdBy", "firstName lastName email");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, members },
      { new: true }
    ).populate("members", "firstName lastName email")
     .populate("createdBy", "firstName lastName email");
    
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "✅ Project updated", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "✅ Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

