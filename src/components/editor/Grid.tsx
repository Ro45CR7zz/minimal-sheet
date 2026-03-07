import React from "react";

const COLS = 26; // A to Z
const ROWS = 50; // 1 to 50

// Helper to convert index 0, 1, 2 to A, B, C
const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

export function Grid() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 relative">
      <div 
        className="grid w-max bg-slate-300 border-b border-r border-slate-300"
        style={{
          // 40px for row numbers, 120px for each standard cell
          gridTemplateColumns: `40px repeat(${COLS}, 120px)`,
          // 30px for col headers, 28px for each standard cell
          gridTemplateRows: `30px repeat(${ROWS}, 28px)`
        }}
      >
        {/* Top-Left Empty Corner (Sticky both ways) */}
        <div className="bg-slate-100 border-r border-b border-slate-300 sticky top-0 left-0 z-30 shadow-[1px_1px_0_rgba(203,213,225,1)]" />

        {/* Column Headers: A, B, C... (Sticky Top) */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div 
            key={`col-${i}`} 
            className="bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-medium text-slate-500 sticky top-0 z-20 select-none shadow-[0_1px_0_rgba(203,213,225,1)]"
          >
            {getColumnLabel(i)}
          </div>
        ))}

        {/* Rows */}
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            
            {/* Row Number Header: 1, 2, 3... (Sticky Left) */}
            <div className="bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-medium text-slate-500 sticky left-0 z-20 select-none shadow-[1px_0_0_rgba(203,213,225,1)]">
              {rowIndex + 1}
            </div>

            {/* Actual Cells */}
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                // contentEditable makes the div act like an input temporarily for our skeleton
                contentEditable 
                suppressContentEditableWarning
                className="bg-white border-r border-b border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 px-1.5 py-0.5 text-sm text-slate-900 overflow-hidden whitespace-nowrap"
              >
              </div>
            ))}
            
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}