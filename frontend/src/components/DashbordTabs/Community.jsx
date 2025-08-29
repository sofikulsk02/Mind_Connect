import React, { useState } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("groups");

  const supportGroups = [
    {
      id: 1,
      name: "Student Support Circle",
      description:
        "A safe space for students dealing with academic stress and mental health challenges",
      members: 342,
      online: 23,
      category: "Students",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      name: "Anxiety Warriors",
      description:
        "Supporting each other through anxiety and panic disorders with coping strategies",
      members: 567,
      online: 45,
      category: "Anxiety",
      color: "from-green-400 to-green-600",
    },
    {
      id: 3,
      name: "Mindful Moments",
      description:
        "Daily mindfulness and meditation practice group for inner peace",
      members: 234,
      online: 12,
      category: "Mindfulness",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 4,
      name: "Depression Support Network",
      description:
        "Understanding and overcoming depression together with compassion",
      members: 445,
      online: 31,
      category: "Depression",
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      author: "Sarah M.",
      group: "Student Support Circle",
      time: "2 hours ago",
      content:
        "Just wanted to share that I finally submitted my thesis today! The anxiety was overwhelming, but I pushed through. Thank you all for the encouragement.",
      likes: 24,
      comments: 8,
      supportType: "Achievement",
    },
    {
      id: 2,
      author: "Alex K.",
      group: "Anxiety Warriors",
      time: "4 hours ago",
      content:
        "Having a rough day with panic attacks. Does anyone have breathing techniques that work quickly?",
      likes: 12,
      comments: 15,
      supportType: "Help Request",
    },
    {
      id: 3,
      author: "Maya L.",
      group: "Mindful Moments",
      time: "6 hours ago",
      content:
        "Sharing my morning meditation routine that's been helping me stay centered. 5 minutes of deep breathing + gratitude journaling.",
      likes: 31,
      comments: 6,
      supportType: "Tip",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Virtual Support Circle",
      group: "Student Support Circle",
      date: "Today",
      time: "7:00 PM",
      participants: 15,
    },
    {
      id: 2,
      title: "Guided Meditation Session",
      group: "Mindful Moments",
      date: "Tomorrow",
      time: "6:30 AM",
      participants: 8,
    },
    {
      id: 3,
      title: "Anxiety Coping Workshop",
      group: "Anxiety Warriors",
      date: "Jan 18",
      time: "3:00 PM",
      participants: 22,
    },
  ];

  const getSupportTypeColor = (type) => {
    switch (type) {
      case "Achievement":
        return "text-white";
      case "Help Request":
        return "text-white";
      case "Tip":
        return "text-white";
      default:
        return "text-gray-800";
    }
  };

  const getSupportTypeBg = (type) => {
    switch (type) {
      case "Achievement":
        return "linear-gradient(135deg, var(--wellness-lavender), var(--wellness-pink))";
      case "Help Request":
        return "linear-gradient(135deg, var(--wellness-orange), #FFB896)";
      case "Tip":
        return "linear-gradient(135deg, var(--wellness-pink), var(--wellness-lavender))";
      default:
        return "var(--wellness-cream)";
    }
  };

  return (
    <div
      className="w-full max-w-none px-4 space-y-8"
      style={{ backgroundColor: "var(--wellness-cream)" }}
    >
      {/* Community Header */}
      <div
        className="rounded-xl p-8 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--wellness-lavender), var(--wellness-pink))",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">MindConnect Community</h2>
        <p className="mb-6" style={{ color: "#F7C6D9" }}>
          Connect with others who understand your journey. Share, support, and
          grow together.
        </p>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm" style={{ color: "#F7C6D9" }}>
              Active Members
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm" style={{ color: "#F7C6D9" }}>
              Online Now
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">456</div>
            <div className="text-sm" style={{ color: "#F7C6D9" }}>
              Posts Today
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex border-b border-gray-200">
          {["groups", "feed", "events"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-medium capitalize ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Support Groups Tab */}
          {activeTab === "groups" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Support Groups
                </h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Create Group
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-full h-2 bg-gradient-to-r ${group.color} rounded-full mb-4`}
                    ></div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {group.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {group.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {group.category}
                      </span>
                      <div className="text-sm text-gray-500">
                        {group.members} members • {group.online} online
                      </div>
                    </div>
                    <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Feed Tab */}
          {activeTab === "feed" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Community Feed
                </h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  New Post
                </button>
              </div>

              {/* Post Composer */}
              <div className="bg-gray-50 rounded-lg p-6">
                <textarea
                  placeholder="Share your thoughts, ask for support, or offer encouragement..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Question
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Victory
                    </button>
                    <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      Support
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Share
                  </button>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {post.author}
                          </p>
                          <p className="text-sm text-gray-500">
                            {post.group} • {post.time}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getSupportTypeColor(
                          post.supportType
                        )}`}
                      >
                        {post.supportType}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-indigo-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-indigo-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Upcoming Events
                </h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Create Event
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {event.group}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📅 {event.date}</span>
                          <span>🕐 {event.time}</span>
                          <span>👥 {event.participants} attending</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Community Guidelines
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Be respectful and supportive of all community members</li>
          <li>• Share experiences without giving medical advice</li>
          <li>• Respect privacy and confidentiality</li>
          <li>• Report any inappropriate content or behavior</li>
        </ul>
      </div>
    </div>
  );
};

export default Community;
