import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { X, Eye } from 'lucide-react';
import type { Question } from '../../types/game';

export function QuestionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { questions, teams, currentTeamIndex, nextTurn } = useGameStore();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentTeam = teams[currentTeamIndex];
  
  // Pick a random question that hasn't been asked (in a real app we'd track asked questions)
  const handleDrawQuestion = () => {
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(random);
    setShowAnswer(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!currentQuestion ? (
            <div className="py-12">
              <h2 className="text-3xl font-bold mb-8">سؤال للفريق: <span style={{color: currentTeam?.color}}>{currentTeam?.name}</span></h2>
              <Button size="xl" onClick={handleDrawQuestion}>
                اسحب سؤال عشوائي
              </Button>
            </div>
          ) : (
            <div className="w-full py-4">
              <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6">
                {currentQuestion.category} - {currentQuestion.difficulty === 'easy' ? 'سهل' : currentQuestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
              </div>
              
              <h3 className="text-3xl font-black mb-12 leading-relaxed">
                {currentQuestion.text}
              </h3>

              {!showAnswer ? (
                <Button size="lg" variant="outline" onClick={() => setShowAnswer(true)}>
                  <Eye className="w-5 h-5 ml-2" />
                  إظهار الإجابة
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-2xl p-6 border border-green-500/30"
                >
                  <p className="text-gray-400 text-sm mb-2">الإجابة الصحيحة:</p>
                  <p className="text-3xl font-bold text-green-400">{currentQuestion.answer}</p>
                </motion.div>
              )}

              <div className="mt-12 flex gap-4 w-full">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-500" 
                  onClick={() => {
                    // Logic to let host select hexagon on grid, so just close modal
                    onClose();
                  }}
                >
                  إجابة صحيحة (اختر مربع)
                </Button>
                <Button 
                  variant="danger"
                  className="flex-1"
                  onClick={() => {
                    nextTurn();
                    onClose();
                  }}
                >
                  إجابة خاطئة (انتقال الدور)
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
