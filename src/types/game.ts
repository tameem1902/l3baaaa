export type Color = {
  name: string;
  value: string; // tailwind class or hex
};

export type Team = {
  id: string;
  name: string;
  color: string; // CSS color or hex
  winDirection: WinDirection;
};

export type WinDirection = 'horizontal' | 'vertical' | 'both' | 'any';

export type Question = {
  id: string;
  text: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type Cell = {
  id: number;
  row: number;
  col: number;
  letter: string;
  ownerId: string | null;
  isWinningCell?: boolean; // true if part of the winning path
};

export type GameStatus = 'start' | 'setup' | 'playing' | 'finished';

export type GameState = {
  status: GameStatus;
  teams: Team[];
  currentTeamIndex: number;
  gridRows: number;
  gridCols: number;
  grid: Cell[];
  questions: Question[];
  musicOn: boolean;
  sfxOn: boolean;
  winnerId: string | null;
  round: number;
  
  // Actions
  setStatus: (status: GameStatus) => void;
  setTeams: (teams: Team[]) => void;
  initializeGrid: (rows: number, cols: number) => void;
  claimCell: (cellId: number, teamId: string) => void;
  undoLastClaim: () => void;
  nextTurn: () => void;
  toggleMusic: () => void;
  toggleSfx: () => void;
  addQuestion: (q: Omit<Question, 'id'>) => void;
  resetGame: () => void;
  endGame: (winnerId: string | null) => void;
};
