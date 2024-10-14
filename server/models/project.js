const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  roles: {
    type: [String], // Array of strings for roles
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'in-progress', 'completed'],
    default: 'upcoming',
  },
  projectPlanPDF: {
    type: String, // This field will store the file path or URL to the project plan PDF
    required: false, // Make it optional if the project plan PDF might not always be available
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
