import React, { useState, useEffect, useRef } from "react";

const Journal = () => {
  // Core state
  const [newEntry, setNewEntry] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  // Editor customization state
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [textColor, setTextColor] = useState("#374151");
  const [selectedMood, setSelectedMood] = useState("neutral");
  const [coverImage, setCoverImage] = useState(null);

  // AI Assistant state
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiMode, setAiMode] = useState("suggestions"); // suggestions, ideas, motivation

  // Autosave and version history
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [versionHistory, setVersionHistory] = useState([]);

  // Refs
  const editorRef = useRef(null);
  const autosaveRef = useRef(null);

  // Font options
  const fontOptions = [
    { name: "Inter", value: "Inter" },
    { name: "Georgia", value: "Georgia" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Helvetica", value: "Helvetica" },
    { name: "Playfair Display", value: "Playfair Display" },
    { name: "Merriweather", value: "Merriweather" },
  ];

  // Mood themes
  const moodThemes = {
    happy: {
      bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      accent: "text-orange-600",
    },
    calm: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      accent: "text-blue-600",
    },
    energetic: {
      bg: "bg-gradient-to-br from-pink-50 to-red-50",
      accent: "text-pink-600",
    },
    contemplative: {
      bg: "bg-gradient-to-br from-purple-50 to-indigo-50",
      accent: "text-purple-600",
    },
    peaceful: {
      bg: "bg-gradient-to-br from-green-50 to-teal-50",
      accent: "text-green-600",
    },
    neutral: { bg: "bg-white", accent: "text-gray-600" },
  };

  const tags = [
    "Personal Growth",
    "Daily Reflection",
    "Gratitude",
    "Challenges",
    "Dreams",
    "Relationships",
    "Career",
    "Health",
    "Travel",
    "Creativity",
    "Learning",
    "Mindfulness",
  ];

  const entries = [
    {
      id: 1,
      title: "Morning Reflections",
      date: "Today",
      tags: ["Gratitude", "Personal Growth"],
      content:
        "Had a great conversation with my friend today. Feeling really grateful for the support system in my life...",
      timestamp: "2:30 PM",
      wordCount: 245,
      isPublic: false,
    },
    {
      id: 2,
      title: "Overcoming Challenges",
      date: "Yesterday",
      tags: ["Challenges", "Mindfulness"],
      content:
        "Feeling a bit overwhelmed with upcoming deadlines. Need to remember to take things one step at a time...",
      timestamp: "8:45 PM",
      wordCount: 189,
      isPublic: true,
    },
  ];

  // Mock AI responses
  const getAiSuggestion = (mode) => {
    const suggestions = {
      suggestions: [
        "Consider expanding on how this experience made you feel",
        "Try adding more sensory details to make your story come alive",
        "This is a powerful insight - what led you to this realization?",
      ],
      ideas: [
        "Write about a moment that changed your perspective",
        "Describe a place that brings you peace",
        "Explore a challenge you've overcome recently",
      ],
      motivation: [
        "You're doing great! Your thoughts matter and deserve to be shared",
        "Every word you write is progress. Keep going!",
        "Your unique perspective adds value to the world",
      ],
    };
    return suggestions[mode][
      Math.floor(Math.random() * suggestions[mode].length)
    ];
  };

  // Word count calculation
  useEffect(() => {
    const words = newEntry
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(newEntry.trim() === "" ? 0 : words);
  }, [newEntry]);

  // Autosave functionality
  useEffect(() => {
    if (newEntry.trim() || storyTitle.trim()) {
      if (autosaveRef.current) {
        clearTimeout(autosaveRef.current);
      }
      autosaveRef.current = setTimeout(() => {
        setLastSaved(new Date());
        // Here you would save to localStorage or API
        console.log("Auto-saved story");
      }, 2000);
    }
    return () => {
      if (autosaveRef.current) {
        clearTimeout(autosaveRef.current);
      }
    };
  }, [newEntry, storyTitle]);

  // AI assistance trigger
  const triggerAiSuggestion = (mode) => {
    setIsAiThinking(true);
    setTimeout(() => {
      const suggestion = getAiSuggestion(mode, newEntry);
      setAiSuggestions((prev) => [
        ...prev.slice(-2),
        { mode, text: suggestion, id: Date.now() },
      ]);
      setIsAiThinking(false);
    }, 1000);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const saveVersion = () => {
    if (newEntry.trim()) {
      const version = {
        id: Date.now(),
        title: storyTitle || "Untitled",
        content: newEntry,
        savedAt: new Date(),
        wordCount,
      };
      setVersionHistory((prev) => [version, ...prev.slice(0, 9)]); // Keep last 10 versions
    }
  };

  const loadVersion = (version) => {
    setNewEntry(version.content);
    setStoryTitle(version.title);
  };

  if (!isCreateMode) {
    return (
      <div className="w-full max-w-none px-4 space-y-8">
        {/* Header with Create Story Button */}
        <div
          className="rounded-xl p-8 text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Journal</h2>
              <p className="text-white/80">
                Express your thoughts, share your stories, and connect with your
                inner self
              </p>
            </div>
            <button
              onClick={() => setIsCreateMode(true)}
              className="bg-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ color: "var(--primary-blue)" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--light-blue)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              ✨ Create Story
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 wellness-transition wellness-hover">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-2xl font-bold" style={{ color: "#A88CF0" }}>
              {entries.length}
            </div>
            <div className="text-sm text-[#666666]">Total Stories</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 wellness-transition wellness-hover">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold" style={{ color: "#FF9B71" }}>
              7
            </div>
            <div className="text-sm text-[#666666]">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">💭</div>
            <div className="text-2xl font-bold text-purple-600">1,234</div>
            <div className="text-sm text-gray-600">Words Written</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Public Stories</div>
          </div>
        </div>

        {/* Recent Stories */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Stories
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-800">
                        {entry.title}
                      </h4>
                      {entry.isPublic && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Public
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {entry.content}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {entry.date} • {entry.timestamp}
                      </span>
                      <span>{entry.wordCount} words</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Create Story Mode - Full Writing Interface
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${moodThemes[selectedMood].bg}`}
    >
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCreateMode(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Create Your Story
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => setIsDistractionFree(!isDistractionFree)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                title="Distraction-free mode"
              >
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor Area */}
          <div
            className={`${
              isDistractionFree ? "col-span-4" : "col-span-3"
            } transition-all duration-300`}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 min-h-[600px]">
              {/* Story Title */}
              <div className="p-6 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Enter your story title..."
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent"
                  style={{ fontFamily, fontSize: fontSize + 4 }}
                />
              </div>

              {/* Writing Area */}
              <div className="p-6">
                <textarea
                  ref={editorRef}
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Start writing your story... Let your thoughts flow freely."
                  className="w-full min-h-[400px] resize-none border-none outline-none bg-transparent leading-relaxed"
                  style={{
                    fontFamily,
                    fontSize: fontSize + "px",
                    color: textColor,
                    lineHeight: "1.7",
                  }}
                />
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{Math.ceil(wordCount / 200)} min read</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={saveVersion}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Save Your Story
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Make It Public
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Settings & AI Assistant */}
          {!isDistractionFree && (
            <div className="col-span-1 space-y-4">
              {/* Text Customization */}
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">
                  ✨ Text Style
                </h3>

                {/* Font Family */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex space-x-2">
                    {[
                      "#374151",
                      "#1f2937",
                      "#7c3aed",
                      "#dc2626",
                      "#059669",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          textColor === color
                            ? "border-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story Settings */}
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">
                  📚 Story Settings
                </h3>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => toggleTag(tag)}
                          className="ml-1 text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tags
                      .filter((tag) => !selectedTags.includes(tag))
                      .slice(0, 6)
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Cover Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <div
                    onClick={() => setCoverImage("placeholder")}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    {coverImage ? (
                      <div className="text-green-600">✓ Image uploaded</div>
                    ) : (
                      <div className="text-gray-500">
                        <svg
                          className="w-8 h-8 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Click to upload
                      </div>
                    )}
                  </div>
                </div>

                {/* Mood Board */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(moodThemes).map(([mood, theme]) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`p-2 rounded-lg text-xs capitalize transition-all ${
                          selectedMood === mood
                            ? "ring-2 ring-indigo-400 " + theme.bg
                            : theme.bg + " hover:ring-1 hover:ring-gray-300"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Writing Assistant */}
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">
                  🤖 AI Writing Assistant
                </h3>

                {/* AI Mode Selector */}
                <div className="mb-4">
                  <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {["suggestions", "ideas", "motivation"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setAiMode(mode)}
                        className={`flex-1 py-2 px-3 rounded-md text-xs font-medium capitalize transition-colors ${
                          aiMode === mode
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {aiSuggestions
                    .filter((suggestion) => suggestion.mode === aiMode)
                    .slice(-3)
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700"
                      >
                        {suggestion.text}
                      </div>
                    ))}
                  {isAiThinking && (
                    <div className="bg-indigo-50 p-3 rounded-lg text-sm text-indigo-600 flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full mr-2"></div>
                      AI is thinking...
                    </div>
                  )}
                </div>

                {/* AI Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => triggerAiSuggestion(aiMode)}
                    disabled={isAiThinking}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50"
                  >
                    Get{" "}
                    {aiMode === "suggestions"
                      ? "Writing Tips"
                      : aiMode === "ideas"
                      ? "Story Ideas"
                      : "Motivation"}
                  </button>
                </div>
              </div>

              {/* Version History */}
              {versionHistory.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    📝 Version History
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {versionHistory.slice(0, 5).map((version) => (
                      <button
                        key={version.id}
                        onClick={() => loadVersion(version)}
                        className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-800">
                          {version.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {version.savedAt.toLocaleString()} •{" "}
                          {version.wordCount} words
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
