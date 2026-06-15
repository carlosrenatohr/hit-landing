#!/usr/bin/env bash
# feature.sh — bootstrap del playbook de feature.
# Crea el artefacto de trabajo y dice qué rol/comando corre en cada fase.
# No spawnea agentes ni muta git: solo crea .feature/<slug>.md y orienta.
# Playbook: docs/playbooks/feature-playbook.md
#
# Uso: scripts/feature.sh <slug> ["descripción corta"]
# Ej:  scripts/feature.sh gtm-eventos "eventos de conversión en GTM"
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SLUG="${1:-}"
DESC="${2:-}"

if [[ -z "$SLUG" ]]; then
  echo "Uso: scripts/feature.sh <slug> [\"descripción\"]" >&2
  echo "Ej:  scripts/feature.sh gtm-eventos \"eventos de conversión en GTM\"" >&2
  exit 1
fi

if [[ ! "$SLUG" =~ ^[a-z0-9-]+$ ]]; then
  echo "slug inválido: usar solo a-z, 0-9 y guiones (ej: gtm-eventos)" >&2
  exit 1
fi

FEAT_DIR="$ROOT/.feature"
ARTIFACT="$FEAT_DIR/$SLUG.md"
BRANCH="feat/$SLUG"

mkdir -p "$FEAT_DIR"

if [[ ! -f "$ARTIFACT" ]]; then
  cat > "$ARTIFACT" <<EOF
# Feature: $SLUG

> ${DESC:-(sin descripción)}
> Artefacto de trabajo: estado compartido entre fases/roles. Local, no se commitea.
> Playbook: docs/playbooks/feature-playbook.md

Fase actual: **explore**

## 1. Explore  (rol: explorador, solo lectura)
- [ ] Mapa de archivos y restricciones relevantes
- [ ] Decisiones previas a respetar (CLAUDE.md)
Salida:

## 2. Plan  (rol: planificador — aprobar antes de Build)
- [ ] Plan de cambios revisable
- [ ] Archivos a tocar
- [ ] Aprobado por persona
Salida:

## 3. Build  (rol: constructor)
- [ ] Cambios atómicos, mínimos
Salida:

## 4. Verify  (GATE del harness — no opcional, no marcar en rojo)
- [ ] pnpm check (typecheck + lint + test + build) verde
Salida:

## 5. Review  (rol: revisor adversarial)
- [ ] Diff revisado, hallazgos severidad-tagged
- [ ] Sin findings de severidad Alta abiertos
Salida:

## 6. Ship
- [ ] PR abierto
- [ ] CI verde
- [ ] Merge a master
- [ ] Smoke post-deploy OK
Salida:
EOF
  echo "✓ artefacto creado: .feature/$SLUG.md"
else
  echo "• artefacto ya existe: .feature/$SLUG.md (no se sobrescribe)"
fi

if git -C "$ROOT" rev-parse --git-dir >/dev/null 2>&1; then
  if git -C "$ROOT" show-ref --verify --quiet "refs/heads/$BRANCH"; then
    echo "• rama $BRANCH ya existe"
  else
    echo "• rama sugerida (crear a mano):  git checkout -b $BRANCH"
  fi
fi

cat <<EOF

Playbook "$SLUG" — orden de roles:

  1. explore   solo lectura · mapea el terreno
  2. plan      propone y se APRUEBA antes de codear
  3. build     cambios atómicos
  4. verify    pnpm check  ← GATE, no se avanza en rojo
  5. review    diff adversarial
  6. ship      PR → CI → merge → smoke

Cada fase lee y actualiza .feature/$SLUG.md. El estado vive en el archivo, no en la memoria del agente.

Siguiente: en Claude Code ejecutá  →  /feature $SLUG
EOF
