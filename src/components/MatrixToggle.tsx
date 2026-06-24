"use client";

import { useStore } from "@/store/useStore";
import { Terminal } from "lucide-react";

export default function MatrixToggle() {
  const { isMatrixMode, toggleMatrixMode } = useStore();

  return (
    <div className="fixed bottom-8 right-8 z-[200] group">
      <div className="absolute -top-12 right-0 bg-black text-white px-4 py-2 font-bold text-xs tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {isMatrixMode ? "Hack Complete." : "Initiate Hack"}
        <div className="absolute -bottom-2 right-6 w-3 h-3 bg-black rotate-45" />
      </div>
      <button 
        onClick={toggleMatrixMode}
        className={`w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-300 border-2 ${
          isMatrixMode 
            ? "bg-[#00ff00] border-[#00ff00] text-black shadow-[0_0_15px_#00ff00]" 
            : "bg-white border-black text-black hover:bg-black hover:text-white"
        }`}
      >
        <Terminal className="w-6 h-6" />
      </button>
    </div>
  );
}
