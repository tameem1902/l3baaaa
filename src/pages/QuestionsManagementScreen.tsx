import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { CATEGORIES } from '../data/mockQuestions';
import { ArrowRight, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuestionsManagementScreen({ onBack }: { onBack: () => void }) {
  const { questions, addQuestion } = useGameStore();
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'>('medium');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !answer) return;
    addQuestion({ text, answer, category, difficulty });
    setText('');
    setAnswer('');
    // show success toast normally
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 relative">
      <div className="absolute inset-0 arabesque-pattern opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex items-center gap-4 mb-12">
          <Button variant="ghost" onClick={onBack} className="p-3 bg-white/5 hover:bg-white/10">
            <ArrowRight className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold">إدارة الأسئلة</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Question Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="text-yellow-500" />
                إضافة سؤال جديد
              </h2>

              <div>
                <label className="block text-sm text-gray-400 mb-2">السؤال</label>
                <textarea 
                  required
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500 focus:outline-none h-24 resize-none"
                  placeholder="اكتب السؤال هنا..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">الإجابة</label>
                <input 
                  required
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500 focus:outline-none"
                  placeholder="الإجابة الصحيحة..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">التصنيف</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500 focus:outline-none text-white [&>option]:bg-slate-800"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">مستوى الصعوبة</label>
                <div className="flex gap-2">
                  {[
                    { id: 'easy', label: 'سهل', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
                    { id: 'medium', label: 'متوسط', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
                    { id: 'hard', label: 'صعب', color: 'text-red-400 bg-red-400/10 border-red-400/30' }
                  ].map(diff => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setDifficulty(diff.id as any)}
                      className={`flex-1 py-2 rounded-lg border ${difficulty === diff.id ? diff.color + ' border-opacity-100 font-bold' : 'border-white/10 bg-black/20 text-gray-500'}`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Save className="w-5 h-5 ml-2" />
                حفظ السؤال
              </Button>
            </form>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col">
            <h2 className="text-xl font-semibold mb-6">الأسئلة المتوفرة ({questions.length})</h2>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[600px]">
              {questions.map((q, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 > 1 ? 0 : i * 0.05 }}
                  key={q.id} 
                  className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-start gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">{q.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {q.difficulty === 'easy' ? 'سهل' : q.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{q.text}</h3>
                    <p className="text-green-400 text-sm font-medium">الجواب: {q.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
