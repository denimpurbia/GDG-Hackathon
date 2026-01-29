// routes/rentals.js
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
const { type } = req.query; // car or bike
try {
let q = 'SELECT * FROM rentals';
const params = [];
if (type) { q += ' WHERE type = ?'; params.push(type); }
const [rows] = await pool.query(q, params);
res.json(rows);
} catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Booking validation endpoint
router.post('/validate-booking', (req, res) => {
  const { vehicleId, vehicleName, vehicleBrand, vehicleModel, pickupDate, dropoffDate, pickupTime, dropoffTime } = req.body;
  
  const errors = [];
  
  // Validate required fields
  if (!vehicleId) errors.push('Vehicle ID is required');
  if (!vehicleName) errors.push('Vehicle name is required');
  if (!pickupDate) errors.push('Pickup date is required');
  if (!dropoffDate) errors.push('Drop-off date is required');
  
  // Date validation
  if (pickupDate && dropoffDate) {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if pickup is in the past
    if (pickup < today) {
      errors.push('Pickup date cannot be in the past');
    }
    
    // Check if dropoff is before or same as pickup
    if (dropoff <= pickup) {
      errors.push('Drop-off date must be after pickup date');
    }
    
    // Check maximum booking duration (e.g., 30 days)
    const diffTime = Math.abs(dropoff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      errors.push('Maximum booking duration is 30 days');
    }
  }
  
  // Vehicle name-brand consistency check
  if (vehicleBrand && vehicleModel && vehicleName) {
    const nameLower = vehicleName.toLowerCase();
    const brandLower = vehicleBrand.toLowerCase();
    const modelLower = vehicleModel.toLowerCase();
    
    // Verify brand or model appears in the name
    if (!nameLower.includes(brandLower) && !nameLower.includes(modelLower)) {
      errors.push(`Vehicle name "${vehicleName}" does not match brand "${vehicleBrand}" or model "${vehicleModel}"`);
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      valid: false, 
      errors 
    });
  }
  
  res.json({ 
    valid: true, 
    message: 'Booking details are valid',
    bookingDays: Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))
  });
});


module.exports = router;