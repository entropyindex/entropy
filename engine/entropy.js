// Calculate entropy/infection score from signals

const CHAOS_WORDS = [
  'war','crash','collapse','panic','scam','rug','hack','breach','leak',
  'cancel','drama','controversy','scandal','chaos','riot','ban','dead',
  'fraud','conspiracy','doom','fear','rage','outrage','toxic','fight',
  'attack','destroy','broken','insane','crazy','meltdown','crisis','explode'
];

function sentimentScore(text) {
  const lower = (text || '').toLowerCase();
  let score = 0;
  for (const w of CHAOS_WORDS) {
    if (lower.includes(w)) score += 1;
  }
  return Math.min(score / 3, 1); // 0-1 chaos level
}

function calculateEntropy(redditSignals, twitterSignals, community) {
  let chaosSum = 0;
  let count = 0;
  let topTrend = '';
  let topChaos = 0;

  // Reddit signals
  for (const s of redditSignals) {
    const textChaos = sentimentScore(s.title);
    const controversyChaos = s.upvoteRatio < 0.65 ? 0.4 : 0;
    const engagementBoost = Math.min(s.numComments / 500, 0.3);
    const chaos = Math.min(1, textChaos + controversyChaos + engagementBoost);
    chaosSum += chaos;
    count++;
    if (chaos > topChaos) { topChaos = chaos; topTrend = s.title; }
  }

  // Twitter signals
  for (const s of twitterSignals) {
    const textChaos = sentimentScore(s.text);
    const ratio = (s.replies || 0) / Math.max(1, s.likes || 1);
    const ratioChaos = ratio > 1 ? 0.5 : ratio > 0.5 ? 0.3 : 0;
    const chaos = Math.min(1, textChaos + ratioChaos);
    chaosSum += chaos;
    count++;
    if (chaos > topChaos) { topChaos = chaos; topTrend = (s.text || '').slice(0, 80); }
  }

  if (count === 0) {
    // No data — return baseline with some randomness
    return {
      infection: 20 + Math.random() * 30,
      trend: 'Monitoring...'
    };
  }

  const avgChaos = chaosSum / count;
  const infection = avgChaos * 100;

  // Truncate trend
  if (topTrend.length > 60) topTrend = topTrend.slice(0, 57) + '...';

  return { infection, trend: topTrend || 'Low-level noise detected' };
}

module.exports = { calculateEntropy };
