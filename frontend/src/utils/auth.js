// Authentication utilities

// Get authentication token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Set authentication token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove authentication token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Get user data from localStorage
export const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

// Set user data in localStorage
export const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Remove user data from localStorage
export const removeCurrentUser = () => {
  localStorage.removeItem("user");
};

// Logout function - clear all auth data
export const logout = () => {
  removeAuthToken();
  removeCurrentUser();
};
