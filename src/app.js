const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const profileRoutes = require('./routes/profileRoutes');
const setupSwagger = require('./swagger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors()); // Enable CORS (can add specific options for security)
app.use(express.json()); // Parse JSON requests

// Database connection
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file.');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Keluar jika koneksi gagal
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/profile', profileRoutes);

// Swagger setup
setupSwagger(app);

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
