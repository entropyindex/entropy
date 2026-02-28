<p align="center">
  <img src="banner.png" width="600" />
</p>

<h1 align="center">ENTROPY</h1>

<p align="center">
  <strong>the internet has a temperature. we measure it.</strong>
</p>

<p align="center">
  <a href="https://github.com/entropyindex/entropy/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-white?style=flat-square" /></a>
  <a href="https://x.com/entropyindex"><img src="https://img.shields.io/badge/X-@entropyindex-white?style=flat-square&logo=x&logoColor=white" /></a>
</p>

---

## what is this

entropy is a real-time visualization of internet chaos. it crawls platforms, measures drama, controversy, and disorder — then maps it as a spreading infection across communities.

the more chaotic a community gets, the more consumed it becomes.

**the internet is currently 63% consumed.**

## how it works

- **nodes** represent internet communities (crypto twitter, reddit, politics, gaming, etc.)
- **infection level** (0-100%) is calculated from real sentiment data, controversy metrics, and chaos indicators
- **connections** between nodes show how chaos spreads from one community to another
- the visualization updates in real-time as new data comes in

## run locally

```bash
# just open the site
open index.html

# or serve it
npx serve .

# run the chaos engine
cd engine
npm install
node run.js
```

## stack

- **frontend:** vanilla html/css/js, canvas api
- **engine:** node.js, twitter api, reddit api
- **data:** json (world-state.json)
- **frameworks:** none. raw code only.

## structure

```
├── index.html          # the infection map
├── world-state.json    # current chaos state
├── engine/
│   ├── run.js          # main crawler
│   ├── reddit.js       # reddit chaos scanner
│   ├── twitter.js      # twitter chaos scanner
│   └── entropy.js      # infection calculator
├── pfp.png             # logo
└── banner.png          # banner
```

## contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)

## license

[MIT](LICENSE)

---

<p align="center">order decays. we track it.</p>
