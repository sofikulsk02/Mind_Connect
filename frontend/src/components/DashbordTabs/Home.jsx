import React, { useState } from "react";

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [userName] = useState("Alex"); // This would come from user context
  const [isSubmittingMood, setIsSubmittingMood] = useState(false);
  const [todayCheckin, setTodayCheckin] = useState(null);

  // Handle mood and energy submission
  const handleCheckinSubmit = async () => {
    if (!selectedMood || !energyLevel) return;

    setIsSubmittingMood(true);
    try {
      // Simulate API call to save mood data
      const checkinData = {
        mood: selectedMood,
        energy: energyLevel,
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
      };

      // Store in localStorage (in real app, this would be API call)
      localStorage.setItem("todayCheckin", JSON.stringify(checkinData));
      setTodayCheckin(checkinData);

      // Show success message
      alert("Daily check-in saved! 🎉");
    } catch (error) {
      console.error("Error saving check-in:", error);
    } finally {
      setIsSubmittingMood(false);
    }
  };

  // Load today's check-in on component mount
  React.useEffect(() => {
    const saved = localStorage.getItem("todayCheckin");
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toISOString().split("T")[0];
      if (data.date === today) {
        setTodayCheckin(data);
        setSelectedMood(data.mood);
        setEnergyLevel(data.energy);
      }
    }
  }, []);

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return {
        greeting: "Good Morning",
        emoji: "🌅",
        message: "Ready to start your day mindfully?",
        background: "from-[#caf0f8] via-[#ade8f4] to-[#90e0ef]", // Light blue morning
        textColor: "#0077b6",
        subTextColor: "#0096c7",
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        greeting: "Good Afternoon",
        emoji: "☀️",
        message: "How's your day going so far?",
        background: "from-[#90e0ef] via-[#48cae4] to-[#00b4d8]", // Bright blue afternoon
        textColor: "#0077b6",
        subTextColor: "#0096c7",
      };
    } else if (currentHour >= 17 && currentHour < 21) {
      return {
        greeting: "Good Evening",
        emoji: "🌆",
        message: "Time to unwind and reflect",
        background: "from-[#00b4d8] via-[#0096c7] to-[#0077b6]", // Deeper blue evening
        textColor: "white",
        subTextColor: "#90e0ef",
      };
    } else {
      return {
        greeting: "Good Night",
        emoji: "🌙",
        message: "Hope you're taking care of yourself",
        background: "from-[#0077b6] via-[#003d5c] to-[#001a2e]", // Dark blue/black night
        textColor: "white",
        subTextColor: "#48cae4",
      };
    }
  };

  const timeGreeting = getTimeBasedGreeting();

  const quickMoodOptions = [
    { emoji: "🙂", label: "Good", value: "good" },
    { emoji: "😔", label: "Down", value: "down" },
    { emoji: "😰", label: "Stressed", value: "stressed" },
  ];

  const energyOptions = [
    { label: "Low", value: "low", color: "text-red-700" },
    { label: "Medium", value: "medium", color: "text-yellow-700" },
    { label: "High", value: "high", color: "text-green-700" },
  ];

  const dailyAffirmation =
    "Peace begins with a deep breath. You've been writing a lot about stress lately - remember to be gentle with yourself.";

  const aiSuggestions = [
    {
      icon: "✍️",
      text: "Try journaling for 5 mins on gratitude",
      action: () => {
        if (confirm("Would you like to start a gratitude journal entry?")) {
          alert("Redirecting to journal with gratitude template...");
          // In real app: navigate to journal with template
        }
      },
    },
    {
      icon: "🚶‍♀️",
      text: "Take a short walk for clarity",
      action: () => {
        if (confirm("Ready for a 10-minute mindful walk?")) {
          alert("Starting walk timer with mindfulness prompts...");
          // In real app: start walk timer/tracker
        }
      },
    },
    {
      icon: "📚",
      text: "Read a new resource on anxiety management",
      action: () => {
        if (confirm("Explore anxiety management resources?")) {
          alert("Opening curated anxiety resources...");
          // In real app: navigate to resources section
        }
      },
    },
    {
      icon: "🧘‍♀️",
      text: "Try a 5-minute breathing exercise",
      action: () => {
        if (confirm("Start guided breathing session?")) {
          alert("Starting breathing exercise...");
          // In real app: start breathing exercise
        }
      },
    },
  ];

  const recentActivity = [
    {
      icon: "📝",
      title: "Journal Entry",
      preview: "Feeling calm after the morning walk...",
      time: "2 hours ago",
      type: "journal",
      action: () => alert("Opening journal entry..."),
    },
    {
      icon: "🎥",
      title: "Wellness Video",
      preview: "10-Minute Morning Meditation",
      time: "Yesterday",
      type: "video",
      action: () => alert("Resuming video..."),
    },
    {
      icon: "📚",
      title: "Reading Progress",
      preview: '"The Power of Now" - Chapter 3',
      time: "3 days ago",
      type: "reading",
      action: () => alert("Continue reading..."),
    },
    {
      icon: "🎯",
      title: "Goal Completed",
      preview: '"Drink 8 glasses of water" ✓',
      time: "Yesterday",
      type: "goal",
      action: () => alert("View goal details..."),
    },
    {
      icon: "😊",
      title: "Mood Check-in",
      preview: selectedMood ? `Today: ${selectedMood}` : "Happy - 3 days ago",
      time: selectedMood ? "Today" : "3 days ago",
      type: "mood",
      action: () => alert("View mood history..."),
    },
  ];

  const quickActions = [
    {
      title: "Write Journal",
      icon: "✍️",
      color: "from-[#0077b6] to-[#00b4d8]",
      action: "journal",
    },
    {
      title: "Track Mood",
      icon: "📊",
      color: "from-[#90e0ef] to-[#48cae4]",
      action: "mood",
    },
    {
      title: "Check Goals",
      icon: "🎯",
      color: "from-[#ade8f4] to-[#0077b6]",
      action: "goals",
    },
  ];

  return (
    <div className="w-full max-w-none px-4 space-y-6">
      {/* AI Companion Greeting & Daily Affirmation */}
      <div className="flex justify-between flex-col">
        <div className="flex justify-between items-start gap-4">
          {/* Main Greeting & Daily Affirmation Section */}
          <div className="h-98 w-[85%] bg-gradient-to-br from-[#caf0f8]/30 via-[#ade8f4]/20 to-[#90e0ef]/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#0077b6]/20">
            {/* Time-based Greeting Header */}
            <div className="flex items-center gap-6 mb-6">
              <span className="text-7xl drop-shadow-lg">
                {timeGreeting.emoji}
              </span>
              <div>
                <h1 className="text-4xl font-bold leading-tight text-gray-800">
                  {timeGreeting.greeting}, {userName}!
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  {timeGreeting.message}
                </p>
              </div>
            </div>

            {/* Daily Affirmation Section */}
            <div className="bg-gradient-to-r from-[#caf0f8] to-[#ade8f4] rounded-xl p-6 shadow-lg border-l-4 border-[#0077b6]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💭</span>
                <h3 className="text-lg font-semibold text-[#0077b6]">
                  Daily Affirmation
                </h3>
              </div>
              <p className="text-gray-800 font-medium text-lg leading-relaxed">
                {dailyAffirmation}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            {/* 21 Days Challenge Button */}
            <button
              className="h-14 w-64 mb-2 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
              }}
            >
              🎯 21 Days Challenge
            </button>

            {/* Mini Calendar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-[#0077b6]/20 w-64">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0077b6]">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <span className="text-2xl">📅</span>
              </div>

              {/* Days of the week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-xs font-semibold text-gray-500 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const today = new Date();
                  const currentMonth = today.getMonth();
                  const currentYear = today.getFullYear();
                  const firstDay = new Date(currentYear, currentMonth, 1);
                  const lastDay = new Date(currentYear, currentMonth + 1, 0);
                  const startDate = firstDay.getDay();
                  const daysInMonth = lastDay.getDate();
                  const todayDate = today.getDate();

                  const days = [];

                  // Empty cells for days before the first day of the month
                  for (let i = 0; i < startDate; i++) {
                    days.push(
                      <div key={`empty-${i}`} className="h-8 w-8"></div>
                    );
                  }

                  // Days of the current month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const isToday = day === todayDate;
                    const isActive = day <= todayDate; // Mark past and current days as active

                    days.push(
                      <div
                        key={day}
                        className={`h-8 w-8 flex items-center justify-center text-xs font-medium rounded-lg cursor-pointer transition-all duration-200 ${
                          isToday
                            ? "bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white shadow-lg transform scale-110"
                            : isActive
                            ? "bg-[#caf0f8] text-[#0077b6] hover:bg-[#ade8f4]"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>

              {/* Today's highlight */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-center text-xs text-[#0077b6] font-medium">
                  <span className="mr-1">✨</span>
                  Today:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Check-in Tiles */}
      <div className="flex justify-between">
        <div
          className="rounded-xl shadow-lg p-6 w-[70%]"
          style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#333333]">
              How are you today?
            </h3>
            {todayCheckin && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Checked in today
              </span>
            )}
          </div>

          <div className="bg-white/50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {quickMoodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedMood(option.value)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedMood === option.value
                      ? "border-[#0077b6] bg-[#caf0f8] shadow-md"
                      : "border-gray-200 bg-white hover:border-[#90e0ef]"
                  }`}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-sm font-medium text-[#333333]">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <h4 className="text-md font-medium text-[#333333] mb-3">
              What's your energy level?
            </h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {energyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setEnergyLevel(option.value)}
                  className="px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium hover:scale-105"
                  style={
                    energyLevel === option.value
                      ? {
                          backgroundColor: "#0077b6",
                          color: "white",
                          borderColor: "#0077b6",
                        }
                      : {
                          backgroundColor: "white",
                          color: "#333333",
                          borderColor: "#ade8f4",
                        }
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            {selectedMood && energyLevel && !todayCheckin && (
              <button
                onClick={handleCheckinSubmit}
                disabled={isSubmittingMood}
                className="w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmittingMood ? "Saving..." : "Save Daily Check-in ✨"}
              </button>
            )}
          </div>
        </div>

        {/* Wellness Illustration */}
        <div className="w-[25%] flex items-center justify-center">
          <img
            src="../../../public/0d2bf5366686736189026e2a8382789c.png"
            alt=""
          />
        </div>
      </div>

      {/* AI Suggestions */}
      <div
        className="rounded-xl shadow-lg p-6 relative overflow-hidden"
        style={{ backgroundColor: "rgba(145, 181, 0, 0.15)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            🌟 AI Suggestions for You
          </h3>
          <span className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded-full">
            Personalized
          </span>
        </div>

        <div className="space-y-3">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={suggestion.action}
              className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-white/70 transition-all duration-200 cursor-pointer border border-transparent hover:border-[#90e0ef] hover:shadow-md group"
              style={{ backgroundColor: "#ade8f4" }}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {suggestion.icon}
              </span>
              <p className="text-gray-700 font-medium flex-1 text-left">
                {suggestion.text}
              </p>
              <span className="text-[#0077b6] opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </button>
          ))}
        </div>

        {/* Decorative grass background */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-100 to-transparent opacity-30"></div>
        <div className="absolute bottom-2 left-4 text-green-500 opacity-40"></div>
      </div>

      {/* Mini Wellness Dashboard */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-xl shadow-lg p-4 text-center"
          style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
        >
          <span className="text-2xl mb-2 block">📖</span>
          <div className="text-lg font-bold" style={{ color: "#0077b6" }}>
            4
          </div>
          <p className="text-xs text-gray-600">Journals This Week</p>
        </div>
        <div
          className="rounded-xl shadow-lg p-4 text-center"
          style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
        >
          <span className="text-2xl mb-2 block">❤️</span>
          <div className="text-lg font-bold text-green-600">Stable</div>
          <p className="text-xs text-gray-600">Mood Trend</p>
        </div>
        <div
          className="rounded-xl shadow-lg p-4 text-center"
          style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
        >
          <span className="text-2xl mb-2 block">⭐</span>
          <div className="text-lg font-bold" style={{ color: "#00b4d8" }}>
            60%
          </div>
          <p className="text-xs text-gray-600">Goals Progress</p>
        </div>
      </div>

      {/* Recent Activity Snapshot */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h3>
          <button
            className="text-sm text-[#0077b6] hover:text-[#00b4d8] font-medium"
            onClick={() => alert("View all activities...")}
          >
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <button
              key={index}
              onClick={activity.action}
              className="w-full flex items-start space-x-3 p-4 rounded-lg hover:bg-white/70 transition-all duration-200 cursor-pointer border border-transparent hover:border-[#90e0ef] hover:shadow-sm group text-left"
              style={{ backgroundColor: "#ade8f4" }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {activity.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800 text-sm truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-1 truncate">
                  {activity.preview}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      activity.type === "journal"
                        ? "bg-blue-400"
                        : activity.type === "video"
                        ? "bg-red-400"
                        : activity.type === "reading"
                        ? "bg-green-400"
                        : activity.type === "goal"
                        ? "bg-yellow-400"
                        : "bg-purple-400"
                    }`}
                  ></span>
                  <span className="text-xs text-gray-500 capitalize">
                    {activity.type}
                  </span>
                </div>
              </div>
              <span className="text-[#0077b6] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                →
              </span>
            </button>
          ))}
        </div>

        {/* Quick action to add new activity */}
        <button
          className="w-full mt-4 p-3 border-2 border-dashed border-[#90e0ef] rounded-lg text-[#0077b6] hover:bg-white/50 transition-all duration-200"
          onClick={() => alert("Add new activity...")}
        >
          + Add New Activity
        </button>
      </div>

      {/* Quick Action Shortcuts */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "rgba(145, 181, 0, 0.15)" }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all duration-200"
              style={{
                backgroundColor: "#ade8f4",
                borderColor: "#90e0ef",
              }}
            >
              <div
                className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center text-lg mb-2`}
              >
                {action.icon}
              </div>
              <span className="font-medium text-gray-800 text-sm">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Community Pulse */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "rgba(145, 181, 0, 0.15)" }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Community Pulse
        </h3>
        <div className="space-y-3">
          <div
            className="flex items-center space-x-3 p-3 rounded-lg"
            style={{ backgroundColor: "#ade8f4" }}
          >
            <span className="text-xl">💬</span>
            <p className="text-gray-700">
              <strong>15 people</strong> shared uplifting stories today
            </p>
          </div>
          <div
            className="flex items-center space-x-3 p-3 rounded-lg"
            style={{ backgroundColor: "#ade8f4" }}
          >
            <span className="text-xl">🔥</span>
            <p className="text-gray-700">
              Trending: <strong>"Overcoming self-doubt"</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Mindful Reminder Widget */}
      <div
        className="rounded-xl p-6 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
        }}
      >
        <h3 className="text-lg font-semibold mb-2">🌸 Mindful Moment</h3>
        <p className="mb-4" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
          Take a deep breath. You're doing great.
        </p>
        <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 bg-white/40 rounded-full"></div>
        </div>
        <p
          className="text-xs mt-2"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          Breathe in... breathe out...
        </p>
      </div>
    </div>
  );
};

export default Home;
