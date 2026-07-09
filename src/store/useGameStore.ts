import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Cell } from '../types/game';
import { mockQuestions } from '../data/mockQuestions';
import { generateHexGrid, findWinningPath } from '../utils/hexGraph';

let history: Cell[][] = [];

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      status: 'start',
      teams: [],
      currentTeamIndex: 0,
      gridRows: 5,
      gridCols: 5,
      grid: [],
      questions: mockQuestions,
      musicOn: true,
      sfxOn: true,
      winnerId: null,
      round: 1,

      setStatus: (status) => set({ status }),
      
      setTeams: (teams) => set({ teams }),
      
      initializeGrid: (rows, cols) => {
        history = [];
        set({ 
          gridRows: rows, 
          gridCols: cols, 
          grid: generateHexGrid(rows, cols), 
          winnerId: null, 
          currentTeamIndex: 0, 
          status: 'playing',
          round: 1
        });
      },

      claimCell: (cellId, teamId) => {
        set((state) => {
          // Save history
          history.push(JSON.parse(JSON.stringify(state.grid)));
          
          const newGrid = state.grid.map((cell) => 
            cell.id === cellId ? { ...cell, ownerId: teamId } : cell
          );
          
          // Standard graph win logic: a team wins ONLY by completing their designated path.
          // Topologically, completing your path is the ONLY way to block the opponent.
          let newWinnerId = state.winnerId;
          let winningPathToHighlight: number[] | null = null;

          for (const team of state.teams) {
            // Enforce: Team 1 (index 0) is ALWAYS Horizontal, Team 2 (index 1) is ALWAYS Vertical
            const teamDirection = state.teams.indexOf(team) === 0 ? 'horizontal' : 'vertical';
            const path = findWinningPath(newGrid, state.gridRows, state.gridCols, team.id, teamDirection);
            if (path) {
              newWinnerId = team.id;
              winningPathToHighlight = path;
              break;
            }
          }

          let newStatus = state.status;
          
          if (newWinnerId) {
            newStatus = 'finished';
            if (winningPathToHighlight) {
              winningPathToHighlight.forEach(id => {
                const c = newGrid.find(x => x.id === id);
                if (c) c.isWinningCell = true;
              });
            } else {
              // If won by blocking, highlight all cells of the winning team as a celebration
              newGrid.forEach(c => {
                if (c.ownerId === newWinnerId) c.isWinningCell = true;
              });
            }
          }
          
          return { grid: newGrid, winnerId: newWinnerId, status: newStatus };
        });
      },

      undoLastClaim: () => {
        set((state) => {
          if (history.length === 0) return state;
          const previousGrid = history.pop();
          return { grid: previousGrid, winnerId: null, status: 'playing' };
        });
      },

      nextTurn: () => {
        set((state) => ({
          currentTeamIndex: (state.currentTeamIndex + 1) % Math.max(1, state.teams.length)
        }));
      },

      toggleMusic: () => set((state) => ({ musicOn: !state.musicOn })),
      
      toggleSfx: () => set((state) => ({ sfxOn: !state.sfxOn })),
      
      addQuestion: (q) => set((state) => ({
        questions: [...state.questions, { ...q, id: Math.random().toString(36).substr(2, 9) }]
      })),

      resetGame: () => {
        history = [];
        set((state) => ({
          status: 'playing',
          grid: generateHexGrid(state.gridRows, state.gridCols),
          winnerId: null,
          currentTeamIndex: 0,
          round: state.round + 1
        }));
      },

      endGame: (winnerId) => set({ status: 'finished', winnerId })
    }),
    {
      name: 'hex-game-storage', // name of item in localStorage
      partialize: (state) => ({ 
        // We only persist these keys. We might want to persist everything except history (which is out of state).
        status: state.status,
        teams: state.teams,
        currentTeamIndex: state.currentTeamIndex,
        gridRows: state.gridRows,
        gridCols: state.gridCols,
        grid: state.grid,
        questions: state.questions,
        musicOn: state.musicOn,
        sfxOn: state.sfxOn,
        winnerId: state.winnerId,
        round: state.round
      })
    }
  )
);
