"use client";

import { useEffect, useState } from "react";

export default function WastedTimeCounter() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // Load from local storage on mount
    const savedTime = localStorage.getItem("wastedTime");
    if (savedTime) {
      // eslint-disable-next-line
      setSeconds(parseInt(savedTime, 10));
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        localStorage.setItem("wastedTime", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getTitle = (totalSeconds: number) => {
    if (totalSeconds < 60) return "Just browsing...";
    if (totalSeconds < 300) return "Novice Procrastinator";
    if (totalSeconds < 1800) return "Intermediate Slacker";
    if (totalSeconds < 3600) return "Professional Time Waster";
    return "Master of Boredom";
  };

  return (
    <div className="flex flex-col items-end text-xs font-mono border-l-2 border-black pl-4 h-full justify-center">
      <div className="text-gray-500 uppercase font-bold text-[10px] hidden sm:block">Time Wasted</div>
      <div className="font-black text-black text-lg leading-none">{formatTime(seconds)}</div>
      <div className="text-green-600 font-bold text-[10px] uppercase truncate max-w-[120px] hidden sm:block">{getTitle(seconds)}</div>
    </div>
  );
}
