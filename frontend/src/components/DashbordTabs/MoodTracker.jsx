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
        <p className="mb-6" style={{ color: "#F7C6D9" }}>
          Click on the emoji that best represents your current mood
        </p>

        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-all transform hover:scale-105 ${
                selectedMood?.value === mood.value
                  ? "bg-white/40 ring-2 ring-white"
                  : ""
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-xs font-medium">{mood.label}</div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="bg-white/20 rounded-lg p-4">
            <label className="block text-sm font-medium mb-2">
              Add a note about why you're feeling{" "}
              {selectedMood.label.toLowerCase()}:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to this mood?"
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                style={{
                  "--placeholder-color": "rgba(0, 119, 182, 0.7)",
                }}
              />
              <button
                className="px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium"
                style={{ color: "#0077b6" }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mood Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Average Mood
            </h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-3xl font-bold mb-2" style={{ color: "#0077b6" }}>
            {stats.average}/7
          </div>
          <p className="text-gray-600 text-sm">Based on last 7 entries</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Positive Days
            </h3>
            <span className="text-2xl">✨</span>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {stats.positivePercentage}%
          </div>
          <p className="text-gray-600 text-sm">Days with good+ mood</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Streak</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">3 days</div>
          <p className="text-gray-600 text-sm">Consistent tracking</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          This Week's Mood Pattern
        </h3>
        <div className="flex items-end justify-between h-40 mb-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 rounded-t-lg mb-2 ${
                  moodOptions[day.mood - 1]?.color
                }`}
                style={{
                  height: `${(day.mood / 7) * 120}px`,
                  backgroundColor: "#0077b6",
                }}
              ></div>
              <span className="text-sm text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Sad</span>
          <span>Excellent</span>
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Mood History
        </h3>
        <div className="space-y-3">
          {moodHistory.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">
                  {moodOptions[entry.mood - 1]?.emoji}
                </span>
                <div>
                  <p className="font-medium text-gray-800">{entry.date}</p>
                  <p className="text-sm text-gray-600">{entry.note}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {moodOptions[entry.mood - 1]?.label}
                </span>
                <div
                  className={`w-3 h-3 rounded-full ${
                    moodOptions[entry.mood - 1]?.color
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Triggers */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Common Mood Triggers
        </h3>
        <p className="text-gray-600 mb-4">
          Identify patterns in what affects your mood:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {triggers.map((trigger, index) => (
            <button
              key={index}
              className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <span className="text-sm font-medium text-gray-700">
                {trigger}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
