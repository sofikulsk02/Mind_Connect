import React, { useState } from "react";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Resources", count: 24 },
    { id: "anxiety", name: "Anxiety", count: 8 },
    { id: "depression", name: "Depression", count: 6 },
    { id: "stress", name: "Stress Management", count: 5 },
    { id: "mindfulness", name: "Mindfulness", count: 5 },
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Complete Guide",
      type: "Article",
      category: "anxiety",
      duration: "8 min read",
      description:
        "Learn about different types of anxiety disorders and evidence-based coping strategies.",
      author: "Dr. Sarah Johnson",
      rating: 4.8,
      thumbnail: "📰",
      featured: true,
    },
    {
      id: 2,
      title: "Guided Meditation for Beginners",
      type: "Video",
      category: "mindfulness",
      duration: "15 minutes",
      description:
        "A gentle introduction to meditation with step-by-step guidance for stress relief.",
      author: "Mindful Living Institute",
      rating: 4.9,
      thumbnail: "🎥",
      featured: true,
    },
    {
      id: 3,
      title: "The Mental Health Podcast",
      type: "Podcast",
      category: "depression",
      duration: "45 minutes",
      description:
        "Weekly discussions about mental health awareness, treatment options, and personal stories.",
      author: "Mental Health Experts",
      rating: 4.7,
      thumbnail: "🎧",
      featured: false,
    },
    {
      id: 4,
      title: "Breathing Techniques for Panic Attacks",
      type: "Video",
      category: "anxiety",
      duration: "10 minutes",
      description:
        "Learn quick and effective breathing exercises to manage panic attacks and acute anxiety.",
      author: "Dr. Michael Chen",
      rating: 4.9,
      thumbnail: "🎥",
      featured: false,
    },
    {
      id: 5,
      title: "Building Resilience in Difficult Times",
      type: "Article",
      category: "stress",
      duration: "12 min read",
      description:
        "Practical strategies for developing emotional resilience and coping with life's challenges.",
      author: "Dr. Emma Wilson",
      rating: 4.6,
      thumbnail: "📰",
      featured: false,
    },
    {
      id: 6,
      title: "Sleep and Mental Health Connection",
      type: "Podcast",
      category: "stress",
      duration: "32 minutes",
      description:
        "Exploring the relationship between sleep quality and mental well-being.",
      author: "Sleep & Wellness Experts",
      rating: 4.8,
      thumbnail: "🎧",
      featured: false,
    },
  ];

  const tools = [
    {
      id: 1,
      name: "Mood Tracking App",
      description: "Track your daily mood patterns and identify triggers",
      icon: "📱",
      category: "Mobile App",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Crisis Text Line",
      description: "24/7 crisis support via text message",
      icon: "💬",
      category: "Crisis Support",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Headspace",
      description: "Guided meditation and mindfulness exercises",
      icon: "🧘‍♀️",
      category: "Meditation",
      rating: 4.7,
    },
    {
      id: 4,
      name: "SAMHSA Helpline",
      description: "National helpline for mental health and substance abuse",
      icon: "📞",
      category: "Crisis Support",
      rating: 4.8,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "Article":
        return "bg-blue-100 text-blue-800";
      case "Video":
        return "bg-red-100 text-red-800";
      case "Podcast":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="w-full max-w-none px-4 space-y-8"
      style={{ backgroundColor: "var(--wellness-cream)" }}
    >
      {/* Header */}
      <div
        className="rounded-xl p-8 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--wellness-lavender), var(--wellness-pink))",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Mental Health Resources</h2>
        <p className="mb-6" style={{ color: "#F7C6D9" }}>
          Discover evidence-based articles, videos, podcasts, and tools to
          support your mental health journey.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="w-full px-4 py-3 pl-10 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none"
            style={{ "::placeholder": { color: "#F7C6D9" } }}
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5"
            style={{ color: "#F7C6D9" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Browse by Category
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full border-2 transition-colors ${
                activeCategory === category.id
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      {activeCategory === "all" && (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Featured Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources
              .filter((r) => r.featured)
              .map((resource) => (
                <div
                  key={resource.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{resource.thumbnail}</span>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                            resource.type
                          )}`}
                        >
                          {resource.type}
                        </span>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">
                            {resource.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {resource.duration}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {resource.description}
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    By {resource.author}
                  </p>
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Access Resource
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {activeCategory === "all"
            ? "All Resources"
            : `${
                categories.find((c) => c.id === activeCategory)?.name
              } Resources`}
        </h3>

        {filteredResources.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No resources found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{resource.thumbnail}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-800">
                        {resource.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>By {resource.author}</span>
                      <span>★ {resource.rating}</span>
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mental Health Tools */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Recommended Tools & Apps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                    <span className="text-xs text-gray-500">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {tool.rating}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <h4 className="text-lg font-semibold text-red-800 mb-3">
          Crisis & Emergency Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-red-700">
              National Suicide Prevention Lifeline
            </p>
            <p className="text-red-600">988 (Available 24/7)</p>
          </div>
          <div>
            <p className="font-medium text-red-700">Crisis Text Line</p>
            <p className="text-red-600">Text HOME to 741741</p>
          </div>
          <div>
            <p className="font-medium text-red-700">SAMHSA National Helpline</p>
            <p className="text-red-600">1-800-662-HELP (4357)</p>
          </div>
          <div>
            <p className="font-medium text-red-700">Emergency Services</p>
            <p className="text-red-600">911 (For immediate danger)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
