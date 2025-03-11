const express = require("express");
const router = express.Router();
const { register, login, logoutUser, profile } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

// Public routes
router.post("/register",register);
router.post("/login", login);
router.post("/logout", logoutUser);

// Protected route
router.get("/profile", authMiddleware, profile);

module.exports = router;