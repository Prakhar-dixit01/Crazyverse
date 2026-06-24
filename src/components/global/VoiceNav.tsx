"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff } from "lucide-react";

export default function VoiceNav() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // @ts-expect-error - SpeechRecognition is not standard in all browsers
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      // eslint-disable-next-line
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    // eslint-disable-next-line
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Heard:", transcript);

      if (transcript.includes("games") || transcript.includes("play")) {
        router.push("/games");
      } else if (transcript.includes("tools") || transcript.includes("utilities")) {
        router.push("/tools");
      } else if (transcript.includes("home") || transcript.includes("main")) {
        router.push("/");
      }
    };

    // eslint-disable-next-line
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      // eslint-disable-next-line
      setIsListening(false);
    };

    if (isListening) {
      try {
        recognition.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, router]);

  if (!supported) return null;

  return (
    <button
      onClick={() => setIsListening(!isListening)}
      className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border-2 ${
        isListening 
          ? "bg-red-500 hover:bg-red-600 text-white border-red-400 animate-pulse" 
          : "bg-white text-black hover:bg-gray-100 border-black"
      }`}
      title="Voice Navigation (Say 'Games', 'Tools', or 'Home')"
    >
      {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
    </button>
  );
}
