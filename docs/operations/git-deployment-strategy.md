# 🚀 Git Deployment Strategy - Hit Cargo Nicaragua

## 📊 Análisis de Repositorio Actual

### Información del Repositorio
- **Remote Origin:** `git@beon.github.com:carlosrenatohr/hit-landing.git`
- **Rama Actual:** `feat/web-sec-launch` (nueva, sin tracking remoto)
- **Rama Principal:** `master`
- **Rama de Staging:** `staging`

### Estructura de Ramas
```
master (producción)
  ├─ staging (pre-producción)
  ├─ feature/astro-migration (completada)
  ├─ version/1_0-bolt (versión legacy)
  └─ feat/web-sec-launch ⭐ (TU RAMA - security fixes)
```

### Último Commit en feat/web-sec-launch
```
4cd4435 security: Add security headers and resolve all vulnerabilities
```

---

## 🎯 ESTRATEGIA RECOMENDADA

### **OPCIÓN 1: Flujo GitFlow Completo (RECOMENDADO)** ✅

Este es el flujo profesional que ya estás usando (veo tus PRs anteriores):

```bash
# PASO 1: Push de tu rama de feature al remoto
git push -u origin feat/web-sec-launch

# PASO 2: Crear Pull Request a staging (para testing)
# Puedes hacerlo desde GitHub UI o con gh CLI:
gh pr create \
  --base staging \
  --head feat/web-sec-launch \
  --title "Security: Add HTTP headers and resolve vulnerabilities" \
  --body "## Changes
- Add HTTP security headers (CSP, X-Frame-Options, HSTS)
- Update Astro 6.1.9 (fixes XSS vulnerability GHSA-j687-52p2-xcff)
- Update Vite 8.0.9 (fixes path traversal GHSA-4w7w-66w2-5vf9)
- Update Vitest 4.1.5
- Resolve all 3 pnpm audit vulnerabilities

## Security Score
- Before: 4.5/10 (3 vulnerabilities)
- After: 8.5/10 (0 vulnerabilities)

## Testing
- [x] Build successful (107.48s)
- [x] All tests passing (2/2)
- [x] pnpm audit clean

## Deployment Config
- Cloudflare Pages ready
- Vercel ready
- Netlify ready"

# PASO 3: Merge a staging (después de revisión)
# Se hace desde GitHub UI o:
gh pr merge <PR_NUMBER> --merge

# PASO 4: Deploy staging para testing
# (Staging se deployará automáticamente si tienes CI/CD configurado)

# PASO 5: Crear PR de staging a master (producción)
git checkout staging
git pull origin staging
gh pr create \
  --base master \
  --head staging \
  --title "Release: Security hardening and dependency updates" \
  --body "Ready for production deployment"

# PASO 6: Merge a master (producción)
gh pr merge <PR_NUMBER> --merge

# PASO 7: Deploy a producción
# (Se deployará automáticamente si tienes CI/CD)
```

---

### **OPCIÓN 2: Merge Directo a Master (MÁS RÁPIDO)** ⚡

Si confías en tus cambios y no necesitas testing en staging:

```bash
# PASO 1: Push de tu rama
git push -u origin feat/web-sec-launch

# PASO 2: Crear PR directo a master
gh pr create \
  --base master \
  --head feat/web-sec-launch \
  --title "Security: Add HTTP headers and resolve all vulnerabilities" \
  --body "Critical security updates - ready for production"

# PASO 3: Merge el PR
gh pr merge <PR_NUMBER> --merge

# PASO 4: Cleanup local
git checkout master
git pull origin master
git branch -d feat/web-sec-launch
```

---

### **OPCIÓN 3: Merge Local sin PR (MÁS DIRECTO)** 🔥

Si eres el único desarrollador y no necesitas review:

```bash
# PASO 1: Cambiar a master
git checkout master

# PASO 2: Pull últimos cambios
git pull origin master

# PASO 3: Merge tu rama
git merge feat/web-sec-launch

# PASO 4: Push a master
git push origin master

# PASO 5: Cleanup
git branch -d feat/web-sec-launch
```

---

## 🚀 DEPLOYMENT AUTOMÁTICO

Una vez que hagas push a `master`, puedes configurar deployment automático:

### Cloudflare Pages (RECOMENDADO)

1. **Conectar Repositorio:**
   - Dashboard Cloudflare → Pages → "Create a project"
   - Conectar GitHub: `carlosrenatohr/hit-landing`
   - Production branch: `master`
   - Build command: `pnpm build`
   - Output directory: `dist`

2. **Variables de Entorno:**
   ```
   NODE_VERSION=22
   ```

3. **Preview Branches:**
   - `staging` → Preview automático
   - `feat/*` → Preview automático

### Vercel

1. **Importar Proyecto:**
   ```bash
   npx vercel --prod
   # O desde vercel.com → Import Git Repository
   ```

2. **Configuración:**
   - Production branch: `master`
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Framework preset: Astro

### Netlify

1. **Importar desde Git:**
   - app.netlify.com → "Import from Git"
   - Seleccionar repositorio

2. **Build Settings (ya configuradas en netlify.toml):**
   - Branch: `master`
   - Build command: `pnpm build`
   - Publish directory: `dist`

---

## 📋 CHECKLIST ANTES DE MERGE A MASTER

Verifica que todo está listo:

```bash
# 1. Build local exitoso
pnpm build
# ✅ Expected: "✓ Completed in ~107s"

# 2. Tests pasando
pnpm test
# ✅ Expected: "2 passed (2)"

# 3. Sin vulnerabilidades
pnpm audit
# ✅ Expected: "No known vulnerabilities found"

# 4. Working tree limpio
git status
# ✅ Expected: "nothing to commit, working tree clean"

# 5. Último commit correcto
git log -1 --oneline
# ✅ Expected: "4cd4435 security: Add security headers..."

# 6. Archivos de seguridad incluidos
ls public/_headers public/_redirects vercel.json netlify.toml
# ✅ Expected: Todos los archivos existen

# 7. Rama actualizada con master (opcional)
git fetch origin master
git log HEAD..origin/master
# ✅ Expected: Sin commits pendientes de merge
```

---

## 🎯 MI RECOMENDACIÓN ESPECÍFICA PARA TI

Basándome en que:
- ✅ Ya usas Pull Requests (veo PR #1, #2, #3)
- ✅ Tienes rama `staging` configurada
- ✅ Tus cambios son CRÍTICOS de seguridad
- ✅ Build y tests están OK

**Te recomiendo OPCIÓN 1 (GitFlow):**

```bash
# Comandos exactos a ejecutar:

# 1. Push tu rama al remoto
git push -u origin feat/web-sec-launch

# 2. Crear PR a staging (desde GitHub UI)
# Ir a: https://github.com/carlosrenatohr/hit-landing/compare/staging...feat/web-sec-launch
# O si tienes gh CLI instalado:
gh pr create --base staging --head feat/web-sec-launch

# 3. Después de review y merge, crear PR de staging a master
# 4. Deploy automático activado
```

**¿Por qué esta opción?**
- ✅ Testing en staging primero
- ✅ Review de código antes de producción
- ✅ Rollback fácil si algo falla
- ✅ Historial limpio y profesional
- ✅ Compatible con CI/CD automático

---

## 🔄 DESPUÉS DEL DEPLOYMENT

### Verificación Post-Deploy

```bash
# 1. Verificar headers de seguridad
curl -I https://hit-cargo.com | grep -E "X-Frame|Content-Security|Strict-Transport"

# 2. Test completo con herramientas online
# → https://securityheaders.com/?q=hit-cargo.com
# → https://observatory.mozilla.org/analyze/hit-cargo.com
```

### Cleanup Local

```bash
# Una vez mergeado a master
git checkout master
git pull origin master
git branch -d feat/web-sec-launch  # Eliminar rama local
git push origin --delete feat/web-sec-launch  # Eliminar rama remota (opcional)
```

---

## 📞 Troubleshooting

### Si el push falla por falta de permisos:
```bash
# Verificar SSH key
ssh -T git@beon.github.com

# O cambiar a HTTPS
git remote set-url origin https://github.com/carlosrenatohr/hit-landing.git
```

### Si hay conflictos con master:
```bash
# Actualizar tu rama con master primero
git fetch origin master
git rebase origin/master
# Resolver conflictos si hay
git push -f origin feat/web-sec-launch
```

### Si quieres ver los cambios antes de pushear:
```bash
# Ver diferencias con master
git diff origin/master..HEAD

# Ver archivos cambiados
git diff origin/master..HEAD --name-only
```

---

**Última actualización:** 23 de Abril de 2025
**Estado:** ✅ Ready for deployment