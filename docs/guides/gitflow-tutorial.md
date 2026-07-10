# 📚 GitFlow Tutorial - Flujo Profesional de Deployment

## 🎯 Tu Configuración Actual

- **Rama de Producción:** `master` (no main)
- **Rama de Staging/Pre-producción:** `staging`
- **Tu rama de trabajo actual:** `feat/web-sec-launch`
- **Repositorio:** `git@beon.github.com:carlosrenatohr/hit-landing.git`

## 📊 Flujo de Ramas Actual

```
master (producción - lo que ven los usuarios)
  ↑
staging (pre-producción - testing antes de producción)
  ↑
feat/web-sec-launch (tu rama - security fixes)
```

---

## 🚀 PASO A PASO COMPLETO - GitFlow Profesional

### **FASE 1: Preparar tu rama de feature** ✅

**Estado actual:** Ya completado
- ✅ Código desarrollado
- ✅ Tests pasando (2/2)
- ✅ Build exitoso
- ✅ 0 vulnerabilidades
- ✅ 1 commit hecho: `4cd4435 security: Add security headers...`
- ✅ Tag creado: `v2.2.0`

---

### **FASE 2: Push de tu rama al remoto** 📤

```bash
# Paso 1: Ver el estado actual
git status
# Debería mostrar: "On branch feat/web-sec-launch"
# "nothing to commit, working tree clean"

# Paso 2: Push de la rama al repositorio remoto
git push -u origin feat/web-sec-launch

# Explicación:
# -u = --set-upstream (configura tracking con el remoto)
# origin = repositorio remoto
# feat/web-sec-launch = nombre de la rama

# Resultado esperado:
# Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
# remote: Create a pull request for 'feat/web-sec-launch' on GitHub...
# To beon.github.com:carlosrenatohr/hit-landing.git
#  * [new branch]      feat/web-sec-launch -> feat/web-sec-launch
```

**¿Qué acabas de hacer?**
- Tu código ahora está en GitHub
- Otros pueden ver tu rama
- Estás listo para crear un Pull Request

---

### **FASE 3: Crear Pull Request a Staging** 🔄

**Opción A: Desde GitHub UI (Recomendado para aprender)**

1. **Ir a tu repositorio:**
   ```
   https://github.com/carlosrenatohr/hit-landing
   ```

2. **Verás un banner amarillo:**
   ```
   "feat/web-sec-launch had recent pushes X minutes ago"
   [Compare & pull request]
   ```
   Click en **"Compare & pull request"**

3. **Configurar el Pull Request:**
   - **Base:** `staging` ← (destino)
   - **Compare:** `feat/web-sec-launch` ← (origen)

   Verificar que dice:
   ```
   ✓ Able to merge. These branches can be automatically merged.
   ```

4. **Escribir título y descripción:**

   **Título:**
   ```
   Security: Add HTTP headers and resolve all vulnerabilities
   ```

   **Descripción (usa este template):**
   ```markdown
   ## 🛡️ Cambios de Seguridad

   ### Vulnerabilidades Resueltas
   - ✅ Astro XSS en define:vars (GHSA-j687-52p2-xcff) - **CRÍTICO**
   - ✅ Vite path traversal (GHSA-4w7w-66w2-5vf9) - Moderado
   - ✅ esbuild CORS bypass (GHSA-67mh-4wv8-2f99) - Moderado

   ### Actualizaciones
   - Astro: 5.18.1 → 6.1.9
   - Vite: 7.3.2 → 8.0.9
   - Vitest: 2.1.9 → 4.1.5
   - @astrojs/preact: 4.1.3 → 5.1.2

   ### Headers de Seguridad Agregados
   - Content-Security-Policy
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security (HSTS)
   - Referrer-Policy
   - Permissions-Policy

   ### Archivos de Configuración
   - `public/_headers` - Headers HTTP para Cloudflare/Netlify
   - `public/_redirects` - Redirecciones HTTPS
   - `vercel.json` - Config para Vercel
   - `netlify.toml` - Config para Netlify

   ## 📊 Métricas

   **Antes:**
   - Vulnerabilidades: 3
   - Puntuación Seguridad: 4.5/10

   **Después:**
   - Vulnerabilidades: 0 ✅
   - Puntuación Seguridad: 8.5/10 ✅

   ## ✅ Testing

   - [x] Build exitoso (2.84s)
   - [x] Tests pasando (2/2)
   - [x] `pnpm audit` limpio (0 vulnerabilidades)
   - [x] Headers verificados en build

   ## 🎯 Deployment

   Listo para deploy en:
   - Cloudflare Pages ✅
   - Vercel ✅
   - Netlify ✅

   ## 📝 Notas

   Tag creado: `v2.2.0`

   Ready for staging deployment and testing.
   ```

5. **Asignar reviewers (opcional):**
   - Si trabajas en equipo, asigna a alguien para review
   - Si eres solo tú, puedes saltarte esto

6. **Click en "Create pull request"**

**Opción B: Desde la Terminal con gh CLI**

Si tienes GitHub CLI instalado:

```bash
# Verificar si tienes gh CLI
gh --version

# Si lo tienes, crear PR directamente:
gh pr create \
  --base staging \
  --head feat/web-sec-launch \
  --title "Security: Add HTTP headers and resolve all vulnerabilities" \
  --body "$(cat <<'EOF'
## 🛡️ Cambios de Seguridad

### Vulnerabilidades Resueltas
- ✅ Astro XSS (GHSA-j687-52p2-xcff)
- ✅ Vite path traversal (GHSA-4w7w-66w2-5vf9)
- ✅ esbuild CORS bypass (GHSA-67mh-4wv8-2f99)

Ready for staging testing.
EOF
)"
```

**¿Qué acabas de hacer?**
- Creaste una solicitud formal para mergear tu código a staging
- El equipo puede revisar los cambios
- GitHub mostrará los archivos cambiados
- Se ejecutarán los checks automáticos (si los tienes configurados)

---

### **FASE 4: Review y Merge a Staging** 👀

**Paso 1: Review del código**

En el Pull Request, GitHub te muestra:

1. **Files changed:** Todos los archivos modificados
   - Revisa que todo se ve correcto
   - Verifica que no haya archivos que no deberían estar (secretos, etc.)

2. **Commits:** Lista de commits incluidos
   - Deberías ver: `4cd4435 security: Add security headers...`

3. **Checks:** Tests automáticos (si están configurados)
   - Si tienes GitHub Actions, se ejecutarán aquí

**Paso 2: Aprobar y Merge**

Si todo se ve bien:

1. **Aprobar el PR:**
   - Click en "Review changes"
   - Selecciona "Approve"
   - Click "Submit review"

2. **Merge a staging:**
   - Hay 3 opciones de merge:
     - **Merge commit** (recomendado para aprender)
     - Squash and merge (combina todos los commits en uno)
     - Rebase and merge (mantiene historial lineal)

   Para aprender, usa **"Merge commit"**:
   - Click en **"Merge pull request"**
   - Click en **"Confirm merge"**

3. **Resultado:**
   ```
   ✓ Pull request successfully merged and closed
   ```

**Desde terminal (alternativa):**

```bash
# Listar PRs abiertos
gh pr list

# Ver detalles del PR
gh pr view <NUMERO_PR>

# Merge el PR
gh pr merge <NUMERO_PR> --merge

# O de forma interactiva
gh pr merge <NUMERO_PR>
```

**¿Qué acabas de hacer?**
- Tu código ahora está en la rama `staging`
- Listo para testing en ambiente de pre-producción
- La rama `feat/web-sec-launch` sigue existiendo pero ya fue mergeada

---

### **FASE 5: Testing en Staging** 🧪

**Paso 1: Actualizar tu repositorio local**

```bash
# Cambiar a staging
git checkout staging

# Traer los últimos cambios (incluyendo tu merge)
git pull origin staging

# Verificar que tu commit está ahí
git log --oneline -3
# Deberías ver:
# xxxxx Merge pull request #X from carlosrenatohr/feat/web-sec-launch
# 4cd4435 security: Add security headers and resolve all vulnerabilities
# ...
```

**Paso 2: Deploy de Staging (si tienes configurado)**

Si Cloudflare Pages está configurado para auto-deploy staging:
- Automáticamente se deployará a una URL preview
- Ejemplo: `https://staging.hit-cargo.pages.dev`

Si no está configurado, puedes hacer deploy manual:
```bash
# Build
pnpm build

# Deploy a staging (si usas un proyecto separado)
wrangler pages deploy dist --project-name=hit-cargo-staging --branch=staging
```

**Paso 3: Testing manual**

Prueba en staging:
```bash
# Verificar headers de seguridad
curl -I https://staging-url.pages.dev | grep -E "X-Frame|Content-Security"

# Verificar que el sitio carga
curl -I https://staging-url.pages.dev

# Testing visual
# Abre el navegador y verifica:
# - Homepage carga correctamente
# - Tracking page funciona
# - Dark mode funciona
# - Links funcionan
# - No hay errores en consola (F12)
```

**¿Qué estás haciendo?**
- Validando que todo funciona en un ambiente similar a producción
- Detectando bugs antes de que lleguen a usuarios reales
- Última oportunidad de hacer fixes

**Si encuentras bugs:**
```bash
# Volver a tu rama
git checkout feat/web-sec-launch

# Hacer fixes
# ... editar archivos ...

# Commit
git add .
git commit -m "fix: Resolver bug encontrado en staging"

# Push
git push origin feat/web-sec-launch

# Esto actualiza el PR automáticamente
# Volver a hacer merge siguiendo FASE 4
```

---

### **FASE 6: Release a Producción (Master)** 🚀

**Paso 1: Crear Pull Request de Staging a Master**

Una vez que staging está testeado y todo funciona:

**Desde GitHub UI:**

1. Ir a: https://github.com/carlosrenatohr/hit-landing/compare
2. Configurar:
   - **Base:** `master`
   - **Compare:** `staging`
3. Click **"Create pull request"**

**Título:**
```
Release v2.2.0: Security hardening and dependency updates
```

**Descripción:**
```markdown
## 📦 Release v2.2.0

### ✨ Features
- HTTP security headers implementation
- Production-ready security configuration

### 🛡️ Security
- Resolve all known vulnerabilities (3 → 0)
- Update Astro to 6.1.9 (XSS fix)
- Update Vite to 8.0.9 (path traversal fix)
- Add CSP, HSTS, and other security headers

### 🧪 Testing
- ✅ Tested in staging environment
- ✅ All tests passing
- ✅ Build successful
- ✅ Security headers verified

### 📊 Impact
- Security Score: 4.5/10 → 8.5/10
- 0 known vulnerabilities
- Production deployment ready

---

**Tag:** v2.2.0
**Previous version:** v2.1.1
**Deployment:** Cloudflare Pages (auto-deploy configured)
```

**Desde terminal:**
```bash
gh pr create \
  --base master \
  --head staging \
  --title "Release v2.2.0: Security hardening" \
  --body "Ready for production deployment"
```

**Paso 2: Final Review y Merge a Master**

Este es el paso crítico - estás deployando a producción:

1. **Review final exhaustivo:**
   - Verificar todos los cambios
   - Confirmar que staging testing pasó
   - Verificar que no hay secretos en el código

2. **Merge a master:**
   - Click **"Merge pull request"**
   - Click **"Confirm merge"**

**Desde terminal:**
```bash
gh pr merge <NUMERO_PR> --merge
```

**¿Qué acabas de hacer?**
- Tu código ahora está en la rama `master`
- Este es el código que verán los usuarios
- Si tienes auto-deploy, se deployará automáticamente

---

### **FASE 7: Tagging del Release** 🏷️

**IMPORTANTE:** Ya creaste el tag en tu rama local, pero necesitas pushearlo:

```bash
# Actualizar master local
git checkout master
git pull origin master

# Verificar que tu commit está en master
git log --oneline -3

# Ver tags locales
git tag --list
# Deberías ver: v2.2.0

# Push del tag al remoto
git push origin v2.2.0

# O push de todos los tags
git push --tags
```

**¿Para qué sirve el tag?**
- Marca un punto específico en la historia como "release"
- Fácil rollback: `git checkout v2.2.0`
- GitHub puede crear "Releases" a partir de tags
- Versionado semántico: `v2.2.0` = versión 2.2.0

**Crear GitHub Release (opcional pero profesional):**

1. Ir a: https://github.com/carlosrenatohr/hit-landing/releases
2. Click **"Draft a new release"**
3. Click **"Choose a tag"** → Seleccionar `v2.2.0`
4. Release title: `v2.2.0 - Security Hardening`
5. Description:
   ```markdown
   ## 🛡️ Security Release

   This release focuses on security hardening and dependency updates.

   ### Security Fixes
   - Resolved 3 known vulnerabilities
   - Added HTTP security headers
   - Updated Astro, Vite, and Vitest to latest secure versions

   ### What's Changed
   - Add Content-Security-Policy headers
   - Add X-Frame-Options, HSTS, and other security headers
   - Update Astro to 6.1.9 (fixes XSS vulnerability)
   - Update Vite to 8.0.9 (fixes path traversal)
   - Configure deployment for Cloudflare Pages, Vercel, and Netlify

   ### Deployment
   Ready for production deployment on all major platforms.

   **Full Changelog**: v2.1.1...v2.2.0
   ```
6. Click **"Publish release"**

---

### **FASE 8: Configurar Auto-Deploy en Cloudflare Pages** ☁️

Ahora que tu código está en master, configura auto-deploy:

**Paso 1: Ir a Cloudflare Dashboard**

```
https://dash.cloudflare.com/
```

**Paso 2: Crear proyecto de Pages**

1. Click **"Workers & Pages"** (sidebar izquierdo)
2. Click **"Create application"**
3. Tab **"Pages"**
4. Click **"Connect to Git"**

**Paso 3: Autorizar GitHub**

1. Click **"Connect GitHub"**
2. Autorizar Cloudflare en tu cuenta de GitHub
3. Seleccionar el repositorio: `carlosrenatohr/hit-landing`
4. Click **"Begin setup"**

**Paso 4: Configuración del Build**

```yaml
Project name: hit-cargo
Production branch: master
Build command: pnpm build
Build output directory: dist
Root directory: (dejar vacío)
```

**Variables de Entorno:**
Click **"Add variable"**
```
Name: NODE_VERSION
Value: 20
```

**Paso 5: Branch Deployments (opcional)**

```
Enable automatic preview deployments: ✓
Preview branches: All branches
```

Esto significa:
- `master` → Deploy a producción automático
- `staging` → Deploy a preview automático
- `feat/*` → Deploy a preview automático

**Paso 6: Save and Deploy**

Click **"Save and Deploy"**

Cloudflare iniciará el primer build:
```
⏳ Building...
  Installing dependencies...
  Running pnpm build...
  Uploading...
✅ Success! Deployed to https://hit-cargo.pages.dev
```

**¿Qué acabas de hacer?**
- Cada push a `master` → deploy automático a producción
- Cada push a otras ramas → deploy preview para testing
- URL de producción: `https://hit-cargo.pages.dev`
- Sin necesidad de CLI, todo automático

---

### **FASE 9: Configurar Custom Domain** 🌐

**Paso 1: En Cloudflare Pages Dashboard**

1. Click en tu proyecto `hit-cargo`
2. Tab **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Ingresar: `hit-cargo.com`
5. Click **"Continue"**

**Paso 2: DNS Configuration**

Si `hit-cargo.com` ya está en Cloudflare DNS:
- ✅ Se configura automáticamente
- ✅ CNAME record creado automáticamente
- ✅ SSL/TLS automático

Si NO está en Cloudflare:
- Agregar CNAME record en tu DNS provider:
  ```
  CNAME @ hit-cargo.pages.dev
  CNAME www hit-cargo.pages.dev
  ```

**Paso 3: Verificar SSL**

1. Cloudflare Dashboard → SSL/TLS
2. Encryption mode: **Full (strict)**
3. Enable:
   - ✓ Always Use HTTPS
   - ✓ Automatic HTTPS Rewrites
   - ✓ TLS 1.3

**Resultado:**
```
✅ https://hit-cargo.com (producción)
✅ https://www.hit-cargo.com (redirect a no-www)
✅ http://hit-cargo.com (redirect a https)
```

---

### **FASE 10: Verificación Post-Deploy** ✅

**Paso 1: Verificar que el deploy fue exitoso**

```bash
# Ver deployments en Cloudflare
# Ve a: https://dash.cloudflare.com/ → hit-cargo project → Deployments

# O verificar con curl
curl -I https://hit-cargo.pages.dev

# Deberías ver:
# HTTP/2 200
# server: cloudflare
# ...
```

**Paso 2: Verificar Headers de Seguridad**

```bash
curl -I https://hit-cargo.pages.dev | grep -E "X-Frame|Content-Security|Strict-Transport|X-Content"

# Deberías ver:
# x-frame-options: DENY
# content-security-policy: default-src 'self'...
# x-content-type-options: nosniff
# strict-transport-security: max-age=31536000...
```

**Paso 3: Testing con herramientas online**

1. **Security Headers:**
   ```
   https://securityheaders.com/?q=hit-cargo.pages.dev
   ```
   **Objetivo:** A o A+

2. **Mozilla Observatory:**
   ```
   https://observatory.mozilla.org/analyze/hit-cargo.pages.dev
   ```
   **Objetivo:** 80+ puntos

3. **SSL Labs:**
   ```
   https://www.ssllabs.com/ssltest/analyze.html?d=hit-cargo.pages.dev
   ```
   **Objetivo:** A+

4. **PageSpeed Insights:**
   ```
   https://pagespeed.web.dev/report?url=https://hit-cargo.pages.dev
   ```
   **Objetivo:** 90+ en todas las métricas

**Paso 4: Testing funcional**

Abrir en navegador y verificar:
- ✅ Homepage carga correctamente
- ✅ Tracking page funciona
- ✅ Dark mode funciona
- ✅ Imágenes cargan
- ✅ Links funcionan
- ✅ No errores en consola (F12)
- ✅ Mobile responsive

---

### **FASE 11: Cleanup Local** 🧹

Una vez que todo está en producción y funcionando:

```bash
# Actualizar master local
git checkout master
git pull origin master

# Verificar que todo está actualizado
git log --oneline -3

# Eliminar rama local (ya no la necesitas)
git branch -d feat/web-sec-launch

# Opcional: Eliminar rama remota (si ya fue mergeada)
git push origin --delete feat/web-sec-launch

# Ver ramas que quedan
git branch -a
# Deberías ver:
# * master
#   staging
#   remotes/origin/master
#   remotes/origin/staging
```

**¿Por qué eliminar la rama?**
- Ya fue mergeada a master
- Mantiene el repo limpio
- Evita confusión de ramas viejas
- El código sigue en el historial de master

---

## 📋 RESUMEN DEL FLUJO COMPLETO

```bash
# FASE 1-2: Desarrollo y Push
git checkout -b feat/nueva-feature
# ... desarrollo ...
git add .
git commit -m "feat: Nueva característica"
git push -u origin feat/nueva-feature

# FASE 3-4: PR a Staging
# En GitHub: Create PR → feat/nueva-feature → staging
# Review → Merge

# FASE 5: Testing en Staging
git checkout staging
git pull origin staging
# ... testing manual ...
# Si hay bugs, volver a feat/nueva-feature y repetir

# FASE 6-7: Release a Producción
# En GitHub: Create PR → staging → master
# Review → Merge
git checkout master
git pull origin master
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0

# FASE 8-9: Auto-Deploy
# Cloudflare deploya automáticamente master a producción

# FASE 10: Verificación
curl -I https://hit-cargo.com
# ... tests ...

# FASE 11: Cleanup
git branch -d feat/nueva-feature
```

---

## 🎓 CONCEPTOS CLAVE APRENDIDOS

### 1. **Ramas (Branches)**
- `master` = Producción (lo que ven usuarios)
- `staging` = Pre-producción (testing)
- `feat/*` = Features en desarrollo

### 2. **Pull Request (PR)**
- Solicitud formal para mergear código
- Permite review antes de integrar
- Historial documentado de cambios

### 3. **Merge**
- Integrar cambios de una rama a otra
- **Merge commit:** Preserva historial completo
- **Squash:** Combina commits en uno solo
- **Rebase:** Historial lineal

### 4. **Tags**
- Marcar puntos importantes (releases)
- Versionado semántico: `vMAJOR.MINOR.PATCH`
- Fácil rollback a versiones anteriores

### 5. **CI/CD (Continuous Integration/Deployment)**
- Auto-deploy cuando hay push a master
- Preview automático para otras ramas
- Testing automático (opcional con GitHub Actions)

---

## 🚨 ERRORES COMUNES A EVITAR

### ❌ NO hacer:
```bash
# Commitear directamente a master sin PR
git checkout master
git add .
git commit -m "fix"
git push origin master
# ❌ Sin review, sin testing

# Olvidar pull antes de empezar
git checkout -b feat/nueva
# ... desarrollo ...
git push
# ❌ Puede causar conflictos

# No testear en staging
git checkout staging
git merge feat/nueva
git push origin master
# ❌ Saltarse testing
```

### ✅ SÍ hacer:
```bash
# Siempre pull antes de empezar
git checkout master
git pull origin master
git checkout -b feat/nueva

# Usar PRs para todo
git push -u origin feat/nueva
# Crear PR en GitHub

# Testear en staging primero
# staging → testing → master
```

---

## 📞 Troubleshooting

### "Merge conflict"
```bash
# Actualizar tu rama con master
git checkout feat/tu-rama
git fetch origin master
git merge origin/master
# Resolver conflictos en editor
git add .
git commit -m "fix: Resolve merge conflicts"
git push origin feat/tu-rama
```

### "Permission denied"
```bash
# Verificar SSH key
ssh -T git@beon.github.com

# O cambiar a HTTPS
git remote set-url origin https://github.com/carlosrenatohr/hit-landing.git
```

### "Diverged branches"
```bash
# Tu rama local y remota tienen diferentes commits
git pull --rebase origin feat/tu-rama
# O si quieres forzar (cuidado!)
git push -f origin feat/tu-rama
```

---

## 🎯 PRÓXIMOS PASOS PARA TI

### Ahora ejecuta:

```bash
# 1. Push tu rama
git push -u origin feat/web-sec-launch

# 2. Push el tag
git push origin v2.2.0
```

Luego ve a GitHub y sigue las FASES 3-8 de este tutorial.

---

**Fecha:** 23 de Abril de 2025
**Tu próxima acción:** `git push -u origin feat/web-sec-launch`
**Tiempo estimado del flujo completo:** 15-20 minutos
