// routes/hotels.js
const express = require('express');
const router = express.Router();
const pool = require('../db');


// list hotels (with optional city filter)
router.get('/', async (req, res) => {
const { city, limit = 50 } = req.query;
try {
let q = 'SELECT * FROM hotels';
const params = [];
if (city) { q += ' WHERE city = ?'; params.push(city); }
q += ' ORDER BY rating DESC LIMIT ?'; params.push(parseInt(limit));
const [rows] = await pool.query(q, params);
res.json(rows);
} catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});


module.exports = router;