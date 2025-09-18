import React, { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from "../../utils/profileAPI";

const Settings = ({ onLogout }) => {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: "",
    email: "",
    profilePicture: "",

    // Privacy Settings
    profileVisibility: "private",
    shareProgress: false,
    allowDataCollection: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    reminderNotifications: true,
    weeklyReports: true,

    // App Preferences
    theme: "wellness",
    language: "English",
    timeFormat: "12h",
    startOfWeek: "monday",

    // Wellness Settings
    moodReminderTime: "20:00",
    journalReminderTime: "21:00",
    dailyGoals: 3,

    // Data & Security
    twoFactorAuth: false,
    dataExport: false,
    accountDeactivation: false,
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setSaving(true);
      const response = await uploadProfilePicture(file);

      if (response.profilePicture) {
        setSettings((prev) => ({
          ...prev,
          profilePicture: response.profilePicture,
        }));
        alert("Profile picture uploaded successfully!");
      }
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();

      if (response.user) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          name: response.user.fullName || "",
          email: response.user.email || "",
          profilePicture: response.user.profilePicture || "",
          profileVisibility: response.user.profileVisibility || "private",
          shareProgress: response.user.shareProgress || false,
          allowDataCollection:
            response.user.allowDataCollection !== undefined
              ? response.user.allowDataCollection
              : true,
          emailNotifications:
            response.user.emailNotifications !== undefined
              ? response.user.emailNotifications
              : true,
          pushNotifications:
            response.user.pushNotifications !== undefined
              ? response.user.pushNotifications
              : true,
          reminderNotifications:
            response.user.reminderNotifications !== undefined
              ? response.user.reminderNotifications
              : true,
          weeklyReports:
            response.user.weeklyReports !== undefined
              ? response.user.weeklyReports
              : true,
          theme: response.user.theme || "wellness",
          language: response.user.language || "English",
          timeFormat: response.user.timeFormat || "12h",
          startOfWeek: response.user.startOfWeek || "monday",
          moodReminderTime: response.user.moodReminderTime || "20:00",
          journalReminderTime: response.user.journalReminderTime || "21:00",
          dailyGoals: response.user.dailyGoals || 3,
          twoFactorAuth: response.user.twoFactorAuth || false,
        }));
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
      // Keep default values if loading fails
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Prepare data for backend (exclude email from updates for security)
      const updateData = {
        fullName: settings.name,
        profileVisibility: settings.profileVisibility,
        shareProgress: settings.shareProgress,
        allowDataCollection: settings.allowDataCollection,
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        reminderNotifications: settings.reminderNotifications,
        weeklyReports: settings.weeklyReports,
        theme: settings.theme,
        language: settings.language,
        timeFormat: settings.timeFormat,
        startOfWeek: settings.startOfWeek,
        moodReminderTime: settings.moodReminderTime,
        journalReminderTime: settings.journalReminderTime,
        dailyGoals: settings.dailyGoals,
        twoFactorAuth: settings.twoFactorAuth,
      };

      await updateUserProfile(updateData);
      setUnsavedChanges(false);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      const defaultSettings = {
        name: "John Doe",
        email: "john.doe@email.com",
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
        dataExport: false,
        accountDeactivation: false,
      };
      setSettings(defaultSettings);
      setUnsavedChanges(true);
    }
  };

  const sections = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "wellness", name: "Wellness", icon: "🧘" },
    { id: "security", name: "Data & Security", icon: "🛡️" },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        Profile Information
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Full Name
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => handleSettingChange("name", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={settings.email}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            style={{ borderColor: "var(--light-blue)" }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Email cannot be changed from here. Contact support for email
            changes.
          </p>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl overflow-hidden">
              {settings.profilePicture ? (
                <img
                  src={`http://localhost:3000${settings.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
              <label
                htmlFor="profilePictureInput"
                className={`px-4 py-2 rounded-lg text-white cursor-pointer text-center ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                {saving ? "Uploading..." : "Upload Photo"}
              </label>
              {settings.profilePicture && (
                <button
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, profilePicture: "" }))
                  }
                  className="px-4 py-2 rounded-lg border text-red-600 border-red-300 hover:bg-red-50"
                  disabled={saving}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommended: Square image, max 5MB
          </p>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        Privacy Settings
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium" style={{ color: "var(--text-dark)" }}>
              Profile Visibility
            </h4>
            <p className="text-sm" style={{ color: "var(--text-gray)" }}>
              Control who can see your profile
            </p>
          </div>
          <select
            value={settings.profileVisibility}
            onChange={(e) =>
              handleSettingChange("profileVisibility", e.target.value)
            }
            className="p-2 border rounded"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium" style={{ color: "var(--text-dark)" }}>
              Share Progress
            </h4>
            <p className="text-sm" style={{ color: "var(--text-gray)" }}>
              Allow others to see your wellness progress
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.shareProgress}
              onChange={(e) =>
                handleSettingChange("shareProgress", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium" style={{ color: "var(--text-dark)" }}>
              Data Collection
            </h4>
            <p className="text-sm" style={{ color: "var(--text-gray)" }}>
              Allow anonymous data collection for app improvement
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowDataCollection}
              onChange={(e) =>
                handleSettingChange("allowDataCollection", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        Notification Preferences
      </h3>

      <div className="space-y-4">
        {[
          {
            key: "emailNotifications",
            title: "Email Notifications",
            desc: "Receive updates via email",
          },
          {
            key: "pushNotifications",
            title: "Push Notifications",
            desc: "Browser and mobile notifications",
          },
          {
            key: "reminderNotifications",
            title: "Reminder Notifications",
            desc: "Daily wellness reminders",
          },
          {
            key: "weeklyReports",
            title: "Weekly Reports",
            desc: "Weekly progress summaries",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h4 className="font-medium" style={{ color: "var(--text-dark)" }}>
                {item.title}
              </h4>
              <p className="text-sm" style={{ color: "var(--text-gray)" }}>
                {item.desc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) =>
                  handleSettingChange(item.key, e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferenceSettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        App Preferences
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange("theme", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <option value="wellness">Wellness Blue</option>
            <option value="matcha">Matcha Green</option>
            <option value="sunset">Sunset Orange</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Time Format
          </label>
          <select
            value={settings.timeFormat}
            onChange={(e) => handleSettingChange("timeFormat", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <option value="12h">12 Hour</option>
            <option value="24h">24 Hour</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Start of Week
          </label>
          <select
            value={settings.startOfWeek}
            onChange={(e) => handleSettingChange("startOfWeek", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderWellnessSettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        Wellness Settings
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Mood Reminder Time
          </label>
          <input
            type="time"
            value={settings.moodReminderTime}
            onChange={(e) =>
              handleSettingChange("moodReminderTime", e.target.value)
            }
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Journal Reminder Time
          </label>
          <input
            type="time"
            value={settings.journalReminderTime}
            onChange={(e) =>
              handleSettingChange("journalReminderTime", e.target.value)
            }
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Daily Goals Target
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.dailyGoals}
            onChange={(e) =>
              handleSettingChange("dailyGoals", parseInt(e.target.value))
            }
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: "var(--light-blue)" }}
          />
          <p className="text-sm mt-1" style={{ color: "var(--text-gray)" }}>
            Number of goals to set each day
          </p>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-dark)" }}
      >
        Data & Security
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium" style={{ color: "var(--text-dark)" }}>
              Two-Factor Authentication
            </h4>
            <p className="text-sm" style={{ color: "var(--text-gray)" }}>
              Add extra security to your account
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{
              backgroundColor: settings.twoFactorAuth
                ? "var(--accent-green)"
                : "var(--primary-blue)",
            }}
            onClick={() =>
              handleSettingChange("twoFactorAuth", !settings.twoFactorAuth)
            }
          >
            {settings.twoFactorAuth ? "Enabled" : "Enable"}
          </button>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4
            className="font-medium mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Export Data
          </h4>
          <p className="text-sm mb-4" style={{ color: "var(--text-gray)" }}>
            Download all your wellness data
          </p>
          <button
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: "var(--primary-blue)",
              color: "var(--primary-blue)",
            }}
          >
            Request Export
          </button>
        </div>

        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-medium mb-2 text-red-800">
            Account Deactivation
          </h4>
          <p className="text-sm mb-4 text-red-700">
            Temporarily deactivate your account
          </p>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "privacy":
        return renderPrivacySettings();
      case "notifications":
        return renderNotificationSettings();
      case "preferences":
        return renderPreferenceSettings();
      case "wellness":
        return renderWellnessSettings();
      case "security":
        return renderSecuritySettings();
      default:
        return renderProfileSettings();
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
              style={{ borderColor: "var(--primary-blue)" }}
            ></div>
            <p style={{ color: "var(--text-gray)" }}>
              Loading your settings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          ⚙️ Settings
        </h1>
        <p style={{ color: "var(--text-gray)" }}>
          Customize your wellness journey and app preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <div
            className="bg-white rounded-xl shadow-lg border"
            style={{ borderColor: "var(--light-blue)" }}
          >
            <div className="p-6">
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-dark)" }}
              >
                Settings
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeSection === section.id
                        ? "text-white"
                        : "hover:bg-gray-50"
                    }`}
                    style={
                      activeSection === section.id
                        ? {
                            backgroundColor: "var(--primary-blue)",
                          }
                        : {
                            color: "var(--text-dark)",
                          }
                    }
                  >
                    <span>{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div
            className="bg-white rounded-xl shadow-lg p-6 border"
            style={{ borderColor: "var(--light-blue)" }}
          >
            {renderContent()}
          </div>

          {/* Save/Reset Buttons */}
          {unsavedChanges && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-yellow-800">
                    You have unsaved changes
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-4 py-2 rounded-lg text-white ${
                      saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Logout Section */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  🚪 Sign Out
                </h3>
                <p className="text-red-600 text-sm">
                  Sign out of your MindConnect account
                </p>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
