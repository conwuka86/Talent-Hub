const Project = require('../models/project');

module.exports = {
  create,
  index,
  update,
  delete: deleteProject
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

async function update(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Update Project Failed' });
  }
}

async function deleteProject(req, res) {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project Deleted Successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Delete Project Failed' });
  }
}


