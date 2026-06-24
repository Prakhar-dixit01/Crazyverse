"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laugh } from "lucide-react";

const JOKES = [
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call fake spaghetti? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I would avoid the sushi if I was you. It’s a little fishy.",
  "Want to hear a joke about a piece of paper? Never mind... it's tearable.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I'm reading a book on anti-gravity. I can't put it down!"
];

export default function JokeGenerator() {
  const [joke, setJoke] = useState("Click the button for a crazy joke!");
  const [key, setKey] = useState(0);

  const getJoke = () => {
    let newJoke = joke;
    while (newJoke === joke) {
      newJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    }
    setJoke(newJoke);
    setKey(prev => prev + 1);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 p-6 rounded-3xl flex flex-col items-center text-center h-full justify-between hover:border-purple-500/60 transition-colors shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      <h3 className="text-xl font-black text-purple-400 mb-4 tracking-wider flex items-center gap-2">
        <Laugh className="w-6 h-6" /> TIME PASS JOKES
      </h3>
      
      <div className="flex-grow flex items-center justify-center min-h-[100px] w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="text-lg font-medium text-white italic"
          >
            &quot;{joke}&quot;
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={getJoke}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        TELL ME ANOTHER!
      </motion.button>
    </div>
  );
}
