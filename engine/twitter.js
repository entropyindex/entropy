// Twitter API v2 integration
// Reads keys from backrooms config

const fs = require('fs');
const path = require('path');
const https = require('https');

let config;
try {
  config = JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', '..', 'backrooms', 'config.json'), 'utf8'
  )).twitter;
} catch (e) {
  console.warn('[Twitter] No config found, twitter signals will be empty');
  config = null;
}

function bearerSearch(query) {
  // Using OAuth 1.0a user context with consumer keys
  // For simplicity, we use the v2 recent search with OAuth
  return new Promise((resolve, reject) => {
    if (!config) return resolve([]);

    // Build OAuth 1.0a header (simplified — in production use a proper OAuth lib)
    // For now, attempt with bearer token approach via app-only auth
    // This is a placeholder — Twitter API requires proper OAuth signing
    resolve([]);
  });
}

async function fetchTwitter(keywords) {
  if (!config) return [];

  // Placeholder: return empty signals
  // To fully implement, install twitter-api-v2 and run: npm install
  // Then use: const { TwitterApi } = require('twitter-api-v2');
  // const client = new TwitterApi({ appKey: config.consumer_key, ... });

  try {
    const signals = [];
    // When twitter-api-v2 is installed:
    // const { TwitterApi } = require('twitter-api-v2');
    // const client = new TwitterApi({
    //   appKey: config.consumer_key,
    //   appSecret: config.consumer_secret,
    //   accessToken: config.access_token,
    //   accessSecret: config.access_token_secret
    // });
    // for (const kw of keywords) {
    //   const results = await client.v2.search(kw, { max_results: 20, 'tweet.fields': 'public_metrics' });
    //   for (const tweet of results.data || []) {
    //     signals.push({
    //       text: tweet.text,
    //       likes: tweet.public_metrics?.like_count || 0,
    //       retweets: tweet.public_metrics?.retweet_count || 0,
    //       replies: tweet.public_metrics?.reply_count || 0,
    //     });
    //   }
    // }
    return signals;
  } catch (e) {
    console.error('[Twitter] API error:', e.message);
    return [];
  }
}

module.exports = { fetchTwitter };
