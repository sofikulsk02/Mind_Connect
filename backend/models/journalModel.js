const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        maxlength: 50,
      },
    ],
    privacy: {
      type: String,
      enum: ["private", "friends", "public"],
      default: "private",
    },
    mood: {
      type: String,
      enum: [
        "happy",
        "calm",
        "energetic",
        "contemplative",
        "peaceful",
        "neutral",
      ],
      default: "neutral",
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    likes: [likeSchema],
    comments: [commentSchema],
    wordCount: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      default: null,
    },
    fontSettings: {
      fontFamily: {
        type: String,
        default: "Inter",
      },
      fontSize: {
        type: Number,
        default: 16,
        min: 12,
        max: 24,
      },
      textColor: {
        type: String,
        default: "#374151",
      },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
journalSchema.index({ author: 1, createdAt: -1 });
journalSchema.index({ privacy: 1, createdAt: -1 });
journalSchema.index({ tags: 1 });
journalSchema.index({ "likes.user": 1 });

// Virtual for like count
journalSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Virtual for comment count
journalSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Pre-save middleware to calculate word count and read time
journalSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const words = this.content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    this.wordCount = words.length;
    this.readTime = Math.ceil(words.length / 200); // Assuming 200 words per minute
    this.lastModified = new Date();
  }
  next();
});

// Instance method to check if user can view this journal
journalSchema.methods.canView = function (userId, userFriends = []) {
  if (this.privacy === "public") return true;
  if (this.privacy === "private")
    return this.author.toString() === userId.toString();
  if (this.privacy === "friends") {
    return (
      this.author.toString() === userId.toString() ||
      userFriends.includes(this.author.toString())
    );
  }
  return false;
};

// Instance method to check if user has liked this journal
journalSchema.methods.isLikedBy = function (userId) {
  return this.likes.some((like) => like.user.toString() === userId.toString());
};

// Static method to get journals visible to a user
journalSchema.statics.getVisibleJournals = function (userId, userFriends = []) {
  return this.find({
    $or: [
      { privacy: "public" },
      { privacy: "friends", author: { $in: [userId, ...userFriends] } },
      { privacy: "private", author: userId },
    ],
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
};

// Static method to get community (public) journals
journalSchema.statics.getCommunityJournals = function () {
  return this.find({
    privacy: "public",
    isDraft: false,
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
};

// Static method to get user's own journals
journalSchema.statics.getUserJournals = function (
  userId,
  includeDrafts = true
) {
  const query = { author: userId };
  if (!includeDrafts) {
    query.isDraft = false;
  }
  return this.find(query).sort({ createdAt: -1 });
};

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
