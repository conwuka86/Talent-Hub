const Project = require('../models/project');

module.exports = {
  create,
  index,
  update,
  delete: deleteProject,
};

async function index(req, res) {
  try {
    const projects = await Project.find({}).populate('user').sort('-createdAt');
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fetching projects failed' });
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id; // Assign user ID from request
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Create Project Failed' });
  }
}

async function update(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Update Project Failed' });
  }
}

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


