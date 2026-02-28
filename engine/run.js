const fs = require('fs');
const path = require('path');
const { fetchReddit } = require('./reddit');
const { fetchTwitter } = require('./twitter');
const { calculateEntropy } = require('./entropy');

const STATE_PATH = path.join(__dirname, '..', 'world-state.json');

const COMMUNITIES = [
  { id: 'twitter-main', name: 'Twitter/X', x: 0.5, y: 0.35, connections: ['crypto-twitter','ai-twitter','politics','media'],
    reddit: [], twitter: ['trending','viral','discourse'] },
  { id: 'crypto-twitter', name: 'Crypto Twitter', x: 0.25, y: 0.2, connections: ['twitter-main','wallstreetbets','tech-twitter'],
    reddit: ['cryptocurrency','bitcoin','CryptoMoonShots'], twitter: ['crypto','bitcoin','memecoin'] },
  { id: 'ai-twitter', name: 'AI Twitter', x: 0.72, y: 0.18, connections: ['twitter-main','tech-twitter','reddit-ml'],
    reddit: ['artificial','singularity'], twitter: ['AGI','AI','LLM'] },
  { id: 'politics', name: 'Politics', x: 0.15, y: 0.55, connections: ['twitter-main','reddit-politics','media'],
    reddit: [], twitter: ['politics','election','congress'] },
  { id: 'reddit-politics', name: 'r/politics', x: 0.08, y: 0.75, connections: ['politics','reddit-all'],
    reddit: ['politics','PoliticalDiscussion'], twitter: [] },
  { id: 'reddit-all', name: 'Reddit', x: 0.4, y: 0.7, connections: ['reddit-politics','reddit-ml','gaming','wallstreetbets'],
    reddit: ['all','popular'], twitter: [] },
  { id: 'reddit-ml', name: 'r/MachineLearning', x: 0.65, y: 0.45, connections: ['ai-twitter','reddit-all','tech-twitter'],
    reddit: ['MachineLearning','LocalLLaMA'], twitter: [] },
  { id: 'gaming', name: 'Gaming', x: 0.55, y: 0.8, connections: ['reddit-all','twitch'],
    reddit: ['gaming','Games','pcgaming'], twitter: ['gaming'] },
  { id: 'twitch', name: 'Twitch', x: 0.78, y: 0.72, connections: ['gaming','twitter-main'],
    reddit: ['LivestreamFail','Twitch'], twitter: ['twitch','streamer'] },
  { id: 'tech-twitter', name: 'Tech Twitter', x: 0.85, y: 0.4, connections: ['crypto-twitter','ai-twitter','reddit-ml'],
    reddit: ['technology','programming'], twitter: ['tech','startup','layoffs'] },
  { id: 'wallstreetbets', name: 'WallStreetBets', x: 0.3, y: 0.45, connections: ['crypto-twitter','reddit-all'],
    reddit: ['wallstreetbets'], twitter: ['WSB','stonks'] },
  { id: 'media', name: 'News Media', x: 0.18, y: 0.35, connections: ['twitter-main','politics'],
    reddit: ['news','worldnews'], twitter: ['breakingnews','media'] }
];

async function run() {
  console.log('[ENTROPY] Starting crawl at', new Date().toISOString());

  const results = [];

  for (const community of COMMUNITIES) {
    let redditSignals = [];
    let twitterSignals = [];

    try {
      if (community.reddit.length) {
        redditSignals = await fetchReddit(community.reddit);
      }
    } catch (e) { console.error(`[Reddit] ${community.id}:`, e.message); }

    try {
      if (community.twitter.length) {
        twitterSignals = await fetchTwitter(community.twitter);
      }
    } catch (e) { console.error(`[Twitter] ${community.id}:`, e.message); }

    const { infection, trend } = calculateEntropy(redditSignals, twitterSignals, community);

    results.push({
      id: community.id,
      name: community.name,
      infection: Math.round(Math.min(100, Math.max(0, infection))),
      trend,
      x: community.x,
      y: community.y,
      connections: community.connections
    });
  }

  const globalEntropy = Math.round(results.reduce((s, n) => s + n.infection, 0) / results.length);

  const state = {
    timestamp: new Date().toISOString(),
    globalEntropy,
    totalNodes: results.length,
    infectedNodes: results.filter(n => n.infection > 0).length,
    nodes: results
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
  console.log(`[ENTROPY] State written. Global entropy: ${globalEntropy}%`);
}

run().catch(e => { console.error('[ENTROPY] Fatal:', e); process.exit(1); });
