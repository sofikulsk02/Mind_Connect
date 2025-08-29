import React, { useState } from "react";
import axios from "axios";

const Onboarding = ({ onOnboardingComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (title, status, description = "") => {
    alert(`${status.toUpperCase()}: ${title}\n${description}`);
  };

  const [formData, setFormData] = useState({
    dob: "",
    gender: "",
    country: "",
    language: [],
    occupation: "",
    relationshipStatus: "",
    livingSituation: "",
    moodRating: 5,
    reasonsForJoining: [],
    mentalHealthGoals: [],
    routineFrequency: "",
    preferredSupport: [],
    accessibilityNeeds: "",
    preferredNotificationMethod: "",
  });

  const questions = [
    {
      id: "welcome",
      title: "Welcome to MindConnect!",
      subtitle: "Let's personalize your mental wellness journey",
      type: "welcome",
    },
    {
      id: "dob",
      title: "When were you born?",
      subtitle: "This helps us provide age-appropriate content",
      type: "date",
      field: "dob",
      required: true,
    },
    {
      id: "gender",
      title: "How do you identify?",
      subtitle:
        "We respect all identities and this helps personalize your experience",
      type: "select",
      field: "gender",
      options: ["Male", "Female", "Non-binary", "Other", "Prefer not to say"],
    },
    {
      id: "country",
      title: "Where are you located?",
      subtitle: "This helps us provide relevant resources and support",
      type: "input",
      field: "country",
      placeholder: "e.g., United States, Canada, India",
    },
    {
      id: "occupation",
      title: "What do you do for work or study?",
      subtitle:
        "Understanding your daily environment helps us provide better support",
      type: "input",
      field: "occupation",
      placeholder: "e.g., Student, Teacher, Engineer, Healthcare Worker",
    },
    {
      id: "mood",
      title: "How are you feeling right now?",
      subtitle: "Rate your current mood on a scale of 1-10",
      type: "slider",
      field: "moodRating",
      min: 1,
      max: 10,
      labels: ["Very Low", "Low", "Okay", "Good", "Great"],
    },
    {
      id: "reasons",
      title: "What brought you to MindConnect today?",
      subtitle: "Select all that resonate with you",
      type: "multiselect",
      field: "reasonsForJoining",
      options: [
        { value: "Stress management", emoji: "😤" },
        { value: "Anxiety support", emoji: "😰" },
        { value: "Depression help", emoji: "😔" },
        { value: "Better sleep", emoji: "😴" },
        { value: "Emotional regulation", emoji: "😌" },
        { value: "Self-improvement", emoji: "🌱" },
        { value: "Professional guidance", emoji: "👨‍⚕️" },
        { value: "Community support", emoji: "🤝" },
      ],
    },
    {
      id: "goals",
      title: "What are your wellness goals?",
      subtitle: "Choose what you'd like to work on",
      type: "multiselect",
      field: "mentalHealthGoals",
      options: [
        { value: "Reduce anxiety", emoji: "🧘‍♀️" },
        { value: "Improve mood", emoji: "😊" },
        { value: "Better coping skills", emoji: "💪" },
        { value: "Increase self-awareness", emoji: "🧠" },
        { value: "Build resilience", emoji: "🌿" },
        { value: "Improve relationships", emoji: "❤️" },
        { value: "Better work-life balance", emoji: "⚖️" },
        { value: "Develop healthy habits", emoji: "🏃‍♀️" },
      ],
    },
    {
      id: "frequency",
      title: "How often would you like to engage with wellness tools?",
      subtitle: "We'll customize your experience based on your preference",
      type: "select",
      field: "routineFrequency",
      options: ["Daily", "Few times a week", "Weekly", "Monthly", "As needed"],
    },
    {
      id: "support",
      title: "What type of support appeals to you most?",
      subtitle: "Select all that interest you",
      type: "multiselect",
      field: "preferredSupport",
      options: [
        { value: "Self-guided tools", emoji: "📱" },
        { value: "Peer support groups", emoji: "👥" },
        { value: "Professional therapy", emoji: "👨‍⚕️" },
        { value: "AI-powered assistance", emoji: "🤖" },
        { value: "Educational resources", emoji: "📚" },
        { value: "Mindfulness exercises", emoji: "🧘‍♀️" },
        { value: "Goal tracking", emoji: "📊" },
        { value: "Community forums", emoji: "💬" },
      ],
    },
    {
      id: "notifications",
      title: "How would you like to stay connected?",
      subtitle: "Choose your preferred way to receive updates and reminders",
      type: "select",
      field: "preferredNotificationMethod",
      options: ["Push notifications", "Email", "SMS", "None"],
    },
    {
      id: "complete",
      title: "You're all set! 🎉",
      subtitle: "Welcome to your personalized mental wellness journey",
      type: "complete",
    },
  ];

  const token = localStorage.getItem("token");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    const current = formData[field];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!token) {
      showToast(
        "Authentication Required",
        "error",
        "Please log in first to complete onboarding."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/user/onboarding", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("Welcome to MindConnect!", "success");

      if (onOnboardingComplete) {
        setTimeout(() => {
          onOnboardingComplete();
        }, 2000);
      }
    } catch (err) {
      console.error("Error details:", err);
      showToast(
        "Error completing onboarding",
        "error",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    return (
      <div className="text-center space-y-6">
        {/* Question Header */}

        <div className="space-y-3">
          <h2
            className={`text-2xl md:text-4xl font-bold text-black ${
              question.id === "welcome" ? "pacifico-regular" : ""
            }`}
          >
            {question.title}
          </h2>
          <p className="text-base text-slate-700 max-w-md mx-auto">
            {question.subtitle}
          </p>
        </div>

        {/* Question Content */}
        <div className="max-w-lg mx-auto">
          {question.type === "welcome" && (
            <div className="space-y-4">
              <div className="text-4xl">🌟</div>
              <p className="text-red-900 text-sm">
                This will only take a few minutes and will help us create a
                personalized experience for you.
              </p>
            </div>
          )}

          {question.type === "date" && (
            <input
              type="date"
              value={formData[question.field]}
              onChange={(e) => handleChange(question.field, e.target.value)}
              className="w-full px-4 py-3 text-base border-2 border-white/50 bg-white/10 text-white rounded-xl focus:border-white focus:bg-white/20 focus:outline-none transition-colors placeholder-white/70"
              required={question.required}
            />
          )}

          {question.type === "input" && (
            <input
              type="text"
              value={formData[question.field]}
              onChange={(e) => handleChange(question.field, e.target.value)}
              placeholder={question.placeholder}
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-center"
            />
          )}

          {question.type === "select" && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange(question.field, option)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-base ${
                    formData[question.field] === option
                      ? "border-white bg-white/20 text-white font-medium"
                      : "border-white/50 hover:border-white text-white/90 hover:bg-white/10"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === "slider" && (
            <div className="space-y-4">
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-indigo-600 mb-3">
                  {formData[question.field]}/10
                </div>
                <input
                  type="range"
                  min={question.min}
                  max={question.max}
                  value={formData[question.field]}
                  onChange={(e) =>
                    handleChange(question.field, parseInt(e.target.value))
                  }
                  className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-white/80 mt-3">
                  <span>{question.labels[0]}</span>
                  <span>{question.labels[question.labels.length - 1]}</span>
                </div>
              </div>
            </div>
          )}

          {question.type === "multiselect" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((option) => {
                const value =
                  typeof option === "string" ? option : option.value;
                const emoji = typeof option === "object" ? option.emoji : "";
                const isSelected = formData[question.field].includes(value);

                return (
                  <button
                    key={value}
                    onClick={() => handleMultiSelect(question.field, value)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-white bg-white/20 text-white"
                        : "border-white/50 hover:border-white text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {emoji && <span className="text-xl">{emoji}</span>}
                      <span className="font-medium text-sm">{value}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "complete" && (
            <div className="space-y-4">
              <div className="text-4xl">🎉</div>
              <p className="text-base text-white/90">
                Your personalized dashboard is ready! Let's begin your wellness
                journey.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
        onError={(e) => console.error("Video failed to load:", e)}
        onLoadStart={() => console.log("Video loading started")}
        onCanPlay={() => console.log("Video can play")}
      >
        <source
          src="../../public/2218727-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video> */}
      {/* Fallback background if video doesn't load */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-gradient-to-br bg-[#D3A790]"
        style={{ zIndex: -2 }}
      ></div>
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-center mb-3">
            <div className="light-container rounded-full px-3 py-1">
              <span className="text-xs font-medium text-white">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
          <div className="w-full light-container rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="solid-container p-6 md:p-8">
          {renderQuestion()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentQuestion
                      ? "bg-indigo-500"
                      : index < currentQuestion
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                disabled={
                  questions[currentQuestion].required &&
                  !formData[questions[currentQuestion].field]
                }
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {questions[currentQuestion].type === "welcome"
                  ? "Let's Start"
                  : "Continue"}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Completing..." : "Enter Dashboard"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
