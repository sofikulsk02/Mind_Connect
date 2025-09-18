const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected, using demo profile data");

      // Demo profile data when DB is not connected
      return res.status(200).json({
        user: {
          id: req.user.id,
          fullName: "Demo User",
          email: "demo@example.com",
          profilePicture: "",
          profileVisibility: "private",
          shareProgress: false,
          allowDataCollection: true,
          emailNotifications: true,
          pushNotifications: true,
          reminderNotifications: true,
          weeklyReports: true,
          theme: "wellness",
          language: "English",
          timeFormat: "12h",
          startOfWeek: "monday",
          moodReminderTime: "20:00",
          journalReminderTime: "21:00",
          dailyGoals: 3,
          twoFactorAuth: false,
        },
        message: "Demo profile retrieved (DB not connected)",
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        profileVisibility: user.profileVisibility,
        shareProgress: user.shareProgress,
        allowDataCollection: user.allowDataCollection,
        emailNotifications: user.emailNotifications,
        pushNotifications: user.pushNotifications,
        reminderNotifications: user.reminderNotifications,
        weeklyReports: user.weeklyReports,
        theme: user.theme,
        language: user.language,
        timeFormat: user.timeFormat,
        startOfWeek: user.startOfWeek,
        moodReminderTime: user.moodReminderTime,
        journalReminderTime: user.journalReminderTime,
        dailyGoals: user.dailyGoals,
        twoFactorAuth: user.twoFactorAuth,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected, using demo profile update");

      return res.status(200).json({
        user: {
          id: req.user.id,
          ...updates,
        },
        message: "Demo profile updated (DB not connected)",
      });
    }

    // Remove sensitive fields that shouldn't be updated through this endpoint
    delete updates.password;
    delete updates.email; // Email changes should go through a separate verification process
    delete updates._id;
    delete updates.id;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        profileVisibility: user.profileVisibility,
        shareProgress: user.shareProgress,
        allowDataCollection: user.allowDataCollection,
        emailNotifications: user.emailNotifications,
        pushNotifications: user.pushNotifications,
        reminderNotifications: user.reminderNotifications,
        weeklyReports: user.weeklyReports,
        theme: user.theme,
        language: user.language,
        timeFormat: user.timeFormat,
        startOfWeek: user.startOfWeek,
        moodReminderTime: user.moodReminderTime,
        journalReminderTime: user.journalReminderTime,
        dailyGoals: user.dailyGoals,
        twoFactorAuth: user.twoFactorAuth,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPLOAD PROFILE PICTURE
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicturePath = `/uploads/profiles/${req.file.filename}`;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log(
        "⚠️  MongoDB not connected, using demo profile picture upload"
      );

      return res.status(200).json({
        profilePicture: profilePicturePath,
        message: "Demo profile picture uploaded (DB not connected)",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: profilePicturePath },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      profilePicture: user.profilePicture,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.error("Upload profile picture error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE PROFILE PICTURE
exports.deleteProfilePicture = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log(
        "⚠️  MongoDB not connected, using demo profile picture deletion"
      );

      return res.status(200).json({
        message: "Demo profile picture deleted (DB not connected)",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: "" },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture deleted successfully",
    });
  } catch (error) {
    console.error("Delete profile picture error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
