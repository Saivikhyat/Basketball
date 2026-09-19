import { createContext, useContext, useState, useCallback } from 'react';
import { POSITION_KEYS } from '../data/players';
import { evaluateLineup } from '../api/groq';

const LineupContext = createContext(null);

const initialLineup = {
  PG: null,
  SG: null,
  SF: null,
  PF: null,
  C: null,
};

export function LineupProvider({ children }) {
  const [lineup, setLineup] = useState(initialLineup);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const selectPlayer = useCallback((position, player) => {
    setLineup((prev) => {
      const updated = { ...prev };
      const existingPos = Object.entries(updated).find(([, p]) => p?.id === player.id);
      if (existingPos) {
        updated[existingPos[0]] = null;
      }
      updated[position] = player;
      return updated;
    });
    setEvaluation(null);
  }, []);

  const removePlayer = useCallback((position) => {
    setLineup((prev) => ({ ...prev, [position]: null }));
    setEvaluation(null);
  }, []);

  const swapPlayers = useCallback((posA, posB) => {
    setLineup((prev) => ({
      ...prev,
      [posA]: prev[posB],
      [posB]: prev[posA],
    }));
  }, []);

  const runEvaluation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await evaluateLineup(lineup);
      setEvaluation(result);
      addToast('Lineup evaluated successfully!', 'success');
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [lineup, addToast]);

  const filledCount = POSITION_KEYS.filter((pos) => lineup[pos] !== null).length;
  const isComplete = filledCount === 5;

  const value = {
    lineup,
    evaluation,
    loading,
    error,
    selectedPosition,
    showSettings,
    toasts,
    filledCount,
    isComplete,
    selectPlayer,
    removePlayer,
    swapPlayers,
    runEvaluation,
    setSelectedPosition,
    setShowSettings,
    addToast,
    setEvaluation,
    setError,
  };

  return <LineupContext.Provider value={value}>{children}</LineupContext.Provider>;
}

export function useLineup() {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error('useLineup must be used within a LineupProvider');
  }
  return context;
}
