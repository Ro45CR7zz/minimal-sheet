"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSheetStore } from "@/src/lib/store";
import { Cell } from "./Cell";

const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

export function Grid() {
  const { colWidths, rowHeights, colOrder, rowOrder, setColWidth, reorderCol, moveActiveCell } = useSheetStore();
  const [draggedCol, setDraggedCol] = useState<number | null>(null);

  // Layout Generator: Builds "120px 80px 120px..." based on order and custom widths
  const gridTemplateColumns = `40px ${colOrder.map(c => `${colWidths[c] || 120}px`).join(' ')}`;
  const gridTemplateRows = `30px ${rowOrder.map(r => `${rowHeights[r] || 28}px`).join(' ')}`;

  // Column Resizing Logic
  const handleColResize = (e: React.MouseEvent, colIndex: number) => {
    e.stopPropagation();
    const startX = e.pageX;
    const startWidth = colWidths[colIndex] || 120;

    const onMouseMove = (moveEvent: MouseEvent) => {
      setColWidth(colIndex, startWidth + (moveEvent.pageX - startX));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Keyboard navigation listener (Same as before)
  useEffect(() => {
    // ... keep your existing handleKeyDown logic here ...
  }, [moveActiveCell]);

  return (
    <div className="flex-1 overflow-auto bg-slate-50 relative">
      <div 
        className="grid w-max bg-slate-300 border-b border-r border-slate-300"
        style={{ gridTemplateColumns, gridTemplateRows }}
      >
        {/* Top-Left Empty Corner */}
        <div className="bg-slate-100 border-r border-b border-slate-300 sticky top-0 left-0 z-40 shadow-[1px_1px_0_rgba(203,213,225,1)]" />

        {/* Dynamic Column Headers with Drag & Resize */}
        {colOrder.map((colIndex, renderIdx) => (
          <div 
            key={`col-header-${colIndex}`} 
            draggable
            onDragStart={() => setDraggedCol(renderIdx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedCol !== null && draggedCol !== renderIdx) {
                reorderCol(draggedCol, renderIdx);
              }
              setDraggedCol(null);
            }}
            className="bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-medium text-slate-500 sticky top-0 z-30 select-none cursor-grab active:cursor-grabbing hover:bg-slate-200 transition-colors relative"
          >
            {getColumnLabel(colIndex)}
            {/* Invisible Resize Handle */}
            <div 
              onMouseDown={(e) => handleColResize(e, colIndex)}
              className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-500 z-50 transition-colors opacity-0 hover:opacity-100"
            />
          </div>
        ))}

        {/* Dynamic Rows */}
        {rowOrder.map((rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Row Header */}
            <div className="bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-medium text-slate-500 sticky left-0 z-30 select-none shadow-[1px_0_0_rgba(203,213,225,1)]">
              {rowIndex + 1}
            </div>

            {/* Cells mapped to the reordered columns */}
            {colOrder.map((colIndex) => {
              const cellId = `${getColumnLabel(colIndex)}${rowIndex + 1}`;
              return <Cell key={cellId} id={cellId} />;
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}