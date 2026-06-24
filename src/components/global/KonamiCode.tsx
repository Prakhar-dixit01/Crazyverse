"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiCode() {
  const [keyIndex, setKeyIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the key matches the current required key in the sequence
      if (e.key === KONAMI_CODE[keyIndex] || e.key.toLowerCase() === KONAMI_CODE[keyIndex]) {
        if (keyIndex === KONAMI_CODE.length - 1) {
          // Success! Trigger the crazy effect
          document.body.style.transition = "transform 3s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
          document.body.style.transform = "rotate(1080deg) scale(0.2)";
          
          setTimeout(() => {
            document.body.style.transform = "rotate(0deg) scale(1)";
          }, 3000);
          
          setKeyIndex(0); // Reset
        } else {
          setKeyIndex(keyIndex + 1);
        }
      } else {
        // Reset if they mess up
        setKeyIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyIndex]);

  return null; // Invisible component
}
