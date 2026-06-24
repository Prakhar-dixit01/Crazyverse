"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

type GameState = "waiting" | "ready" | "clicked" | "early";

export default function ReactionGame() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    
    // Random wait between 2 to 5 seconds
    const waitTime = Math.random() * 3000 + 2000;
    
    timerRef.current = setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = Date.now();
    }, waitTime);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("early");
    } else if (gameState === "ready") {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState("clicked");
    } else {
      startGame();
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case "waiting": return "bg-red-500/80";
      case "ready": return "bg-green-500/80 shadow-[0_0_50px_rgba(34,197,94,0.6)]";
      case "clicked": return "bg-blue-500/80";
      case "early": return "bg-orange-500/80";
      default: return "bg-gray-800";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center h-full hover:border-white/20 transition-colors">
      <h3 className="text-xl font-black text-cyan-400 mb-4 tracking-wider flex items-center gap-2">
        <Zap className="w-6 h-6" /> REACTION TEST
      </h3>
      
      <motion.div 
        onClick={handleClick}
        className={`w-full flex-grow min-h-[200px] rounded-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 ${getBackgroundColor()}`}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-white font-bold text-2xl px-4">
          {gameState === "waiting" && "Wait for Green..."}
          {gameState === "ready" && "CLICK NOW!"}
          {gameState === "clicked" && `${reactionTime} ms! Click to try again.`}
          {gameState === "early" && "Too early! Click to try again."}
          {gameState === "waiting" === false && gameState === "ready" === false && gameState === "clicked" === false && gameState === "early" === false && "Click here to start"}
        </div>
      </motion.div>
    </div>
  );
}
