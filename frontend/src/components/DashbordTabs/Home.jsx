import React, { useState } from "react";

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [userName] = useState("Alex"); // This would come from user context

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
      action: "journal",
    },
    { icon: "🚶‍♀️", text: "Take a short walk for clarity", action: "walk" },
    {
      icon: "📚",
      text: "Read a new resource on anxiety management",
      action: "resource",
    },
  ];

  const recentActivity = [
    {
      icon: "📝",
      title: "Journal Entry",
      preview: "Feeling calm after the walk...",
      time: "2 hours ago",
    },
    { icon: "😊", title: "Mood Log", preview: "Happy", time: "3 days ago" },
    {
      icon: "🎯",
      title: "Goal Progress",
      preview: '"Read 10 pages" ✓ completed',
      time: "Yesterday",
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
        <div className="flex justify-between">
          <div
            className={`h-100 w-300 bg-gradient-to-r ${timeGreeting.background} rounded-xl p-6 shadow-lg border-l-4 border-[#0077b6] flex flex-col justify-center`}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-6xl">{timeGreeting.emoji}</span>
              <div>
                <h1
                  className="text-5xl font-bold leading-tight"
                  style={{ color: timeGreeting.textColor }}
                >
                  {timeGreeting.greeting}
                </h1>
                <h2
                  className="text-4xl font-bold"
                  style={{ color: timeGreeting.subTextColor }}
                >
                  {userName}!
                </h2>
              </div>
            </div>
            <p
              className="text-2xl font-medium text-center"
              style={{ color: timeGreeting.textColor }}
            >
              {timeGreeting.message}
            </p>
          </div>
          <button
            className="h-10  w-40 rounded-3xl text-white"
            style={{
              background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
            }}
          >
            21 days challenge
          </button>
        </div>
        <div
          className="rounded-xl p-6 text-white w-[70%] bg-[#009BCA]"
          // style={{
          //   backgroundColor: "rgba(0, 180, 216, 0.15)",
          // }}
        >
          <h2
            className="text-2xl font-bold mb-2 font-pacifico text-black"
            // style={{ color: "#0077b6" }}
          >
            👋 Good Morning, {userName}!
          </h2>
          <div className="bg-[#90E0EF] rounded-lg p-4">
            <p className="text-black text-sm mb-2">💭 Daily Affirmation</p>
            <p className="text-black font-bold">{dailyAffirmation}</p>
          </div>
        </div>
      </div>

      {/* Quick Check-in Tiles */}
      <div className="flex justify-between">
        <div
          className="rounded-xl shadow-lg p-6  w-[70%]"
          style={{ backgroundColor: "rgba(0, 180, 216, 0.15)" }}
        >
          <h3 className="text-lg font-semibold text-[#333333] mb-4">
            How are you today?
          </h3>
          <div
            className="grid grid-cols-3 gap-3 mb-4"
            style={{ backgroundColor: "#ade8f4" }}
          >
            {quickMoodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center p-4 rounded-lg border-1 transition-all duration-200 wellness-transition wellness-hover `}
                style={
                  selectedMood === option.value
                    ? {
                        backgroundColor: "var(--light-blue)",
                        opacity: 0.5,
                      }
                    : {}
                }
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
          <div className="grid grid-cols-3 gap-3">
            {energyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setEnergyLevel(option.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 wellness-transition `}
                style={
                  energyLevel === option.value
                    ? {
                        backgroundColor: "#0077b6",
                        color: "white",
                      }
                    : {
                        backgroundColor: "#ade8f4",
                        color: "#333333",
                      }
                }
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* the image where svg or the calendar will be there */}
        <div className="h-[10%] w-[20%]">
          <img
            src="../../../public/dd7cc2c74b8c148c3f750ec939172aa5.png"
            alt=""
            className="h-[100%] object-cover w-[100%] ml-[-150px]"
          />
        </div>
      </div>

      {/* AI Suggestions */}
      <div
        className="rounded-xl shadow-lg p-6 relative"
        style={{ backgroundColor: "rgba(145, 181, 0, 0.15)" }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🌟 AI Suggestions for You
        </h3>
        <div className="space-y-3">
          {aiSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              style={{ backgroundColor: "#ade8f4" }}
            >
              <span className="text-xl">{suggestion.icon}</span>
              <p className="text-gray-700">{suggestion.text}</p>
            </div>
          ))}
        </div>

        {/* the grreen grass starts */}
        <div></div>
        {/* the green grass end */}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg"
              style={{ backgroundColor: "#ade8f4" }}
            >
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">
                  {activity.title}
                </p>
                <p className="text-gray-600 text-xs">{activity.preview}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
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
