// routes/restaurants.js
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
const { cuisine, city } = req.query;
try {
let q = 'SELECT * FROM restaurants';
const params = [];
const filters = [];
if (cuisine) { filters.push('cuisine = ?'); params.push(cuisine); }
if (city) { filters.push('address LIKE ?'); params.push('%' + city + '%'); }
if (filters.length) q += ' WHERE ' + filters.join(' AND ');
const [rows] = await pool.query(q, params);
res.json(rows);
} catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});


module.exports = router;