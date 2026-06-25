"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, ChevronDown, Award } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const BADGES = [
  { id: "beginner", name: "Novice Waster", desc: "Spent 1 minute on the site", requirement: 60 },
  { id: "pro", name: "Pro Procrastinator", desc: "Spent 5 minutes on the site", requirement: 300 },
  { id: "master", name: "Master of None", desc: "Spent 10 minutes on the site", requirement: 600 },
  { id: "god", name: "Time Lord", desc: "Spent 30 minutes on the site", requirement: 1800 },
];

export default function Gamification() {
  const [xp, setXp] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newBadgeNotification, setNewBadgeNotification] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedXp = localStorage.getItem("crazyverse_xp");
    const savedBadges = localStorage.getItem("crazyverse_badges");
    if (savedXp) setXp(parseInt(savedXp));
    if (savedBadges) setUnlockedBadges(JSON.parse(savedBadges));
  }, []);

  // Update XP function
  const addXp = (amount: number) => {
    setXp(prev => {
      const nextXp = prev + amount;
      localStorage.setItem("crazyverse_xp", nextXp.toString());
      
      // Check for new badges
      BADGES.forEach(badge => {
        if (nextXp >= badge.requirement && !unlockedBadges.includes(badge.id)) {
          const newBadges = [...unlockedBadges, badge.id];
          setUnlockedBadges(newBadges);
          localStorage.setItem("crazyverse_badges", JSON.stringify(newBadges));
          
          setNewBadgeNotification(badge.name);
          setTimeout(() => setNewBadgeNotification(null), 5000);
          
          if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(`Badge Unlocked: ${badge.name}`);
            u.rate = 1.2;
            window.speechSynthesis.speak(u);
          }
        }
      });
      return nextXp;
    });
  };

  // Action-based XP
  useEffect(() => {
    // 10 XP every minute of active time
    const timeInterval = setInterval(() => {
      addXp(10);
    }, 60000);

    const handleGlobalClick = () => addXp(1); // 1 XP per click
    const handleGlobalKey = () => addXp(2);   // 2 XP per keystroke

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("keydown", handleGlobalKey);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleGlobalKey);
    };
  }, [unlockedBadges]); // need unlockedBadges in scope for addXp to check correctly

  // Level formula (Exponential: harder to level up as you go)
  // Level 1: 0-99, Level 2: 100-399, Level 3: 400-899...
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  
  // Calculate progress to next level
  const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
  const nextLevelBaseXP = Math.pow(level, 2) * 100;
  const xpNeededForCurrentLevel = nextLevelBaseXP - currentLevelBaseXP;
  const xpGainedInCurrentLevel = xp - currentLevelBaseXP;
  const progressToNextLevel = xpGainedInCurrentLevel / xpNeededForCurrentLevel;
  const xpLeft = nextLevelBaseXP - xp;

  return (
    <>
      {/* New Badge Notification Overlay */}
      <AnimatePresence>
        {newBadgeNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[99999] bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black px-8 py-4 rounded-full shadow-[0_0_50px_rgba(250,204,21,0.6)] flex items-center gap-4 border-4 border-white"
          >
            <Award className="w-8 h-8 animate-spin" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest opacity-80">Badge Unlocked!</span>
              <span className="text-xl">{newBadgeNotification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating XP Widget */}
      <div className="fixed top-20 right-4 md:top-24 md:right-6 z-[90] font-sans scale-90 md:scale-100 origin-top-right">
        <div 
          className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:border-blue-400 transition-colors w-48"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Header */}
          <div className="p-3 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black shadow-inner">
                {level}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-500 uppercase">Level</span>
                <span className="text-sm font-black text-blue-900">{xp} XP</span>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progressToNextLevel * 100}%` }}
            />
          </div>

          {/* Expanded State */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="bg-white border-t border-gray-100 overflow-hidden"
              >
                <div className="p-3 bg-gray-50 text-xs text-center font-medium text-gray-500 border-b border-gray-100">
                  {xpLeft} XP to next level
                </div>
                <div className="p-3 max-h-64 overflow-y-auto">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Badges</h4>
                  <div className="flex flex-col gap-2">
                    {BADGES.map(badge => {
                      const isUnlocked = unlockedBadges.includes(badge.id);
                      return (
                        <div key={badge.id} className={`flex items-start gap-2 p-2 rounded-lg border ${isUnlocked ? 'border-yellow-200 bg-yellow-50' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}>
                          {isUnlocked ? <Trophy className="w-5 h-5 text-yellow-500 shrink-0" /> : <Star className="w-5 h-5 text-gray-300 shrink-0" />}
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isUnlocked ? 'text-yellow-900' : 'text-gray-500'}`}>{badge.name}</span>
                            <span className="text-[10px] text-gray-500 leading-tight mt-0.5">{badge.desc}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
