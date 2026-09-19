import { useLineup } from '../context/LineupContext';
import { POSITIONS, getRatingColor } from '../data/players';

const COURT_POSITIONS = {
  PG: { x: '50%', y: '12%' },
  SG: { x: '25%', y: '30%' },
  SF: { x: '75%', y: '30%' },
  PF: { x: '35%', y: '60%' },
  C: { x: '65%', y: '60%' },
};

function PlayerSlot({ position }) {
  const { lineup, setSelectedPosition, removePlayer } = useLineup();
  const player = lineup[position];
  const pos = POSITIONS[position];
  const slotPos = COURT_POSITIONS[position];

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: slotPos.x, top: slotPos.y }}
    >
      <button
        onClick={() => setSelectedPosition(position)}
        className={`court-slot relative flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-2 text-center transition-all cursor-pointer
          ${player
            ? 'border-accent-blue bg-dark-card/95 shadow-lg shadow-accent-blue/10 hover:shadow-accent-blue/30'
            : 'border-dashed border-dark-border bg-dark-card/60 hover:border-accent-blue/50 hover:bg-dark-card/80'
          }`}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-court-orange">
          {pos.abbr}
        </span>
        {player ? (
          <>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: getRatingColor(player.overall) }}
            >
              {player.overall}
            </div>
            <span className="text-xs font-semibold text-white leading-tight max-w-[90px]">
              {player.name.split(' ').pop()}
            </span>
            <span className="text-[10px] text-slate-400">{player.team.split(' ').pop()}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePlayer(position);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent-red text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity"
              title="Remove player"
            >
              ×
            </button>
          </>
        ) : (
          <span className="text-xs text-slate-500">+ Select</span>
        )}
      </button>
    </div>
  );
}

export default function CourtDiagram() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative w-full aspect-[1.5] rounded-2xl overflow-hidden border-2 border-dark-border bg-court-wood/20">
        {/* Court background */}
        <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Wood floor */}
          <rect width="600" height="400" fill="#1a1408" />
          <rect width="600" height="400" fill="url(#woodPattern)" opacity="0.3" />

          {/* Court lines */}
          <rect x="20" y="20" width="560" height="360" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" rx="8" />

          {/* Half court line */}
          <line x1="20" y1="200" x2="580" y2="200" stroke="#ffffff" strokeWidth="2" opacity="0.3" />

          {/* Paint / key areas */}
          <rect x="200" y="20" width="200" height="140" fill="#e86f2a" opacity="0.15" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
          <rect x="200" y="240" width="200" height="140" fill="#e86f2a" opacity="0.15" stroke="#ffffff" strokeWidth="2" opacity="0.3" />

          {/* Free throw circles */}
          <circle cx="300" cy="160" r="60" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
          <circle cx="300" cy="240" r="60" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

          {/* Three-point arcs */}
          <path d="M 80 20 Q 300 160 520 20" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
          <path d="M 80 380 Q 300 240 520 380" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

          {/* Baskets */}
          <circle cx="300" cy="40" r="12" fill="none" stroke="#ff6b35" strokeWidth="2" opacity="0.5" />
          <circle cx="300" cy="360" r="12" fill="none" stroke="#ff6b35" strokeWidth="2" opacity="0.5" />

          {/* Center circle */}
          <circle cx="300" cy="200" r="40" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />

          {/* Patterns */}
          <defs>
            <pattern id="woodPattern" width="30" height="300" patternUnits="userSpaceOnUse">
              <rect width="30" height="300" fill="#c4893b" opacity="0.08" />
              <line x1="0" y1="0" x2="0" y2="300" stroke="#000" strokeWidth="0.5" opacity="0.05" />
            </pattern>
          </defs>
        </svg>

        {/* Player slots */}
        {Object.keys(COURT_POSITIONS).map((pos) => (
          <PlayerSlot key={pos} position={pos} />
        ))}
      </div>
    </div>
  );
}
