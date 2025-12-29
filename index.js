const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ================= ROUTES ================= */
app.use("/api/contact", require("./routes/contact"));
app.use("/api/visitor", require("./routes/visitor"));
app.use("/api/admin", require("./routes/auth"));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
