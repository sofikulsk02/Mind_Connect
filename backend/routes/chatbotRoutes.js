const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getChatHistory,
  healthCheck,
} = require("../controllers/chatbotGeminiController");

// Health check endpoint (no auth required)
router.get("/health", healthCheck);

// Test endpoint (no auth required) - for testing Gemini API
router.post("/test", async (req, res) => {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      "Hello! Just say 'Hello back' to test the API"
    );
    const response = await result.response;

    res.status(200).json({
      success: true,
      response: response.text(),
      message: "Gemini API test successful",
    });
  } catch (error) {
    console.error("Gemini Test Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Send message to Gemini (protected route)
router.post("/message", authMiddleware, sendMessage);

// Get chat history (protected route) - for future implementation
router.get("/history", authMiddleware, getChatHistory);

module.exports = router;
