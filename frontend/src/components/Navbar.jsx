import React, { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../utils/auth";
import { getUserProfile } from "../utils/profileAPI";

const Navbar = ({ onLogout, activeTab, setActiveTab }) => {
  const [notifications] = useState([
    {
      id: 1,
      message: "Daily journal reminder",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      message: "New community message",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Meditation streak: 5 days!",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      message: "Weekly mood summary ready",
      time: "1 day ago",
      unread: false,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        const currentUser = getCurrentUser();

        if (currentUser) {
          // Try to get updated profile from API
          try {
            const profileData = await getUserProfile();
            setUserProfile(profileData.user);
          } catch (apiError) {
            // Fallback to localStorage user data if API fails
            setUserProfile(currentUser);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, []);

  const userName =
    userProfile?.name ||
    userProfile?.username ||
    userProfile?.fullName ||
    "User";

  const unreadCount = notifications.filter((n) => n.unread).length;

  const tabs = [
    { id: "home", name: "Home", icon: "🏠" },
    { id: "journal", name: "Journal", icon: "📔" },
    { id: "moodtracker", name: "Mood Tracker", icon: "😊" },
    { id: "resources", name: "Resources", icon: "🧠" },
    { id: "community", name: "Community", icon: "👥" },
  ];

  const personalTabs = [
    { id: "mood", label: "Mood Tracker", icon: "😊" },
    { id: "activities", label: "Wellness Activities", icon: "🧘‍♀️" },
    { id: "goals", label: "Goals Progress", icon: "🎯" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowPersonalMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="shadow-sm border-b border-gray-100 bg-[#00b4d8] px-4 py-4 sticky top-0 z-50">
      <div className="flex justify-around items-center w-full">
        {/* logo */}
        <div className="flex flex-col font-extrabold text-black leading-none">
          <span className="ml-2"> Mind</span>
          <span>connect</span>
        </div>
        {/* Navigation Tabs Section */}
        <div className="flex items-center justify-evenly gap-4 flex-1 max-w-4xl">
          {/* Primary tabs */}
          {[
            { id: "home", label: "Home", icon: "🏠" },
            { id: "journal", label: "Journal", icon: "📝" },
            { id: "community", label: "Community", icon: "👥" },
            { id: "support", label: "Professional Help", icon: "🏥" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowPersonalMenu(false);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white border-transparent shadow-lg"
                  : "hover:border-[#0077b6] hover:cursor-pointer"
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background:
                        "linear-gradient(135deg, #0077b6 0%, #0096c7 100%)",
                    }
                  : {
                      backgroundColor: "#90e0ef",
                      color: "var(--text-dark)",
                      // borderColor: "var(--light-blue)",
                    }

                // {
                //     background:
                //       "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                //   }
                // : {
                //     backgroundColor: "white",
                //     color: "var(--text-dark)",
                //     borderColor: "var(--light-blue)",
                //   }
              }
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Personal dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowPersonalMenu((s) => !s)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border whitespace-nowrap ${
                ["mood", "activities", "goals", "resources"].includes(activeTab)
                  ? "text-white border-transparent"
                  : "hover:border-[#0077b6] hover:cursor-pointer"
              }`}
              style={
                ["mood", "activities", "goals", "resources"].includes(activeTab)
                  ? {
                      background:
                        "linear-gradient(135deg, #0077b6 0%, #0096c7 100%)",
                    }
                  : {
                      backgroundColor: "#90e0ef",
                      color: "var(--text-dark)",
                      borderColor: "var(--light-blue)",
                    }

                // {
                //     background:
                //       "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                //   }
                // : {
                //     backgroundColor: "white",
                //     color: "var(--text-dark)",
                //     borderColor: "var(--light-blue)",
                //   }
              }
            >
              <span className="text-base">🌟</span>
              <span>Personal</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  showPersonalMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showPersonalMenu && (
              <div
                className="absolute left-0 top-full mt-2 w-72 rounded-2xl shadow-xl border overflow-hidden bg-white z-[60]"
                style={{ borderColor: "#ade8f4" }}
              >
                <div className="p-2">
                  <div
                    className="text-xs font-medium px-4 py-3 uppercase tracking-wider"
                    style={{
                      color: "var(--text-gray)",
                      backgroundColor: "#caf0f8",
                    }}
                  >
                    Personal Tools
                  </div>
                  {personalTabs.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setActiveTab(t.id);
                        setShowPersonalMenu(false);
                      }}
                      className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                        activeTab === t.id
                          ? "text-[#0077b6]"
                          : "hover:text-[#0077b6]"
                      }`}
                      style={
                        activeTab === t.id
                          ? {
                              backgroundColor: "#caf0f8",
                              opacity: 0.5,
                            }
                          : {
                              color: "var(--text-dark)",
                            }
                      }
                    >
                      <span className="text-lg">{t.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{t.label}</div>
                        <div
                          className="text-xs mt-1"
                          style={{ color: "var(--cool-gray)" }}
                        >
                          {t.id === "mood" && "Track your daily mood"}
                          {t.id === "activities" && "Wellness activities"}
                          {t.id === "goals" && "Personal goals"}
                          {t.id === "resources" && "Learning resources"}
                        </div>
                      </div>
                      {activeTab === t.id && (
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#48cae4" }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section - Notifications, Settings & Profile */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
              style={{
                backgroundColor: unreadCount > 0 ? "#caf0f8" : "transparent",
              }}
            >
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium"
                  style={{ backgroundColor: "var(--error-red)" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50"
                style={{ borderColor: "#ade8f4" }}
              >
                <div
                  className="p-4 border-b"
                  style={{ borderColor: "#ade8f4" }}
                >
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b last:border-b-0 cursor-pointer transition-colors"
                      style={
                        notification.unread
                          ? {
                              backgroundColor: "#caf0f8",
                              opacity: 0.2,
                              borderColor: "#ade8f4",
                            }
                          : {
                              borderColor: "#ade8f4",
                            }
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className="text-sm"
                          style={{ color: "var(--text-dark)" }}
                        >
                          {notification.message}
                        </div>
                        {notification.unread && (
                          <div
                            className="w-2 h-2 rounded-full ml-2 mt-1"
                            style={{ backgroundColor: "#0077b6" }}
                          ></div>
                        )}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: "var(--text-gray)" }}
                      >
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Profile */}
          <div className="flex items-center space-x-3">
            {userProfile?.profilePicture ? (
              <img
                src={`http://localhost:3000${userProfile.profilePicture}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                onError={(e) => {
                  // If image fails to load, hide it and show initials instead
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #0077b6 0%, #48cae4 100%)",
                display: userProfile?.profilePicture ? "none" : "flex",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Settings */}
          <button
            onClick={() => {
              setActiveTab("settings");
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
              activeTab === "settings"
                ? "text-white border-transparent shadow-lg"
                : "hover:border-[#0077b6] hover:cursor-pointer"
            }`}
            style={
              activeTab === "settings"
                ? {
                    background:
                      "linear-gradient(135deg, #0077b6 0%, #0096c7 100%)",
                  }
                : {
                    backgroundColor: "#90e0ef",
                    color: "var(--text-dark)",
                    borderColor: "#ade8f4",
                  }
            }
          >
            <span className="text-base">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
