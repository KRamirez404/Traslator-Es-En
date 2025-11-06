const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/database');
const translationRoutes = require('./routes/translations');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', translationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Spanish-English Translator API' });
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
