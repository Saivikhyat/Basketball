export const POSITIONS = {
  PG: { label: 'Point Guard', abbr: 'PG' },
  SG: { label: 'Shooting Guard', abbr: 'SG' },
  SF: { label: 'Small Forward', abbr: 'SF' },
  PF: { label: 'Power Forward', abbr: 'PF' },
  C: { label: 'Center', abbr: 'C' },
};

export const PLAYERS = [
  { id: 1, name: 'Stephen Curry', team: 'Golden State Warriors', position: 'PG', overall: 96, threePT: 99, defense: 74, playmaking: 92 },
  { id: 2, name: 'Luka Doncic', team: 'Los Angeles Lakers', position: 'PG', overall: 95, threePT: 92, defense: 70, playmaking: 96 },
  { id: 3, name: 'Shai Gilgeous-Alexander', team: 'Oklahoma City Thunder', position: 'PG', overall: 96, threePT: 88, defense: 82, playmaking: 90 },
  { id: 4, name: 'Trae Young', team: 'Atlanta Hawks', position: 'PG', overall: 90, threePT: 90, defense: 58, playmaking: 94 },
  { id: 5, name: 'Jalen Brunson', team: 'New York Knicks', position: 'PG', overall: 91, threePT: 84, defense: 72, playmaking: 88 },
  { id: 6, name: 'Damian Lillard', team: 'Milwaukee Bucks', position: 'PG', overall: 88, threePT: 88, defense: 68, playmaking: 90 },
  { id: 7, name: 'Tyrese Haliburton', team: 'Indiana Pacers', position: 'PG', overall: 89, threePT: 86, defense: 72, playmaking: 93 },

  { id: 8, name: 'Luka Doncic', team: 'Los Angeles Lakers', position: 'SG', overall: 95, threePT: 92, defense: 70, playmaking: 96 },
  { id: 9, name: 'Devin Booker', team: 'Phoenix Suns', position: 'SG', overall: 93, threePT: 89, defense: 72, playmaking: 84 },
  { id: 10, name: 'Anthony Edwards', team: 'Minnesota Timberwolves', position: 'SG', overall: 94, threePT: 86, defense: 82, playmaking: 80 },
  { id: 11, name: 'Jaylen Brown', team: 'Boston Celtics', position: 'SG', overall: 91, threePT: 82, defense: 86, playmaking: 76 },
  { id: 12, name: 'Donovan Mitchell', team: 'Cleveland Cavaliers', position: 'SG', overall: 91, threePT: 87, defense: 76, playmaking: 80 },
  { id: 13, name: 'Jalen Brunson', team: 'New York Knicks', position: 'SG', overall: 91, threePT: 84, defense: 72, playmaking: 88 },
  { id: 14, name: 'De\'Aaron Fox', team: 'Sacramento Kings', position: 'SG', overall: 88, threePT: 80, defense: 74, playmaking: 86 },

  { id: 15, name: 'Jayson Tatum', team: 'Boston Celtics', position: 'SF', overall: 95, threePT: 88, defense: 84, playmaking: 84 },
  { id: 16, name: 'LeBron James', team: 'Los Angeles Lakers', position: 'SF', overall: 90, threePT: 80, defense: 78, playmaking: 90 },
  { id: 17, name: 'Kevin Durant', team: 'Phoenix Suns', position: 'SF', overall: 92, threePT: 90, defense: 78, playmaking: 80 },
  { id: 18, name: 'Kawhi Leonard', team: 'LA Clippers', position: 'SF', overall: 88, threePT: 84, defense: 90, playmaking: 74 },
  { id: 19, name: 'Jimmy Butler', team: 'Miami Heat', position: 'SF', overall: 87, threePT: 76, defense: 88, playmaking: 82 },
  { id: 20, name: 'Paul George', team: 'Philadelphia 76ers', position: 'SF', overall: 85, threePT: 84, defense: 84, playmaking: 78 },
  { id: 21, name: 'OG Anunoby', team: 'New York Knicks', position: 'SF', overall: 86, threePT: 82, defense: 92, playmaking: 70 },

  { id: 22, name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', position: 'PF', overall: 96, threePT: 68, defense: 92, playmaking: 86 },
  { id: 23, name: 'Anthony Davis', team: 'Los Angeles Lakers', position: 'PF', overall: 92, threePT: 72, defense: 94, playmaking: 78 },
  { id: 24, name: 'Jayson Tatum', team: 'Boston Celtics', position: 'PF', overall: 95, threePT: 88, defense: 84, playmaking: 84 },
  { id: 25, name: 'Bam Adebayo', team: 'Miami Heat', position: 'PF', overall: 88, threePT: 60, defense: 92, playmaking: 80 },
  { id: 26, name: 'Paolo Banchero', team: 'Orlando Magic', position: 'PF', overall: 90, threePT: 78, defense: 80, playmaking: 82 },
  { id: 27, name: 'Lauri Markkanen', team: 'Utah Jazz', position: 'PF', overall: 86, threePT: 86, defense: 76, playmaking: 72 },

  { id: 28, name: 'Nikola Jokic', team: 'Denver Nuggets', position: 'C', overall: 97, threePT: 80, defense: 82, playmaking: 96 },
  { id: 29, name: 'Anthony Davis', team: 'Los Angeles Lakers', position: 'C', overall: 92, threePT: 72, defense: 94, playmaking: 78 },
  { id: 30, name: 'Joel Embiid', team: 'Philadelphia 76ers', position: 'C', overall: 91, threePT: 80, defense: 90, playmaking: 78 },
  { id: 31, name: 'Karl-Anthony Towns', team: 'New York Knicks', position: 'C', overall: 88, threePT: 82, defense: 78, playmaking: 74 },
  { id: 32, name: 'Victor Wembanyama', team: 'San Antonio Spurs', position: 'C', overall: 90, threePT: 78, defense: 96, playmaking: 76 },
  { id: 33, name: 'Bam Adebayo', team: 'Miami Heat', position: 'C', overall: 88, threePT: 60, defense: 92, playmaking: 80 },
  { id: 34, name: 'Rudy Gobert', team: 'Minnesota Timberwolves', position: 'C', overall: 85, threePT: 40, defense: 96, playmaking: 60 },
];

export const POSITION_KEYS = ['PG', 'SG', 'SF', 'PF', 'C'];

export function getPlayersByPosition(position) {
  return PLAYERS.filter((p) => p.position === position);
}

export function getPlayerById(id) {
  return PLAYERS.find((p) => p.id === id);
}

export function getRatingColor(rating) {
  if (rating >= 93) return '#22c55e';
  if (rating >= 88) return '#3b82f6';
  if (rating >= 82) return '#eab308';
  if (rating >= 75) return '#f97316';
  return '#ef4444';
}

export function getRatingLabel(rating) {
  if (rating >= 95) return 'Elite';
  if (rating >= 90) return 'All-NBA';
  if (rating >= 85) return 'All-Star';
  if (rating >= 80) return 'Starter';
  if (rating >= 75) return 'Rotation';
  return 'Role Player';
}
