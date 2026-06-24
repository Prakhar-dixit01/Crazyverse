"use client";

import { useEffect, useRef, useState } from "react";
import { PenTool, X } from "lucide-react";

export default function VandalizeCanvas() {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      // Save current drawing
      const data = canvas.toDataURL();
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Restore drawing
      const img = new Image();
      img.src = data;
      img.onload = () => ctx.drawImage(img, 0, 0);
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isDrawingMode]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <button
        onClick={() => setIsDrawingMode(!isDrawingMode)}
        className="fixed bottom-32 right-6 z-[100] p-4 rounded-full shadow-2xl transition-all duration-300 bg-black text-white hover:bg-gray-800 border-2 border-white/20"
        title="Vandalize Mode (Draw on Screen)"
      >
        {isDrawingMode ? <X className="w-6 h-6 text-red-500" /> : <PenTool className="w-6 h-6 text-blue-400" />}
      </button>

      {isDrawingMode && (
        <div className="fixed inset-0 z-[90] cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 items-center shadow-2xl pointer-events-auto">
            <span className="text-white font-bold text-sm mr-2">Color:</span>
            {["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#ffffff", "#000000"].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <button 
              onClick={clearCanvas}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  );
}
