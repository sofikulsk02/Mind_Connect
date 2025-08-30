import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Shutter = ({ onAnimationComplete }) => {
  const containerRef = useRef(null);
  const shutterRefs = useRef([]);

  useGSAP(
    () => {
      // Set initial state - shutters cover the entire screen
      gsap.set(shutterRefs.current, {
        height: "100vh",
        scaleY: 1,
      });

      // Create the shutter opening animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Call the completion callback after animation finishes
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        },
      });

      // Animate each shutter panel sliding up one after another
      tl.to(shutterRefs.current[0], {
        y: "-100%",
        duration: 0.6,
        ease: "power2.inOut",
      })
        .to(
          shutterRefs.current[1],
          {
            y: "-100%",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        ) // Start slightly before previous animation ends
        .to(
          shutterRefs.current[2],
          {
            y: "-100%",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .to(
          shutterRefs.current[3],
          {
            y: "-100%",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .to(
          shutterRefs.current[4],
          {
            y: "-100%",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex"
      style={{ pointerEvents: "none" }}
    >
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (shutterRefs.current[index] = el)}
          className="bg-black w-1/5 h-screen relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, 
              #1a1a1a ${index * 20}%, 
              #000000 ${(index + 1) * 20}%)`,
          }}
        >
          {/* Optional: Add some subtle texture or pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          </div>

          {/* Optional: Add some light streaks for visual interest */}
          <div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent transform -translate-x-1/2"
            style={{ animationDelay: `${index * 0.1}s` }}
          ></div>
        </div>
      ))}

      {/* Center logo or loading indicator (optional) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white font-pacifico text-2xl opacity-80 animate-pulse">
          MindConnect
        </div>
      </div>
    </div>
  );
};

export default Shutter;
