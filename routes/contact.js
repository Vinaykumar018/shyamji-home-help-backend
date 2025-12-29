// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const { name, phone, service, message } = req.body;
  await Contact.create({ name, phone, service, message });
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
