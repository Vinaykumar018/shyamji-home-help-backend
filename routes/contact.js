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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
