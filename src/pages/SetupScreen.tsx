import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { TEAM_COLORS } from '../data/mockQuestions';
import type { Team } from '../types/game';
import { motion } from 'framer-motion';
import { Check, Users } from 'lucide-react';
import { cn } from '../utils/cn';

export function SetupScreen() {
  const { setTeams, initializeGrid, setStatus } = useGameStore();
  
  const [team1, setTeam1] = useState<Team>({ id: 'team1', name: '', color: '', winDirection: 'horizontal' });
  const [team2, setTeam2] = useState<Team>({ id: 'team2', name: '', color: '', winDirection: 'vertical' });

  const handleStart = () => {
    if (!team1.name || !team1.color || !team2.name || !team2.color) return;
    
    setTeams([team1, team2]);
    initializeGrid(5, 5); 
  };

  const renderColorSelect = (team: Team, setTeam: (t: Team) => void, otherTeam: Team) => (
    <div className="flex flex-wrap gap-3 mt-4 justify-center">
      {TEAM_COLORS.map(c => {
        const isSelected = team.color === c.value;
        const isDisabled = otherTeam.color === c.value;
        
        return (
          <button
            key={c.value}
            disabled={isDisabled}
            onClick={() => setTeam({ ...team, color: c.value })}
            className={cn(
              "w-12 h-12 rounded-full transition-all duration-300 relative border-2",
              isSelected ? "scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "border-transparent opacity-80 hover:opacity-100 hover:scale-105",
              isDisabled && "opacity-20 cursor-not-allowed grayscale"
            )}
            style={{ backgroundColor: c.value }}
            title={c.name}
          >
            {isSelected && <Check className="absolute inset-0 m-auto text-white w-6 h-6" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 relative">
      <div className="absolute inset-0 arabesque-pattern opacity-[0.03] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl glass-panel rounded-3xl p-8 z-10"
      >
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-yellow-500" />
            إعداد المباراة
          </h2>
          <Button variant="ghost" onClick={() => setStatus('start')}>
            إلغاء
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Team 1 */}
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold text-center mb-6">الفريق الأول</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">اسم الفريق</label>
              <input 
                type="text" 
                value={team1.name}
                onChange={e => setTeam1({...team1, name: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="أدخل اسم الفريق..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">دور الفريق</label>
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-3 rounded-xl text-center font-bold">
                توصيل أفقي (يمين لليسار)
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">لون الفريق</label>
              {renderColorSelect(team1, setTeam1, team2)}
            </div>
          </div>

          {/* Team 2 */}
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold text-center mb-6">الفريق الثاني</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">اسم الفريق</label>
              <input 
                type="text" 
                value={team2.name}
                onChange={e => setTeam2({...team2, name: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="أدخل اسم الفريق..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">دور الفريق</label>
              <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 p-3 rounded-xl text-center font-bold">
                توصيل عمودي (أعلى لأسفل)
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">لون الفريق</label>
              {renderColorSelect(team2, setTeam2, team1)}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleStart}
            disabled={!team1.name || !team1.color || !team2.name || !team2.color}
            className="w-full max-w-md"
          >
            بدء المباراة
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
