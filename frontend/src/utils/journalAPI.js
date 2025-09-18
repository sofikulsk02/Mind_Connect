import api from "./api";

// Journal API endpoints
const journalAPI = {
  // Create a new journal entry
  createJournal: async (journalData) => {
    try {
      const response = await api.post("/journals", journalData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create journal"
      );
    }
  },

  // Get user's own journals
  getUserJournals: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/journals/my?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user journals"
      );
    }
  },

  // Get community journals (public entries)
  getCommunityJournals: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/journals/community?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch community journals"
      );
    }
  },

  // Get a specific journal by ID
  getJournalById: async (id) => {
    try {
      const response = await api.get(`/journals/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch journal"
      );
    }
  },

  // Update a journal entry
  updateJournal: async (id, updateData) => {
    try {
      const response = await api.put(`/journals/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update journal"
      );
    }
  },

  // Delete a journal entry
  deleteJournal: async (id) => {
    try {
      const response = await api.delete(`/journals/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete journal"
      );
    }
  },

  // Like/unlike a journal
  toggleLike: async (id) => {
    try {
      const response = await api.post(`/journals/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to toggle like");
    }
  },

  // Add a comment to a journal
  addComment: async (id, content) => {
    try {
      const response = await api.post(`/journals/${id}/comments`, { content });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add comment");
    }
  },

  // Delete a comment
  deleteComment: async (journalId, commentId) => {
    try {
      const response = await api.delete(
        `/journals/${journalId}/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  },

  // Get journal statistics
  getJournalStats: async () => {
    try {
      const response = await api.get("/journals/stats");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch journal statistics"
      );
    }
  },

  // Auto-save draft functionality
  saveDraft: async (draftData) => {
    try {
      // Use the same create/update endpoint but with isDraft: true
      const response = await api.post("/journals", {
        ...draftData,
        isDraft: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to save draft");
    }
  },

  // Search journals
  searchJournals: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/journals/search?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to search journals"
      );
    }
  },
};

// Local storage utilities for drafts
export const draftManager = {
  // Save draft to local storage
  saveDraftLocally: (draftData) => {
    try {
      const drafts = JSON.parse(localStorage.getItem("journalDrafts") || "[]");
      const newDraft = {
        id: Date.now(),
        ...draftData,
        savedAt: new Date().toISOString(),
        isDraft: true,
      };

      // Keep only the latest 10 drafts
      const updatedDrafts = [
        newDraft,
        ...drafts.filter((d) => d.id !== newDraft.id),
      ].slice(0, 10);
      localStorage.setItem("journalDrafts", JSON.stringify(updatedDrafts));

      return newDraft;
    } catch (error) {
      console.error("Failed to save draft locally:", error);
      return null;
    }
  },

  // Get local drafts
  getLocalDrafts: () => {
    try {
      return JSON.parse(localStorage.getItem("journalDrafts") || "[]");
    } catch (error) {
      console.error("Failed to get local drafts:", error);
      return [];
    }
  },

  // Delete local draft
  deleteLocalDraft: (draftId) => {
    try {
      const drafts = JSON.parse(localStorage.getItem("journalDrafts") || "[]");
      const updatedDrafts = drafts.filter((d) => d.id !== draftId);
      localStorage.setItem("journalDrafts", JSON.stringify(updatedDrafts));
      return true;
    } catch (error) {
      console.error("Failed to delete local draft:", error);
      return false;
    }
  },

  // Clear all local drafts
  clearLocalDrafts: () => {
    try {
      localStorage.removeItem("journalDrafts");
      return true;
    } catch (error) {
      console.error("Failed to clear local drafts:", error);
      return false;
    }
  },
};

// Theme management utilities
export const themeManager = {
  // Save theme preference
  saveTheme: (isDark) => {
    try {
      localStorage.setItem("journalTheme", isDark ? "dark" : "light");
      return true;
    } catch (error) {
      console.error("Failed to save theme:", error);
      return false;
    }
  },

  // Get saved theme
  getTheme: () => {
    try {
      const savedTheme = localStorage.getItem("journalTheme");
      return savedTheme === "dark";
    } catch (error) {
      console.error("Failed to get theme:", error);
      return false;
    }
  },
};

// Export utilities and API
export { journalAPI };
export default journalAPI;
