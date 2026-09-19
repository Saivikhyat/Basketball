import { useState, useEffect } from 'react';
import { useLineup } from '../context/LineupContext';
import { setApiKey, hasApiKey } from '../api/groq';

export default function SettingsModal() {
  const { showSettings, setShowSettings, addToast } = useLineup();
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (showSettings) {
      const stored = localStorage.getItem('groq_api_key') || '';
      setKey(stored);
    }
  }, [showSettings]);

  if (!showSettings) return null;

  const handleSave = () => {
    const trimmed = key.trim();
    if (!trimmed) {
      addToast('Please enter an API key.', 'error');
      return;
    }
    setApiKey(trimmed);
    addToast('API key saved successfully!', 'success');
    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 rounded-2xl border border-dark-border bg-dark-card p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="w-8 h-8 rounded-lg bg-dark-bg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Groq API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full rounded-lg border border-dark-border bg-dark-bg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue transition-colors"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              Key is stored locally in your browser. Never shared with third parties.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className={`w-2 h-2 rounded-full ${hasApiKey() ? 'bg-accent-green' : 'bg-accent-red'}`} />
            {hasApiKey() ? 'API key configured' : 'No API key set'}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(false)}
              className="flex-1 py-2.5 rounded-lg border border-dark-border text-sm font-semibold text-slate-300 hover:bg-dark-bg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-lg bg-accent-blue text-sm font-bold text-white hover:bg-blue-600 transition-colors"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
