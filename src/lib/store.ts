import { create } from "zustand";
import { evaluateFormula } from "./parser";

export interface CellFormat {
  bold?: boolean;
  italic?: boolean;
  color?: string;
}

export interface CellData {
  id: string;
  value: string;
  computed: string;
  format?: CellFormat;
}

interface SheetState {
  cells: Record<string, CellData>;
  activeCell: string | null;
  
  // Layout State
  colWidths: Record<number, number>;
  rowHeights: Record<number, number>;
  colOrder: number[]; // e.g. [0, 1, 2...] Maps to A, B, C
  rowOrder: number[]; // e.g. [0, 1, 2...] Maps to 1, 2, 3
  
  // Actions
  setActiveCell: (id: string | null) => void;
  setCellValue: (id: string, value: string) => void;
  updateCellFormat: (id: string, format: Partial<CellFormat>) => void;
  moveActiveCell: (direction: "up" | "down" | "left" | "right") => void;
  
  // Layout Actions
  setColWidth: (index: number, width: number) => void;
  setRowHeight: (index: number, height: number) => void;
  reorderCol: (from: number, to: number) => void;
}

export const useSheetStore = create<SheetState>((set, get) => ({
  cells: {},
  activeCell: null,
  
  // Initialize default layout arrays (26 cols, 50 rows)
  colWidths: {},
  rowHeights: {},
  colOrder: Array.from({ length: 26 }, (_, i) => i),
  rowOrder: Array.from({ length: 50 }, (_, i) => i),

  setActiveCell: (id) => set({ activeCell: id }),

  updateCellFormat: (id, format) => set((state) => {
    const cell = state.cells[id] || { id, value: "", computed: "" };
    return {
      cells: {
        ...state.cells,
        [id]: { ...cell, format: { ...cell.format, ...format } }
      }
    };
  }),

  setColWidth: (index, width) => set((state) => ({ colWidths: { ...state.colWidths, [index]: Math.max(40, width) } })),
  setRowHeight: (index, height) => set((state) => ({ rowHeights: { ...state.rowHeights, [index]: Math.max(20, height) } })),
  
  reorderCol: (from, to) => set((state) => {
    const newOrder = [...state.colOrder];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    return { colOrder: newOrder };
  }),

  moveActiveCell: (direction) => set((state) => {
    // ... (Keep your existing moveActiveCell logic here) ...
    if (!state.activeCell) return state;
    const match = state.activeCell.match(/([A-Z]+)([0-9]+)/);
    if (!match) return state;

    let col = match[1].charCodeAt(0);
    let row = parseInt(match[2]);

    if (direction === "up" && row > 1) row--;
    if (direction === "down" && row < 50) row++;
    if (direction === "left" && col > 65) col--;
    if (direction === "right" && col < 90) col++;

    return { activeCell: `${String.fromCharCode(col)}${row}` };
  }),

  setCellValue: (id, value) => {
    // ... (Keep your existing setCellValue logic here) ...
    set((state) => {
      const newCells = { ...state.cells, [id]: { ...(state.cells[id] || {}), id, value, computed: value } };
      Object.keys(newCells).forEach((cellKey) => {
        const cell = newCells[cellKey];
        if (cell.value.startsWith("=")) {
          newCells[cellKey] = { ...cell, computed: evaluateFormula(cell.value, newCells, new Set()) };
        }
      });
      return { cells: newCells };
    });
  },
}));