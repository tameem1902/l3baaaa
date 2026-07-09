export type HexCell = {
  id: number;
  row: number;
  col: number;
  letter: string;
  ownerId: string | null;
  isWinningPath?: boolean;
};

// Generates a staggered hex grid
// e.g., rows = 5, cols = 5
export function generateHexGrid(rows: number, cols: number): HexCell[] {
  const letters = "أبتثجحخدذرزسشصضطظعغفقكلمنهوي";
  const cells: HexCell[] = [];
  let id = 0;
  
  for (let r = 0; r < rows; r++) {
    // Alternate row lengths to make a classic honeycomb
    // Typically, if odd rows have N, even rows have N+1 or N-1.
    // Let's use N for all rows, but stagger them visually.
    for (let c = 0; c < cols; c++) {
      cells.push({
        id: id,
        row: r,
        col: c,
        letter: letters[id % letters.length], // Or randomize
        ownerId: null
      });
      id++;
    }
  }
  
  // Shuffle letters for randomness
  const shuffledLetters = letters.split('').sort(() => 0.5 - Math.random());
  cells.forEach((cell, i) => {
    cell.letter = shuffledLetters[i % shuffledLetters.length];
  });

  return cells;
}

// Get neighbors for a cell in a "flat-topped" staggered hex grid (odd-q or even-q) or "pointy-topped" (odd-r or even-r)
// Since we visually want pointy-topped hexagons (standard for this game type), we use odd-r staggered layout.
// In odd-r: odd rows are shifted right.
export function getNeighbors(cell: HexCell, rows: number, cols: number): {row: number, col: number}[] {
  const { row: r, col: c } = cell;
  const isOddRow = r % 2 !== 0;
  
  const neighbors = [];
  
  if (isOddRow) {
    neighbors.push({ row: r, col: c - 1 }); // Left
    neighbors.push({ row: r, col: c + 1 }); // Right
    neighbors.push({ row: r - 1, col: c }); // Top Left
    neighbors.push({ row: r - 1, col: c + 1 }); // Top Right
    neighbors.push({ row: r + 1, col: c }); // Bottom Left
    neighbors.push({ row: r + 1, col: c + 1 }); // Bottom Right
  } else {
    neighbors.push({ row: r, col: c - 1 }); // Left
    neighbors.push({ row: r, col: c + 1 }); // Right
    neighbors.push({ row: r - 1, col: c - 1 }); // Top Left
    neighbors.push({ row: r - 1, col: c }); // Top Right
    neighbors.push({ row: r + 1, col: c - 1 }); // Bottom Left
    neighbors.push({ row: r + 1, col: c }); // Bottom Right
  }
  
  // Filter out out-of-bounds
  return neighbors.filter(n => n.row >= 0 && n.row < rows && n.col >= 0 && n.col < cols);
}

// Connected Component approach to find winning blob
export function findWinningPath(
  grid: HexCell[], 
  rows: number, 
  cols: number, 
  teamId: string, 
  direction: 'horizontal' | 'vertical' | 'both' | 'any'
): number[] | null {
  const teamCells = grid.filter(c => c.ownerId === teamId);
  if (teamCells.length === 0) return null;

  let isStartCell: (c: HexCell) => boolean;
  let isEndCell: (c: HexCell) => boolean;

  if (direction === 'vertical') {
    isStartCell = (c) => c.row === 0;
    isEndCell = (c) => c.row === rows - 1;
  } else if (direction === 'horizontal') {
    isStartCell = (c) => c.col === 0;
    isEndCell = (c) => c.col === cols - 1;
  } else {
    const vPath = findWinningPath(grid, rows, cols, teamId, 'vertical');
    if (vPath) return vPath;
    return findWinningPath(grid, rows, cols, teamId, 'horizontal');
  }

  // Find all connected components for this team
  const visited = new Set<number>();
  
  for (const cell of teamCells) {
    if (visited.has(cell.id)) continue;
    
    // BFS or DFS to find the whole component
    const component: HexCell[] = [];
    const queue: HexCell[] = [cell];
    visited.add(cell.id);
    
    let touchesStart = false;
    let touchesEnd = false;

    let head = 0;
    while (head < queue.length) {
      const current = queue[head++];
      component.push(current);
      
      if (isStartCell(current)) touchesStart = true;
      if (isEndCell(current)) touchesEnd = true;
      
      const neighbors = getNeighbors(current, rows, cols);
      for (const n of neighbors) {
        const neighborCell = teamCells.find(c => c.row === n.row && c.col === n.col);
        if (neighborCell && !visited.has(neighborCell.id)) {
          visited.add(neighborCell.id);
          queue.push(neighborCell);
        }
      }
    }
    
    // If this component touches both edges, it's a winning component!
    if (touchesStart && touchesEnd) {
      return component.map(c => c.id);
    }
  }

  return null;
}
