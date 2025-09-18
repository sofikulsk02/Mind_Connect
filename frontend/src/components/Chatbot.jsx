import React, { useState } from "react";
import useChatbot from "../hooks/useChatbot";

const Chatbot = ({ isOpen, onClose }) => {
  const [inputMessage, setInputMessage] = useState("");
  const {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    clearChat,
    getQuickActions,
  } = useChatbot();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      await sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleQuickAction = async (action) => {
    await sendMessage(action);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Gradient-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Header */}
      <div className="relative z-20 p-4 border-b border-white/20 bg-black/30 backdrop-blur-sm text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">MindConnect AI Assistant</h3>
            <p className="text-xs opacity-90 mt-1">
              ⚠️ Not a medical professional
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={clearChat}
              className="text-white hover:text-gray-200 text-sm p-1 rounded"
              title="Clear chat"
            >
              🗑️
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-lg"
              title="Close chat"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-20 flex-1 overflow-y-auto p-4 space-y-3 bg-transparent backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-4 text-sm shadow-lg border ${
                message.type === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white ml-4 shadow-indigo-300 border-indigo-400"
                  : message.type === "error"
                  ? "bg-gradient-to-r from-red-100 to-red-200 text-red-900 border-red-300 shadow-red-200 backdrop-blur-sm"
                  : "bg-white/90 text-gray-800 shadow-xl border-gray-200 backdrop-blur-sm"
              }`}
            >
              <p className="whitespace-pre-wrap font-medium leading-relaxed">
                {message.content}
              </p>
              <p
                className={`text-xs mt-2 font-medium ${
                  message.type === "user" ? "text-indigo-100" : "text-gray-400"
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="relative z-20 px-4 py-2 border-t border-white/20 bg-white/20 backdrop-blur-sm">
          <p className="text-xs text-white mb-2 font-medium">Quick actions:</p>
          <div className="flex flex-wrap gap-1">
            {getQuickActions().map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                disabled={isLoading}
                className="px-2 py-1 text-xs bg-white/80 text-indigo-700 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 backdrop-blur-sm border border-white/30"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="relative z-20 p-4 border-t border-white/20 bg-white/20 backdrop-blur-sm rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-white/30 bg-white/90 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-200 mt-2 font-medium bg-red-900/30 backdrop-blur-sm p-2 rounded">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
