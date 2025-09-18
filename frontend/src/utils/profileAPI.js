import { getAuthToken } from "./auth";

const API_BASE_URL = "http://localhost:3000/api";

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePicture = async (file) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await fetch(`${API_BASE_URL}/profile/upload-picture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload profile picture");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Upload profile picture error:", error);
    throw error;
  }
};

// Delete profile picture
export const deleteProfilePicture = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/profile/picture`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete profile picture");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete profile picture error:", error);
    throw error;
  }
};
