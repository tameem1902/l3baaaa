import { motion } from 'framer-motion';
import { Square, Sparkles, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Logo({ className, size = 'lg' }: { className?: string, size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: "text-2xl w-8 h-8",
    md: "text-4xl w-12 h-12",
    lg: "text-6xl w-16 h-16",
    xl: "text-8xl w-24 h-24",
  };
  
  return (
    <motion.div 
      className={cn("flex flex-col items-center justify-center gap-6", className)}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      <div className="relative group">
        {/* Outer glowing rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 rounded-[2rem] border-4 border-cyan-400/50 border-dashed drop-shadow-[0_0_15px_cyan]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-xl border-4 border-pink-500/80 drop-shadow-[0_0_15px_#ff00ff]"
        />
        
        {/* Core pulsing squares */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Square className={cn("text-cyan-300 fill-cyan-400/40 absolute inset-0", sizes[size].split(' ')[1], sizes[size].split(' ')[2])} />
          <Square className={cn("text-pink-400 fill-pink-500/40 rotate-45", sizes[size].split(' ')[1], sizes[size].split(' ')[2])} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_white]">A</span>
          </div>
        </motion.div>
        
        <Sparkles className="absolute -top-8 -right-8 text-yellow-300 w-10 h-10 animate-pulse drop-shadow-[0_0_10px_yellow]" />
        <Zap className="absolute -bottom-6 -left-6 text-yellow-400 w-8 h-8 animate-bounce drop-shadow-[0_0_10px_yellow]" />
      </div>
      
      <div className="text-center relative">
        <h1 className={cn("font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-yellow-400 drop-shadow-[0_5px_15px_rgba(255,0,255,0.8)]", sizes[size].split(' ')[0])}>
          حروف في المربع
        </h1>
        <p className="text-white font-black tracking-widest text-lg mt-2 uppercase bg-black/50 px-4 py-1 rounded-full border border-cyan-400 shadow-[0_0_10px_cyan]">
          أقوى مسابقة تفاعلية 🚀
        </p>
      </div>
    </motion.div>
  );
}
