import React, { useState, useEffect } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [newGroupForm, setNewGroupForm] = useState({
    name: "",
    description: "",
    category: "",
    color: "from-blue-400 to-blue-600",
  });
  const [newPost, setNewPost] = useState({
    content: "",
    supportType: "Support",
  });

  // State for interactions
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showShareModal, setShowShareModal] = useState(null);
  const [notification, setNotification] = useState("");

  // Convert to state for dynamic updates
  const [supportGroups, setSupportGroups] = useState([
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
      color: "from-[#0077b6] to-[#00b4d8]",
    },
    {
      id: 4,
      name: "Depression Support Network",
      description:
        "Understanding and overcoming depression together with compassion",
      members: 445,
      online: 31,
      category: "Depression",
      color: "from-[#A8D18D] to-[#C1D25D]",
    },
  ]);

  const [recentPosts, setRecentPosts] = useState([
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
  ]);

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
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "Help Request":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "Tip":
        return "bg-gradient-to-r from-purple-500 to-violet-500 text-white";
      case "Support":
        return "bg-gradient-to-r from-orange-500 to-amber-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleCreateGroup = () => {
    if (
      newGroupForm.name &&
      newGroupForm.description &&
      newGroupForm.category
    ) {
      // Add the new group to the supportGroups array
      const newGroup = {
        id: Date.now(), // Use timestamp for unique ID
        name: newGroupForm.name,
        description: newGroupForm.description,
        members: 1,
        online: 1,
        category: newGroupForm.category,
        color: newGroupForm.color,
        isNew: true, // Mark as new for highlighting
      };

      // In a real app, this would be sent to the backend
      console.log("Creating new group:", newGroup);

      // Add the group to local state
      setSupportGroups((prev) => [...prev, newGroup]);

      // Reset form and close modal
      setNewGroupForm({
        name: "",
        description: "",
        category: "",
        color: "from-blue-400 to-blue-600",
      });
      setShowCreateGroupModal(false);
      // setSupportGroups(prev => [...prev, newGroup]);
    }
  };

  const handleJoinGroup = (groupId) => {
    setJoinedGroups((prev) => new Set([...prev, groupId]));
    setNotification("Successfully joined the group! 🎉");
    setTimeout(() => setNotification(""), 3000);
    console.log(`Joined group ${groupId}`);
  };

  const handleSharePost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: Date.now(), // Use timestamp for unique ID
        author: "You",
        group: "Community",
        time: "Just now",
        content: newPost.content,
        likes: 0,
        comments: 0,
        supportType: newPost.supportType,
        isNew: true, // Mark as new for highlighting
      };

      // In a real app, this would be sent to the backend
      console.log("Sharing new post:", post);

      // Add the post to local state (insert at beginning for newest first)
      setRecentPosts((prev) => [post, ...prev]);

      // Reset form
      setNewPost({ content: "", supportType: "Support" });
      setShowCreatePostModal(false);
    }
  };

  const handleLeaveGroup = (groupId) => {
    if (confirm("Are you sure you want to leave this group?")) {
      setJoinedGroups((prev) => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
      setNotification("Successfully left the group");
      setTimeout(() => setNotification(""), 3000);
      console.log(`Left group ${groupId}`);
    }
  };

  const handleLikePost = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    // Update the post's like count
    setRecentPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      setRecentPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, comments: post.comments + 1 } : post
        )
      );
      setNewComment("");
      // In a real app, you'd also store the actual comment content
      console.log(`Added comment to post ${postId}: ${newComment}`);
    }
  };

  const handleSharePostAction = (postId) => {
    setShowShareModal(postId);
    console.log(`Sharing post ${postId}`);
  };

  // Auto-remove "new" indicators after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSupportGroups((prev) =>
        prev.map((group) => ({ ...group, isNew: false }))
      );
      setRecentPosts((prev) => prev.map((post) => ({ ...post, isNew: false })));
    }, 5000);

    return () => clearTimeout(timer);
  }, [supportGroups, recentPosts]);

  return (
    <div
      className="w-full max-w-none px-4 space-y-8"
      style={{ backgroundColor: "var(--wellness-cream)" }}
    >
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {/* Community Header */}
      <div
        className="rounded-xl p-8 text-white shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #0077b6 0%, #00b4d8 50%, #90e0ef 100%)",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">MindConnect Community</h2>
        <p className="mb-6 text-white/90">
          Connect with others who understand your journey. Share, support, and
          grow together.
        </p>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-white/80">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-white/80">Online Now</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">456</div>
            <div className="text-sm text-white/80">Posts Today</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg border border-gray-100">
        <div className="flex border-b border-gray-200">
          {["groups", "feed", "events"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-medium capitalize ${
                activeTab === tab
                  ? "text-[#0077b6] border-b-2 border-[#0077b6]"
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
                <button
                  onClick={() => setShowCreateGroupModal(true)}
                  className="px-4 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors"
                >
                  Create Group
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportGroups.map((group) => (
                  <div
                    key={group.id}
                    className={`border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50 ${
                      group.isNew
                        ? "ring-2 ring-green-400 bg-gradient-to-br from-green-50 to-white"
                        : ""
                    }`}
                  >
                    {group.isNew && (
                      <div className="flex justify-end mb-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          ✨ New!
                        </span>
                      </div>
                    )}
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
                    {joinedGroups.has(group.id) ? (
                      <div className="flex space-x-2">
                        <button
                          disabled
                          className="flex-1 py-2 bg-[#91B500] text-white rounded-lg"
                        >
                          Joined ✓
                        </button>
                        <button
                          onClick={() => handleLeaveGroup(group.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                          title="Leave this group"
                        >
                          Leave
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        className="w-full py-2 border border-[#91B500] text-[#91B500] rounded-lg hover:bg-[rgba(145,181,0,0.1)] transition-colors"
                      >
                        Join Group
                      </button>
                    )}
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
                <button className="px-4 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors">
                  New Post
                </button>
              </div>

              {/* Post Composer */}
              <div className="bg-gray-50 rounded-lg p-6">
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Share your thoughts, ask for support, or offer encouragement..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91B500] focus:border-[#91B500] resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setNewPost((prev) => ({
                          ...prev,
                          supportType: "Help Request",
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newPost.supportType === "Help Request"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      Question
                    </button>
                    <button
                      onClick={() =>
                        setNewPost((prev) => ({
                          ...prev,
                          supportType: "Achievement",
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newPost.supportType === "Achievement"
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      Victory
                    </button>
                    <button
                      onClick={() =>
                        setNewPost((prev) => ({
                          ...prev,
                          supportType: "Support",
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newPost.supportType === "Support"
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      }`}
                    >
                      Support
                    </button>
                  </div>
                  <button
                    onClick={handleSharePost}
                    disabled={!newPost.content.trim()}
                    className="px-4 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Share
                  </button>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${
                      post.isNew
                        ? "ring-2 ring-blue-400 bg-gradient-to-r from-blue-50 to-white"
                        : ""
                    }`}
                  >
                    {post.isNew && (
                      <div className="flex justify-end mb-2">
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          ✨ New!
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#91B500] to-[#A3D50C] rounded-full flex items-center justify-center text-white font-semibold">
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
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getSupportTypeColor(
                          post.supportType
                        )}`}
                      >
                        {post.supportType}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-2 transition-colors group ${
                          likedPosts.has(post.id)
                            ? "text-red-500"
                            : "hover:text-red-500"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                            likedPosts.has(post.id) ? "fill-current" : ""
                          }`}
                          fill={
                            likedPosts.has(post.id) ? "currentColor" : "none"
                          }
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
                      <button
                        onClick={() =>
                          setShowCommentsFor(
                            showCommentsFor === post.id ? null : post.id
                          )
                        }
                        className="flex items-center space-x-2 hover:text-[#91B500] transition-colors group"
                      >
                        <svg
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                      <button
                        onClick={() => handleSharePostAction(post.id)}
                        className="flex items-center space-x-2 hover:text-blue-500 transition-colors group"
                      >
                        <svg
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showCommentsFor === post.id && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-3 mb-4">
                          <div className="text-sm text-gray-600">
                            💬 No comments yet. Be the first to comment!
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91B500] focus:border-[#91B500]"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                            className="px-4 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
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
                <button className="px-4 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors">
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
                      <button className="px-4 py-2 border border-[#91B500] text-[#91B500] rounded-lg hover:bg-[rgba(145,181,0,0.1)] transition-colors">
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

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Create New Group
              </h3>
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroupForm.name}
                  onChange={(e) =>
                    setNewGroupForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91B500] focus:border-[#91B500]"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newGroupForm.description}
                  onChange={(e) =>
                    setNewGroupForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91B500] focus:border-[#91B500] h-20 resize-none"
                  placeholder="Describe your group's purpose"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newGroupForm.category}
                  onChange={(e) =>
                    setNewGroupForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91B500] focus:border-[#91B500]"
                >
                  <option value="">Select a category</option>
                  <option value="Students">Students</option>
                  <option value="Anxiety">Anxiety</option>
                  <option value="Depression">Depression</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="General">General Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme Color
                </label>
                <div className="flex space-x-2">
                  {[
                    { name: "Blue", value: "from-blue-400 to-blue-600" },
                    { name: "Green", value: "from-green-400 to-green-600" },
                    { name: "Purple", value: "from-purple-400 to-purple-600" },
                    { name: "Pink", value: "from-pink-400 to-pink-600" },
                    { name: "Teal", value: "from-teal-400 to-teal-600" },
                  ].map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setNewGroupForm((prev) => ({
                          ...prev,
                          color: color.value,
                        }))
                      }
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                        color.value
                      } ${
                        newGroupForm.color === color.value
                          ? "ring-2 ring-gray-400"
                          : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={
                  !newGroupForm.name ||
                  !newGroupForm.description ||
                  !newGroupForm.category
                }
                className="flex-1 py-2 bg-[#91B500] text-white rounded-lg hover:bg-[#A3D50C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Post Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Share Post
              </h3>
              <button
                onClick={() => setShowShareModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">Share this post with:</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    console.log(`Shared post ${showShareModal} to community`);
                    setShowShareModal(null);
                  }}
                  className="flex items-center justify-center space-x-2 p-3 border border-[#91B500] text-[#91B500] rounded-lg hover:bg-[rgba(145,181,0,0.1)] transition-colors"
                >
                  <span>👥</span>
                  <span>Community</span>
                </button>

                <button
                  onClick={() => {
                    console.log(`Shared post ${showShareModal} to friends`);
                    setShowShareModal(null);
                  }}
                  className="flex items-center justify-center space-x-2 p-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <span>👤</span>
                  <span>Friends</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Check out this post: ${window.location.href}#post-${showShareModal}`
                    );
                    console.log(`Copied link for post ${showShareModal}`);
                    setShowShareModal(null);
                  }}
                  className="flex items-center justify-center space-x-2 p-3 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>🔗</span>
                  <span>Copy Link</span>
                </button>

                <button
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out this inspiring post from MindConnect!&url=${window.location.href}#post-${showShareModal}`,
                      "_blank"
                    );
                    setShowShareModal(null);
                  }}
                  className="flex items-center justify-center space-x-2 p-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <span>🐦</span>
                  <span>Twitter</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowShareModal(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
