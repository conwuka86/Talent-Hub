const express = require("express");
const { body, validationResult } = require("express-validator");
const Project = require("../models/project");

const router = express.Router();

// GET: Fetch all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// POST: Create a new project
router.post(
    "/",
    [
        body("name", "Project name is required").notEmpty(),
        body("description", "Project description is required").notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;

        try {
            const project = new Project({
                name,
                description,
                user: req.user.id,
            });

            await project.save();
            res.json(project);
        } catch (err) {
            res.status(500).send("Server error");
        }
    }
);

// PUT: Update a project
router.put("/:id", async (req, res) => {
    const { name, description } = req.body;

    const updatedProject = { name, description };

    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: "Project not found" });

        // Ensure the project belongs to the logged-in user
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        project = await Project.findByIdAndUpdate(req.params.id, updatedProject, { new: true });
        res.json(project);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// DELETE: Delete a project
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: "Project not found" });

        // Ensure the project belongs to the logged-in user
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project removed" });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;