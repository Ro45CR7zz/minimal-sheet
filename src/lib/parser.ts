import { CellData } from "./store";

// Helper to expand "A1:A3" into ["A1", "A2", "A3"]
function getCellRange(start: string, end: string): string[] {
  const startCol = start.charCodeAt(0);
  const startRow = parseInt(start.slice(1));
  const endCol = end.charCodeAt(0);
  const endRow = parseInt(end.slice(1));

  const cells = [];
  for (let c = startCol; c <= endCol; c++) {
    for (let r = startRow; r <= endRow; r++) {
      cells.push(`${String.fromCharCode(c)}${r}`);
    }
  }
  return cells;
}

// The main evaluation engine
export function evaluateFormula(
  formula: string, 
  cells: Record<string, CellData>,
  visited = new Set<string>() // Prevents infinite loops if A1 relies on A1
): string {
  // 1. If it doesn't start with '=', it's just raw text
  if (!formula.startsWith("=")) return formula;

  let expression = formula.substring(1).toUpperCase();

  // 2. Parse SUM(Range) first
  // Matches exactly "SUM(A1:B2)"
  const sumRegex = /SUM\(([A-Z][0-9]+):([A-Z][0-9]+)\)/g;
  expression = expression.replace(sumRegex, (_, start, end) => {
    const rangeIds = getCellRange(start, end);
    let sum = 0;
    
    rangeIds.forEach(id => {
      // Recursively evaluate the target cell just in case it's ALSO a formula
      const cellVal = cells[id]?.value || "0";
      
      // Prevent infinite circular dependencies (e.g., A1 = B1, B1 = A1)
      if (!visited.has(id)) {
        visited.add(id);
        const computedStr = evaluateFormula(cellVal, cells, visited);
        const num = parseFloat(computedStr);
        if (!isNaN(num)) sum += num;
      }
    });
    
    return sum.toString();
  });

  // 3. Replace single cell references (like "A1" or "Z50") with their values
  const cellRefRegex = /[A-Z][0-9]+/g;
  expression = expression.replace(cellRefRegex, (match) => {
    if (visited.has(match)) return "0"; // Circular reference protection
    visited.add(match);
    
    const cellVal = cells[match]?.value || "0";
    const computedStr = evaluateFormula(cellVal, cells, visited);
    
    return isNaN(parseFloat(computedStr)) ? "0" : computedStr;
  });

  // 4. Safely execute the resulting math string (e.g., "10 + 20")
  try {
    // Note: new Function is a lightweight alternative to eval() for math.
    // In a massive enterprise app, we'd use a strict math AST parser here.
    const result = new Function(`return ${expression}`)();
    return Number.isFinite(result) ? result.toString() : "!ERROR";
  } catch (error) {
    return "!ERROR"; // Shows up in the cell if they type a broken formula like "=10++20"
  }
}