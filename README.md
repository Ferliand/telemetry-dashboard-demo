# Telemetry Dashboard Demo

A small React demo of a real-time irrigation/engine telemetry dashboard —
status cards, fuel levels, running hours, and an event log, all fed from
synthetic JSON.

**Pattern demo only.** The layout and metric set mirror the kind of
dashboard I build professionally (live engine status, fuel consumption,
running hours, site telemetry), but **all data here is synthetic** and there
is no connection to any live system.

## Stack

- React 18 + Vite
- Plain CSS (no framework) — dark ops-console theme

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## What it shows

- **Engine cards** — status (running / idle / maintenance), fuel gauge,
  running hours, RPM, fuel flow, temperature, GPS coordinates, last ping
- **Status summary** — counts per state
- **Event log** — heartbeats, state changes, fuel alerts with timestamps

## Data

Everything lives in [`src/data/telemetry.json`](src/data/telemetry.json) —
edit it and reload to see the dashboard react. In a production system this
file would be replaced by REST API polling or a WebSocket feed.
