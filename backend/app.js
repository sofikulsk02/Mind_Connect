require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const onboardingRoutes = require("./routes/onbordingRoutes");
const authRoutes = require("./routes/authRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const journalRoutes = require("./routes/journalRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route mounting
app.use("/api/auth", authRoutes);
app.use("/api/user/onboarding", onboardingRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/profile", profileRoutes);
// Start server regardless of database connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Connect to MongoDB (optional for chatbot testing)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err.message);
    console.log(
      "⚠️  Server running without database (chatbot will still work)"
    );
  });
