"use client";

import { useState } from "react";
import { Apple } from "lucide-react";

export default function AntiGravity({ isDocked = false }: { isDocked?: boolean }) {
  const [isGravityOff, setIsGravityOff] = useState(false);

  const toggleGravity = () => {
    if (isGravityOff) {
      window.location.reload(); // Reload to fix layout
      return;
    }
    
    setIsGravityOff(true);

    // Get all interactive elements
    const elements = document.querySelectorAll("a, button, img, h1, h2, h3, p");
    
    const physicsElements: {
      el: HTMLElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      width: number;
      height: number;
      rotation: number;
      vrot: number;
    }[] = [];
    
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Skip our own floating buttons
      if (htmlEl.closest('.fixed')) return;

      const rect = htmlEl.getBoundingClientRect();
      
      // Clone element bounds for physics
      physicsElements.push({
        el: htmlEl,
        x: rect.left,
        y: rect.top,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 5, // initial jump
        width: rect.width,
        height: rect.height,
        rotation: 0,
        vrot: (Math.random() - 0.5) * 5
      });
      
      // Make it absolute
      htmlEl.style.position = "fixed";
      htmlEl.style.left = "0px";
      htmlEl.style.top = "0px";
      htmlEl.style.width = `${rect.width}px`;
      htmlEl.style.height = `${rect.height}px`;
      htmlEl.style.zIndex = "90";
      htmlEl.style.pointerEvents = "none";
    });

    let animationFrame: number;
    const animate = () => {
      physicsElements.forEach(p => {
        // Apply gravity
        p.vy += 0.5;
        
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vrot;

        // Bounce off bottom
        if (p.y + p.height > window.innerHeight) {
          p.y = window.innerHeight - p.height;
          p.vy *= -0.6; // Bounciness
          p.vx *= 0.8; // Friction
        }
        
        // Bounce off sides
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -0.6;
        } else if (p.x + p.width > window.innerWidth) {
          p.x = window.innerWidth - p.width;
          p.vx *= -0.6;
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <button
      onClick={toggleGravity}
      className={`${
        isDocked
          ? "relative p-3 rounded-full hover:scale-110"
          : "fixed top-6 right-6 z-[100] p-4 rounded-full shadow-2xl"
      } transition-all duration-300 border-2 border-white/20 ${
        isGravityOff 
          ? "bg-purple-600 text-white animate-spin" 
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
      title={isGravityOff ? "Reload to fix Gravity" : "Turn Off Gravity"}
    >
      <Apple className={isDocked ? "w-5 h-5" : "w-6 h-6"} />
    </button>
  );
}
