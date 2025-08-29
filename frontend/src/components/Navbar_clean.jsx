import React, { useState, useEffect, useRef } from "react";

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
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const dropdownRef = useRef(null);
  const userName = "Sofikul";

  const unreadCount = notifications.filter((n) => n.unread).length;

  const tabs = [
    { id: "home", name: "Home", icon: "🏠" },
    { id: "journal", name: "Journal", icon: "📔" },
    { id: "moodtracker", name: "Mood Tracker", icon: "😊" },
    { id: "resources", name: "Resources", icon: "🧠" },
    { id: "community", name: "Community", icon: "👥" },
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
    <div style={{ backgroundColor: "var(--soft-off-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div
                className="text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, var(--matcha-green), var(--olive-green))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MindConnect
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === t.id ? "text-white" : "hover:text-white"
                  }`}
                  style={
                    activeTab === t.id
                      ? {
                          background: `linear-gradient(135deg, var(--matcha-green), var(--olive-green))`,
                          boxShadow: "0 4px 12px rgba(143, 185, 150, 0.3)",
                        }
                      : {
                          color: "var(--charcoal-gray)",
                          background: "transparent",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (activeTab !== t.id) {
                      e.target.style.background = "var(--sage-green)";
                      e.target.style.color = "white";
                      e.target.style.opacity = "0.8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== t.id) {
                      e.target.style.background = "transparent";
                      e.target.style.color = "var(--charcoal-gray)";
                      e.target.style.opacity = "1";
                    }
                  }}
                >
                  <span className="text-lg">{t.icon}</span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6" ref={dropdownRef}>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowPersonalMenu(false);
                  }}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: "var(--charcoal-gray)" }}
                >
                  <span className="text-xl">🔔</span>
                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: "var(--matcha-green)" }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                    <div
                      className="px-4 py-2 text-sm font-medium border-b"
                      style={{ color: "var(--charcoal-gray)" }}
                    >
                      Notifications
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <p
                          className="text-sm"
                          style={{ color: "var(--charcoal-gray)" }}
                        >
                          {notification.message}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--cool-gray)" }}
                        >
                          {notification.time}
                        </p>
                        {notification.unread && (
                          <div
                            className="w-2 h-2 rounded-full absolute right-2 top-3"
                            style={{ backgroundColor: "var(--matcha-green)" }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative ml-3">
                <button
                  onClick={() => {
                    setShowPersonalMenu(!showPersonalMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: "var(--charcoal-gray)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                    style={{ backgroundColor: "var(--matcha-green)" }}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-lg">⬇️</span>
                </button>

                {/* Profile Dropdown */}
                {showPersonalMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div
                      className="px-4 py-2 text-sm border-b"
                      style={{ color: "var(--charcoal-gray)" }}
                    >
                      Signed in as <strong>{userName}</strong>
                    </div>
                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{ color: "var(--charcoal-gray)" }}
                    >
                      <span>⚙️</span>
                      Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{ color: "var(--charcoal-gray)" }}
                    >
                      <span>👤</span>
                      Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{ color: "var(--charcoal-gray)" }}
                    >
                      <span>❓</span>
                      Help
                    </a>
                    {onLogout && (
                      <button
                        onClick={onLogout}
                        className="w-full text-left flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        style={{ color: "var(--charcoal-gray)" }}
                      >
                        <span>🚪</span>
                        Logout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset transition-colors"
              style={{
                color: "var(--charcoal-gray)",
                focusRingColor: "var(--matcha-green)",
              }}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeTab === t.id
                    ? "text-[var(--matcha-green)]"
                    : "hover:text-[var(--matcha-green)] text-[var(--charcoal-gray)]"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                {t.name}
              </button>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: "var(--matcha-green)" }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <div
                  className="text-base font-medium leading-none"
                  style={{ color: "var(--charcoal-gray)" }}
                >
                  {userName}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                style={{ color: "var(--charcoal-gray)" }}
              >
                <span>⚙️</span>
                Settings
              </a>
              <a
                href="#"
                className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                style={{ color: "var(--charcoal-gray)" }}
              >
                <span>👤</span>
                Profile
              </a>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ color: "var(--charcoal-gray)" }}
                >
                  <span>🚪</span>
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

export default Navbar;
