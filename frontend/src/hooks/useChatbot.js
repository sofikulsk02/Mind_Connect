import { useState, useRef, useEffect } from "react";
import axios from "axios";

const useChatbot = () => {      
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hi! I'm MindConnect AI, your mental wellness companion. How can I support you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    // Add user message immediately
    const userMessageObj = {
      id: Date.now(),
      type: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to use the chatbot");
      }

      const response = await axios.post(
        "http://localhost:3000/api/chatbot/message",
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const aiMessageObj = {
          id: Date.now() + 1,
          type: "ai",
          content: response.data.response,
          timestamp: response.data.timestamp,
        };

        setMessages((prev) => [...prev, aiMessageObj]);
      } else {
        throw new Error(response.data.message || "Failed to get response");
      }
    } catch (err) {
      console.error("Chatbot error:", err);

      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (err.response?.status === 401) {
        errorMessage = "Please log in to use the chatbot.";
      } else if (err.response?.status === 429) {
        errorMessage =
          "I'm a bit busy right now. Please try again in a moment.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      const errorMessageObj = {
        id: Date.now() + 1,
        type: "error",
        content: errorMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessageObj]);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "ai",
        content:
          "Hi! I'm MindConnect AI, your mental wellness companion. How can I support you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
    setError(null);
  };

  const getQuickActions = () => [
    "I'm feeling anxious",
    "Help me with stress",
    "Breathing exercises",
    "Meditation tips",
    "Journaling prompts",
  ];

  return {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    clearChat,
    getQuickActions,
  };
};

export default useChatbot;
