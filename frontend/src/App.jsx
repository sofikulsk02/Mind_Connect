import React, { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";
import OnboardingNew from "./pages/OnboardingNew";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashbord";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowWelcome(false);
    }

    // Check if user has a token
    const token = localStorage.getItem("token");
    const onboardingCompleted = localStorage.getItem("onboardingComplete");

    // Add some debugging
    console.log("🔍 Checking authentication...");
    console.log("Token exists:", !!token);
    console.log("Onboarding completed:", onboardingCompleted);
    console.log("Has visited before:", !!hasVisited);

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
  };

  const handleResetApp = () => {
    localStorage.clear();
    setShowWelcome(true);
    setIsAuthenticated(false);
    setIsOnboardingComplete(false);
    console.log("🔄 App reset - all localStorage cleared");
  };

  const handleLoginSuccess = () => {
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
        <button
          onClick={handleResetApp}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Reset App (Clear Storage)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Debug info - remove this later */}
      <div className="fixed top-4 left-4 bg-white p-2 text-sm border rounded shadow z-50">
        <div>showWelcome: {showWelcome.toString()}</div>
        <div>isAuthenticated: {isAuthenticated.toString()}</div>
        <div>isOnboardingComplete: {isOnboardingComplete.toString()}</div>
        <div>isLoading: {isLoading.toString()}</div>
        <button
          onClick={handleResetApp}
          className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
        >
          Reset App
        </button>
      </div>

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
