const Project = require('../models/project');
const Talent = require('../models/talent');

// Define the exported controller methods
module.exports = {
  index,
  create,
  update,
  delete: deleteProject,
  assignTalentToProject,
  unassignTalentFromProject,
  getProjectById,
};

// Fetch all projects
async function index(req, res) {
  try {
    const projects = await Project.find({}).populate('user').sort('-createdAt');
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
}

// Create a new project
async function create(req, res) {
  try {
    console.log('Incoming Data:', req.body);
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
    );
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

// Assign Talent to Project
async function assignTalentToProject(req, res) {
  try {
    const { projectId, talentId } = req.params;
    console.log(projectId);

    // Add the talent to the project's talents array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { skills: talentId } }, // Prevent duplicates
      { new: true }
    ).populate('skills');
    console.log(project);

    // Add the project to the talent's projects array
    const talent = await Talent.findById(talentId)
    console.log(talent);

    if (!project || !talent) {
      return res.status(404).json({ message: 'Project or Talent not found' });
    }

    res.json({ project, talent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign talent to project', error: err.message });
  }
}

// Unassign Talent from Project
async function unassignTalentFromProject(req, res) {
  try {
    const { projectId, talentId } = req.params;

    // Remove the talent from the project's talents array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { skills: talentId } }, // Remove the talent
      { new: true }
    ).populate('skills');

    // Remove the project from the talent's projects array
    const talent = await Talent.findByIdAndUpdate(
      talentId,
      { $pull: { projects: projectId } }, // Remove the project
      { new: true }
    ).populate('projects');

    if (!project || !talent) {
      return res.status(404).json({ message: 'Project or Talent not found' });
    }

    res.json({ project, talent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unassign talent from project', error: err.message });
  }
}

// Get Project by ID with Talents
async function getProjectById(req, res) {
  console.log(req.params);
  try {
    const project = await Project.findById(req.params.id).populate('skills');
    console.log(project);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
}

