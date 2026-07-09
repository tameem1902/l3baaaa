import { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { StartScreen } from './pages/StartScreen';
import { SetupScreen } from './pages/SetupScreen';
import { GameScreen } from './pages/GameScreen';
import { QuestionsManagementScreen } from './pages/QuestionsManagementScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const status = useGameStore(state => state.status);
  const [showQuestions, setShowQuestions] = useState(false);

  if (showQuestions) {
    return <QuestionsManagementScreen onBack={() => setShowQuestions(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'start' && <StartScreen key="start" onManageQuestions={() => setShowQuestions(true)} />}
      {status === 'setup' && <SetupScreen key="setup" />}
      {(status === 'playing' || status === 'finished') && <GameScreen key="game" />}
    </AnimatePresence>
  );
}

export default App;
