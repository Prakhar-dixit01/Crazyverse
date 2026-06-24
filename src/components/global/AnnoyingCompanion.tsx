"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMPLAINTS = [
  "Are you still looking at this?",
  "My grandma clicks faster than you.",
  "Boring! Do something crazy!",
  "Why did you even open this website?",
  "I am stuck in this code. Help!",
  "Error 404: Your skills not found.",
  "You should probably go outside.",
  "Stop touching the mouse!",
  "Is this what you do with your life?",
  "I'm judging you silently. Actually, loudly."
];

export default function AnnoyingCompanion() {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only mount on client
    setIsVisible(true);
    
    const complainInterval = setInterval(() => {
      // 30% chance to say something every 10 seconds
      if (Math.random() > 0.7) {
        const randomComplaint = COMPLAINTS[Math.floor(Math.random() * COMPLAINTS.length)];
        setMessage(randomComplaint);
        
        // Disappear the message after 4 seconds
        setTimeout(() => setMessage(""), 4000);
      }
    }, 10000);

    return () => clearInterval(complainInterval);
  }, []);

  const handlePoke = () => {
    const responses = ["Ouch!", "Stop poking me!", "Hey watch it!", "I'm calling the police!"];
    const text = responses[Math.floor(Math.random() * responses.length)];
    setMessage(text);
    
    // Actually speak
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.5; // annoying high pitch
      utterance.rate = 1.2;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 right-4 md:right-6 z-[9999] pointer-events-auto scale-75 md:scale-100 origin-bottom-right">
      <div className="relative group cursor-pointer" onClick={handlePoke}>
        {/* Speech Bubble */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold p-3 rounded-2xl shadow-xl border-2 border-black w-48 text-center"
            >
              {message}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white -mt-[3px]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Robot Character */}
        <div className="bg-yellow-400 border-4 border-black p-2 rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all">
          <div className="text-4xl">🤖</div>
        </div>
      </div>
    </div>
  );
}
