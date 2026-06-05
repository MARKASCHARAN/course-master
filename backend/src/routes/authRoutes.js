const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { protect } = require("../middleware/auth");

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Register student
router.post("/register", async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password } = value;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const user = await User.create({ name, email, password, role: "student" });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// Login (student/admin)
router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// Register Admin (with secret)
router.post("/admin-register", async (req, res, next) => {
  try {
    const schema = registerSchema.keys({
      adminCode: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password, adminCode } = value;

    if (adminCode !== process.env.ADMIN_REG_CODE) {
      return res.status(403).json({ message: "Invalid admin code" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const user = await User.create({ name, email, password, role: "admin" });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// ----------------------------
// REQUEST PASSWORD RESET TOKEN
// ----------------------------
router.post("/request-reset", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.generateResetToken();
    await user.save();

    res.json({
      message: "Reset token generated",
      resetToken,
      resetUrl: `/api/auth/reset-password/${resetToken}`,
    });
  } catch (err) {
    next(err);
  }
});

// ----------------------------
// RESET PASSWORD USING TOKEN
// ----------------------------
router.post("/reset-password/:token", async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
});


// GET logged-in user
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
