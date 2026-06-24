"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Skull, AlertTriangle, Ghost } from "lucide-react";

const DARK_TOOLS = [
  {
    title: "Terminal Hacker",
    desc: "Simulate a Hollywood-style hacking interface. Type anything to hack.",
    url: "https://hackertyper.net/"
  },
  {
    title: "The Zoom Quilt",
    desc: "An infinitely zooming, mesmerizing nightmare tunnel.",
    url: "https://zoomquilt.org/"
  },
  {
    title: "Pointer Pointer",
    desc: "Finds a picture of someone pointing exactly at your cursor. Creepy.",
    url: "https://pointerpointer.com/"
  },
  {
    title: "Staggering Beauty",
    desc: "WARNING: FLASHING LIGHTS. Shake the worm violently.",
    url: "http://www.staggeringbeauty.com/"
  },
  {
    title: "InspiroBot",
    desc: "An AI that generates deeply disturbing 'inspirational' quotes.",
    url: "https://inspirobot.me/"
  }
];

export default function DarkWebPage() {
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState("THE DARK WEB");

  useEffect(() => {
    setMounted(true);
    
    // Creepy text glitch effect
    const interval = setInterval(() => {
      const chars = "!<>-_\\\\/[]{}—=+*^?#________";
      let randomString = "";
      for (let i = 0; i < 12; i++) {
        randomString += chars[Math.floor(Math.random() * chars.length)];
      }
      setGlitchText(Math.random() > 0.8 ? randomString : "THE DARK WEB");
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-red-600 font-mono flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-30"></div>
      
      {/* CRT Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-40"></div>

      <div className="relative z-10 w-full max-w-4xl border border-red-900 bg-black/80 p-4 sm:p-8 shadow-[0_0_50px_rgba(255,0,0,0.2)]">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-red-900 pb-4 mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <Skull className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse text-red-500 shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-black tracking-widest text-center sm:text-left">{glitchText}</h1>
          </div>
          <Link href="/" className="text-red-900 hover:text-red-500 transition-colors uppercase text-xs sm:text-sm tracking-widest border border-red-900 p-2 hover:bg-red-900/20 whitespace-nowrap">
            [ EXIT NODE ]
          </Link>
        </div>

        <div className="bg-red-950/20 text-red-400 p-4 mb-8 text-sm border-l-4 border-red-700 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-1" />
          <p>
            WARNING: You have entered the unindexed sector of Crazyverse. The tools listed here are highly anomalous. Proceed at your own risk.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {DARK_TOOLS.map((tool, idx) => (
            <Link 
              key={idx}
              href={tool.url}
              target="_blank"
              className="group flex flex-col md:flex-row md:items-center justify-between p-4 border border-red-900/50 hover:border-red-500 bg-black hover:bg-red-950/30 transition-all cursor-[crosshair] gap-4 md:gap-0"
            >
              <div className="flex items-start md:items-center gap-4">
                <span className="text-red-900 font-bold opacity-50 group-hover:opacity-100 mt-1 md:mt-0 shrink-0">[{idx + 1}]</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-red-500 transition-colors">{tool.title}</h3>
                  <p className="text-red-800 text-xs sm:text-sm mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
              <Ghost className="w-6 h-6 text-red-900 group-hover:text-red-500 transition-colors opacity-50 md:opacity-0 group-hover:opacity-100 self-end md:self-auto shrink-0" />
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center text-xs text-red-900 opacity-50">
          SYSTEM.ROOT // 192.168.1.xxx // ACCESS GRANTED
        </div>
      </div>
    </div>
  );
}
