"use client";

import { useSheetStore } from "@/src/lib/store";

export function Toolbar() {
  const activeCell = useSheetStore((state) => state.activeCell);
  const cells = useSheetStore((state) => state.cells);
  const updateCellFormat = useSheetStore((state) => state.updateCellFormat);

  const currentFormat = activeCell ? cells[activeCell]?.format || {} : {};

  const toggleBold = () => activeCell && updateCellFormat(activeCell, { bold: !currentFormat.bold });
  const toggleItalic = () => activeCell && updateCellFormat(activeCell, { italic: !currentFormat.italic });
  const changeColor = (color: string) => activeCell && updateCellFormat(activeCell, { color });

  return (
    <div className="flex items-center gap-1 px-4 py-1.5 border-b border-slate-200 bg-slate-50 shrink-0 overflow-x-auto no-scrollbar">
      {/* ... keeping your undo/redo buttons here ... */}
      
      <div className="w-px h-5 bg-slate-300 mx-2" />
      
      <button 
        onClick={toggleBold}
        className={`p-1.5 rounded-md transition-colors font-serif font-bold text-sm ${currentFormat.bold ? 'bg-slate-200 text-blue-600' : 'text-slate-600 hover:bg-slate-200'}`}
      >B</button>
      <button 
        onClick={toggleItalic}
        className={`p-1.5 rounded-md transition-colors font-serif italic text-sm ${currentFormat.italic ? 'bg-slate-200 text-blue-600' : 'text-slate-600 hover:bg-slate-200'}`}
      >I</button>
      
      {/* Color Picker using native HTML input hidden behind a clean UI */}
      <div className="relative flex items-center p-1.5 rounded-md hover:bg-slate-200 transition-colors">
        <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: currentFormat.color || '#000' }} />
        <input 
          type="color" 
          onChange={(e) => changeColor(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
      
      <div className="w-px h-5 bg-slate-300 mx-2" />
      <div className="text-xs text-slate-400 italic px-2">Format active cell</div>
    </div>
  );
}