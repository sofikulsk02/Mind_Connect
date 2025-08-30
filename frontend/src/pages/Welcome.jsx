import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Welcome = ({ onGetStarted }) => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

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

    // Animate left image from left
    if (leftImageRef.current) {
      gsap.fromTo(
        leftImageRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power2.out" }
      );
    }

    // Animate right image from right
    if (rightImageRef.current) {
      gsap.fromTo(
        rightImageRef.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power2.out" }
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
      className="min-h-screen flex  items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "#799852" }}
    >
      <div ref={leftImageRef}>
        <img
          src="/ca1cfbdfec8fc824daee1bdb0e9493c3.png"
          className="h-110 w-50 ml-50"
          alt=""
        />
      </div>
      {/* Main Content Container */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Welcome Text */}
        <h1
          ref={titleRef}
          className="hello-paris-bold text-5xl md:text-7xl lg:text-8xl text-black mb-8"
          style={{ opacity: 0 }}
        >
          Welcome To MindConnect
        </h1>

        {/* Subtitle */}
        <div className="mb-12">
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-black font-dancing-script font-bold"
            style={{ opacity: 100 }}
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
      </div>
      {/* the toodle */}
      <div ref={rightImageRef}>
        <img
          src="/bdd555dfccf00c7112fd78296fcc1ef3.png"
          className="h-110 w-50 mr-40"
          alt=""
        />
      </div>
    </div>
  );
};

export default Welcome;
