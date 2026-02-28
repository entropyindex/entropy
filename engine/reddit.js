const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'entropy-bot/1.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// Fetch hot posts from subreddit, return signal data
async function fetchReddit(subreddits) {
  const signals = [];

  for (const sub of subreddits) {
    try {
      const data = await get(`https://www.reddit.com/r/${sub}/hot.json?limit=25`);
      if (!data.data || !data.data.children) continue;

      for (const post of data.data.children) {
        const p = post.data;
        signals.push({
          title: p.title || '',
          score: p.score || 0,
          numComments: p.num_comments || 0,
          upvoteRatio: p.upvote_ratio || 0.5,
          over18: p.over_18 || false,
          controversiality: p.upvote_ratio < 0.6 ? 1 : 0,
          awards: p.total_awards_received || 0,
          createdUtc: p.created_utc || 0
        });
      }
    } catch (e) {
      console.error(`[Reddit] Error fetching r/${sub}:`, e.message);
    }
  }

  return signals;
}

module.exports = { fetchReddit };
