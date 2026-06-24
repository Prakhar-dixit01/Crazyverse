"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function EasterEggListener() {
  const [inputBuffer, setInputBuffer] = useState<string>("");
  const secretWord = "CRAZY";
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  const [konamiBuffer, setKonamiBuffer] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Word Match (CRAZY)
      const newChar = e.key.toUpperCase();
      if (/^[A-Z]$/.test(newChar)) {
        setInputBuffer((prev) => {
          const newBuffer = (prev + newChar).slice(-secretWord.length);
          if (newBuffer === secretWord) {
            triggerConfetti();
            return "";
          }
          return newBuffer;
        });
      }

      // Handle Konami Code
      setKonamiBuffer((prev) => {
        const newBuffer = [...prev, e.key];
        if (newBuffer.length > konamiCode.length) {
          newBuffer.shift(); // Keep buffer at correct size
        }
        
        if (newBuffer.join(",") === konamiCode.join(",")) {
          triggerConfetti();
          triggerScreenInvert();
          return [];
        }
        return newBuffer;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const triggerScreenInvert = () => {
    document.body.style.transition = "filter 2s";
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 5000);
  };

  return null; // This is a purely logical component, no UI
}
