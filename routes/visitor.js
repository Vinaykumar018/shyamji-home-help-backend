// routes/visitor.js
const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");

router.post("/track", async (req, res) => {
  await Visitor.create({
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });
  res.json({ success: true });
});

router.get("/count", async (req, res) => {
  const count = await Visitor.countDocuments();
  res.json({ count });
});

module.exports = router;
