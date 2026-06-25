"use client";

import { useEffect, useState } from "react";

export default function ScreenShatter() {
  const [cracks, setCracks] = useState<{ x: number; y: number; id: number; rot: number }[]>([]);

  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      // Don't shatter if clicking on a button or link
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        return;
      }

      // Play glass break sound
      const audio = new Audio("https://actions.google.com/sounds/v1/impacts/glass_shatter.ogg");
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play blocked", e));

      const isMobile = window.innerWidth < 768;
      const maxCracks = isMobile ? 1 : 3;

      const newId = Date.now();
      
      // Add a crack, respecting maximum limits to prevent lag
      setCracks(prev => {
        if (prev.length >= maxCracks) return prev;
        return [...prev, {
          x: e.clientX,
          y: e.clientY,
          id: newId,
          rot: Math.random() * 360
        }];
      });

      // Automatically remove the crack after 3 seconds
      setTimeout(() => {
        setCracks(prev => prev.filter(c => c.id !== newId));
      }, 3000);
    };

    window.addEventListener("dblclick", handleDoubleClick);
    return () => window.removeEventListener("dblclick", handleDoubleClick);
  }, []);

  if (cracks.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden transition-opacity duration-1000">
      {cracks.map(crack => (
        <div
          key={crack.id}
          className="absolute animate-fade-out"
          style={{
            left: crack.x,
            top: crack.y,
            transform: `translate(-50%, -50%) rotate(${crack.rot}deg)`,
            width: '300px',
            height: '300px',
            backgroundImage: 'url("https://pngimg.com/uploads/broken_glass/broken_glass_PNG63.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.8,
            filter: 'contrast(1.5) drop-shadow(2px 4px 6px rgba(0,0,0,0.5))',
            animation: 'fadeOut 3s forwards'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 0.8; }
          70% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
