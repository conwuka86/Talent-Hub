const Talent = require('../models/talent');

module.exports = {
  create,
  index,
  update,
  delete: deleteTalent,
};

async function index(req, res) {
  try {
    const talents = await Talent.find({}).populate('user').sort('-createdAt');
    res.json(talents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fetching talents failed' });
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id; // Assign user ID from request
    const talent = await Talent.create(req.body);
    res.json(talent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Create Talent Failed' });
  }
}

async function update(req, res) {
  try {
    const talent = await Talent.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
    });
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }
    res.json(talent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Update Talent Failed' });
  }
}

async function deleteTalent(req, res) {
  try {
    const talent = await Talent.findByIdAndDelete(req.params.id);
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }
    res.json({ message: 'Talent deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete Talent Failed' });
  }
}