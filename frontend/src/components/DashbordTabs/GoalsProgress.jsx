import React, { useState } from "react";

const GoalsProgress = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Daily Meditation",
      description: "Meditate for 10 minutes every day",
      category: "Mindfulness",
      targetValue: 7,
      currentValue: 5,
      unit: "days/week",
      deadline: "2025-08-30",
      priority: "High",
      icon: "🧘‍♀️",
    },
    {
      id: 2,
      title: "Journal Writing",
      description: "Write in journal 3 times per week",
      category: "Self-Reflection",
      targetValue: 3,
      currentValue: 2,
      unit: "entries/week",
      deadline: "2025-08-30",
      priority: "Medium",
      icon: "📝",
    },
    {
      id: 3,
      title: "Gratitude Practice",
      description: "List 3 things I'm grateful for daily",
      category: "Positivity",
      targetValue: 21,
      currentValue: 18,
      unit: "days",
      deadline: "2025-09-13",
      priority: "High",
      icon: "🙏",
    },
    {
      id: 4,
      title: "Social Connection",
      description: "Reach out to friends/family weekly",
      category: "Relationships",
      targetValue: 2,
      currentValue: 1,
      unit: "calls/week",
      deadline: "2025-08-30",
      priority: "Medium",
      icon: "👥",
    },
    {
      id: 5,
      title: "Physical Exercise",
      description: "Exercise for 30 minutes, 4 times a week",
      category: "Physical Health",
      targetValue: 4,
      currentValue: 3,
      unit: "sessions/week",
      deadline: "2025-08-30",
      priority: "High",
      icon: "🏃‍♀️",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetValue: "",
    unit: "",
    deadline: "",
    priority: "Medium",
  });

  const [showAddGoal, setShowAddGoal] = useState(false);

  const updateGoalProgress = (goalId, increment) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentValue: Math.max(
                0,
                Math.min(goal.targetValue, goal.currentValue + increment)
              ),
            }
          : goal
      )
    );
  };

  const getProgressPercentage = (current, target) => {
    return Math.min(100, (current / target) * 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "var(--error-red)";
      case "Medium":
        return "var(--primary-blue)";
      case "Low":
        return "var(--accent-green)";
      default:
        return "var(--text-gray)";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Mindfulness: "var(--primary-blue)",
      "Self-Reflection": "var(--secondary-blue)",
      Positivity: "var(--accent-green)",
      Relationships: "#FF6B6B",
      "Physical Health": "#4ECDC4",
    };
    return colors[category] || "var(--text-gray)";
  };

  const addNewGoal = () => {
    if (newGoal.title && newGoal.targetValue) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        currentValue: 0,
        targetValue: parseInt(newGoal.targetValue),
        icon: "🎯",
      };
      setGoals((prev) => [...prev, goal]);
      setNewGoal({
        title: "",
        description: "",
        category: "",
        targetValue: "",
        unit: "",
        deadline: "",
        priority: "Medium",
      });
      setShowAddGoal(false);
    }
  };

  const overallProgress =
    goals.reduce(
      (acc, goal) =>
        acc + getProgressPercentage(goal.currentValue, goal.targetValue),
      0
    ) / goals.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          🎯 Goals Progress
        </h1>
        <p style={{ color: "var(--text-gray)" }}>
          Track your wellness goals and celebrate your achievements
        </p>
      </div>

      {/* Overall Progress */}
      <div
        className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
        style={{ borderColor: "var(--light-blue)" }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-dark)" }}
        >
          Overall Progress
        </h2>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: "var(--primary-blue)" }}
            >
              {Math.round(overallProgress)}%
            </div>
            <div className="text-sm" style={{ color: "var(--text-gray)" }}>
              Complete
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-blue)",
                  width: `${overallProgress}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-xl font-bold"
              style={{ color: "var(--accent-green)" }}
            >
              {
                goals.filter(
                  (goal) =>
                    getProgressPercentage(
                      goal.currentValue,
                      goal.targetValue
                    ) === 100
                ).length
              }
            </div>
            <div className="text-sm" style={{ color: "var(--text-gray)" }}>
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* Add New Goal Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="px-6 py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: "var(--primary-blue)" }}
        >
          ➕ Add New Goal
        </button>
      </div>

      {/* Add New Goal Form */}
      {showAddGoal && (
        <div
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
          style={{ borderColor: "var(--light-blue)" }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-dark)" }}
          >
            Create New Goal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, title: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
            <input
              type="text"
              placeholder="Category"
              value={newGoal.category}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, category: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
            <input
              type="number"
              placeholder="Target value"
              value={newGoal.targetValue}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, targetValue: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
            <input
              type="text"
              placeholder="Unit (e.g., days/week)"
              value={newGoal.unit}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, unit: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, deadline: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            />
            <select
              value={newGoal.priority}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="p-3 border rounded-lg"
              style={{ borderColor: "var(--light-blue)" }}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <textarea
            placeholder="Goal description"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-3 border rounded-lg mt-4"
            style={{ borderColor: "var(--light-blue)" }}
            rows="3"
          ></textarea>
          <div className="flex gap-4 mt-4">
            <button
              onClick={addNewGoal}
              className="px-6 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--accent-green)" }}
            >
              Create Goal
            </button>
            <button
              onClick={() => setShowAddGoal(false)}
              className="px-6 py-2 rounded-lg border transition-colors hover:opacity-80"
              style={{
                borderColor: "var(--text-gray)",
                color: "var(--text-gray)",
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgressPercentage(
            goal.currentValue,
            goal.targetValue
          );
          const isCompleted = progress === 100;

          return (
            <div
              key={goal.id}
              className={`bg-white rounded-xl shadow-lg p-6 border transition-all duration-300 ${
                isCompleted ? "ring-2" : ""
              }`}
              style={{
                borderColor: "var(--light-blue)",
                ringColor: isCompleted ? "var(--accent-green)" : "transparent",
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {goal.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-gray)" }}
                    >
                      {goal.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: getPriorityColor(goal.priority) }}
                  >
                    {goal.priority}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--text-gray)" }}>Progress</span>
                  <span style={{ color: "var(--text-dark)" }}>
                    {goal.currentValue}/{goal.targetValue} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isCompleted
                        ? "var(--accent-green)"
                        : "var(--primary-blue)",
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--primary-blue)" }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: getCategoryColor(goal.category),
                    color: "white",
                  }}
                >
                  {goal.category}
                </div>
                <div className="text-sm" style={{ color: "var(--text-gray)" }}>
                  📅 {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => updateGoalProgress(goal.id, -1)}
                  className="px-3 py-2 rounded-lg border transition-colors hover:opacity-80"
                  style={{
                    borderColor: "var(--error-red)",
                    color: "var(--error-red)",
                    backgroundColor: "transparent",
                  }}
                >
                  ➖
                </button>
                <span
                  className="font-medium"
                  style={{ color: "var(--text-dark)" }}
                >
                  {goal.currentValue} / {goal.targetValue}
                </span>
                <button
                  onClick={() => updateGoalProgress(goal.id, 1)}
                  className="px-3 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "var(--accent-green)" }}
                >
                  ➕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsProgress;
