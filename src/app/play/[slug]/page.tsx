"use client";

import { PRO_GAMES_DATA } from "@/lib/data";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Lightbulb, Flame, PlayCircle, Clock } from "lucide-react";
import { useState, use, useEffect } from "react";
import confetti from "canvas-confetti";

// -- Sub Components --

const PlayTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-black/50 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-mono font-bold border border-gray-200 dark:border-white/10 shadow-inner backdrop-blur-sm">
      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      {formatTime(seconds)}
    </div>
  );
};

const RatingStars = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    if (value >= 4) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF8C00', '#FF0080', '#00FFFF', '#00FF00']
      });
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl w-fit shadow-sm">
      <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">Rate:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-125"
        >
          <Star 
            className={`w-6 h-6 transition-colors ${
              (hover || rating) >= star 
                ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" 
                : "text-gray-300 dark:text-gray-600"
            }`} 
          />
        </button>
      ))}
    </div>
  );
};

// -- Main Page --

export default function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  
  const decoded = decodeURIComponent(unwrappedParams.slug);
  const normalizedSlug = decoded.replace(/ /g, '-');
  const item = PRO_GAMES_DATA.find(c => c.slug === normalizedSlug || c.slug === unwrappedParams.slug || c.slug === decoded);
  
  const [focusMode, setFocusMode] = useState(false);
  const [isRageQuitting, setIsRageQuitting] = useState(false);

  if (!item) {
    console.error("404 in PlayPage:", unwrappedParams.slug);
    return notFound();
  }

  // Get similar games for the Quick Switch Dock
  const similarGames = PRO_GAMES_DATA.filter(g => g.category === item.category && g.slug !== item.slug).slice(0, 8);

  const handleRageQuit = () => {
    setIsRageQuitting(true);
    setTimeout(() => {
      router.push('/tools');
    }, 1400);
  };

  return (
    <div className={`min-h-[80vh] transition-all duration-1000 w-full ${focusMode ? "bg-black" : "bg-white"}`}>
      
      {/* Focus Mode Overlay Background */}
      {focusMode && (
        <div className="fixed inset-0 bg-black z-[110] transition-opacity duration-1000" />
      )}
      
      <div className={`container mx-auto px-4 py-8 max-w-[1400px] relative ${focusMode ? "z-[120]" : ""}`}>
        
        {/* Top Action Bar */}
        <div className={`mb-6 flex flex-wrap items-center justify-between gap-4 transition-all duration-500 ${focusMode ? "opacity-0 hover:opacity-100 absolute top-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md z-[130] rounded-b-2xl" : "opacity-100 bg-white border border-gray-200 shadow-sm p-4 rounded-2xl"}`}>
          
          {/* Left Side: Back & Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className={`p-2.5 rounded-xl transition-colors ${focusMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}>
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className={`text-xl md:text-3xl font-black tracking-tight ${focusMode ? "text-white" : "text-gray-900"}`}>{item.title}</h1>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{item.category}</span>
            </div>
          </div>
          
          {/* Right Side: Tools & Actions */}
          <div className="flex items-center gap-3">
            <PlayTimer />
            
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${focusMode ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}`}
            >
              <Lightbulb className="w-5 h-5" /> Focus Mode
            </button>
            
            <button 
              onClick={handleRageQuit}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black transition-colors border group ${focusMode ? "bg-red-600/20 text-red-500 border-red-500/50 hover:bg-red-600 hover:text-white" : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"}`}
            >
              <Flame className="w-5 h-5 group-hover:animate-pulse" /> RAGE QUIT
            </button>
          </div>
        </div>

        {/* Main Game Container */}
        <div className="relative w-full max-w-6xl mx-auto flex justify-center mt-6">
          
          {/* Cinematic Ambilight Effect (Blurred Image matching game thumbnail) */}
          <div className={`absolute inset-[-20px] z-0 overflow-hidden rounded-3xl pointer-events-none transition-opacity duration-1000 ${focusMode ? "opacity-60" : "opacity-20"}`}>
             <img 
               src={item.thumbnail} 
               alt="" 
               className="w-full h-full object-cover blur-[60px] saturate-[2.0] scale-105" 
             />
          </div>

          {/* Actual Game Iframe */}
          <div className={`relative z-10 w-full aspect-[4/3] md:aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${focusMode ? "scale-[1.02] md:scale-[1.05] border-none ring-1 ring-white/10" : "border-2 border-gray-200"} ${isRageQuitting ? "animate-rage pointer-events-none" : ""}`}>
            <iframe
              src={item.url}
              className="absolute inset-0 w-full h-full border-none"
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

        </div>

        {/* Bottom Section (Hidden in Focus Mode) */}
        <div className={`mt-8 max-w-6xl mx-auto transition-all duration-500 ${focusMode ? "opacity-0 pointer-events-none translate-y-8" : "opacity-100 translate-y-0"}`}>
          
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                 <PlayCircle className="text-blue-500" /> About {item.title}
              </h3>
              <p className="text-gray-600 max-w-2xl">
                Experience high-quality web gaming. You are currently playing an official HTML5 version directly embedded for maximum performance.
              </p>
            </div>
            
            {/* Interactive Rating Component */}
            <RatingStars />
          </div>

          {/* Quick Switch Gaming Dock (macOS Style) */}
          {similarGames.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Quick Switch</h3>
              <div className="flex justify-center flex-wrap gap-4 px-4 pb-12">
                {similarGames.map(sim => (
                  <Link 
                    key={sim.slug} 
                    href={`/play/${sim.slug}`}
                    className="group relative flex flex-col items-center hover:-translate-y-4 transition-all duration-300"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-gray-200 group-hover:border-blue-500 shadow-md group-hover:shadow-xl bg-white">
                      <img src={sim.thumbnail} alt={sim.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 bg-gray-900 text-white font-bold text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                      {sim.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
