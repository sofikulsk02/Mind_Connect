import React, { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";
import OnboardingNew from "./pages/OnboardingNew";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashbord";
import Shutter from "./pages/Shutter";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showShutter, setShowShutter] = useState(false);

  useEffect(() => {
    // Always show welcome page first - removed hasVisited check

    // Check if user has a token
    const token = localStorage.getItem("token");
    const onboardingCompleted = localStorage.getItem("onboardingComplete");

    // Add some debugging
    console.log("🔍 Checking authentication...");
    console.log("Token exists:", !!token);
    console.log("Onboarding completed:", onboardingCompleted);

    if (token) {
      setIsAuthenticated(true);
      if (onboardingCompleted === "true") {
        setIsOnboardingComplete(true);
      }
    }
    setIsLoading(false);
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("hasVisited", "true");
    setShowWelcome(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("onboardingComplete");
    setIsAuthenticated(false);
    setIsOnboardingComplete(false);
    setShowWelcome(true); // Show welcome page after logout
  };

  const handleLoginSuccess = () => {
    setShowShutter(true); // Trigger shutter animation
    // Don't set isAuthenticated immediately - wait for shutter animation
  };

  const handleShutterComplete = () => {
    setShowShutter(false);
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setIsOnboardingComplete(true);
  };

  if (isLoading) {
    return (
      <div className="bg-amber-400 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Shutter Animation Overlay */}
      {showShutter && <Shutter onAnimationComplete={handleShutterComplete} />}

      {showWelcome ? (
        <Welcome onGetStarted={handleGetStarted} />
      ) : !isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : !isOnboardingComplete ? (
        <div className="min-h-screen">
          <OnboardingNew onOnboardingComplete={handleOnboardingComplete} />
        </div>
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
