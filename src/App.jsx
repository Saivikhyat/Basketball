import { LineupProvider, useLineup } from './context/LineupContext';
import CourtDiagram from './components/CourtDiagram';
import PlayerRoster from './components/PlayerRoster';
import EvaluationPanel from './components/EvaluationPanel';
import SettingsModal from './components/SettingsModal';
import ToastContainer from './components/ToastContainer';
import LineupSummary from './components/LineupSummary';

function Header() {
  const { setShowSettings } = useLineup();
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-dark-border bg-dark-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-court-orange flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M4.93 4.93c4.08 2.68 8.08 2.68 12.14 0" />
            <path d="M19.07 4.93c-4.08 2.68-8.08 2.68-12.14 0" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold text-white leading-tight">CourtVision</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">AI Lineup Evaluator</p>
        </div>
      </div>
      <button
        onClick={() => setShowSettings(true)}
        className="w-9 h-9 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
        title="Settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </header>
  );
}

function AppContent() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <ToastContainer />
      <SettingsModal />

      <main className="flex-1 overflow-hidden">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-12 h-full gap-4 p-4">
          {/* Left: Roster */}
          <div className="col-span-3 flex flex-col min-h-0">
            <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Player Roster</h2>
            <PlayerRoster />
          </div>

          {/* Center: Court */}
          <div className="col-span-5 flex flex-col items-center justify-center gap-4">
            <CourtDiagram />
            <LineupSummary />
          </div>

          {/* Right: Evaluation */}
          <div className="col-span-4 flex flex-col min-h-0">
            <EvaluationPanel />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col h-full overflow-y-auto p-4 gap-6">
          <div>
            <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Player Roster</h2>
            <div className="h-64">
              <PlayerRoster />
            </div>
          </div>
          <CourtDiagram />
          <LineupSummary />
          <div className="min-h-[400px]">
            <EvaluationPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LineupProvider>
      <AppContent />
    </LineupProvider>
  );
}
