"use client";

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { PRO_GAMES_DATA } from "@/lib/data";
import Link from "next/link";
import { Search, X, Command } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fuse = new Fuse(PRO_GAMES_DATA, {
  keys: ["title", "category", "type"],
  threshold: 0.3,
});

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(PRO_GAMES_DATA.slice(0, 5));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : document.getElementById("search-trigger")?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === "") {
      setResults(PRO_GAMES_DATA.slice(0, 5));
    } else {
      const searchResults = fuse.search(val).map((res) => res.item);
      setResults(searchResults.slice(0, 10)); // Top 10 results
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/80 backdrop-blur-sm cursor-pointer transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Search Input Area */}
        <div className="flex items-center border-b-2 border-black p-4 bg-gray-50">
          <Search className="w-6 h-6 text-gray-400 mr-4" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={handleSearch}
            placeholder="Search 1000+ games and tools..."
            className="flex-1 text-xl font-bold bg-transparent outline-none uppercase placeholder:text-gray-300"
          />
          <button 
            onClick={onClose}
            className="bg-black text-white p-1 hover:bg-red-500 transition-colors ml-4 border-2 border-transparent hover:border-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link 
                    href={`/play/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center p-3 hover:bg-black hover:text-white group transition-colors border border-transparent hover:border-black"
                  >
                    <span className="bg-gray-200 text-black group-hover:bg-white text-[10px] font-black px-2 py-1 uppercase tracking-widest mr-4">
                      {item.type}
                    </span>
                    <span className="font-bold text-lg flex-1 truncate transition-colors">
                      {item.title}
                    </span>
                    <span className="text-gray-400 group-hover:text-gray-300 font-bold uppercase text-xs tracking-widest">
                      {item.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest">
              NO RESULTS FOUND FOR "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-black text-white p-2 border-t-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-widest">
          <span>Search Engine: Active</span>
          <span className="flex items-center gap-2 text-gray-400">
            <Command className="w-3 h-3" />K TO OPEN
          </span>
        </div>
      </div>
    </div>
  );
}
