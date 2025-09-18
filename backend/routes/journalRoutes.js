const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/journalController");
const authMiddleware = require("../middlewares/authMiddleware");

// All journal routes require authentication
router.use(authMiddleware);

// Journal CRUD operations
router.post("/", createJournal); // POST /api/journals - Create new journal
router.get("/my", getUserJournals); // GET /api/journals/my - Get user's journals
router.get("/community", getCommunityJournals); // GET /api/journals/community - Get public journals
router.get("/stats", getJournalStats); // GET /api/journals/stats - Get user statistics
router.get("/:id", getJournalById); // GET /api/journals/:id - Get specific journal
router.put("/:id", updateJournal); // PUT /api/journals/:id - Update journal
router.delete("/:id", deleteJournal); // DELETE /api/journals/:id - Delete journal

// Interaction operations
router.post("/:id/like", toggleLike); // POST /api/journals/:id/like - Like/unlike journal
router.post("/:id/comments", addComment); // POST /api/journals/:id/comments - Add comment
router.delete("/:id/comments/:commentId", deleteComment); // DELETE /api/journals/:id/comments/:commentId - Delete comment

module.exports = router;
