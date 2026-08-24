#!/usr/bin/env bash
# run.sh — levanta el preview del sitio, corre probe.mjs o capture.mjs, y mata el preview.
# Uso: bash run.sh [probe|capture]   — log en /tmp/promo-run.log
set -u
MODE="${1:-capture}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LANDING="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG=/tmp/promo-run.log
: > "$LOG"

pkill -f 'astro preview' 2>/dev/null
pkill -f 'astro-server' 2>/dev/null
for p in 4321 4322 4323 4324 4325 4326 4327; do
  fuser -k "${p}/tcp" 2>/dev/null
  fuser -k "${p}/udp" 2>/dev/null
  true
done
sleep 2

cd "$LANDING"
echo "== preview start ==" >> "$LOG"
setsid nohup pnpm preview --port 4321 >> "$LOG" 2>&1 < /dev/null &

sleep 8
for i in 1 2 3 4 5; do
  curl -s -o /dev/null http://localhost:4321/ && break
  sleep 2
done
curl -s -o /dev/null -w "preview ready: %{http_code}\n" http://localhost:4321/ >> "$LOG"
if ! grep -q 'localhost:4321' "$LOG"; then
  echo "WARN: astro no boundeó a 4321 (ver log) — la captura podría fallar por CORS" >> "$LOG"
fi

if [ "$MODE" = "probe" ]; then
  echo "== probe ==" >> "$LOG"
  node "$SCRIPT_DIR/probe.mjs" >> "$LOG" 2>&1
  RC=$?
else
  # La latencia del worker de tracking es variable: si las escenas pasan 25.5s,
  # re-capturamos (hasta 3 intentos) hasta quedar dentro del target 20-25s.
  RC=1
  for attempt in 1 2 3; do
    echo "== capture (intento $attempt) ==" >> "$LOG"
    node "$SCRIPT_DIR/capture.mjs" >> "$LOG" 2>&1
    RC=$?
    if [ $RC -ne 0 ]; then break; fi
    SCENE_SEC=$(grep -oE 'scene duration: [0-9.]+s' "$LOG" | tail -1 | grep -oE '[0-9.]+')
    if [ -n "$SCENE_SEC" ] && awk "BEGIN{exit !($SCENE_SEC <= 25.5)}"; then
      echo "== escenas ${SCENE_SEC}s OK (<=25.5) ==" >> "$LOG"
      break
    fi
    echo "== escenas ${SCENE_SEC}s > 25.5 — re-capturando ==" >> "$LOG"
  done
fi
echo "== node exit: $RC ==" >> "$LOG"

pkill -f 'astro preview' 2>/dev/null
echo "run done (see $LOG)"
