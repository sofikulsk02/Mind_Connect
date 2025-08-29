const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the Gemini model
const getModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

// Chat with Gemini
exports.sendMessage = async (req, res) => {              
  try {                 
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key not configured",
      });
    }

    const model = getModel();

    // Create a mental health focused prompt
    const systemPrompt = `You are MindConnect AI, a supportive mental wellness assistant. Your role is to:

1. Provide supportive, empathetic responses
2. Offer practical mental health tips and coping strategies
3. Suggest mindfulness, breathing exercises, or journaling prompts
4. Be encouraging and positive while acknowledging struggles
5. Always remind users that you're not a replacement for professional help
6. Keep responses concise but meaningful (2-3 sentences max)
7. Focus on mental wellness, stress management, anxiety, mood tracking, and self-care
8. you can give answer in multiple chat boxes 
IMPORTANT: Never provide medical advice, diagnosis, or treatment recommendations. Always encourage seeking professional help for serious concerns.

User message: ${message}

Respond as MindConnect AI:`;

    // Generate response
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const aiMessage = response.text();

    res.status(200).json({
      success: true,
      response: aiMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Handle specific error types
    if (error.message.includes("API_KEY_INVALID")) {
      return res.status(500).json({
        success: false,
        message: "Invalid Gemini API key",
      });
    }

    if (error.message.includes("QUOTA_EXCEEDED")) {
      return res.status(429).json({
        success: false,
        message: "API quota exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Sorry, I'm having trouble connecting right now. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get chat history (placeholder for future implementation)
exports.getChatHistory = async (req, res) => {
  try {
    // This would fetch chat history from database in the future
    res.status(200).json({
      success: true,
      history: [],
      message: "Chat history feature coming soon",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat history",
    });
  }
};

// Health check for Gemini service
exports.healthCheck = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key not configured",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gemini chatbot service is ready",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gemini service unavailable",
    });
  }
};
