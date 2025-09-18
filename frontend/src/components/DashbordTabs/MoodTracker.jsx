import React, { useState } from "react";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");

  const moodOptions = [
    { emoji: "😢", label: "Very Sad", value: 1, color: "bg-red-500" },
    { emoji: "😟", label: "Sad", value: 2, color: "bg-orange-500" },
    { emoji: "😐", label: "Neutral", value: 3, color: "bg-yellow-500" },
    { emoji: "🙂", label: "Good", value: 4, color: "bg-lime-500" },
    { emoji: "😊", label: "Happy", value: 5, color: "bg-green-500" },
    { emoji: "😄", label: "Very Happy", value: 6, color: "bg-emerald-500" },
    { emoji: "🤩", label: "Excellent", value: 7, color: "bg-cyan-500" },
  ];

  const moodHistory = [
    { date: "Today", mood: 5, note: "Great meeting with team" },
    { date: "Yesterday", mood: 3, note: "Feeling neutral, steady day" },
    { date: "Jan 15", mood: 6, note: "Achieved my weekly goal!" },
    { date: "Jan 14", mood: 2, note: "Stressful deadline approaching" },
    { date: "Jan 13", mood: 4, note: "Good workout session" },
    { date: "Jan 12", mood: 5, note: "Coffee with friends" },
    { date: "Jan 11", mood: 3, note: "Regular day, nothing special" },
  ];

  const weeklyData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 6 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 4 },
  ];

  const triggers = [
    "Work stress",
    "Social anxiety",
    "Exercise",
    "Good sleep",
    "Family time",
    "Weather",
    "Deadlines",
    "Achievements",
  ];

  const getCurrentMoodStats = () => {
    const total = moodHistory.length;
    const average =
      moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / total;
    const positiveCount = moodHistory.filter((entry) => entry.mood >= 4).length;
    const positivePercentage = Math.round((positiveCount / total) * 100);

    return { average: average.toFixed(1), positivePercentage };
  };

  const stats = getCurrentMoodStats();

  return (
    <div
      className="w-full max-w-none px-4 space-y-8"
      style={{ backgroundColor: "var(--wellness-cream)" }}
    >
      {/* Quick Mood Check */}
      <div
        className="rounded-xl p-8 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--wellness-lavender), var(--wellness-pink))",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">
          How are you feeling right now?
        </h2>
        <p className="mb-6 text-black">
          Click on the emoji that best represents your current mood
        </p>

        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                selectedMood?.value === mood.value
                  ? "bg-white/50 ring-4 ring-white/60 shadow-xl scale-105"
                  : "bg-white/20 hover:bg-white/35"
              }`}
            >
              <div className="text-4xl mb-2 filter drop-shadow-sm">
                {mood.emoji}
              </div>
              <div className="text-xs font-semibold text-white drop-shadow-sm">
                {mood.label}
              </div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <label className="block text-sm font-medium mb-2 text-white">
              Add a note about why you're feeling{" "}
              {selectedMood.label.toLowerCase()}:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to this mood?"
                className="flex-1 px-4 py-2 rounded-lg bg-white/30 text-white border border-white/40 focus:border-white/60 focus:outline-none placeholder-white/70"
              />
              <button
                className="px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-md"
                style={{ color: "#0077b6" }}
              >
                💾 Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mood Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Average Mood
            </h3>
            <div className="p-2 bg-blue-500 rounded-full">
              <span className="text-xl text-white">📊</span>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {stats.average}/7
          </div>
          <p className="text-gray-600 text-sm">Based on last 7 entries</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-6 border border-green-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Positive Days
            </h3>
            <div className="p-2 bg-green-500 rounded-full">
              <span className="text-xl text-white">✨</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {stats.positivePercentage}%
          </div>
          <p className="text-gray-600 text-sm">Days with good+ mood</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl shadow-lg p-6 border border-orange-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Streak</h3>
            <div className="p-2 bg-orange-500 rounded-full">
              <span className="text-xl text-white">🔥</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">3 days</div>
          <p className="text-gray-600 text-sm">Consistent tracking</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border border-purple-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📈</span>
          This Week's Mood Pattern
        </h3>
        <div className="flex items-end justify-between h-40 mb-4 bg-white/50 rounded-lg p-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-10 rounded-t-lg mb-2 transition-all duration-300 hover:opacity-80 shadow-sm"
                style={{
                  height: `${(day.mood / 7) * 100}px`,
                  background: `linear-gradient(to top, ${
                    day.mood <= 2
                      ? "#ef4444"
                      : day.mood <= 3
                      ? "#f97316"
                      : day.mood <= 4
                      ? "#eab308"
                      : day.mood <= 5
                      ? "#84cc16"
                      : day.mood <= 6
                      ? "#22c55e"
                      : "#06b6d4"
                  }, ${
                    day.mood <= 2
                      ? "#f87171"
                      : day.mood <= 3
                      ? "#fb923c"
                      : day.mood <= 4
                      ? "#fbbf24"
                      : day.mood <= 5
                      ? "#a3e635"
                      : day.mood <= 6
                      ? "#4ade80"
                      : "#38bdf8"
                  })`,
                }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {day.day}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 bg-white/30 rounded-lg p-2">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-red-400 rounded mr-2"></span>Sad
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 bg-cyan-400 rounded mr-2"></span>Excellent
          </span>
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📚</span>
          Mood History
        </h3>
        <div className="space-y-4">
          {moodHistory.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-200/50 hover:border-blue-300"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-white to-blue-100 rounded-full shadow-md border border-blue-200">
                  <span className="text-2xl">
                    {moodOptions[entry.mood - 1]?.emoji}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    {entry.date}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {entry.note}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 bg-gradient-to-r from-white/90 to-blue-100/90 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                  {moodOptions[entry.mood - 1]?.label}
                </span>
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${
                      entry.mood <= 2
                        ? "#ef4444"
                        : entry.mood <= 3
                        ? "#f97316"
                        : entry.mood <= 4
                        ? "#eab308"
                        : entry.mood <= 5
                        ? "#84cc16"
                        : entry.mood <= 6
                        ? "#22c55e"
                        : "#06b6d4"
                    }, ${
                      entry.mood <= 2
                        ? "#f87171"
                        : entry.mood <= 3
                        ? "#fb923c"
                        : entry.mood <= 4
                        ? "#fbbf24"
                        : entry.mood <= 5
                        ? "#a3e635"
                        : entry.mood <= 6
                        ? "#4ade80"
                        : "#38bdf8"
                    })`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Triggers */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 border border-indigo-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🎯</span>
          Common Mood Triggers
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Identify patterns in what affects your mood:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {triggers.map((trigger, index) => (
            <button
              key={index}
              className="p-4 text-left bg-gradient-to-br from-white/80 to-indigo-100/60 backdrop-blur-sm rounded-xl hover:bg-gradient-to-br hover:from-indigo-100/80 hover:to-purple-100/60 transition-all duration-300 border border-indigo-200 hover:border-indigo-300 hover:shadow-lg transform hover:-translate-y-1 group"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:bg-indigo-600 transition-colors"></div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                  {trigger}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-white/70 to-indigo-100/70 backdrop-blur-sm rounded-lg border border-indigo-200 shadow-sm">
          <p className="text-sm text-indigo-700 font-medium">
            💡 Tip: Click on triggers to track how they correlate with your
            daily mood patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
