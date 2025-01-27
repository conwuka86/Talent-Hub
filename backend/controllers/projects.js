const Project = require('../models/project');

module.exports = {
  index,
  create,
  update,
  delete: deleteProject,
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
    console.log('Incoming Data:', req.body); // Log the request body
    req.body.user = req.user._id; // Ensure user ID is added
    const project = await Project.create(req.body); // Create project
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
      req.body, // Contains the updated project data
      { new: true } // Return the updated project
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



