import React, { useState } from "react";

const WellnessActivities = () => {
  const [completedActivities, setCompletedActivities] = useState([]);

  const activities = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      duration: "10 min",
      difficulty: "Beginner",
      category: "Mindfulness",
      icon: "🧘‍♀️",
    },
    {
      id: 2,
      title: "Gratitude Walk",
      description: "Take a walk while focusing on things you're grateful for",
      duration: "15 min",
      difficulty: "Easy",
      category: "Movement",
      icon: "🚶‍♀️",
    },
    {
      id: 3,
      title: "Deep Breathing Exercise",
      description: "Practice 4-7-8 breathing technique for relaxation",
      duration: "5 min",
      difficulty: "Beginner",
      category: "Breathing",
      icon: "💨",
    },
    {
      id: 4,
      title: "Progressive Muscle Relaxation",
      description: "Systematically tense and relax muscle groups",
      duration: "20 min",
      difficulty: "Intermediate",
      category: "Relaxation",
      icon: "💪",
    },
    {
      id: 5,
      title: "Yoga Flow",
      description: "Gentle yoga sequence for flexibility and calm",
      duration: "30 min",
      difficulty: "Intermediate",
      category: "Movement",
      icon: "🧘",
    },
    {
      id: 6,
      title: "Journaling Reflection",
      description: "Write about your thoughts and feelings for the day",
      duration: "15 min",
      difficulty: "Beginner",
      category: "Reflection",
      icon: "✍️",
    },
  ];

  const toggleActivity = (activityId) => {
    setCompletedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "var(--accent-green)";
      case "Easy":
        return "var(--accent-green)";
      case "Intermediate":
        return "var(--primary-blue)";
      case "Advanced":
        return "var(--error-red)";
      default:
        return "var(--text-gray)";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          🧘‍♀️ Wellness Activities
        </h1>
        <p style={{ color: "var(--text-gray)" }}>
          Choose from a variety of wellness activities to support your mental
          health journey
        </p>
      </div>

      {/* Progress Summary */}
      <div
        className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          Today's Progress
        </h2>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--primary-blue)" }}
            >
              {completedActivities.length}
            </div>
            <div className="text-sm" style={{ color: "var(--text-gray)" }}>
              Completed
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--text-gray)" }}
            >
              {activities.length - completedActivities.length}
            </div>
            <div className="text-sm" style={{ color: "var(--text-gray)" }}>
              Remaining
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-blue)",
                  width: `${
                    (completedActivities.length / activities.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => {
          const isCompleted = completedActivities.includes(activity.id);
          return (
            <div
              key={activity.id}
              className={`bg-white rounded-xl shadow-lg p-6 border transition-all duration-300 cursor-pointer hover:shadow-xl ${
                isCompleted ? "ring-2" : ""
              }`}
              style={{
                borderColor: "var(--light-blue)",
                ringColor: isCompleted ? "var(--accent-green)" : "transparent",
              }}
              onClick={() => toggleActivity(activity.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{activity.icon}</div>
                <div
                  className={`p-2 rounded-full ${
                    isCompleted ? "text-white" : "text-gray-400"
                  }`}
                  style={{
                    backgroundColor: isCompleted
                      ? "var(--accent-green)"
                      : "var(--light-blue)",
                  }}
                >
                  {isCompleted ? "✓" : "○"}
                </div>
              </div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-dark)" }}
              >
                {activity.title}
              </h3>

              <p className="text-sm mb-4" style={{ color: "var(--text-gray)" }}>
                {activity.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-gray)" }}
                  >
                    ⏱️ {activity.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white font-medium"
                    style={{
                      backgroundColor: getDifficultyColor(activity.difficulty),
                    }}
                  >
                    {activity.difficulty}
                  </span>
                </div>
              </div>

              <div
                className="text-xs px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: "var(--light-blue)",
                  color: "var(--text-dark)",
                }}
              >
                {activity.category}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div
        className="mt-8 bg-white rounded-xl shadow-lg p-6 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--primary-blue)" }}
          >
            🔄 Reset Progress
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            ✅ Mark All Complete
          </button>
          <button
            className="px-4 py-2 rounded-lg border transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--primary-blue)",
              color: "var(--primary-blue)",
              backgroundColor: "transparent",
            }}
          >
            📊 View Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessActivities;
