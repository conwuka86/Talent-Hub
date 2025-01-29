const mongoose = require('mongoose');
const Project = require('../models/project');
const Talent = require('../models/talent');

module.exports = {
  index,
  create,
  update,
  delete: deleteProject,
  assignTalentToProject,
  unassignTalentFromProject,
  getProjectById,
};

// Fetch all projects for the logged-in user
async function index(req, res) {
  try {
    const projects = await Project.find({ user: req.user._id }).populate('skills');
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
}

// Create a new project
async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    console.error('Error in Create:', err.message);
    res.status(400).json({ message: 'Create Project Failed', error: err.message });
  }
}

// Update an existing project
async function update(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('skills');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Update Project Failed' });
  }
}

// Delete a project
async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete Project Failed' });
  }
}

// Assign Talent to a Project
async function assignTalentToProject(req, res) {
  try {
    const { projectId, talentId } = req.params;
    const { name, skill } = req.body;  // Extract name & skill from body

    // Validate Object IDs
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(talentId)) {
      return res.status(400).json({ message: 'Invalid Project or Talent ID' });
    }

    // Fetch project and talent
    const project = await Project.findById(projectId);
    const talent = await Talent.findById(talentId);

    if (!project || !talent) {
      return res.status(404).json({ message: 'Project or Talent not found' });
    }

    // Check if the talent is already assigned
    const isAlreadyAssigned = project.skills.some((t) => t._id.toString() === talent._id.toString());
    if (isAlreadyAssigned) {
      return res.status(400).json({ message: 'Talent is already assigned to this project' });
    }

    // Assign the talent (storing both name & skill)
    project.skills.push(talentId);

    await project.save();

    // Return updated project with populated talents
    const updatedProject = await Project.findById(projectId).populate('skills');
    res.json({ project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign talent to project', error: err.message });
  }
}

// Unassign Talent from a Project
async function unassignTalentFromProject(req, res) {
  try {
    const { projectId, talentId } = req.params;

    // Validate Object IDs
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(talentId)) {
      return res.status(400).json({ message: 'Invalid Project or Talent ID' });
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { skills: { _id: talentId } } }, // Remove by ID
      { new: true }
    ).populate('skills');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unassign talent from project', error: err.message });
  }
}

// Get Project by ID with populated skills
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate('skills');
    
    if (!project || project.user.toString() !== req.user._id) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
}

