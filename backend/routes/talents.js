const express = require('express');
const router = express.Router();
const talentsCtrl = require('../controllers/talents');

// All paths start with '/api/talents'

// POST /api/talents
router.post('/', talentsCtrl.create);

// GET /api/talents
router.get('/', talentsCtrl.index);

// PUT /api/talents/:id
router.put('/:id', talentsCtrl.update);

// DELETE /api/talents/:id
router.delete('/:id', talentsCtrl.delete);

module.exports = router;