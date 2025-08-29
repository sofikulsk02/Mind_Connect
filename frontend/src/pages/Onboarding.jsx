import React, { useState } from "react";
import axios from "axios";

const Onboarding = ({ onOnboardingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
    moodRating: 3,
    reasonsForJoining: [],
    mentalHealthGoals: [],
    routineFrequency: "",
    preferredSupport: [],
    accessibilityNeeds: [],
    preferredNotificationMethod: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, values) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSingleCheckboxChange = (name, value, checked) => {
    const currentValues = formData[name];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    handleCheckboxChange(name, newValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists
    if (!token) {
      showToast(
        "Authentication Required",
        "error",
        "Please log in first to complete onboarding."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/onboarding",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("Submitted successfully!", "success");
      console.log(res.data);

      // Navigate to dashboard after successful onboarding
      if (onOnboardingComplete) {
        setTimeout(() => {
          onOnboardingComplete();
        }, 1500); // Give user time to see the success message
      }
    } catch (err) {
      console.error("Error details:", err);
      if (err.response?.status === 401) {
        showToast(
          "Authentication failed",
          "error",
          "Please log in again to continue."
        );
      } else {
        showToast(
          "Error submitting",
          "error",
          err.response?.data?.message || "Something went wrong"
        );
      }
      console.error(err);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
  const fieldClasses = "mb-4";

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        style={{ zIndex: -1 }}
      >
        <source src="/2218727-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Complete Your Onboarding
          </h1>

          <div className={fieldClasses}>
            <label className={labelClasses}>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Country</label>
            <input
              name="country"
              onChange={handleChange}
              placeholder="Enter your country"
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Languages</label>
            <input
              name="language"
              placeholder="English, Hindi"
              onChange={(e) =>
                handleCheckboxChange("language", e.target.value.split(", "))
              }
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Occupation</label>
            <input
              name="occupation"
              onChange={handleChange}
              placeholder="Enter your occupation"
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Relationship Status</label>
            <select
              name="relationshipStatus"
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="In a relationship">In a relationship</option>
            </select>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Living Situation</label>
            <input
              name="livingSituation"
              onChange={handleChange}
              placeholder="Describe your living situation"
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Mood Rating (1-5)</label>
            <input
              type="number"
              name="moodRating"
              min={1}
              max={5}
              defaultValue={3}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Reasons for Joining</label>
            <div className="space-y-2">
              {["Stress", "Anxiety", "Depression", "Personal Growth"].map(
                (reason) => (
                  <label key={reason} className="flex items-center">
                    <input
                      type="checkbox"
                      value={reason}
                      onChange={(e) =>
                        handleSingleCheckboxChange(
                          "reasonsForJoining",
                          reason,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{reason}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Mental Health Goals</label>
            <div className="space-y-2">
              {["Improve sleep", "Reduce stress", "Build confidence"].map(
                (goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      value={goal}
                      onChange={(e) =>
                        handleSingleCheckboxChange(
                          "mentalHealthGoals",
                          goal,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{goal}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Routine Frequency</label>
            <select
              name="routineFrequency"
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select</option>
              <option value="Never">Never</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
            </select>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Preferred Support</label>
            <div className="space-y-2">
              {["Articles", "Community groups", "Therapist", "Exercises"].map(
                (support) => (
                  <label key={support} className="flex items-center">
                    <input
                      type="checkbox"
                      value={support}
                      onChange={(e) =>
                        handleSingleCheckboxChange(
                          "preferredSupport",
                          support,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {support}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>Accessibility Needs</label>
            <div className="space-y-2">
              {["Text size", "Color contrast", "Screen reader"].map((need) => (
                <label key={need} className="flex items-center">
                  <input
                    type="checkbox"
                    value={need}
                    onChange={(e) =>
                      handleSingleCheckboxChange(
                        "accessibilityNeeds",
                        need,
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{need}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={fieldClasses}>
            <label className={labelClasses}>
              Preferred Notification Method
            </label>
            <select
              name="preferredNotificationMethod"
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select</option>
              <option value="In-app">In-app</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Submit Onboarding
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
