import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Custom text splitting function
  const splitTextIntoElements = (element, type) => {
    const text = element.textContent;
    element.innerHTML = "";

    if (type === "chars") {
      return text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        element.appendChild(span);
        return span;
      });
    } else if (type === "words") {
      return text.split(" ").map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.marginRight = "0.25em";
        span.style.willChange = "transform, opacity";
        element.appendChild(span);
        return span;
      });
    }
    return [element];
  };

  useGSAP(
    () => {
      if (!ref.current || !text) return;

      const element = ref.current;
      const elements = splitTextIntoElements(element, splitType);

      // Set initial state
      gsap.set(elements, from);

      // Create intersection observer for animation trigger
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);

              // Animate elements
              gsap.to(elements, {
                ...to,
                duration,
                ease,
                stagger: delay / 1000,
                onComplete: () => {
                  onLetterAnimationComplete?.();
                },
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
      ],
      scope: ref,
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      wordWrap: "break-word",
      willChange: "transform, opacity",
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    const TagName = tag;
    return (
      <TagName ref={ref} style={style} className={classes}>
        {text}
      </TagName>
    );
  };

  return renderTag();
};

export default SplitText;
