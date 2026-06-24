"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

export default function RunawayButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);

  const handleHover = () => {
    if (clicks > 4) return; // Let them catch it after 5 tries
    
    // Move button to a random position within a safe radius
    const angle = Math.random() * Math.PI * 2;
    const radius = 50 + Math.random() * 100;
    
    // Keep it relatively bounded
    let newX = position.x + Math.cos(angle) * radius;
    let newY = position.y + Math.sin(angle) * radius;
    
    // Hard boundary so it doesn't leave the card
    newX = Math.max(-100, Math.min(100, newX));
    newY = Math.max(-100, Math.min(100, newY));

    setPosition({ x: newX, y: newY });
  };

  const handleClick = () => {
    setClicks(prev => prev + 1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center h-full hover:border-white/20 transition-colors relative overflow-hidden">
      <h3 className="text-xl font-black text-pink-400 mb-4 tracking-wider flex items-center gap-2">
        <Ghost className="w-6 h-6" /> USELESS BUTTON
      </h3>
      
      <div className="flex-grow flex items-center justify-center w-full relative min-h-[200px]">
        {clicks < 5 ? (
          <motion.button
            animate={{ x: position.x, y: position.y }}
            onHoverStart={handleHover}
            onClick={handleClick}
            className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] whitespace-nowrap z-10"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Don&apos;t Click Me!
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-xl font-bold text-white">You caught it!</p>
            <button 
              onClick={() => setClicks(0)}
              className="mt-4 text-sm text-pink-400 underline"
            >
              Reset
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
