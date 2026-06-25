"use client";

import { useState } from "react";
import { Wrench, X } from "lucide-react";
import AntiGravity from "./AntiGravity";
import Earthquake from "./Earthquake";
import VandalizeCanvas from "./VandalizeCanvas";
import VoiceNav from "./VoiceNav";

export default function WidgetDock() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col-reverse items-start gap-4 pointer-events-none">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border-2 border-white/20 transition-transform hover:scale-105 z-50 flex items-center justify-center"
        title="Crazy Tools Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
      </button>

      {/* Dock Items */}
      <div 
        className={`pointer-events-auto flex flex-col items-center gap-3 transition-all duration-300 origin-bottom ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl border-2 border-black flex flex-col gap-3">
          <VoiceNav isDocked />
          <VandalizeCanvas isDocked />
          <AntiGravity isDocked />
          <Earthquake isDocked />
        </div>
      </div>
    </div>
  );
}
