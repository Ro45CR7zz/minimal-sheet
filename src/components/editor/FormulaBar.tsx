"use client";

import React, { useState, useEffect } from "react";
import { useSheetStore } from "@/src/lib/store";

export function FormulaBar() {
  const activeCell = useSheetStore((state) => state.activeCell);
  const cells = useSheetStore((state) => state.cells);
  const setCellValue = useSheetStore((state) => state.setCellValue);

  const [inputValue, setInputValue] = useState("");

  // When you click a different cell in the grid, update the top bar's text
  useEffect(() => {
    if (activeCell) {
      setInputValue(cells[activeCell]?.value || "");
    } else {
      setInputValue("");
    }
  }, [activeCell, cells]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && activeCell) {
      setCellValue(activeCell, inputValue);
      e.currentTarget.blur(); // Remove focus after pressing Enter
    }
  };

  const handleBlur = () => {
    if (activeCell) {
      setCellValue(activeCell, inputValue);
    }
  };

  return (
    <div className="flex items-center border-b border-slate-200 bg-white shrink-0">
      <div className="w-10 flex justify-center py-1.5 border-r border-slate-200 bg-slate-50 shrink-0">
        <span className="text-slate-400 font-serif italic text-sm">fx</span>
      </div>
      <input 
        type="text" 
        placeholder={activeCell ? `Editing ${activeCell}...` : "Select a cell..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={!activeCell}
        className="flex-1 px-3 py-1.5 text-sm outline-none font-mono text-slate-800 disabled:bg-slate-50 transition-colors"
      />
    </div>
  );
}