

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authMiddleware = require('../middleware/auth');

// // REGISTER
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.json({ message: "Registered Successfully", userId: user._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "MY_SECRET_KEY",
//       { expiresIn: "7d" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET CURRENT LOGGED-IN USER
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password'); // exclude password
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;





const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({ message: "Registered Successfully", userId: user._id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET LOGGED-IN USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
