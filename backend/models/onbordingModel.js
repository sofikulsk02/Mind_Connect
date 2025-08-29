const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Info
    dob: String,
    gender: String,
    country: String,
    language: [String],

    // Background
    occupation: String,
    relationshipStatus: String,
    livingSituation: String,

    // Wellness & Goals
    moodRating: Number, // 1–5
    reasonsForJoining: [String],
    mentalHealthGoals: [String],

    // Lifestyle
    routineFrequency: String,
    preferredSupport: [String],

    // Accessibility
    accessibilityNeeds: [String],
    preferredNotificationMethod: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Onboarding", onboardingSchema);
