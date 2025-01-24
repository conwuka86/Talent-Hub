const Project = require('../models/project');

module.exports = {
  create,
  index
};

async function index(req, res) {
  const projects = await Project.find({}).populate('user').sort('-createdAt');
  res.json(projects);
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Project Failed' });
  }
}