const express = require("express");
const bcrypt = require("bcryptjs");
const { pool } = require("../db");

const router = express.Router();

// Generate unique ID like RJ123456
function generateSerialNumber() {
  return `RJ${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0")}`;
}

// ===================== SIGNUP =====================
router.post("/signup", async (req, res) => {
  const { fullName, email, mobile, password } = req.body;
  console.log("Signup request:", req.body);

  if (!fullName || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // check if email already exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const serialNumber = generateSerialNumber();

    await pool.query(
      "INSERT INTO users (serial_number, full_name, email, mobile, password) VALUES (?, ?, ?, ?, ?)",
      [serialNumber, fullName, email, mobile, hashedPassword]
    );

    res.status(201).json({
      message: "User created successfully",
      serialNumber,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ===================== LOGIN =====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Remove password before sending response
    delete user.password;

    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
