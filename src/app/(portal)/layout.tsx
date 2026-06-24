"use client";

import { Search, Hash, SquareUser, Asterisk } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchModal from "@/components/SearchModal";
import WastedTimeCounter from "@/components/WastedTimeCounter";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_3rem] font-sans text-black flex flex-col selection:bg-black selection:text-white">
      {/* Minimalist Monochrome Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 h-20">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between gap-8">
          
          <div className="flex items-center gap-8 h-full">
            <Link href="/" className="flex items-center group">
              <div className="bg-black text-white w-12 h-12 flex items-center justify-center mr-4 rounded-sm hover:rounded-xl transition-all duration-300">
                <Asterisk className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <h1 className="text-2xl font-black tracking-tight uppercase hidden md:block">
                CRAZYVERSE
              </h1>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8 font-bold text-gray-500 text-sm uppercase tracking-widest h-full">
              <Link href="/categories" className="hover:text-black transition-colors">Directory</Link>
              <Link href="/games" className="hover:text-black transition-colors">Games</Link>
              <Link href="/tools" className="hover:text-black transition-colors">Tools</Link>
            </nav>
          </div>

          <div className="flex-1 max-w-2xl flex items-center h-12 gap-4">
            <button 
              id="search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center flex-1 bg-gray-100 border border-transparent hover:border-black hover:bg-white transition-all h-full cursor-text group"
            >
              <div className="px-4 text-gray-400 group-hover:text-black transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left px-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Search database...
              </div>
              <div className="bg-black text-white px-6 h-full flex items-center justify-center font-bold text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer">
                Find
              </div>
            </button>
            <WastedTimeCounter />
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Stark Marquee Bar */}
      <div className="bg-black text-white border-b border-gray-800 py-2 overflow-hidden relative z-40">
        <div className="whitespace-nowrap animate-ticker text-xs font-medium tracking-[0.2em] uppercase flex gap-16">
          <span>// SYSTEM ACTIVE</span>
          <span>// 1000 ENTRIES LOADED</span>
          <span>// AWAITING USER INPUT</span>
          <span>// BOREDOM ELIMINATION PROTOCOL INITIATED</span>
          <span>// SYSTEM ACTIVE</span>
          <span>// 1000 ENTRIES LOADED</span>
          <span>// AWAITING USER INPUT</span>
          <span>// BOREDOM ELIMINATION PROTOCOL INITIATED</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow pb-24">
        {children}
      </div>
    </div>
  );
}
