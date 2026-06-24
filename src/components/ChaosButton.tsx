"use client";

import { useStore } from "@/store/useStore";
import { ZapOff, Zap } from "lucide-react";

export default function ChaosButton() {
  const { chaosMode, toggleChaosMode } = useStore();

  return (
    <button 
      onClick={toggleChaosMode}
      className={`w-full flex items-center justify-between p-3 rounded-lg font-black uppercase tracking-widest transition-all shadow-lg ${
        chaosMode 
          ? "bg-red-600 text-white border-2 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse" 
          : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      <span className="flex items-center gap-2">
        {chaosMode ? <Zap className="w-5 h-5 text-yellow-300" /> : <ZapOff className="w-5 h-5" />}
        {chaosMode ? "Chaos ON" : "Chaos Mode"}
      </span>
    </button>
  );
}
