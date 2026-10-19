const NodeCache = require("node-cache");

// stdTTL: seconds an entry lives. checkperiod: how often expired keys are purged.
// useClones:false -> returns the stored reference (faster; we only serialize it).
const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL, 10) || 60,
  checkperiod: 120,
  useClones: false,
});

const KEYS = { ALL_TASKS: "tasks:all" };

module.exports = { cache, KEYS };
