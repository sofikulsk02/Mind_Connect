import React, { useState } from "react";

const WellnessActivities = () => {
  const [completedActivities, setCompletedActivities] = useState([]);
  const [showStats, setShowStats] = useState(false);

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

  const wellnessVideos = [
    {
      id: 1,
      title: "10 Minute Meditation For Anxiety",
      url: "https://www.youtube.com/watch?v=EyC5yJVLlUM",
      embedId: "EyC5yJVLlUM",
      category: "Meditation",
      duration: "10 min",
      description: "Guided meditation to help reduce anxiety and stress",
    },
    {
      id: 2,
      title: "Breathing Exercise for Stress Relief",
      url: "https://www.youtube.com/watch?v=GHfYZi3L5Vg",
      embedId: "GHfYZi3L5Vg",
      category: "Breathing",
      duration: "15 min",
      description: "Deep breathing techniques for instant stress relief",
    },
    {
      id: 3,
      title: "Morning Yoga Flow",
      url: "https://www.youtube.com/watch?v=uq2C8us969M",
      embedId: "uq2C8us969M",
      category: "Yoga",
      duration: "20 min",
      description: "Gentle morning yoga to energize your day",
    },
    {
      id: 4,
      title: "Mindfulness Meditation",
      url: "https://www.youtube.com/watch?v=5Gaq53LN7DM",
      embedId: "5Gaq53LN7DM",
      category: "Mindfulness",
      duration: "12 min",
      description: "Practice mindfulness to stay present and calm",
    },
    {
      id: 5,
      title: "Progressive Muscle Relaxation",
      url: "https://www.youtube.com/watch?v=8vfLmShk7MM",
      embedId: "8vfLmShk7MM",
      category: "Relaxation",
      duration: "25 min",
      description: "Full body relaxation technique",
    },
    {
      id: 6,
      title: "Sleep Meditation",
      url: "https://www.youtube.com/watch?v=FYzXE9h5KLA",
      embedId: "FYzXE9h5KLA",
      category: "Sleep",
      duration: "30 min",
      description: "Peaceful meditation for better sleep",
    },
    {
      id: 7,
      title: "Quick Stress Relief",
      url: "https://www.youtube.com/watch?v=H0F0_MwUAxo",
      embedId: "H0F0_MwUAxo",
      category: "Stress Relief",
      duration: "5 min",
      description: "Fast techniques to manage stress instantly",
    },
    {
      id: 8,
      title: "Calming Nature Sounds",
      url: "https://www.youtube.com/watch?v=MB5IX-np5fE",
      embedId: "MB5IX-np5fE",
      category: "Relaxation",
      duration: "60 min",
      description: "Soothing nature sounds for relaxation",
    },
    {
      id: 9,
      title: "Guided Gratitude Meditation",
      url: "https://www.youtube.com/watch?v=7cFES_tNt08",
      embedId: "7cFES_tNt08",
      category: "Gratitude",
      duration: "15 min",
      description: "Cultivate gratitude and positive mindset",
    },
  ];

  const toggleActivity = (activityId) => {
    setCompletedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const resetProgress = () => {
    setCompletedActivities([]);
  };

  const markAllComplete = () => {
    setCompletedActivities(activities.map((activity) => activity.id));
  };

  const toggleStats = () => {
    setShowStats(!showStats);
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

      {/* Wellness Videos Section */}
      <div className="mt-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--text-dark)" }}
        >
          🎥 Guided Wellness Videos
        </h2>
        <p className="mb-8" style={{ color: "var(--text-gray)" }}>
          Follow along with these expert-guided wellness videos for meditation,
          yoga, and relaxation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wellnessVideos.map((video) => (
            <div
              key={video.id}
              className="bg-gradient-to-br from-white/90 to-blue-50/80 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "var(--text-dark)" }}
                  >
                    {video.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white font-medium ml-2 whitespace-nowrap"
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    {video.duration}
                  </span>
                </div>

                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-gray)" }}
                >
                  {video.description}
                </p>

                <div className="flex justify-between items-center">
                  <div
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--light-blue)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {video.category}
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded-full text-white font-medium hover:opacity-90 transition-colors"
                    style={{ backgroundColor: "var(--accent-green)" }}
                  >
                    🔗 Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--text-dark)" }}
              >
                📊 Activity Statistics
              </h3>
              <button
                onClick={toggleStats}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {completedActivities.length}/{activities.length}
                </div>
                <div className="text-sm text-gray-600">
                  Activities Completed Today
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (completedActivities.length / activities.length) * 100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {completedActivities.reduce((total, id) => {
                    const activity = activities.find((a) => a.id === id);
                    return total + (activity ? parseInt(activity.duration) : 0);
                  }, 0)}{" "}
                  min
                </div>
                <div className="text-sm text-gray-600">Total Time Invested</div>
              </div>
            </div>

            <button
              onClick={toggleStats}
              className="w-full mt-6 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
            onClick={resetProgress}
            className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: "var(--primary-blue)" }}
          >
            🔄 Reset Progress
          </button>
          <button
            onClick={markAllComplete}
            className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            ✅ Mark All Complete
          </button>
          <button
            onClick={toggleStats}
            className="px-4 py-2 rounded-lg border transition-all duration-200 hover:opacity-80 hover:shadow-md"
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
