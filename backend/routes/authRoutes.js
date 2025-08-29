const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); //^ have to use for protected routes
const roleMiddleware = require("../middlewares/roleMiddleware"); //^ will have to use this role based middleware

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
