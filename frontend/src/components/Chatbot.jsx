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
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
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
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-4 text-sm shadow-md ${
                message.type === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-4 shadow-indigo-200"
                  : message.type === "error"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200 shadow-red-100"
                  : "bg-gradient-to-r from-white to-gray-50 text-gray-800 shadow-lg border border-gray-100"
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
            <div className="bg-white rounded-lg p-3 shadow-sm border max-w-[80%]">
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
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-1">
            {getQuickActions().map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                disabled={isLoading}
                className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors disabled:opacity-50"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>

        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Chatbot;
