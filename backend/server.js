require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Verify environment variables are loaded
console.log('🔑 Environment check:', {
  hasApiKey: !!process.env.API_KEY,
  apiKeyLength: process.env.API_KEY ? process.env.API_KEY.length : 0
});

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:5178',
    'http://localhost:5179',
    'http://localhost:5180'
  ],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes safely with error handling
let aiRoutes, attractionsRoutes, hotelsRoutes, rentalsRoutes, restaurantsRoutes, supportRoutes, authenticationRoutes;

try {
  aiRoutes = require('./routes/aiRoutes');
  attractionsRoutes = require('./routes/attractions');
  hotelsRoutes = require('./routes/hotels');
  rentalsRoutes = require('./routes/rentals');
  restaurantsRoutes = require('./routes/restaurants');
  supportRoutes = require('./routes/support');
  authenticationRoutes = require('./routes/authentication');
} catch (error) {
  console.error('Error loading routes:', error.message);
  process.exit(1);
}

// Use routes
try {
  // Mount AI routes at /api (so /api/ai works)
  if (aiRoutes) {
    app.use('/api', aiRoutes);
    console.log('✅ AI routes mounted at /api');
    console.log('   Test endpoint: GET /api/ai/test');
    console.log('   Main endpoint: POST /api/ai');
  } else {
    console.error('❌ AI routes failed to load');
  }
  if (typeof attractionsRoutes === 'function' || (attractionsRoutes && typeof attractionsRoutes.handle === 'function')) {
    app.use('/api/attractions', attractionsRoutes);
  }
  if (typeof hotelsRoutes === 'function' || (hotelsRoutes && typeof hotelsRoutes.handle === 'function')) {
    app.use('/api/hotels', hotelsRoutes);
  }
  if (typeof rentalsRoutes === 'function' || (rentalsRoutes && typeof rentalsRoutes.handle === 'function')) {
    app.use('/api/rentals', rentalsRoutes);
  }
  if (typeof restaurantsRoutes === 'function' || (restaurantsRoutes && typeof restaurantsRoutes.handle === 'function')) {
    app.use('/api/restaurants', restaurantsRoutes);
  }
  if (typeof supportRoutes === 'function' || (supportRoutes && typeof supportRoutes.handle === 'function')) {
    app.use('/api/support', supportRoutes);
  }
  if (typeof authenticationRoutes === 'function' || (authenticationRoutes && typeof authenticationRoutes.handle === 'function')) {
    app.use('/api/auth', authenticationRoutes);
  }
} catch (error) {
  console.error('Error setting up routes:', error.message);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
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
  console.log(`✅ Health check: http://localhost:${port}/api/health`);
});
