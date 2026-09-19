import { useState, useMemo } from 'react';
import { useLineup } from '../context/LineupContext';
import { POSITIONS, getPlayersByPosition, getRatingColor, getRatingLabel } from '../data/players';

function PlayerCard({ player, isSelected }) {
  const { selectPlayer, selectedPosition } = useLineup();
  const ratingColor = getRatingColor(player.overall);

  return (
    <button
      onClick={() => {
        if (selectedPosition) {
          selectPlayer(selectedPosition, player);
        }
      }}
      className={`w-full text-left rounded-xl border p-3 transition-all cursor-pointer
        ${isSelected
          ? 'border-accent-blue bg-accent-blue/10 animate-pulse-glow'
          : 'border-dark-border bg-dark-card hover:border-slate-600 hover:bg-dark-card/80'
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: ratingColor }}
        >
          {player.overall}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{player.name}</p>
          <p className="text-xs text-slate-400 truncate">{player.team}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{getRatingLabel(player.overall)}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <StatBadge label="3PT" value={player.threePT} />
        <StatBadge label="DEF" value={player.defense} />
        <StatBadge label="PLY" value={player.playmaking} />
      </div>
    </button>
  );
}

function StatBadge({ label, value }) {
  return (
    <div className="flex-1 rounded-md bg-dark-bg/60 px-2 py-1 text-center">
      <p className="text-[9px] text-slate-500 uppercase">{label}</p>
      <p className="text-xs font-bold" style={{ color: getRatingColor(value) }}>{value}</p>
    </div>
  );
}

export default function PlayerRoster() {
  const { selectedPosition, setSelectedPosition, lineup } = useLineup();
  const [activeTab, setActiveTab] = useState('PG');

  const players = useMemo(() => getPlayersByPosition(activeTab), [activeTab]);
  const currentPlayer = selectedPosition ? lineup[selectedPosition] : null;

  const selectedIds = useMemo(() => {
    return new Set(Object.values(lineup).filter(Boolean).map((p) => p.id));
  }, [lineup]);

  return (
    <div className="flex flex-col h-full">
      {/* Position tabs */}
      <div className="flex gap-1 mb-3 p-1 rounded-xl bg-dark-bg/60">
        {Object.entries(POSITIONS).map(([key, pos]) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setSelectedPosition(key);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all
              ${activeTab === key
                ? 'bg-accent-blue text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-dark-card'
              }`}
          >
            {pos.abbr}
          </button>
        ))}
      </div>

      {/* Instruction */}
      {selectedPosition && (
        <p className="text-xs text-accent-blue mb-2 px-1">
          Selecting for <span className="font-bold">{POSITIONS[selectedPosition].label}</span>
        </p>
      )}

      {/* Player list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {players.map((player) => (
          <PlayerCard
            key={`${player.id}-${player.position}`}
            player={player}
            isSelected={currentPlayer?.id === player.id}
          />
        ))}
      </div>
    </div>
  );
}
