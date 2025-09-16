import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../components/DashbordTabs/Home";
import Journal from "../components/DashbordTabs/Journal";
import MoodTracker from "../components/DashbordTabs/MoodTracker";
import Resources from "../components/DashbordTabs/Resources";
import Community from "../components/DashbordTabs/Community";
import WellnessActivities from "../components/DashbordTabs/WellnessActivities";
import GoalsProgress from "../components/DashbordTabs/GoalsProgress";
import ProfessionalHelp from "../components/DashbordTabs/ProfessionalHelp";
import Settings from "../components/DashbordTabs/Settings";
import Chatbot from "../components/Chatbot.jsx";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [showChatbot, setShowChatbot] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "journal":
        return <Journal />;
      case "mood":
        return <MoodTracker />;
      case "activities":
        return <WellnessActivities />;
      case "goals":
        return <GoalsProgress />;
      case "community":
        return <Community />;
      case "resources":
        return <Resources />;
      case "support":
        return <ProfessionalHelp />;
      case "settings":
        return <Settings onLogout={onLogout} />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#90E0EF]"
      // style={{ backgroundColor: "var(--background-white)" }}
    >
      {/* Top Navigation Bar */}
      <Navbar
        onLogout={onLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="min-h-screen px-8 py-6">{renderTabContent()}</div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-16 h-16 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-2xl"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
        }}
      >
        🤖
      </button>

      {/* Chatbot Component */}
      <Chatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  );
};

export default Dashboard;
