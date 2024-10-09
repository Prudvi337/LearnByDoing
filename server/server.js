const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const projectRoutes = require('./routes/projectRoutes');
const courseRoutes = require('./routes/courseRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/courses', courseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
