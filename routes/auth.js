// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const router = express.Router();

// One-time admin creation (keep or delete later)
router.post("/create-admin", async (req, res) => {
  const adminExists = await Admin.findOne();
  if (adminExists) {
    return res.status(403).json({ msg: "Admin already exists" });
  }

  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await Admin.create({ email, password: hashed });
  res.json({ msg: "Admin created" });
});

// Login (NO JWT)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false });

    res.json({
      success: true,
      msg: "Login successful"
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
