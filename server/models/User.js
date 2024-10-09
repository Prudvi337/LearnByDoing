// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  projects: [{
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    role: { type: String }
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
