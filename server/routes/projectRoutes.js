const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Create a new project (with PDF upload)
router.post('/', projectController.upload, projectController.createProject);

// Update a project by ID (with PDF upload)
router.put('/:id', projectController.upload, projectController.updateProject);

// Delete a project by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;
