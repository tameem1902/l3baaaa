import { useGameStore } from '../../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Trophy } from 'lucide-react';

export function WinModal() {
  const { winnerId, teams, setStatus } = useGameStore();
  const { width, height } = useWindowSize();

  if (!winnerId) return null;

  const isDraw = winnerId === 'draw';
  const winner = teams.find(t => t.id === winnerId);
  const loser = teams.find(t => t.id !== winnerId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.15} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative w-full max-w-3xl glass-panel rounded-[3rem] p-12 text-center border-4 border-yellow-500/30 shadow-[0_0_100px_rgba(251,191,36,0.3)]"
        >
          {isDraw ? (
            <div>
              <h2 className="text-5xl font-black text-white mb-6">تعادل!</h2>
              <p className="text-2xl text-gray-300">مباراة قوية من كلا الفريقين.</p>
            </div>
          ) : (
            <>
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block p-6 rounded-full bg-yellow-500/20 mb-8"
              >
                <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
              </motion.div>

              <h2 className="text-6xl font-black mb-6 text-white leading-tight">
                🎉🎉 ألف مبروك!
              </h2>
              
              <div className="text-4xl font-bold mb-8">
                الفريق: <span style={{ color: winner?.color, textShadow: `0 0 20px ${winner?.color}` }}>{winner?.name}</span>
              </div>
              
              <p className="text-2xl text-yellow-100/90 font-medium mb-12">
                حقق الفوز!<br/>أداء رائع 👏🔥
              </p>

              <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12" />

              <div className="text-xl text-gray-400 bg-black/30 p-6 rounded-2xl inline-block">
                <span style={{ color: loser?.color }} className="font-bold">{loser?.name}</span>
                <br/>
                👏 شكراً على المنافسة الجميلة.
                <br/>
                المرة الجاية إن شاء الله تكون من نصيبكم ❤️
              </div>
            </>
          )}

          <div className="mt-12 flex justify-center gap-4">
            <Button size="lg" onClick={() => setStatus('start')}>
              العودة للرئيسية
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
