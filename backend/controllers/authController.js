const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if MongoDB is connected
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected, using demo registration");

      // Demo registration - works without database
      const token = jwt.sign(
        { id: "demo-user-id", role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        token,
        user: {
          id: "demo-user-id",
          email: email,
          fullName: fullName,
          role: "user",
        },
        message: "Demo registration successful (DB not connected)",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "user", // default
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if MongoDB is connected
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected, using demo login");

      // Demo login - works without database
      if (email === "demo@demo.com" && password === "demo123") {
        const token = jwt.sign(
          { id: "demo-user-id", role: "user" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(200).json({
          token,
          user: {
            id: "demo-user-id",
            email: "demo@demo.com",
            fullName: "Demo User",
            role: "user",
          },
          message: "Demo login successful (DB not connected)",
        });
      } else {
        return res.status(400).json({
          message: "Demo mode: Use email: demo@demo.com, password: demo123",
        });
      }
    }

    // Normal login with database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
