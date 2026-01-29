const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Import all your routes from the 'routes' folder
const aiRoutes = require('./aiRoutes'); 
const attractionsRoutes = require('./attractions'); 
const hotelsRoutes = require('./hotels');
const rentalsRoutes = require('./rentals');
const restaurantsRoutes = require('./restaurants');
const supportRoutes = require('./support');
const authenticationRoutes = require('./authentication');

// Middleware setup - This must come before your routes
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Use all your routes
app.use('/api', aiRoutes);
app.use('/api/attractions', attractionsRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/support', supportRoutes);
app.use('/api', authenticationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Simple health check for browser testing
app.get('/health', (req, res) => {
  res.send('Backend running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  console.log(`✅ API available at http://localhost:${port}/api`);
});