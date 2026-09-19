import { useLineup } from '../context/LineupContext';

function ScoreGauge({ label, score, color, size = 100 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e2a3a"
            strokeWidth="6"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-ring"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{score}</span>
          <span className="text-xs text-slate-400">/10</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-300">{label}</span>
    </div>
  );
}

function OverallGauge({ score }) {
  const color = score >= 8 ? '#22c55e' : score >= 6 ? '#3b82f6' : score >= 4 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 140, height: 140 }}>
        <svg width={140} height={140} className="transform -rotate-90">
          <circle
            cx={70}
            cy={70}
            r={62}
            fill="none"
            stroke="#1e2a3a"
            strokeWidth="8"
          />
          <circle
            cx={70}
            cy={70}
            r={62}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 62}
            strokeDashoffset={2 * Math.PI * 62 - (score / 10) * 2 * Math.PI * 62}
            className="gauge-ring"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-slate-400">/10</span>
        </div>
      </div>
      <span className="text-sm font-bold text-white uppercase tracking-wider">Overall</span>
    </div>
  );
}

export default function EvaluationPanel() {
  const { evaluation, loading, error, runEvaluation, isComplete, filledCount } = useLineup();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">AI Evaluation</h2>
        <button
          onClick={runEvaluation}
          disabled={!isComplete || loading}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all
            ${isComplete && !loading
              ? 'bg-accent-blue text-white hover:bg-blue-600 shadow-lg shadow-accent-blue/20'
              : 'bg-dark-border text-slate-500 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Analyzing...
            </span>
          ) : (
            `Evaluate Lineup (${filledCount}/5)`
          )}
        </button>
      </div>

      {!isComplete && !evaluation && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-slate-500 text-center">
            Fill all 5 positions to enable AI evaluation
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-accent-red/30 bg-accent-red/10 p-3 mb-3">
          <p className="text-xs text-accent-red">{error}</p>
        </div>
      )}

      {evaluation && (
        <div className="flex-1 overflow-y-auto space-y-5 animate-fade-in">
          <div className="flex justify-center">
            <OverallGauge score={evaluation.overallScore} />
          </div>

          <div className="flex justify-around">
            <ScoreGauge label="Offense" score={evaluation.offenseRating} color="#22c55e" size={75} />
            <ScoreGauge label="Defense" score={evaluation.defenseRating} color="#3b82f6" size={75} />
            <ScoreGauge label="Spacing" score={evaluation.spacingAndFit} color="#eab308" size={75} />
          </div>

          <div className="rounded-xl border border-dark-border bg-dark-card/50 p-4">
            <p className="text-sm text-slate-300 leading-relaxed">{evaluation.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-accent-green/20 bg-accent-green/5 p-3">
              <h3 className="text-xs font-bold text-accent-green mb-2 uppercase tracking-wider">Strengths</h3>
              <ul className="space-y-1">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-accent-green mt-0.5">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent-red/20 bg-accent-red/5 p-3">
              <h3 className="text-xs font-bold text-accent-red mb-2 uppercase tracking-wider">Weaknesses</h3>
              <ul className="space-y-1">
                {evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-accent-red mt-0.5">−</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {!evaluation && isComplete && !loading && !error && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-slate-400 text-center">
            All positions filled! Click <strong>Evaluate Lineup</strong> to get your AI analysis.
          </p>
        </div>
      )}
    </div>
  );
}
