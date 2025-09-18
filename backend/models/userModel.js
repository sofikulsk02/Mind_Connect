const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "therapist", "admin"],
      default: "user",
    },
    onboardingCompleted: { type: Boolean, default: false },

    // Profile Settings
    profilePicture: { type: String, default: "" },

    // Privacy Settings
    profileVisibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "private",
    },
    shareProgress: { type: Boolean, default: false },
    allowDataCollection: { type: Boolean, default: true },

    // Notification Settings
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    reminderNotifications: { type: Boolean, default: true },
    weeklyReports: { type: Boolean, default: true },

    // App Preferences
    theme: {
      type: String,
      enum: ["wellness", "matcha", "sunset", "dark"],
      default: "wellness",
    },
    language: {
      type: String,
      enum: ["English", "Spanish", "French", "German"],
      default: "English",
    },
    timeFormat: {
      type: String,
      enum: ["12h", "24h"],
      default: "12h",
    },
    startOfWeek: {
      type: String,
      enum: ["sunday", "monday"],
      default: "monday",
    },

    // Wellness Settings
    moodReminderTime: { type: String, default: "20:00" },
    journalReminderTime: { type: String, default: "21:00" },
    dailyGoals: { type: Number, default: 3, min: 1, max: 10 },

    // Security Settings
    twoFactorAuth: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
