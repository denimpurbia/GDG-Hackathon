// routes/attractions.js
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
const { royal, city } = req.query; // royal=true to filter royal attractions
try {
let q = 'SELECT * FROM attractions';
const params = [];
const filters = [];
if (royal === 'true') { filters.push('is_royal = 1'); }
if (city) { filters.push('city = ?'); params.push(city); }
if (filters.length) q += ' WHERE ' + filters.join(' AND ');
const [rows] = await pool.query(q, params);
res.json(rows);
} catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});


module.exports = router;