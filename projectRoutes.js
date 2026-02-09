const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { estimateCost } = require("../services/costEstimator");
const { generateDiagram } = require("../services/diagramGenerator");

router.post("/", async (req, res) => {
  try {
    const { name, projectType, numPages, features } = req.body;

    if (!name || !projectType || !numPages) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const estimatedCost = estimateCost(projectType, numPages, features || []);
    const diagram = generateDiagram({ projectType, numPages, features: features || [] });

    const project = await Project.create({
      name,
      projectType,
      numPages,
      features,
      estimatedCost,
      diagram,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
