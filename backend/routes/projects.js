const express = require('express');
const router = express.Router();
const projectsCtrl = require('../controllers/posts');

// All paths start with '/api/projects'

// POST /api/projects
router.project('/', projectsCtrl.create);
// GET /api/projects
router.get('/', projectsCtrl.index);

module.exports = router;