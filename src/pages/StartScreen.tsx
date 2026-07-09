import { useGameStore } from '../store/useGameStore';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Play, Settings, Music, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import receiptImg from '../assets/hair_transplant_receipt_1783555319115.png';
import posterImg from '../assets/sheikh_jackson_poster_1783555301760.png';
import lifterImg from '../assets/weak_weightlifter_1783555328521.png';

export function StartScreen({ onManageQuestions }: { onManageQuestions: () => void }) {
  const setStatus = useGameStore(state => state.setStatus);
  const { musicOn, sfxOn, toggleMusic, toggleSfx } = useGameStore();
  const elephantAudioRef = useRef<HTMLAudioElement>(null);

  const playElephantSound = () => {
    if (elephantAudioRef.current) {
      elephantAudioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-end items-center relative overflow-hidden bg-youthful pb-8">
      {/* Audio element for elephant */}
      <audio ref={elephantAudioRef} src="https://www.myinstants.com/media/sounds/elephant.mp3" preload="auto" />

      {/* Walking Lizard Emoji */}
      <div className="absolute z-10 pointer-events-none animate-lizard text-[80px] md:text-[150px] filter drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">
        🦎
      </div>

      {/* Crazy Floating Elements */}
      {/* Moved Receipt Right */}
      <div className="absolute top-2 md:top-4 left-2 md:left-[15%] z-10 animate-float flex flex-col items-center">
        <img src={receiptImg} alt="Receipt" className="w-24 md:w-48 h-auto shadow-2xl border-2 md:border-4 border-dashed border-red-500 transform rotate-12 rounded-xl" />
        <div className="bg-yellow-300 text-red-700 font-bold p-1 md:p-2 mt-1 md:mt-2 rounded-md md:rounded-lg text-xs md:text-xl border-2 md:border-4 border-blue-500 rotate-[-5deg] whitespace-nowrap">فاتورة زراعة شعر: 50,000</div>
      </div>

      <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10 animate-float" style={{ animationDelay: '1s' }}>
        <img src={posterImg} alt="Poster" className="w-28 md:w-56 h-auto shadow-2xl border-4 md:border-8 border-pink-500 transform -rotate-6 rounded-lg md:rounded-2xl" />
      </div>

      {/* Custom Doctor 1: Surgeon */}
      <div className="absolute top-[25%] md:top-[30%] right-2 md:right-8 z-20 animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 md:w-32 md:h-32 bg-teal-500 rounded-full flex items-center justify-center text-4xl md:text-7xl shadow-[0_0_15px_teal] border-2 md:border-4 border-white">
          👨‍⚕️
        </div>
        <span className="bg-black text-white font-bold px-2 py-1 md:px-4 md:py-1 mt-1 md:mt-2 rounded-full border border-teal-400 text-xs md:text-base">عمليات 🩺</span>
      </div>

      {/* Custom Doctor 2: Orthopedist */}
      <div className="absolute bottom-[25%] md:bottom-12 right-2 md:right-12 z-40 animate-bounce flex flex-col items-center" style={{ animationDelay: '0.5s' }}>
        <div className="w-16 h-16 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl md:text-7xl shadow-[0_0_15px_blue] border-2 md:border-4 border-white">
          👨‍⚕️
        </div>
        <span className="bg-black text-white font-bold px-2 py-1 md:px-4 md:py-1 mt-1 md:mt-2 rounded-full border border-blue-400 text-xs md:text-base">عظام 🦴</span>
      </div>

      {/* Custom Pharmacist */}
      <div className="absolute bottom-[25%] md:bottom-12 left-2 md:left-12 z-40 animate-float flex flex-col items-center" style={{ animationDelay: '1.2s' }}>
        <div className="w-20 h-20 md:w-40 md:h-40 bg-green-500 rounded-xl md:rounded-2xl flex items-center justify-center text-[40px] md:text-[80px] shadow-[0_0_20px_green] border-2 md:border-4 border-yellow-300">
          👨‍🔬
        </div>
        <span className="bg-green-800 text-yellow-300 font-black px-3 py-1 md:px-6 md:py-2 mt-1 md:mt-2 rounded-lg md:rounded-xl border-2 md:border-4 border-white text-xs md:text-xl">صيدلية 💊</span>
      </div>

      {/* Weak Weightlifter */}
      <div className="absolute top-[35%] left-2 md:left-4 z-10 animate-bounce" style={{ animationDelay: '1s' }}>
        <img src={lifterImg} alt="Weak Weightlifter" className="w-20 md:w-40 h-auto shadow-xl rounded-lg md:rounded-xl border-2 md:border-4 border-purple-500" />
      </div>

      {/* Elephant & Moai at the top middle */}
      <div className="absolute top-16 md:top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-4 cursor-pointer transform hover:scale-110 transition-transform" onClick={playElephantSound}>
        <div className="text-[60px] md:text-[120px] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter grayscale-[0.2]">🐘</div>
        <div className="text-[60px] md:text-[120px] drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] filter brightness-50 contrast-150 saturate-[1.2] animate-pulse">🗿</div>
      </div>

      {/* Drawn SVG Disguised Face instead of Emoji */}
      <div className="absolute top-[40%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] animate-float pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,0,1)] scale-[0.6] md:scale-100">
        <svg width="250" height="250" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Glasses */}
          <path d="M 10 40 Q 25 30 40 40 Q 50 45 60 40 Q 75 30 90 40" stroke="#000" strokeWidth="4" fill="none" />
          <circle cx="25" cy="45" r="15" stroke="#000" strokeWidth="6" fill="rgba(0,0,0,0.8)" />
          <circle cx="75" cy="45" r="15" stroke="#000" strokeWidth="6" fill="rgba(0,0,0,0.8)" />
          <line x1="40" y1="45" x2="60" y2="45" stroke="#000" strokeWidth="6" />
          {/* Big Nose */}
          <path d="M 50 45 Q 35 65 50 70 Q 65 65 50 45" fill="#ffccaa" stroke="#000" strokeWidth="2" />
          {/* Mustache */}
          <path d="M 20 70 Q 50 60 80 70 Q 50 90 20 70" fill="#000" />
        </svg>
      </div>

      {/* Controls Top Left */}
      <div className="absolute top-2 left-2 md:top-6 md:left-6 flex gap-2 md:gap-4 z-50">
        <button 
          onClick={toggleMusic}
          className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-colors"
          title="الموسيقى"
        >
          {musicOn ? <Music className="text-yellow-400 w-4 h-4 md:w-6 md:h-6" /> : <VolumeX className="text-gray-400 w-4 h-4 md:w-6 md:h-6" />}
        </button>
        <button 
          onClick={toggleSfx}
          className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-colors"
          title="المؤثرات الصوتية"
        >
          {sfxOn ? <Volume2 className="text-blue-400 w-4 h-4 md:w-6 md:h-6" /> : <VolumeX className="text-gray-400 w-4 h-4 md:w-6 md:h-6" />}
        </button>
      </div>

      {/* Menus at the BOTTOM */}
      <motion.div 
        className="z-50 flex flex-col items-center gap-4 md:gap-6 bg-black/80 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] backdrop-blur-lg border-4 md:border-8 border-pink-500 shadow-[0_0_50px_rgba(255,0,255,0.8)] w-[95%] md:w-[90%] max-w-2xl mt-auto relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo size="lg" className="scale-75 md:scale-100" />
        
        <div className="flex flex-col gap-3 md:gap-4 w-full px-2 md:px-8">
          <Button 
            size="xl" 
            onClick={() => setStatus('setup')}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-xl md:text-3xl py-4 md:py-6 rounded-2xl md:rounded-3xl border-2 md:border-4 border-white shadow-[0_0_20px_rgba(255,255,0,0.8)] transform hover:scale-105 transition-all"
          >
            <Play className="w-6 h-6 md:w-10 md:h-10 ml-2" />
            ابدأ اللعبة
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={onManageQuestions}
            className="w-full text-white hover:text-white bg-black/50 border-2 md:border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)] font-bold text-lg md:text-2xl py-3 md:py-4 rounded-2xl md:rounded-3xl hover:bg-cyan-900/50"
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6 ml-2" />
            إدارة الأسئلة
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
