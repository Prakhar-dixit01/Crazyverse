"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import confetti from "canvas-confetti";

export default function GlobalRunawayButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleHover = () => {
    if (clicks > 4) return; // After 5 tries, let them catch it
    
    const angle = Math.random() * Math.PI * 2;
    const radius = 100 + Math.random() * 200; // Large jump
    
    // Calculate new position
    let newX = position.x + Math.cos(angle) * radius;
    let newY = position.y + Math.sin(angle) * radius;
    
    // Restrict within the screen roughly
    const padding = 100;
    const maxW = typeof window !== "undefined" ? window.innerWidth / 2 - padding : 500;
    const maxH = typeof window !== "undefined" ? window.innerHeight / 2 - padding : 500;
    
    newX = Math.max(-maxW, Math.min(maxW, newX));
    newY = Math.max(-maxH, Math.min(maxH, newY));

    setPosition({ x: newX, y: newY });
  };

  const handleClick = () => {
    setClicks(prev => prev + 1);
    if (clicks >= 4) {
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.5 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });
      setTimeout(() => setIsVisible(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] pointer-events-none">
      <motion.button
        animate={{ x: position.x, y: position.y }}
        onHoverStart={handleHover}
        onClick={handleClick}
        className="pointer-events-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black py-4 px-8 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.8)] border-4 border-white flex items-center gap-2 whitespace-nowrap overflow-hidden group"
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {clicks < 5 ? (
          <>
            <Zap className="w-6 h-6 animate-pulse" />
            <span>Catch Me!</span>
          </>
        ) : (
          <span className="text-xl">🎉 CAUGHT IT!</span>
        )}
      </motion.button>
    </div>
  );
}
