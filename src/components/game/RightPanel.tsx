import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { Undo2, RotateCcw, XSquare, Music, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuestionModal } from './QuestionModal';
import { cn } from '../../utils/cn';

export function RightPanel() {
  const {
    teams,
    currentTeamIndex,
    undoLastClaim,
    resetGame,
    setStatus,
    musicOn,
    sfxOn,
    toggleMusic,
    toggleSfx,
    nextTurn,
    grid,
    round
  } = useGameStore();

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentTeam = teams[currentTeamIndex];

  const team1Score = grid.filter(c => c.ownerId === teams[0]?.id).length;
  const team2Score = grid.filter(c => c.ownerId === teams[1]?.id).length;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-full md:w-[400px] bg-[#4B0082] border-yellow-500 flex flex-col h-full shrink-0 relative z-20 shadow-2xl"
    >
      <div className="p-4 md:p-6 border-b-2 border-white/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Button variant="ghost" className="text-white/50 hover:text-white p-1" onClick={() => setStatus('start')} title="إنهاء">
            <XSquare className="w-6 h-6" />
          </Button>
        </div>
        <h1 className="text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
          الجولة
        </h1>
        <h2 className="text-6xl font-black text-yellow-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Cairo, sans-serif' }}>
          {round === 1 ? 'الأولى' : round === 2 ? 'الثانية' : round === 3 ? 'الثالثة' : round}
        </h2>
      </div>

      <div className="p-8 flex-1 flex flex-col items-center justify-start gap-12 overflow-y-auto">

        {/* Scores Side by Side like reference */}
        <div className="flex items-center justify-center gap-8 w-full">
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-28 flex items-center justify-center shadow-lg transition-transform hover:scale-105 relative"
              style={{
                backgroundColor: teams[1]?.color,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <div
                className="absolute inset-[4px] bg-black/20 flex items-center justify-center"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-md z-10">{team2Score}</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xl font-bold text-white block">{teams[1]?.name || 'الفريق الثاني'}</span>
              <span className="text-sm text-blue-300 font-semibold mt-1 block px-3 py-1 bg-blue-900/40 rounded-full border border-blue-500/30">
                عمودي ↓
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="w-24 h-28 flex items-center justify-center shadow-lg transition-transform hover:scale-105 relative"
              style={{
                backgroundColor: teams[0]?.color,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <div
                className="absolute inset-[4px] bg-black/20 flex items-center justify-center"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-md z-10">{team1Score}</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xl font-bold text-white block">{teams[0]?.name || 'الفريق الأول'}</span>
              <span className="text-sm text-yellow-300 font-semibold mt-1 block px-3 py-1 bg-yellow-900/40 rounded-full border border-yellow-500/30">
                أفقي ↔
              </span>
            </div>
          </div>
        </div>

        {/* Current Turn Indicator */}
        <div className="w-full bg-white/10 rounded-2xl p-6 text-center border-2 border-white/5">
          <p className="text-white/60 mb-2 font-medium">الدور الحالي</p>
          <div className="text-3xl font-black" style={{ color: currentTeam?.color }}>
            {currentTeam?.name}
          </div>
        </div>

        {/* Timer */}
        <div className="w-full bg-black/30 rounded-2xl p-4 text-center">
          <span className="text-4xl font-mono font-bold text-yellow-400 tracking-wider">{formatTime(timer)}</span>
        </div>

        {/* Host Controls */}
        <div className="w-full space-y-4 mt-auto">
          <Button
            size="lg"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#4B0082] text-2xl py-6 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            onClick={() => setIsQuestionModalOpen(true)}
          >
            <HelpCircle className="w-8 h-8 ml-3" />
            سؤال جديد
          </Button>

          <Button
            variant="ghost"
            className="w-full bg-white/10 text-white hover:bg-white/20 text-xl py-4"
            onClick={nextTurn}
          >
            تخطي الفريق
          </Button>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button variant="ghost" className="bg-white/5 text-white/80" onClick={undoLastClaim}>
            <Undo2 className="w-5 h-5 ml-2" />
            تراجع
          </Button>
          <Button variant="ghost" className="bg-white/5 text-white/80" onClick={resetGame}>
            <RotateCcw className="w-5 h-5 ml-2" />
            إعادة
          </Button>
        </div>

      </div>

      <div className="p-4 bg-black/20 flex justify-center gap-6 border-t border-white/10">
        <button onClick={toggleMusic} className={cn("p-4 rounded-full transition-colors", musicOn ? "bg-white/20 text-white" : "bg-black/40 text-gray-400")}>
          {musicOn ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
        <button onClick={toggleSfx} className={cn("p-4 rounded-full transition-colors", sfxOn ? "bg-white/20 text-white" : "bg-black/40 text-gray-400")}>
          {sfxOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />
    </motion.div>
  );
}

