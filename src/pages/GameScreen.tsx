import { HexGrid } from '../components/game/HexGrid';
import { RightPanel } from '../components/game/RightPanel';
import { WinModal } from '../components/game/WinModal';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

export function GameScreen() {
  const { teams } = useGameStore();

  // Team 1 is Horizontal (Left/Right)
  // Team 2 is Vertical (Top/Bottom)
  const horizontalColor = teams[0]?.color || '#ea580c';
  const verticalColor = teams[1]?.color || '#16a34a';

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden relative bg-[#6b21a8] p-2 md:p-8">
      {/* Outer Yellow Frame */}
      <div className="relative w-full h-full border-4 md:border-8 border-yellow-400 rounded-xl md:rounded-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl bg-black">
        
        {/* Exact 4-triangle background */}
        <div className="absolute inset-0 z-0 opacity-50 md:opacity-100">
          {/* Base Background (Left & Right) -> Horizontal Team */}
          <div className="absolute inset-0" style={{ backgroundColor: horizontalColor }} />
          
          {/* Top Triangle -> Vertical Team */}
          <div 
            className="absolute top-0 left-0 w-full h-[50%]"
            style={{ backgroundColor: verticalColor, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
          
          {/* Bottom Triangle -> Vertical Team */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[50%]"
            style={{ backgroundColor: verticalColor, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
          />

          {/* Slight inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] pointer-events-none" />
        </div>

        {/* Main Game Board Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:flex-1 h-[60vh] md:h-auto flex items-center justify-center relative z-10 p-2 md:p-8 shrink-0"
        >
          {/* Grid is now perfectly self-centered by symmetric row transforms */}
          <div className="scale-[0.6] sm:scale-[0.8] md:scale-100 origin-center">
            <HexGrid />
          </div>
        </motion.div>

        {/* Host Control Panel (Right Side Desktop / Bottom Mobile) */}
        <div className="w-full md:w-[400px] shrink-0 border-t-4 md:border-t-0 md:border-l-4 border-yellow-400 bg-black/80 md:bg-black/60 backdrop-blur-md z-10 flex flex-col">
          <RightPanel />
        </div>
      </div>

      <WinModal />
    </div>
  );
}
