"use client";

import { useState, useEffect } from "react";

export default function BossKey() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsActive((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isActive) {
    return (
      <button 
        onClick={() => setIsActive(true)}
        className="fixed bottom-4 right-4 z-[99999] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity md:hidden"
        title="Panic Button (Boss Key)"
      >
        🚨
      </button>
    );
  }

  // Generate fake excel cells
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Less columns for mobile
  const rows = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[999999] bg-white text-black font-sans select-none flex flex-col h-screen w-screen overflow-hidden">
      {/* Fake Toolbar */}
      <div className="bg-[#107c41] text-white p-2 flex items-center justify-between text-sm font-semibold border-b border-[#0b5c30]">
        <div className="flex items-center gap-2">
          <span>Financial_Report_Q3.xlsx - Excel</span>
        </div>
        <div 
          className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-sm flex items-center justify-center cursor-pointer md:hidden"
          onClick={() => setIsActive(false)}
        >
          X
        </div>
      </div>
      
      {/* Fake Ribbon */}
      <div className="bg-[#f3f2f1] border-b border-[#e1dfdd] p-2 flex gap-6 text-xs text-gray-600">
        <span className="font-bold text-[#107c41] border-b-2 border-[#107c41] pb-1">Home</span>
        <span>Insert</span>
        <span>Page Layout</span>
        <span>Formulas</span>
        <span>Data</span>
        <span>Review</span>
        <span>View</span>
      </div>
      <div className="bg-[#f3f2f1] border-b border-[#e1dfdd] p-2 h-16 flex items-center gap-4">
        {/* Fake ribbon tools */}
        <div className="flex flex-col gap-1 px-4 border-r border-gray-300">
          <div className="flex gap-2">
            <span className="font-bold">Calibri</span>
            <span>11</span>
          </div>
          <div className="flex gap-2 font-bold">
            <span>B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
          </div>
        </div>
        <div className="px-4 text-xs text-gray-500 italic">Formatting Options</div>
      </div>

      {/* Fake Formula Bar */}
      <div className="flex border-b border-[#e1dfdd] bg-white text-sm">
        <div className="w-10 border-r border-[#e1dfdd] text-center bg-[#f3f2f1] font-medium text-gray-600">A1</div>
        <div className="flex-grow px-2 flex items-center gap-2">
          <span className="text-gray-400 italic px-2">fx</span>
          <span className="text-black">45200</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-grow overflow-hidden flex flex-col relative">
        <table className="w-full text-xs text-right border-collapse table-fixed">
          <thead>
            <tr className="bg-[#f3f2f1]">
              <th className="w-10 border border-[#e1dfdd] bg-[#f3f2f1]"></th>
              {columns.map((col) => (
                <th key={col} className="border border-[#e1dfdd] px-1 text-center font-normal text-gray-600 py-1 font-sans cursor-pointer hover:bg-[#e1dfdd]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="border border-[#e1dfdd] bg-[#f3f2f1] text-center text-gray-600 font-sans cursor-pointer hover:bg-[#e1dfdd]">
                  {row}
                </td>
                {columns.map((col) => (
                  <td key={col} className="border border-[#e1dfdd] px-2 py-1 h-5 overflow-hidden whitespace-nowrap outline-none focus:border-2 focus:border-[#107c41]">
                    {col === "A" && row === 1 ? "Revenue" : ""}
                    {col === "B" && row === 1 ? "45200" : ""}
                    {col === "A" && row === 2 ? "Expenses" : ""}
                    {col === "B" && row === 2 ? "21000" : ""}
                    {col === "A" && row === 3 ? "Profit" : ""}
                    {col === "B" && row === 3 ? "24200" : ""}
                    {col === "C" && row === 1 ? "Q1" : ""}
                    {col === "D" && row === 1 ? "Q2" : ""}
                    {col === "E" && row === 1 ? "Q3" : ""}
                    {/* Random numbers to make it look busy */}
                    {(row > 4 && Math.random() > 0.5) ? Math.floor(Math.random() * 100000) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fake Bottom Status Bar */}
      <div className="bg-[#f3f2f1] border-t border-[#e1dfdd] p-1 flex justify-between text-xs text-gray-600">
        <div className="flex gap-4">
          <span className="font-bold">Ready</span>
        </div>
        <div className="flex gap-4">
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
