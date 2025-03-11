const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("tokenKey", token, { httpOnly: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout User
exports.logoutUser = (req, res) => {
    res.clearCookie("tokenKey");
    res.json({ message: "Logged out successfully" });
  };


// Protected profile
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
