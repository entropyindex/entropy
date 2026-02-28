<p align="center">
  <img src="banner.png" width="600" />
</p>

<h1 align="center">ENTROPY</h1>

<p align="center">
  <strong>the internet has a temperature. we measure it.</strong>
</p>

<p align="center">
  <a href="https://entropyindex.github.io/entropy"><img src="https://img.shields.io/badge/live-infection%20map-ff2200?style=flat-square" /></a>
  <a href="https://x.com/entropyindex"><img src="https://img.shields.io/badge/X-@entropyindex-white?style=flat-square&logo=x&logoColor=white" /></a>
  <a href="https://github.com/entropyindex/entropy/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-white?style=flat-square" /></a>
</p>

---

## the idea

every corner of the internet generates chaos — drama, panic, outrage, controversy. it spreads between communities like an infection.

**entropy** crawls the internet in real-time, scores the chaos, and visualizes it as a living infection map. nodes represent communities. the more chaotic a community gets, the more consumed it becomes. chaos spreads to connected nodes.

it's not sentiment analysis. it's a chaos index.

<p align="center">
  <img src="pfp.png" width="120" />
</p>

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

### the 12 nodes

`crypto twitter` · `ai twitter` · `politics` · `gaming` · `reddit` · `tech` · `memes` · `finance` · `drama` · `twitch` · `youtube` · `news`

each one is scored 0–100%. the global entropy index is the weighted average.

### chaos signals

| signal | what it measures |
|--------|-----------------|
| keyword detection | presence of chaos words (crash, scam, meltdown, riot, etc.) |
| controversy ratio | reply:like ratio — high ratio = divisive |
| upvote ratio | reddit posts with <65% upvotes = controversial |
| engagement spikes | abnormal comment counts relative to baseline |
| cross-infection | chaos spreading between connected communities |

## run it

```bash
# view the map
open index.html

# run the chaos engine (requires api keys)
cd engine
npm install
node run.js
```

the engine writes `world-state.json` → the frontend reads it. no build step, no framework.

## project structure

```
entropy/
├── index.html            # infection map (canvas, vanilla js)
├── world-state.json      # current chaos state
├── engine/
│   ├── run.js            # main crawler loop
│   ├── twitter.js        # twitter chaos scanner
│   ├── reddit.js         # reddit chaos scanner
│   ├── entropy.js        # infection scoring + spread model
│   ├── history.js        # historical tracking
│   └── config.js         # api keys, node definitions
├── docs/
│   └── ARCHITECTURE.md   # technical deep dive
├── pfp.png
└── banner.png
```

## stack

- **frontend:** vanilla html/css/js + canvas api. no react. no framework. raw.
- **engine:** node.js
- **data:** json
- **apis:** twitter v2, reddit public json

## contributing

see [CONTRIBUTING.md](CONTRIBUTING.md) — issues and PRs welcome.

## license

[MIT](LICENSE)

---

<p align="center"><sub>order decays. we track it.</sub></p>
