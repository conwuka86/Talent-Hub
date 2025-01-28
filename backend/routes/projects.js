const express = require('express');
const router = express.Router();
const projectsCtrl = require('../controllers/projects');

// All paths start with '/api/projects'

// POST /api/projects - Create a new project
router.post('/', projectsCtrl.create);

// GET /api/projects - Get all projects
router.get('/', projectsCtrl.index);

// GET /api/projects/:id - Get a specific project by ID (with talents)
router.get('/:id', projectsCtrl.getProjectById);

// PUT /api/projects/:id - Update a project by ID
router.put('/:id', projectsCtrl.update);

// DELETE /api/projects/:id - Delete a project by ID
router.delete('/:id', projectsCtrl.delete);

router.put('/:projectId/talents/:talentId', projectsCtrl.assignTalentToProject);

router.delete('/:projectId/talents/:talentId', projectsCtrl.unassignTalentFromProject);

module.exports = router;
