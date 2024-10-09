// routes/courseRoutes.js
const express = require('express');
const {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');

const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Create a new course
router.post('/', createCourse);

// Get a single course by ID
router.get('/:id', getCourseById);

// Update a course
router.patch('/:id', updateCourse);

// Delete a course
router.delete('/:id', deleteCourse);

module.exports = router;
