const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET all projects
router.get('/', projectController.getAllProjects);

// POST a new project
router.post('/', projectController.createProject);

// PUT to update a project by ID
router.put('/:id', projectController.updateProject);

// DELETE a project by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;
