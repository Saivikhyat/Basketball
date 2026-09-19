const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

function getApiKey() {
  return localStorage.getItem('groq_api_key') || '';
}

export function setApiKey(key) {
  localStorage.setItem('groq_api_key', key);
}

export function hasApiKey() {
  return !!getApiKey();
}

export async function evaluateLineup(lineup) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key not set. Open Settings to add your Groq API key.');
  }

  const filledPositions = Object.entries(lineup).filter(([, player]) => player !== null);
  if (filledPositions.length < 5) {
    throw new Error('All 5 positions must be filled before evaluating.');
  }

  const roster = filledPositions
    .map(([pos, player]) => {
      return `${pos}: ${player.name} (${player.team}) - OVR: ${player.overall}, 3PT: ${player.threePT}, DEF: ${player.defense}, PLAY: ${player.playmaking}`;
    })
    .join('\n');

  const prompt = `You are an NBA basketball analyst. Evaluate this starting five lineup:

${roster}

Return a JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):
{
  "overallScore": <number 1-10>,
  "offenseRating": <number 1-10>,
  "defenseRating": <number 1-10>,
  "spacingAndFit": <number 1-10>,
  "summary": "<2-3 sentence paragraph explaining the overall fit of this lineup>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"]
}

Be realistic and analytical. Consider:
- Positional fit and spacing
- Offensive firepower vs defensive liability
- Ball-handling and playmaking balance
- Rebounding and rim protection
- Three-point shooting and floor spacing`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert NBA analyst. Always respond with valid JSON only, no markdown formatting.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your Groq API key in Settings.');
    }
    throw new Error(errorData.error?.message || `API request failed (${response.status})`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from API. Please try again.');
  }

  try {
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleaned);

    return {
      overallScore: Math.min(10, Math.max(1, Number(result.overallScore) || 5)),
      offenseRating: Math.min(10, Math.max(1, Number(result.offenseRating) || 5)),
      defenseRating: Math.min(10, Math.max(1, Number(result.defenseRating) || 5)),
      spacingAndFit: Math.min(10, Math.max(1, Number(result.spacingAndFit) || 5)),
      summary: result.summary || 'No summary available.',
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
    };
  } catch {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}
