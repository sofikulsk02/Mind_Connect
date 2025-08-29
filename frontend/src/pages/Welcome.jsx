import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Welcome = ({ onGetStarted }) => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    console.log("Welcome component mounted");

    // Simple fade-in animation for testing
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
      );
    }

    // Animate button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#BFC4B9" }}
    >
      {/* Main Content Container */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Welcome Text */}
        <h1
          ref={titleRef}
          className="hello-paris-bold text-5xl md:text-7xl lg:text-8xl text-black mb-8"
          style={{ opacity: 0 }}
        >
          Welcome to MindConnect
        </h1>

        {/* Subtitle */}
        <div className="mb-12">
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-black/80 font-medium"
            style={{ opacity: 0 }}
          >
            Your journey to mental wellness begins here
          </p>
        </div>

        {/* Get Started Button */}
        <button
          ref={buttonRef}
          onClick={onGetStarted}
          className="px-12 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          style={{
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            opacity: 0,
          }}
        >
          Get Started
        </button>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-8 opacity-60">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Debug info */}
        <div className="mt-8 text-sm text-black/50">
          Welcome page loaded successfully
        </div>
      </div>
    </div>
  );
};

export default Welcome;
