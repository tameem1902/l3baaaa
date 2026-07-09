import { generateHexGrid, findWinningPath } from './src/utils/hexGraph.ts';

const grid = generateHexGrid(5, 5);

// Let's claim a zigzag path for team 1 (horizontal: col 0 to col 4)
// Path: (0,0) -> (1,0) -> (1,1) -> (2,1) -> (2,2) -> (3,2) -> (3,3) -> (4,3) -> (4,4)
const pathCoords = [
  [0,0], [1,0], [1,1], [2,1], [2,2], [3,2], [3,3], [4,3], [4,4]
];

for (const p of pathCoords) {
  const cell = grid.find(c => c.row === p[0] && c.col === p[1]);
  if (cell) cell.ownerId = 'team1';
}

const winPath = findWinningPath(grid, 5, 5, 'team1', 'horizontal');
console.log("Win path found:", winPath !== null);
if (winPath) {
  console.log("Path:", winPath.map(id => {
    const c = grid.find(x => x.id === id);
    return `(${c?.row},${c?.col})`;
  }).join(' -> '));
}

// Test vertical
grid.forEach(c => c.ownerId = null);
const vPathCoords = [
  [0,2], [1,1], [2,2], [3,1], [4,2]
];
for (const p of vPathCoords) {
  const cell = grid.find(c => c.row === p[0] && c.col === p[1]);
  if (cell) cell.ownerId = 'team2';
}

const winPathV = findWinningPath(grid, 5, 5, 'team2', 'vertical');
console.log("Win path vertical found:", winPathV !== null);

