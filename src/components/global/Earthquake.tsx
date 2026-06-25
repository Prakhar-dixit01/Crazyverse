"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

export default function Earthquake({ isDocked = false }: { isDocked?: boolean }) {
  const [isQuaking, setIsQuaking] = useState(false);

  const triggerEarthquake = () => {
    if (isQuaking) return;
    setIsQuaking(true);

    // Play rumble sound
    const audio = new Audio("https://actions.google.com/sounds/v1/weather/rumble.ogg");
    audio.volume = 0.8;
    audio.play().catch(() => {});

    // Add earthquake class to body
    document.body.classList.add("animate-earthquake");
    
    // Create random violent shakes
    let shakes = 0;
    const interval = setInterval(() => {
      document.body.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 2 - 1}deg)`;
      shakes++;
      if (shakes > 60) { // 3 seconds at 20fps
        clearInterval(interval);
        document.body.style.transform = "";
        document.body.classList.remove("animate-earthquake");
        setIsQuaking(false);
      }
    }, 50);
  };

  return (
    <button
      onClick={triggerEarthquake}
      disabled={isQuaking}
      className={`${
        isDocked 
          ? "relative p-3 rounded-full hover:scale-110" 
          : "fixed bottom-32 left-6 z-[100] p-4 rounded-full shadow-2xl"
      } transition-all duration-300 ${
        isQuaking 
          ? "bg-red-600 animate-pulse text-white pointer-events-none" 
          : "bg-orange-500 hover:bg-orange-600 text-white border-2 border-white/20"
      }`}
      title="Trigger Earthquake"
    >
      <Activity className={isDocked ? "w-5 h-5" : "w-6 h-6"} />
    </button>
  );
}
