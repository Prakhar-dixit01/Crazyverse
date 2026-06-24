"use client";

import { useRouter } from "next/navigation";
import { PRO_GAMES_DATA } from "@/lib/data";
import { Dices } from "lucide-react";
import { useState } from "react";

export default function RandomBoredomButton() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRandomClick = () => {
    setIsSpinning(true);
    // Fake a tiny slot machine delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PRO_GAMES_DATA.length);
      const randomItem = PRO_GAMES_DATA[randomIndex];
      router.push(`/play/${randomItem.slug}`);
    }, 600);
  };

  return (
    <button
      onClick={handleRandomClick}
      disabled={isSpinning}
      className={`group relative overflow-hidden bg-black text-white px-12 py-6 font-black text-2xl tracking-widest uppercase border-4 border-black shadow-[8px_8px_0_rgba(255,200,0,1)] hover:shadow-[12px_12px_0_rgba(255,200,0,1)] hover:-translate-y-1 transition-all flex items-center justify-center gap-4 ${isSpinning ? 'opacity-90 scale-95 shadow-none hover:shadow-none hover:translate-y-0' : ''}`}
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] group-hover:animate-ticker"></div>
      
      <div className="relative z-10 flex items-center gap-4">
        <Dices className={`w-8 h-8 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
        {isSpinning ? "CALCULATING CHAOS..." : "I'm Feeling Bored"}
      </div>
    </button>
  );
}
