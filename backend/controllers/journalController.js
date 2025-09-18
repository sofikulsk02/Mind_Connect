const Journal = require("../models/journalModel");
const User = require("../models/userModel");

// Create a new journal entry
const createJournal = async (req, res) => {
  try {
    const { title, content, tags, privacy, mood, isDraft, fontSettings } =
      req.body;
    const userId = req.user.id;

    // Get user information from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userName = user.name || user.email || "Anonymous";

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    if (title.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Title must be less than 200 characters",
      });
    }

    if (content.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Content must be less than 10,000 characters",
      });
    }

    const journal = new Journal({
      title,
      content,
      author: userId,
      authorName: userName,
      tags: tags || [],
      privacy: privacy || "private",
      mood: mood || "neutral",
      isDraft: isDraft || false,
      fontSettings: fontSettings || {},
    });

    await journal.save();

    res.status(201).json({
      success: true,
      message: "Journal entry created successfully",
      data: journal,
    });
  } catch (error) {
    console.error("Create journal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create journal entry",
      error: error.message,
    });
  }
};

// Get user's own journals
const getUserJournals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { includeDrafts = true, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const query = { author: userId };
    if (includeDrafts === "false") {
      query.isDraft = false;
    }

    const journals = await Journal.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Journal.countDocuments(query);

    res.status(200).json({
      success: true,
      data: journals,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get user journals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user journals",
      error: error.message,
    });
  }
};

// Get community journals (public entries)
const getCommunityJournals = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const skip = (page - 1) * limit;

    let query = {
      privacy: "public",
      isDraft: false,
    };

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const journals = await Journal.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Journal.countDocuments(query);

    res.status(200).json({
      success: true,
      data: journals,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get community journals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch community journals",
      error: error.message,
    });
  }
};

// Get a specific journal by ID
const getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const journal = await Journal.findById(id).populate("author", "name email");

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Check if user can view this journal
    // For now, we'll allow viewing if it's public or if user is the author
    if (
      journal.privacy === "private" &&
      journal.author._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this journal",
      });
    }

    // Increment view count if not the author
    if (journal.author._id.toString() !== userId) {
      journal.viewCount += 1;
      await journal.save();
    }

    res.status(200).json({
      success: true,
      data: journal,
    });
  } catch (error) {
    console.error("Get journal by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch journal",
      error: error.message,
    });
  }
};

// Update a journal entry
const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, tags, privacy, mood, isDraft, fontSettings } =
      req.body;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Check if user is the author
    if (journal.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own journals",
      });
    }

    // Update fields
    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (tags !== undefined) journal.tags = tags;
    if (privacy !== undefined) journal.privacy = privacy;
    if (mood !== undefined) journal.mood = mood;
    if (isDraft !== undefined) journal.isDraft = isDraft;
    if (fontSettings !== undefined)
      journal.fontSettings = { ...journal.fontSettings, ...fontSettings };

    await journal.save();

    res.status(200).json({
      success: true,
      message: "Journal updated successfully",
      data: journal,
    });
  } catch (error) {
    console.error("Update journal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update journal",
      error: error.message,
    });
  }
};

// Delete a journal entry
const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Check if user is the author
    if (journal.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own journals",
      });
    }

    await Journal.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Journal deleted successfully",
    });
  } catch (error) {
    console.error("Delete journal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete journal",
      error: error.message,
    });
  }
};

// Like/Unlike a journal
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Check if journal can be liked (must be public or friends only)
    if (journal.privacy === "private" && journal.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot like private journals",
      });
    }

    const existingLikeIndex = journal.likes.findIndex(
      (like) => like.user.toString() === userId
    );

    if (existingLikeIndex > -1) {
      // Unlike - remove the like
      journal.likes.splice(existingLikeIndex, 1);
    } else {
      // Like - add the like
      journal.likes.push({ user: userId });
    }

    await journal.save();

    res.status(200).json({
      success: true,
      message: existingLikeIndex > -1 ? "Journal unliked" : "Journal liked",
      data: {
        liked: existingLikeIndex === -1,
        likeCount: journal.likes.length,
      },
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle like",
      error: error.message,
    });
  }
};

// Add a comment to a journal
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const userName = req.user.name || req.user.email;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    if (content.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Comment must be less than 500 characters",
      });
    }

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Check if journal can be commented on
    if (journal.privacy === "private" && journal.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot comment on private journals",
      });
    }

    const comment = {
      author: userId,
      authorName: userName,
      content: content.trim(),
      timestamp: new Date(),
    };

    journal.comments.push(comment);
    await journal.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    const commentIndex = journal.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const comment = journal.comments[commentIndex];

    // Check if user can delete this comment (comment author or journal author)
    if (
      comment.author.toString() !== userId &&
      journal.author.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own comments or comments on your journals",
      });
    }

    journal.comments.splice(commentIndex, 1);
    await journal.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

// Get journal statistics for user
const getJournalStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Journal.aggregate([
      { $match: { author: userId } },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          totalWords: { $sum: "$wordCount" },
          totalLikes: { $sum: { $size: "$likes" } },
          totalComments: { $sum: { $size: "$comments" } },
          totalDrafts: {
            $sum: { $cond: [{ $eq: ["$isDraft", true] }, 1, 0] },
          },
          totalPublished: {
            $sum: { $cond: [{ $eq: ["$isDraft", false] }, 1, 0] },
          },
          publicEntries: {
            $sum: { $cond: [{ $eq: ["$privacy", "public"] }, 1, 0] },
          },
          privateEntries: {
            $sum: { $cond: [{ $eq: ["$privacy", "private"] }, 1, 0] },
          },
        },
      },
    ]);

    const result = stats[0] || {
      totalEntries: 0,
      totalWords: 0,
      totalLikes: 0,
      totalComments: 0,
      totalDrafts: 0,
      totalPublished: 0,
      publicEntries: 0,
      privateEntries: 0,
    };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get journal stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch journal statistics",
      error: error.message,
    });
  }
};

module.exports = {
  createJournal,
  getUserJournals,
  getCommunityJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  toggleLike,
  addComment,
  deleteComment,
  getJournalStats,
};
