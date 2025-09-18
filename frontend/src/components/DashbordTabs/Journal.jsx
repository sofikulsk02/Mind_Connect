import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { journalAPI, draftManager, themeManager } from "../../utils/journalAPI";

const Journal = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Core state
  const [newEntry, setNewEntry] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [privacySetting, setPrivacySetting] = useState("private"); // private, friends, public
  const [currentView, setCurrentView] = useState("write"); // write, my-journals, community

  // Community interaction state
  const [journalEntries, setJournalEntries] = useState([]);
  const [communityEntries, setCommunityEntries] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  // Editor customization state
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [textColor, setTextColor] = useState("#374151");
  const [selectedMood, setSelectedMood] = useState("neutral");
  const [coverImage, setCoverImage] = useState(null);

  // Autosave and draft state
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [isDraft, setIsDraft] = useState(true);
  const [savedDrafts, setSavedDrafts] = useState([]);

  // Refs
  const editorRef = useRef(null);
  const autosaveRef = useRef(null);

  // Mock current user (this would come from auth context)
  const currentUser = useMemo(
    () => ({
      id: 1,
      name: "Sofikul",
      avatar: "👤",
    }),
    []
  );

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
      bg: isDarkMode
        ? "bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
        : "bg-gradient-to-br from-yellow-50 to-orange-50",
      accent: "text-orange-600",
    },
    calm: {
      bg: isDarkMode
        ? "bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
        : "bg-gradient-to-br from-[#90e0ef]/10 to-[#ade8f4]/10",
      accent: "text-[#0077b6]",
    },
    energetic: {
      bg: isDarkMode
        ? "bg-gradient-to-br from-pink-900/20 to-red-900/20"
        : "bg-gradient-to-br from-pink-50 to-red-50",
      accent: "text-pink-600",
    },
    contemplative: {
      bg: isDarkMode
        ? "bg-gradient-to-br from-purple-900/20 to-indigo-900/20"
        : "bg-gradient-to-br from-[#00b4d8]/10 to-[#0077b6]/10",
      accent: "text-[#0077b6]",
    },
    peaceful: {
      bg: isDarkMode
        ? "bg-gradient-to-br from-green-900/20 to-teal-900/20"
        : "bg-gradient-to-br from-green-50 to-teal-50",
      accent: "text-green-600",
    },
    neutral: {
      bg: isDarkMode ? "bg-gray-800" : "bg-white",
      accent: isDarkMode ? "text-gray-300" : "text-gray-600",
    },
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
    "Family",
    "Friends",
    "Goals",
    "Memories",
  ];

  // Initialize data from backend
  useEffect(() => {
    // Mock journal entries data (fallback)
    const mockJournalEntries = [
      {
        id: 1,
        title: "Morning Reflections",
        content:
          "Had a great conversation with my friend today. Feeling really grateful for the support system in my life. Sometimes it's the small moments that matter most...",
        author: currentUser,
        date: new Date(),
        tags: ["Gratitude", "Personal Growth"],
        privacy: "private",
        likes: 0,
        comments: [],
        isDraft: false,
        wordCount: 245,
      },
      {
        id: 2,
        title: "Overcoming Challenges",
        content:
          "Today was tough, but I managed to push through some difficult situations. Learning to be more patient with myself and others...",
        author: currentUser,
        date: new Date(Date.now() - 86400000),
        tags: ["Challenges", "Mindfulness"],
        privacy: "friends",
        likes: 3,
        comments: [
          {
            id: 1,
            author: "Alex",
            content: "Keep going! You're doing great!",
            timestamp: new Date(),
          },
        ],
        isDraft: false,
        wordCount: 189,
      },
    ];

    // Mock community entries (fallback)
    const mockCommunityEntries = [
      {
        id: 3,
        title: "Finding Peace in Nature",
        content:
          "Spent the morning hiking and reflecting on life. Nature has this incredible way of putting everything into perspective...",
        author: { id: 2, name: "Alex", avatar: "🌟" },
        date: new Date(Date.now() - 172800000),
        tags: ["Nature", "Mindfulness", "Peace"],
        privacy: "public",
        likes: 12,
        comments: [
          {
            id: 1,
            author: "Sarah",
            content: "Beautiful reflection! Nature is so healing.",
            timestamp: new Date(),
          },
          {
            id: 2,
            author: "Mike",
            content: "Thanks for sharing this. I needed to read this today.",
            timestamp: new Date(),
          },
        ],
        isDraft: false,
        wordCount: 156,
      },
      {
        id: 4,
        title: "Lessons from Failure",
        content:
          "Failed at something important today, but I'm choosing to see it as a learning opportunity. Growth happens outside our comfort zone...",
        author: { id: 3, name: "Sarah", avatar: "💫" },
        date: new Date(Date.now() - 259200000),
        tags: ["Growth", "Resilience", "Learning"],
        privacy: "public",
        likes: 8,
        comments: [
          {
            id: 1,
            author: "Sofikul",
            content: "This is so inspiring! Thank you for being vulnerable.",
            timestamp: new Date(),
          },
        ],
        isDraft: false,
        wordCount: 134,
      },
    ];

    const initializeData = async () => {
      try {
        // Load user's journals
        const userJournalsResponse = await journalAPI.getUserJournals();
        setJournalEntries(userJournalsResponse.data || []);

        // Load community journals
        const communityResponse = await journalAPI.getCommunityJournals();
        setCommunityEntries(communityResponse.data || []);

        // Initialize likes and comments state
        const allEntries = [
          ...(userJournalsResponse.data || []),
          ...(communityResponse.data || []),
        ];
        const likesData = {};
        const commentsData = {};

        allEntries.forEach((entry) => {
          likesData[entry._id || entry.id] = {
            count: entry.likeCount || entry.likes?.length || 0,
            liked: entry.isLikedBy?.(currentUser.id) || false,
          };
          commentsData[entry._id || entry.id] = entry.comments || [];
        });

        setLikes(likesData);
        setComments(commentsData);

        // Load saved drafts from localStorage
        const localDrafts = draftManager.getLocalDrafts();
        setSavedDrafts(localDrafts);
      } catch (error) {
        console.error("Failed to initialize data:", error);
        // Fallback to mock data if API fails
        setJournalEntries(mockJournalEntries);
        setCommunityEntries(mockCommunityEntries);

        const allEntries = [...mockJournalEntries, ...mockCommunityEntries];
        const likesData = {};
        const commentsData = {};

        allEntries.forEach((entry) => {
          likesData[entry.id] = { count: entry.likes, liked: false };
          commentsData[entry.id] = entry.comments;
        });

        setLikes(likesData);
        setComments(commentsData);
      }
    };

    initializeData();
  }, [currentUser]);

  // Word count calculation
  useEffect(() => {
    const words = newEntry
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(newEntry.trim() === "" ? 0 : words);
  }, [newEntry]);

  // Functions
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    themeManager.saveTheme(newTheme);
  };

  const saveDraft = useCallback(async () => {
    if (newEntry.trim() || storyTitle.trim()) {
      const draftData = {
        title: storyTitle || "Untitled",
        content: newEntry,
        tags: selectedTags,
        mood: selectedMood,
        privacy: privacySetting,
        wordCount,
        fontSettings: {
          fontFamily,
          fontSize,
          textColor,
        },
      };

      try {
        // Try to save to backend first
        const response = await journalAPI.saveDraft(draftData);

        // Also save locally as backup
        const localDraft = draftManager.saveDraftLocally(draftData);
        setSavedDrafts((prev) => [
          localDraft,
          ...prev.filter((d) => d.id !== localDraft.id),
        ]);

        setLastSaved(new Date());
        setIsDraft(true);

        console.log("Draft saved successfully:", response);
      } catch (error) {
        console.error(
          "Failed to save draft to backend, saving locally:",
          error
        );

        // Fallback to local storage only
        const localDraft = draftManager.saveDraftLocally(draftData);
        setSavedDrafts((prev) => [
          localDraft,
          ...prev.filter((d) => d.id !== localDraft.id),
        ]);

        setLastSaved(new Date());
        setIsDraft(true);
      }
    }
  }, [
    newEntry,
    storyTitle,
    selectedTags,
    selectedMood,
    privacySetting,
    wordCount,
    fontFamily,
    fontSize,
    textColor,
  ]);

  // Autosave functionality
  useEffect(() => {
    if (newEntry.trim() || storyTitle.trim()) {
      if (autosaveRef.current) {
        clearTimeout(autosaveRef.current);
      }
      autosaveRef.current = setTimeout(() => {
        saveDraft();
      }, 2000);
    }
    return () => {
      if (autosaveRef.current) {
        clearTimeout(autosaveRef.current);
      }
    };
  }, [newEntry, storyTitle, saveDraft]);

  // Theme persistence
  useEffect(() => {
    const savedTheme = themeManager.getTheme();
    setIsDarkMode(savedTheme);
  }, []);

  // Theme classes
  const themeClasses = {
    primary: isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900",
    secondary: isDarkMode
      ? "bg-gray-800 text-gray-200"
      : "bg-gray-50 text-gray-700",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    input: isDarkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-gray-900 border-gray-300",
    button: isDarkMode
      ? "bg-gray-700 hover:bg-gray-600"
      : "bg-gray-100 hover:bg-gray-200",
  };

  const publishEntry = async () => {
    if (newEntry.trim() && storyTitle.trim()) {
      const journalData = {
        title: storyTitle,
        content: newEntry,
        tags: selectedTags,
        privacy: privacySetting,
        mood: selectedMood,
        isDraft: false,
        fontSettings: {
          fontFamily,
          fontSize,
          textColor,
        },
      };

      try {
        const response = await journalAPI.createJournal(journalData);
        const newJournalEntry = response.data;

        // Update local state
        setJournalEntries((prev) => [newJournalEntry, ...prev]);

        // If public, also add to community entries
        if (privacySetting === "public") {
          setCommunityEntries((prev) => [newJournalEntry, ...prev]);
        }

        // Initialize likes and comments for new entry
        const entryId = newJournalEntry._id || newJournalEntry.id;
        setLikes((prev) => ({
          ...prev,
          [entryId]: { count: 0, liked: false },
        }));
        setComments((prev) => ({ ...prev, [entryId]: [] }));

        // Clear form
        setNewEntry("");
        setStoryTitle("");
        setSelectedTags([]);
        setPrivacySetting("private");
        setIsDraft(false);
        setIsCreateMode(false);
        setCurrentView("my-journals");

        console.log("Journal published successfully:", response);
      } catch (error) {
        console.error("Failed to publish journal:", error);
        alert("Failed to publish journal. Please try again.");
      }
    }
  };

  const toggleLike = async (entryId) => {
    try {
      const response = await journalAPI.toggleLike(entryId);

      setLikes((prev) => ({
        ...prev,
        [entryId]: {
          count: response.data.likeCount,
          liked: response.data.liked,
        },
      }));

      console.log("Like toggled successfully:", response);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Fallback to local state update
      setLikes((prev) => {
        const current = prev[entryId] || { count: 0, liked: false };
        return {
          ...prev,
          [entryId]: {
            count: current.liked ? current.count - 1 : current.count + 1,
            liked: !current.liked,
          },
        };
      });
    }
  };

  const addComment = async (entryId) => {
    if (newComment.trim()) {
      try {
        const response = await journalAPI.addComment(
          entryId,
          newComment.trim()
        );
        const comment = response.data;

        setComments((prev) => ({
          ...prev,
          [entryId]: [...(prev[entryId] || []), comment],
        }));

        setNewComment("");
        setActiveCommentId(null);

        console.log("Comment added successfully:", response);
      } catch (error) {
        console.error("Failed to add comment:", error);

        // Fallback to local state update
        const fallbackComment = {
          id: Date.now(),
          author: currentUser.name,
          content: newComment.trim(),
          timestamp: new Date(),
        };

        setComments((prev) => ({
          ...prev,
          [entryId]: [...(prev[entryId] || []), fallbackComment],
        }));

        setNewComment("");
        setActiveCommentId(null);

        alert("Failed to save comment to server, but added locally.");
      }
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const loadDraft = (draft) => {
    setNewEntry(draft.content);
    setStoryTitle(draft.title);
    setSelectedTags(draft.tags);
    setSelectedMood(draft.mood);
    setPrivacySetting(draft.privacy);
    setIsCreateMode(true);
    setCurrentView("write");
  };

  // Render functions
  const renderJournalCard = (entry, showInteractions = true) => (
    <div
      key={entry.id}
      className={`${themeClasses.primary} rounded-xl shadow-lg border ${themeClasses.border} overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{entry.author.avatar}</div>
            <div>
              <h3 className="font-semibold">{entry.author.name}</h3>
              <p className="text-sm text-gray-500">
                {entry.date.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                entry.privacy === "public"
                  ? "bg-green-100 text-green-700"
                  : entry.privacy === "friends"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {entry.privacy}
            </span>
            {entry.isDraft && (
              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                Draft
              </span>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3">{entry.title}</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-xs bg-[#90e0ef]/20 text-[#0077b6]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{entry.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            {entry.wordCount} words • {Math.ceil(entry.wordCount / 200)} min
            read
          </span>
        </div>

        {showInteractions && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(entry.id)}
                  className={`flex items-center space-x-1 ${
                    likes[entry.id]?.liked ? "text-red-500" : "text-gray-500"
                  } hover:text-red-500 transition-colors`}
                >
                  <span>{likes[entry.id]?.liked ? "❤️" : "🤍"}</span>
                  <span>{likes[entry.id]?.count || 0}</span>
                </button>

                <button
                  onClick={() =>
                    setActiveCommentId(
                      activeCommentId === entry.id ? null : entry.id
                    )
                  }
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <span>💬</span>
                  <span>{comments[entry.id]?.length || 0}</span>
                </button>
              </div>
            </div>

            {/* Comments section */}
            {activeCommentId === entry.id && (
              <div className="mt-4 space-y-3">
                {comments[entry.id]?.map((comment) => (
                  <div
                    key={comment.id}
                    className={`${themeClasses.secondary} p-3 rounded-lg`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={`flex-1 p-2 rounded-lg ${themeClasses.input} focus:ring-2 focus:ring-[#0077b6] focus:border-[#0077b6]`}
                    onKeyPress={(e) =>
                      e.key === "Enter" && addComment(entry.id)
                    }
                  />
                  <button
                    onClick={() => addComment(entry.id)}
                    className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderWriteView = () => (
    <div
      className={`min-h-screen transition-all duration-300 ${moodThemes[selectedMood].bg}`}
    >
      {/* Top Navigation Bar */}
      <div
        className={`${themeClasses.primary} shadow-sm border-b ${themeClasses.border} sticky top-0 z-50`}
      >
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
              <h1 className="text-xl font-semibold">Write Your Journal</h1>
            </div>

            <div className="flex items-center space-x-3">
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Auto-saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => setIsDistractionFree(!isDistractionFree)}
                className={`p-2 rounded-lg ${themeClasses.button} transition-all`}
                title="Focus mode"
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
            <div
              className={`${themeClasses.primary} rounded-xl shadow-lg border ${themeClasses.border} min-h-[600px]`}
            >
              {/* Story Title */}
              <div className={`p-6 border-b ${themeClasses.border}`}>
                <input
                  type="text"
                  placeholder="Enter your journal title..."
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className={`w-full text-2xl font-bold placeholder-gray-400 border-none outline-none bg-transparent`}
                  style={{ fontFamily, fontSize: fontSize + 4 }}
                />
              </div>

              {/* Writing Area */}
              <div className="p-6">
                <textarea
                  ref={editorRef}
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Start writing your thoughts... Let your emotions flow freely."
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
              <div
                className={`px-6 py-4 border-t ${themeClasses.border} ${themeClasses.secondary} rounded-b-xl`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{Math.ceil(wordCount / 200)} min read</span>
                    {isDraft && (
                      <span className="text-yellow-600">• Draft</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={saveDraft}
                      className={`px-4 py-2 ${themeClasses.button} rounded-lg transition-colors`}
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={publishEntry}
                      className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors"
                      disabled={!newEntry.trim() || !storyTitle.trim()}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Settings */}
          {!isDistractionFree && (
            <div className="col-span-1 space-y-4">
              {/* Privacy Settings */}
              <div
                className={`${themeClasses.primary} rounded-xl shadow-lg p-4 border ${themeClasses.border}`}
              >
                <h3 className="font-semibold mb-4">🔒 Privacy Settings</h3>
                <div className="space-y-2">
                  {[
                    {
                      value: "private",
                      label: "Private",
                      desc: "Only you can see this",
                      icon: "🔒",
                    },
                    {
                      value: "friends",
                      label: "Friends Only",
                      desc: "Only your friends can see",
                      icon: "👥",
                    },
                    {
                      value: "public",
                      label: "Public",
                      desc: "Everyone can see and interact",
                      icon: "🌍",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={privacySetting === option.value}
                        onChange={(e) => setPrivacySetting(e.target.value)}
                        className="text-[#0077b6]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span>{option.icon}</span>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div
                className={`${themeClasses.primary} rounded-xl shadow-lg p-4 border ${themeClasses.border}`}
              >
                <h3 className="font-semibold mb-4">🏷️ Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-[#90e0ef]/20 text-[#0077b6] flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="ml-1 hover:opacity-70"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags
                    .filter((tag) => !selectedTags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs ${themeClasses.button} px-2 py-1 rounded-full transition-colors`}
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>

              {/* Text Customization */}
              <div
                className={`${themeClasses.primary} rounded-xl shadow-lg p-4 border ${themeClasses.border}`}
              >
                <h3 className="font-semibold mb-4">✨ Text Style</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Font</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full p-2 rounded-lg ${themeClasses.input} focus:ring-2 focus:ring-[#0077b6]`}
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
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

                <div>
                  <label className="block text-sm font-medium mb-2">Mood</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(moodThemes).map(([mood, theme]) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`p-2 rounded-lg text-xs capitalize transition-all ${
                          selectedMood === mood
                            ? "ring-2 ring-[#0077b6] " + theme.bg
                            : theme.bg + " hover:ring-1 hover:ring-gray-300"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved Drafts */}
              {savedDrafts.length > 0 && (
                <div
                  className={`${themeClasses.primary} rounded-xl shadow-lg p-4 border ${themeClasses.border}`}
                >
                  <h3 className="font-semibold mb-4">📝 Recent Drafts</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedDrafts.slice(0, 3).map((draft) => (
                      <button
                        key={draft.id}
                        onClick={() => loadDraft(draft)}
                        className={`w-full text-left p-2 ${themeClasses.secondary} rounded-lg hover:opacity-80 transition-colors`}
                      >
                        <div className="text-sm font-medium">{draft.title}</div>
                        <div className="text-xs text-gray-500">
                          {draft.savedAt.toLocaleString()} • {draft.wordCount}{" "}
                          words
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

  const renderMyJournalsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Journals</h2>
        <button
          onClick={() => {
            setIsCreateMode(true);
            setCurrentView("write");
          }}
          className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors flex items-center space-x-2"
        >
          <span>✨</span>
          <span>Write New Entry</span>
        </button>
      </div>

      <div className="grid gap-6">
        {journalEntries.length === 0 && savedDrafts.length === 0 ? (
          <div
            className={`${themeClasses.primary} rounded-xl p-8 text-center border ${themeClasses.border}`}
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No journals yet</h3>
            <p className="text-gray-500 mb-4">
              Start writing to see your entries here
            </p>
            <button
              onClick={() => {
                setIsCreateMode(true);
                setCurrentView("write");
              }}
              className="px-6 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors"
            >
              Write Your First Entry
            </button>
          </div>
        ) : (
          <>
            {/* Drafts Section */}
            {savedDrafts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">📄</span>
                  Drafts ({savedDrafts.length})
                </h3>
                <div className="grid gap-4">
                  {savedDrafts.map((draft) => (
                    <div
                      key={draft.id}
                      className={`${themeClasses.primary} rounded-xl shadow-lg border ${themeClasses.border} overflow-hidden`}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{currentUser.avatar}</div>
                            <div>
                              <h3 className="font-semibold">
                                {currentUser.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(draft.savedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                              Draft
                            </span>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                          {draft.title}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {draft.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-full text-xs bg-[#90e0ef]/20 text-[#0077b6]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {draft.content}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>
                            {draft.wordCount || 0} words •{" "}
                            {Math.ceil((draft.wordCount || 0) / 200)} min read
                          </span>
                          <span>
                            Saved {new Date(draft.savedAt).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => loadDraft(draft)}
                              className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors flex items-center space-x-2"
                            >
                              <span>✏️</span>
                              <span>Continue Writing</span>
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure you want to delete this draft?"
                                  )
                                ) {
                                  draftManager.deleteLocalDraft(draft.id);
                                  setSavedDrafts((prev) =>
                                    prev.filter((d) => d.id !== draft.id)
                                  );
                                }
                              }}
                              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Published Entries Section */}
            {journalEntries.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">📚</span>
                  Published Entries ({journalEntries.length})
                </h3>
                <div className="grid gap-4">
                  {journalEntries.map((entry) =>
                    renderJournalCard(entry, false)
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderCommunityView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Journals</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Connect and inspire each other
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {communityEntries.length === 0 ? (
          <div
            className={`${themeClasses.primary} rounded-xl p-8 text-center border ${themeClasses.border}`}
          >
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">
              No public entries yet
            </h3>
            <p className="text-gray-500">
              Be the first to share your thoughts with the community!
            </p>
          </div>
        ) : (
          communityEntries.map((entry) => renderJournalCard(entry, true))
        )}
      </div>
    </div>
  );

  // Main render logic
  if (isCreateMode) {
    return renderWriteView();
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-[#caf0f8] to-[#ade8f4]"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div
          className={`${themeClasses.primary} rounded-xl p-6 mb-6 shadow-lg border ${themeClasses.border}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Journal Dashboard</h1>
              <p className="text-gray-500">
                Express yourself, connect with others, and track your thoughts
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.button} transition-colors`}
                title={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => {
                  setIsCreateMode(true);
                  setCurrentView("write");
                }}
                className="px-6 py-3 bg-[#0077b6] text-white rounded-lg hover:bg-[#0096c7] transition-colors flex items-center space-x-2 shadow-lg"
              >
                <span>✨</span>
                <span>Write Journal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`${themeClasses.primary} rounded-xl p-1 mb-6 shadow-lg border ${themeClasses.border}`}
        >
          <div className="flex space-x-1">
            {[
              { id: "my-journals", label: "My Journals", icon: "📝" },
              { id: "community", label: "Community", icon: "🌟" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                  currentView === tab.id
                    ? "bg-[#0077b6] text-white shadow-md"
                    : `${themeClasses.button} hover:bg-[#90e0ef]/20`
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`${themeClasses.primary} rounded-xl shadow-lg p-6 text-center border ${themeClasses.border}`}
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="text-2xl font-bold text-[#0077b6]">
              {journalEntries.length}
            </div>
            <div className="text-sm text-gray-500">Total Entries</div>
          </div>
          <div
            className={`${themeClasses.primary} rounded-xl shadow-lg p-6 text-center border ${themeClasses.border}`}
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="text-2xl font-bold text-[#0077b6]">
              {savedDrafts.length}
            </div>
            <div className="text-sm text-gray-500">Drafts</div>
          </div>
          <div
            className={`${themeClasses.primary} rounded-xl shadow-lg p-6 text-center border ${themeClasses.border}`}
          >
            <div className="text-2xl mb-2">❤️</div>
            <div className="text-2xl font-bold text-[#0077b6]">
              {Object.values(likes).reduce(
                (sum, like) => sum + (like.liked ? 1 : 0),
                0
              )}
            </div>
            <div className="text-sm text-gray-500">Likes Given</div>
          </div>
          <div
            className={`${themeClasses.primary} rounded-xl shadow-lg p-6 text-center border ${themeClasses.border}`}
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="text-2xl font-bold text-[#0077b6]">
              {Object.values(comments).reduce(
                (sum, commentList) => sum + commentList.length,
                0
              )}
            </div>
            <div className="text-sm text-gray-500">Comments</div>
          </div>
        </div>

        {/* Main Content */}
        {currentView === "my-journals" && renderMyJournalsView()}
        {currentView === "community" && renderCommunityView()}
      </div>
    </div>
  );
};

export default Journal;
