"use client";

import Link from "next/link";
import { Gamepad2, Wrench } from "lucide-react";
import RandomBoredomButton from "@/components/RandomBoredomButton";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col md:flex-row overflow-x-hidden font-sans">
      
      {/* Left Side - Tools */}
      <Link 
        href="/tools"
        className="group relative flex-1 min-h-[50dvh] md:min-h-0 bg-yellow-400 flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-500 hover:flex-[1.2] border-b-8 md:border-b-0 md:border-r-8 border-black z-10 hover:z-20 shadow-[0_0_50px_rgba(0,0,0,0.2)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#00000033_2px,transparent_2px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
        
        <div className="relative bg-white border-4 md:border-8 border-black rounded-3xl md:rounded-[3rem] p-6 md:p-12 text-center shadow-[8px_8px_0_rgba(0,0,0,1)] md:shadow-[16px_16px_0_rgba(0,0,0,1)] group-hover:-translate-y-4 group-hover:shadow-[12px_12px_0_rgba(0,0,0,1)] md:group-hover:shadow-[24px_24px_0_rgba(0,0,0,1)] transition-all duration-300">
          <Wrench className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-blue-600 group-hover:rotate-12 transition-transform" />
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black mb-2">Tools</h2>
          <p className="text-sm md:text-xl font-bold text-gray-600 uppercase">Make things happen</p>
        </div>
      </Link>

      {/* Right Side - Games */}
      <Link 
        href="/games"
        className="group relative flex-1 min-h-[50dvh] md:min-h-0 bg-blue-500 flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-500 hover:flex-[1.2] z-10 hover:z-20 shadow-[0_0_50px_rgba(0,0,0,0.2)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_2px,transparent_2px)] bg-[size:30px_30px] opacity-30 pointer-events-none" />
        
        <div className="relative bg-white border-4 md:border-8 border-black rounded-3xl md:rounded-[3rem] p-6 md:p-12 text-center shadow-[8px_8px_0_rgba(0,0,0,1)] md:shadow-[16px_16px_0_rgba(0,0,0,1)] group-hover:-translate-y-4 group-hover:shadow-[12px_12px_0_rgba(0,0,0,1)] md:group-hover:shadow-[24px_24px_0_rgba(0,0,0,1)] transition-all duration-300">
          <Gamepad2 className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-red-500 group-hover:-rotate-12 transition-transform" />
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black mb-2">Games</h2>
          <p className="text-sm md:text-xl font-bold text-gray-600 uppercase">Kill your boredom</p>
        </div>
      </Link>

      {/* Center Logo Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 sm:gap-8 pointer-events-none w-full max-w-[90vw]">
        <div 
          className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full border-4 border-white shadow-[0_0_30px_rgba(0,0,0,0.5)] transform -rotate-2 cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
          onClick={() => {
            const clicks = Number(localStorage.getItem('crazy_clicks') || 0) + 1;
            localStorage.setItem('crazy_clicks', clicks.toString());
            if (clicks >= 5) {
              localStorage.setItem('crazy_clicks', '0');
              window.location.href = '/dark-web';
            }
          }}
          title="Don't click me 5 times."
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-center select-none">
            CRAZYVERSE
          </h1>
        </div>
        
        <div className="pointer-events-auto transform rotate-2 flex flex-col gap-3 sm:gap-4 w-full px-2 sm:px-4 max-w-xs mx-auto">
          <RandomBoredomButton />
          
          <Link 
            href="/doom-scroll"
            className="group relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black uppercase tracking-widest text-sm sm:text-lg py-3 sm:py-4 px-4 sm:px-8 rounded-full border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none animate-pulse" />
            <span className="relative z-10 whitespace-nowrap">TikTok Mode</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
