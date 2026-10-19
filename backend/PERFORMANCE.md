# Caching Performance Report

## Implementation summary
- Library: `node-cache` (in-memory), configured in `config/cache.js`
- Cached endpoint: `GET /tasks` (all tasks), key `tasks:all`, TTL = 60 s (`CACHE_TTL` in `.env`)
- Invalidation: `POST`, `PUT`, `DELETE` on `/tasks` call `cache.del("tasks:all")` after the DB write succeeds
- Debug headers on every response:
  - `X-Cache: HIT | MISS`
  - `X-Response-Time: <ms>` (server-side processing time)

## How to measure (Postman / Thunder Client)
1. Seed data so the DB query is measurable: `npm run seed` (5000 tasks).
2. **Uncached reading:** send `POST /tasks` (body `{"title":"x"}`) to clear the cache,
   then `GET /tasks` -> header `X-Cache: MISS`. Note the response time shown in Postman.
3. **Cached reading:** send `GET /tasks` again immediately -> header `X-Cache: HIT`. Note the time.
4. Repeat 3+ times and fill the table below.
5. Alternatively run `npm run benchmark` (server running) - it automates steps 2-3 and writes `benchmark-results.md`.

## Readings (fill in from YOUR machine)

| Reading | Without cache (ms) - X-Cache: MISS | With cache (ms) - X-Cache: HIT |
|---|---|---|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| **Average** |  |  |

## Observations
- Cache MISS: request goes Express -> Mongoose -> MongoDB -> JSON serialization.
- Cache HIT: request is served straight from process memory, skipping the database.
- The gap grows with data size and with DB latency (e.g. remote Atlas vs local).
- A write immediately after a cached read causes the next GET to be a MISS, proving stale data is never served.
- Trade-off: cache is per-process; with multiple server instances use a shared cache such as Redis.
