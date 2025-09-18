import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // & alert for debuging
  const showToast = (title, status, description = "") => {
    alert(`${status.toUpperCase()}: ${title}\n${description}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      // Store the token in localStorage
      localStorage.setItem("token", res.data.token);

      // Store user data in localStorage
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      showToast(
        "Login successful!",
        "success",
        "You can now complete your onboarding."
      );

      console.log("Login successful:", res.data);

      // Redirect to onboarding by updating parent state
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error("Login error:", err);
      showToast(
        "Login failed",
        "error",
        err.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    // Validate that all required fields are filled for registration
    if (!formData.fullName || !formData.email || !formData.password) {
      showToast(
        "Registration failed",
        "error",
        "Please fill in all fields (name, email, and password)"
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      showToast(
        "Registration successful!",
        "success",
        "Account created! You can now login with your credentials."
      );

      console.log("Registration successful:", res.data);

      // Clear the form and switch back to login mode
      setFormData({
        fullName: "",
        email: formData.email, // Keep email for convenience
        password: "",
      });
      setIsRegistering(false); // Switch back to login mode
    } catch (err) {
      console.error("Registration error:", err);
      showToast(
        "Registration failed",
        "error",
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: "#A8D480",
      }}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2 font-pacifico"
              style={{ color: "#2D5016" }}
            >
              {isRegistering ? "Join MindConnect" : "Welcome Back"}
            </h1>
            <p className="text-gray-700 font-inter text-lg">
              {isRegistering
                ? "Start your wellness journey today"
                : "Your wellness journey continues here"}
            </p>
          </div>

          {/* Info Banner */}
          <div
            className="mb-6 p-4 rounded-2xl border-2 border-opacity-30"
            style={{ backgroundColor: "#DFDDD1", borderColor: "#799852" }}
          >
            <p
              className="text-center font-nunito text-sm font-medium"
              style={{ color: "#2D5016" }}
            >
              ✨{" "}
              {isRegistering
                ? "Create your account to access personalized wellness tools"
                : "Please login to access your personalized wellness dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field - Only show when registering */}
            {isRegistering && (
              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold font-inter mb-2"
                  style={{ color: "#2D5016" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-opacity-30 font-inter text-gray-700 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-opacity-80 focus:shadow-lg bg-white/70"
                  style={{ borderColor: "#799852" }}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold font-inter mb-2"
                style={{ color: "#2D5016" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-opacity-30 font-inter text-gray-700 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-opacity-80 focus:shadow-lg bg-white/70"
                style={{ borderColor: "#799852" }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold font-inter mb-2"
                style={{ color: "#2D5016" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-opacity-30 font-inter text-gray-700 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-opacity-80 focus:shadow-lg bg-white/70"
                style={{ borderColor: "#799852" }}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4 pt-4">
              {!isRegistering ? (
                <>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-2xl font-semibold font-inter text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #799852 0%, #5D7A3F 100%)",
                      boxShadow: "0 8px 25px rgba(121, 152, 82, 0.3)",
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-gray-500 font-inter text-sm">
                      Don't have an account?
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-2xl font-semibold font-inter text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 bg-white/80"
                    style={{
                      color: "#2D5016",
                      borderColor: "#799852",
                      boxShadow: "0 4px 15px rgba(121, 152, 82, 0.2)",
                    }}
                  >
                    Create New Account
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-2xl font-semibold font-inter text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #799852 0%, #5D7A3F 100%)",
                      boxShadow: "0 8px 25px rgba(121, 152, 82, 0.3)",
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-gray-500 font-inter text-sm">
                      Already have an account?
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setFormData({
                        fullName: "",
                        email: formData.email,
                        password: "",
                      });
                    }}
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-2xl font-semibold font-inter text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 bg-white/80"
                    style={{
                      color: "#2D5016",
                      borderColor: "#799852",
                      boxShadow: "0 4px 15px rgba(121, 152, 82, 0.2)",
                    }}
                  >
                    Back to Sign In
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 font-inter">
              Secure • Private • Your wellness, your way
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
