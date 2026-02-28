// Community node definitions and data sources
const COMMUNITIES = [
  { id: 'crypto-twitter', name: 'Crypto Twitter', sources: { twitter: ['bitcoin', 'crypto', 'ethereum', 'solana'], reddit: ['r/cryptocurrency', 'r/bitcoin'] } },
  { id: 'ai-twitter', name: 'AI Twitter', sources: { twitter: ['AI', 'LLM', 'GPT', 'Claude'], reddit: ['r/artificial', 'r/MachineLearning'] } },
  { id: 'politics', name: 'Politics', sources: { twitter: ['politics', 'congress', 'election'], reddit: ['r/politics', 'r/news'] } },
  { id: 'gaming', name: 'Gaming', sources: { twitter: ['gaming', 'xbox', 'playstation'], reddit: ['r/gaming', 'r/games'] } },
  { id: 'reddit', name: 'Reddit', sources: { reddit: ['r/all'] } },
  { id: 'tech', name: 'Tech', sources: { twitter: ['startup', 'silicon valley', 'tech'], reddit: ['r/technology'] } },
  { id: 'memes', name: 'Memes', sources: { reddit: ['r/memes', 'r/dankmemes'] } },
  { id: 'finance', name: 'Finance', sources: { twitter: ['stocks', 'market', 'trading'], reddit: ['r/wallstreetbets', 'r/stocks'] } },
  { id: 'drama', name: 'Drama', sources: { twitter: ['drama', 'cancelled', 'ratio'], reddit: ['r/SubredditDrama'] } },
  { id: 'twitch', name: 'Twitch', sources: { twitter: ['twitch', 'streaming', 'streamer'], reddit: ['r/LivestreamFail'] } },
  { id: 'youtube', name: 'YouTube', sources: { twitter: ['youtube', 'youtuber'], reddit: ['r/youtube'] } },
  { id: 'news', name: 'News', sources: { twitter: ['breaking', 'headline'], reddit: ['r/worldnews'] } },
];

// Edges define which communities are connected (chaos can spread between them)
const EDGES = [
  { source: 'crypto-twitter', target: 'finance', weight: 0.8 },
  { source: 'crypto-twitter', target: 'tech', weight: 0.5 },
  { source: 'ai-twitter', target: 'tech', weight: 0.9 },
  { source: 'politics', target: 'news', weight: 0.9 },
  { source: 'politics', target: 'drama', weight: 0.6 },
  { source: 'gaming', target: 'twitch', weight: 0.8 },
  { source: 'gaming', target: 'youtube', weight: 0.7 },
  { source: 'reddit', target: 'memes', weight: 0.7 },
  { source: 'reddit', target: 'drama', weight: 0.6 },
  { source: 'twitch', target: 'youtube', weight: 0.6 },
  { source: 'twitch', target: 'drama', weight: 0.5 },
  { source: 'finance', target: 'news', weight: 0.4 },
  { source: 'memes', target: 'drama', weight: 0.3 },
  { source: 'tech', target: 'news', weight: 0.4 },
  { source: 'ai-twitter', target: 'reddit', weight: 0.3 },
];

const SCAN_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours

module.exports = { COMMUNITIES, EDGES, SCAN_INTERVAL_MS };
