client/src/pages/ProjectsPage.js// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const projectRoutes = require('./routes/projectRoutes');
require('dotenv').config();
// const userRoutes = require('./routes/user');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Routes
app.use('/api/projects', projectRoutes);
// app.use('/api/user', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
