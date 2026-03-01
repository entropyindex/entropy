<p align="center">
  <img src="banner.png" width="600" />
</p>

<h1 align="center">ENTROPY</h1>

<p align="center">
  <strong>real-time chaos index for the internet</strong>
</p>

<p align="center">
  <a href="https://entropyindex.github.io/entropy"><img src="https://img.shields.io/badge/⬤_LIVE-infection_map-ff2200?style=for-the-badge" /></a>
  &nbsp;
  <a href="https://x.com/entropyindex"><img src="https://img.shields.io/badge/X-@entropyindex-000?style=for-the-badge&logo=x&logoColor=white" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/global_entropy-89%25-ff2200?style=flat-square" />
  <img src="https://img.shields.io/badge/nodes-12-white?style=flat-square" />
  <img src="https://img.shields.io/badge/status-CRITICAL-ff2200?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-white?style=flat-square" />
</p>

---

## what is this

every corner of the internet generates chaos — drama, panic, hype, outrage. it spreads between communities like an infection.

**entropy** tracks 12 internet communities in real-time, scores the chaos, and visualizes it as a living infection map. when every community starts talking about the same thing, entropy spikes. that's convergence.

> it's not sentiment analysis. it's a chaos index.

## how it works

```
twitter ──┐                                    ┌── infection map
          ├── engine ── chaos scoring ── json ──┤
reddit  ──┘                                    └── global entropy %
```

1. **crawl** — pull posts from twitter and reddit across 12 community nodes
2. **score** — analyze chaos signals: negative sentiment, controversy ratios, engagement spikes, chaos keywords
3. **spread** — high-infection nodes (>70%) bleed chaos into connected communities
4. **render** — canvas visualization with real-time infection particles, pulsing nodes, and a global entropy counter

### infection formula

```
infection(node) = topic_velocity × community_bleed × sentiment_divergence
```

| metric | what it measures |
|--------|-----------------|
| `topic_velocity` | rate of crisis-keyword posts vs. baseline |
| `community_bleed` | % of foreign topics invading a community |
| `sentiment_divergence` | how far current mood deviates from 30-day average |

when all three spike across multiple nodes simultaneously — that's not noise. that's convergence.

## the 12 nodes

```
  TWITTER ──── CRYPTO ──── AI ──── POLITICS
     │            │         │          │
  REDDIT ──── WSB ──── R/ML ──── GAMING
     │            │         │          │
  TWITCH ──── TECH ──── R/POL ──── NEWS
```

each node scored `0-100%`. the **global entropy index** is the weighted average × convergence multiplier.

`> 70%` CRITICAL &nbsp; `> 50%` ELEVATED &nbsp; `> 30%` MODERATE &nbsp; `< 30%` STABLE

## features

- **infection map** — pixel-art canvas with buildings, NPCs, weather effects
- **connection lines** — visible chaos spreading between connected communities
- **infection particles** — red dots traveling along connections in real-time
- **click to inspect** — click any node for detailed breakdown + connections
- **news ticker** — scrolling headlines from the most infected communities
- **keyboard nav** — `Tab` to cycle nodes, `Esc` to close
- **walking NPCs** — characters wander between buildings, glitch at high infection
- **weather system** — rain and smoke intensify with entropy level

## run it

```bash
# view the map (no build step, raw html)
open index.html

# run the chaos engine
cd engine && npm install && node run.js
```

the engine writes `world-state.json` → the frontend reads it. no framework. no build step. raw canvas.

## architecture

```
engine/
├── run.js          # main loop — crawl → score → spread → write
├── twitter.js      # twitter chaos scanner (v2 api)
├── reddit.js       # reddit chaos scanner (public json)
├── entropy.js      # infection scoring + cross-community spread
├── history.js      # historical tracking
└── config.js       # node definitions, api keys

index.html          # the entire frontend (single file, ~700 lines)
world-state.json    # current state (engine output → frontend input)
```

## tech

`canvas api` · `vanilla js` · `node.js` · `twitter v2` · `reddit json` · `zero dependencies (frontend)`

## contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)

---

<p align="center">
  <sub>order decays. we track it.</sub>
</p>
