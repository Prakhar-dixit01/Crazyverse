"use client";

import { PRO_GAMES_DATA } from "@/lib/data";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, ArrowUpCircle } from "lucide-react";

// Individual feed item component to handle lazy loading of the iframe
const FeedItem = ({ item }: { item: any }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Render if it's anywhere close to the viewport (threshold 0 means even 1 pixel visible)
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          // Unmount the iframe to save memory/prevent lag when not visible
          setIsIntersecting(false);
        }
      },
      { rootMargin: "200% 0px" } // Pre-load 2 screens ahead/behind
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className="h-[100dvh] w-full snap-start snap-always relative flex flex-col justify-center items-center bg-gray-50 border-b border-gray-200"
    >
      <div className="relative z-10 w-full max-w-4xl h-full md:h-[80vh] md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between z-20">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {item.title}
            </h2>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content Iframe */}
        <div className="flex-grow relative bg-gray-100">
          {isIntersecting ? (
            <iframe
              src={item.url}
              title={item.title}
              className="absolute inset-0 w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DoomScrollPage() {
  const [feed, setFeed] = useState<any[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    const randomItems = [];
    for (let i = 0; i < 3; i++) { // Load fewer at a time to prevent lag
      const randomGame = PRO_GAMES_DATA[Math.floor(Math.random() * PRO_GAMES_DATA.length)];
      randomItems.push({ ...randomGame, uniqueId: Date.now() + Math.random() });
    }
    setFeed(prev => [...prev, ...randomItems]);
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  if (feed.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white text-gray-900 h-[100dvh] w-full overflow-hidden">
      
      {/* Top Bar Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[210] flex justify-between items-center pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2 pointer-events-auto">
          <ArrowUpCircle className="w-5 h-5 text-blue-500 animate-bounce" />
          <span className="font-bold text-sm text-gray-800">Swipe Up</span>
        </div>

        <Link 
          href="/" 
          className="bg-white hover:bg-gray-100 p-3 rounded-full border border-gray-200 shadow-sm pointer-events-auto transition-colors"
          title="Exit Doom Scroll"
        >
          <X className="w-6 h-6 text-gray-800" />
        </Link>
      </div>

      {/* Snap Scrolling Container */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
        {feed.map((item, index) => (
          <div key={item.uniqueId} className="relative">
            <FeedItem item={item} />
            
            {/* Invisible observer target at the end of the list */}
            {index === feed.length - 1 && (
              <div ref={observerTarget} className="absolute bottom-0 h-[50vh] w-full pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
