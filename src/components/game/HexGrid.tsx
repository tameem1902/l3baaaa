import { useGameStore } from '../../store/useGameStore';

const HINDI_MAP: Record<string, string> = {
  'ا': 'अ', 'ب': 'ब', 'ت': 'त', 'ث': 'थ', 'ج': 'ज', 'ح': 'ह', 'خ': 'ख', 'د': 'द', 'ذ': 'ध', 'ر': 'र', 'ز': 'ज', 'س': 'स', 'ش': 'श', 'ص': 'स', 'ض': 'द', 'ط': 'ट', 'ظ': 'ज', 'ع': 'अ', 'غ': 'ग', 'ف': 'फ', 'ق': 'क', 'ك': 'क', 'ل': 'ल', 'م': 'म', 'ن': 'न', 'ه': 'ह', 'و': 'व', 'ي': 'य',
  'A': 'ए', 'B': 'बी', 'C': 'सी', 'D': 'डी', 'E': 'ई', 'F': 'एफ', 'G': 'जी', 'H': 'एच'
};

const getHindi = (letter: string) => {
  return HINDI_MAP[letter] || 'अ';
};

export function HexGrid() {
  const { grid, gridRows, claimCell, teams, winnerId, currentTeamIndex } = useGameStore();
  const currentTeam = teams[currentTeamIndex];

  // Group cells by row
  const rows = [];
  for (let r = 0; r < gridRows; r++) {
    rows.push(grid.filter(c => c.row === r).sort((a, b) => a.col - b.col));
  }

  // Find color for a cell based on owner
  const getCellColor = (ownerId: string | null) => {
    if (!ownerId) return 'white'; 
    const team = teams.find(t => t.id === ownerId);
    return team ? team.color : 'white';
  };

  const handleCellClick = (cellId: number, currentOwner: string | null) => {
    if (currentOwner || winnerId) return;
    claimCell(cellId, currentTeam.id);
  };

  return (
    <div className="flex flex-col items-center justify-center relative select-none" dir="ltr">
      {rows.map((rowCells, rIndex) => (
        <div key={rIndex} className="hex-row flex justify-center">
          {rowCells.map((cell) => {
            const fillColor = getCellColor(cell.ownerId);
            const isClaimed = cell.ownerId !== null;
            
            return (
              <div 
                key={cell.id} 
                className="hex-cell-svg cursor-pointer group relative"
                onClick={() => handleCellClick(cell.id, cell.ownerId)}
                style={{ width: '111px', height: '128px', margin: '0' }}
              >
                <svg width="111" height="128" viewBox="0 0 111 128" className="absolute inset-0 overflow-visible z-10">
                  <polygon 
                    points="55.5,0 111,32 111,96 55.5,128 0,96 0,32"
                    fill={fillColor}
                    stroke="#5b21b6"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    className={`transition-all duration-300 ${cell.isWinningCell ? 'animate-pulse' : ''} ${!isClaimed ? 'hover:fill-gray-100' : ''}`}
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <span 
                    className="text-4xl font-black" 
                    style={{ 
                      color: isClaimed ? 'white' : '#5b21b6', 
                      WebkitTextStroke: isClaimed ? '1px rgba(0,0,0,0.2)' : '0px',
                      textShadow: isClaimed ? '2px 2px 4px rgba(0,0,0,0.4)' : '2px 2px 0px rgba(255,255,255,1), 3px 3px 0px rgba(0,0,0,0.1)',
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    {cell.letter}
                  </span>
                  <span 
                    className="text-3xl font-black mt-1" 
                    style={{ 
                      color: isClaimed ? 'white' : '#6b7280', 
                      textShadow: isClaimed ? '1px 1px 2px rgba(0,0,0,0.6)' : 'none',
                    }}
                  >
                    {getHindi(cell.letter)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
