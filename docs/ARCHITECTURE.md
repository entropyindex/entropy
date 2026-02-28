# Architecture

## Overview

ENTROPY is a real-time internet chaos visualization system. It consists of two main components:

1. **The Engine** — crawls internet platforms, analyzes chaos levels, outputs structured data
2. **The Frontend** — renders the infection map from that data

## Data Flow

```
Twitter API ──┐
              ├──→ Engine (run.js) ──→ world-state.json ──→ Frontend (index.html)
Reddit API ───┘
```

## Engine Pipeline

### 1. Data Collection
- `twitter.js` — Fetches recent tweets from tracked communities using Twitter API v2
- `reddit.js` — Fetches hot posts from tracked subreddits via Reddit's public JSON API

### 2. Analysis (`entropy.js`)
- **Sentiment scoring** — Detects negative/chaotic language patterns
- **Controversy detection** — High reply:like ratios, divisive topics
- **Chaos keywords** — Tracks words associated with internet disorder
- **Infection calculation** — Combines metrics into a 0-100% infection score per node

### 3. Output
- Writes `world-state.json` with per-node infection levels, trending topics, and global entropy score
- Frontend polls this file every 30 seconds

## Frontend Rendering

### Canvas Layers
1. **Background** — Animated particle field (red embers)
2. **Edges** — Connection lines between community nodes
3. **Infection particles** — Travel along edges between high-chaos nodes
4. **Nodes** — Community circles that pulse and glow based on infection level
5. **Labels** — Node names and infection percentages
6. **HUD** — Global entropy counter

### Color System
- **Healthy (0%):** Cyan (#00ffff)
- **Warning (50%):** Orange (#ff8800)  
- **Critical (100%):** Red (#ff0000)
- **Background:** Pure black (#000000)

## Community Nodes

Each node represents an internet community or platform segment:

| Node | Sources |
|------|---------|
| Crypto Twitter | Twitter search: crypto, bitcoin, ethereum |
| AI Twitter | Twitter search: AI, LLM, GPT |
| Politics | Twitter + Reddit: r/politics, r/news |
| Gaming | Twitter + Reddit: r/gaming, r/games |
| Reddit | Reddit frontpage hot posts |
| Tech | Twitter + Reddit: r/technology |
| Memes | Reddit: r/memes, r/dankmemes |
| Finance | Twitter + Reddit: r/wallstreetbets |
| Drama | Reddit: r/SubredditDrama, Twitter trending |
| Twitch | Twitter: twitch, streaming |
| YouTube | Twitter + Reddit: r/youtube |
| News | Reddit: r/worldnews, Twitter: breaking |

## Infection Spread Model

Chaos doesn't stay contained. When a node reaches high infection (>70%), it begins spreading to connected nodes at a rate proportional to:

- Connection strength (how related the communities are)
- Source infection level
- Target's current resistance (lower infection = more resistant)

This creates organic-looking spread patterns that mirror how real internet drama cascades across communities.
