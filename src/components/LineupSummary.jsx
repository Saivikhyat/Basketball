import { useLineup } from '../context/LineupContext';
import { POSITIONS, getRatingColor } from '../data/players';

export default function LineupSummary() {
  const { lineup } = useLineup();

  const filled = Object.entries(lineup).filter(([, p]) => p !== null);
  if (filled.length === 0) return null;

  return (
    <div className="rounded-xl border border-dark-border bg-dark-card/50 p-3">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Lineup</h3>
      <div className="flex flex-wrap gap-2">
        {filled.map(([pos, player]) => (
          <div
            key={pos}
            className="flex items-center gap-1.5 rounded-lg bg-dark-bg/60 px-2 py-1"
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
              style={{ backgroundColor: getRatingColor(player.overall) }}
            >
              {player.overall}
            </div>
            <span className="text-[11px] font-medium text-slate-300">
              <span className="text-court-orange font-bold">{pos}</span>{' '}
              {player.name.split(' ').pop()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
