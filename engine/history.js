const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, '..', 'history.json');

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  } catch {
    return { snapshots: [] };
  }
}

function saveSnapshot(worldState) {
  const history = loadHistory();
  history.snapshots.push({
    timestamp: new Date().toISOString(),
    globalEntropy: worldState.globalEntropy,
    nodes: worldState.nodes.map(n => ({
      id: n.id,
      infection: n.infection,
    })),
  });

  // Keep last 30 days of snapshots (assuming 6 per day)
  if (history.snapshots.length > 180) {
    history.snapshots = history.snapshots.slice(-180);
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function getHistory() {
  return loadHistory();
}

module.exports = { saveSnapshot, getHistory };
