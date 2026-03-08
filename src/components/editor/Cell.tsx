"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSheetStore } from "@/src/lib/store";
import { cn } from "@/src/lib/utils";

interface CellProps {
  id: string;
}

export const Cell = React.memo(function Cell({ id }: CellProps) {
  // Subscribe ONLY to this specific cell's data and the active cell ID
  const cellData = useSheetStore((state) => state.cells[id]);
  const isActive = useSheetStore((state) => state.activeCell === id);
  
  const setActiveCell = useSheetStore((state) => state.setActiveCell);
  const setCellValue = useSheetStore((state) => state.setCellValue);

  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(cellData?.value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input automatically when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Sync local state if external state changes (e.g., from another user later)
  useEffect(() => {
    setLocalValue(cellData?.value || "");
  }, [cellData?.value]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== (cellData?.value || "")) {
      setCellValue(id, localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
      // Move down automatically after saving!
      useSheetStore.getState().moveActiveCell("down");
    }
    if (e.key === "Escape") {
      setLocalValue(cellData?.value || ""); 
      setIsEditing(false);
    }
  };

  const formatStyle = {
    fontWeight: cellData?.format?.bold ? 'bold' : 'normal',
    fontStyle: cellData?.format?.italic ? 'italic' : 'normal',
    color: cellData?.format?.color || '#0f172a', // default text-slate-900
  };

  return (
    <div
      onClick={() => setActiveCell(id)}
      onDoubleClick={handleDoubleClick}
      className={cn(
        "bg-white border-r border-b border-slate-200 px-1.5 py-0.5 text-sm text-slate-900 overflow-hidden whitespace-nowrap relative cursor-cell",
        isActive && "outline-none ring-2 ring-blue-500 z-10"
      )}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={formatStyle}
          className="absolute inset-0 w-full h-full px-1.5 outline-none bg-white text-slate-900 z-20"
        />
      ) : (
        <span 
          className="truncate block w-full h-full select-none"
          style={formatStyle}
        >
          {cellData?.computed || ""}
        </span>
      )}
    </div>
  );
});