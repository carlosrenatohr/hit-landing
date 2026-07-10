# 🔄 CI/CD Flow - Hit Cargo Nicaragua

## ✅ Estado Actual: DEPLOYMENT AUTOMÁTICO CONFIGURADO

Cloudflare Pages está conectado a tu repositorio GitHub y deployará automáticamente en cada push.

---

## 📊 Flujo Automático Actual

### **Producción (master)**

```bash
# 1. Haces cambios en tu rama
git checkout -b feat/nueva-caracteristica
# ... desarrollo ...
git commit -m "feat: Nueva característica"

# 2. Push de la rama
git push origin feat/nueva-caracteristica

# 3. Cloudflare crea PREVIEW automático
# URL: https://feat-nueva-caracteristica-abc.hit-cargo.pages.dev

# 4. Cuando esté listo, merge a master
git checkout master
git merge feat/nueva-caracteristica
git push origin master

# 5. Cloudflare deploya a PRODUCCIÓN automáticamente
# URL: https://hit-cargo.pages.dev
# (o tu dominio custom si lo configuraste)
```

### **Resultado:**
- ✅ Sin GitHub Actions necesarias
- ✅ Sin comandos manuales de deploy
- ✅ Build automático en cada push
- ✅ Preview para cada rama
- ✅ Producción actualizada en ~2 minutos

---

## 🏷️ Tags y Releases

### **Los tags NO se crean automáticamente**

Debes crearlos manualmente para marcar releases importantes:

```bash
# Después de merge a master
git checkout master
git pull origin master

# Crear tag anotado
git tag -a v2.3.0 -m "Release v2.3.0: Nueva característica

- Feature 1
- Feature 2
- Bug fixes"

# Push del tag
git push origin v2.3.0

# O push de todos los tags
git push --tags
```

### **¿Por qué usar tags?**

1. **Versionado:** Marca puntos importantes en la historia
2. **Rollback:** Fácil volver a una versión anterior
3. **GitHub Releases:** Puedes crear releases desde tags
4. **Documentación:** Changelog automático
5. **Deployments:** Cloudflare puede deployar desde tags específicos

---

## 🌐 URLs de Deployment

### **Producción:**
```
https://hit-cargo.pages.dev
```

### **Preview (ramas):**
```
staging:           https://staging.hit-cargo.pages.dev
feat/nueva:        https://feat-nueva.hit-cargo.pages.dev
fix/bug:           https://fix-bug.hit-cargo.pages.dev
```

### **Dominio Custom (cuando lo configures):**
```
https://hit-cargo.com        → Producción (master)
https://staging.hit-cargo.com → Staging branch
```

---

## 📋 Workflow Recomendado

### **Para Features Nuevas:**

```bash
# 1. Crear rama desde master
git checkout master
git pull origin master
git checkout -b feat/nueva-caracteristica

# 2. Desarrollo
# ... código ...
git add .
git commit -m "feat: Implementar nueva característica"

# 3. Push y ver preview
git push origin feat/nueva-caracteristica
# Preview: https://feat-nueva-caracteristica-xyz.hit-cargo.pages.dev

# 4. Testing en preview
# Abrir URL en navegador y probar

# 5. Si todo está bien, merge a staging primero
git checkout staging
git pull origin staging
git merge feat/nueva-caracteristica
git push origin staging
# Preview staging: https://staging.hit-cargo.pages.dev

# 6. Testing en staging
# Probar en staging antes de producción

# 7. Si staging está OK, merge a master
git checkout master
git pull origin master
git merge staging
git push origin master
# ✅ Deploy automático a producción

# 8. Crear tag para la release
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0

# 9. Limpiar rama local
git branch -d feat/nueva-caracteristica
```

---

## 🔥 Hotfixes (Arreglos Urgentes)

Para bugs en producción que necesitan fix inmediato:

```bash
# 1. Crear rama de hotfix desde master
git checkout master
git pull origin master
git checkout -b hotfix/bug-critico

# 2. Fix rápido
# ... arreglar bug ...
git add .
git commit -m "fix: Resolver bug crítico en producción"

# 3. Push y ver preview
git push origin hotfix/bug-critico

# 4. Si está correcto, merge directo a master
git checkout master
git merge hotfix/bug-critico
git push origin master
# ✅ Deploy automático en ~2 minutos

# 5. Tag de hotfix
git tag -a v2.2.1 -m "Hotfix v2.2.1: Bug crítico"
git push origin v2.2.1

# 6. Merge también a staging
git checkout staging
git merge hotfix/bug-critico
git push origin staging

# 7. Limpiar
git branch -d hotfix/bug-critico
```

---

## 📦 Versionado Semántico

Usa **Semantic Versioning** (semver.org):

```
vMAJOR.MINOR.PATCH

Ejemplos:
v2.0.0  → Cambio mayor (breaking changes)
v2.1.0  → Nueva feature (backward compatible)
v2.1.1  → Bug fix (backward compatible)
```

### **Tu historial de tags:**
```
v1.0-bolt    → Versión original con Bolt
v2.0-astro   → Migración a Astro
v2.1.0       → Features adicionales
v2.1.1       → Bug fixes
v2.2.0       → Security hardening (actual)
v2.3.0       → Próximo release (cuando hagas nuevas features)
```

---

## 🚀 Cloudflare Pages - Lo que hace automáticamente

### **En cada push:**

1. **Detecta el cambio** en GitHub
2. **Clona el repositorio**
3. **Instala dependencias:** `pnpm install`
4. **Ejecuta build:** `pnpm build`
5. **Optimiza assets:**
   - Comprime JS/CSS
   - Optimiza imágenes
   - Genera hashes de cache
6. **Aplica configuración:**
   - Headers de seguridad desde `_headers`
   - Redirects desde `_redirects`
7. **Deploya a CDN global:**
   - 200+ data centers worldwide
   - SSL automático
   - Invalidación de cache automática
8. **Genera URL:**
   - Producción: `hit-cargo.pages.dev`
   - Preview: `branch-name.hit-cargo.pages.dev`

### **Tiempo total:** ~2-3 minutos

---

## 📊 Monitoreo de Deployments

### **Ver deployments en Cloudflare:**

1. Dashboard → Workers & Pages → hit-cargo
2. Tab "Deployments"

Verás:
- ✅ Exitosos (verde)
- ⏳ En progreso (amarillo)
- ❌ Fallidos (rojo)

### **Para cada deployment:**
- Commit hash
- Rama
- Autor
- Timestamp
- Build logs
- Preview URL

---

## 🔄 Rollback (Volver a versión anterior)

### **Opción 1: Desde Cloudflare Dashboard**

1. Deployments → Seleccionar deployment anterior
2. Click "Rollback to this deployment"
3. Confirmar
4. ✅ Producción ahora apunta a la versión anterior

### **Opción 2: Desde Git (más permanente)**

```bash
# Ver historial de tags
git tag --list

# Checkout a tag anterior
git checkout v2.1.1

# Crear rama desde ese punto
git checkout -b rollback/v2.1.1

# Push a master (fuerza rollback)
git checkout master
git reset --hard v2.1.1
git push origin master --force

# ⚠️ CUIDADO con --force en producción
# Solo úsalo si sabes lo que haces
```

### **Opción 3: Revertir commit específico**

```bash
# Ver commits recientes
git log --oneline -5

# Revertir commit problemático
git revert abc1234

# Push
git push origin master
# ✅ Deploy automático con el revert
```

---

## ✅ Estado Actual de tu Proyecto

### **Configuración:**
- ✅ Repositorio: `carlosrenatohr/hit-landing`
- ✅ Cloudflare Pages: Conectado
- ✅ Auto-deploy: Activado
- ✅ Rama producción: `master`
- ✅ Preview branches: Todas las ramas

### **Últimos commits en master:**
```
46d244b Merge pull request #7 from carlosrenatohr/staging
464fa9e Merge pull request #6 from carlosrenatohr/fix/redirects-cloudflare
30791f7 fix: Update _redirects format for Cloudflare Workers compatibility
```

### **Tags creados:**
```
v2.2.0  ← Último (LOCAL, necesita push)
v2.1.1
v2.1.0
v2.0-astro
v1.0-bolt
```

---

## 🎯 Próximos Pasos Recomendados

### **1. Push del tag v2.2.0:**
```bash
git push origin v2.2.0
```

### **2. Crear GitHub Release:**
1. GitHub → Releases → "Draft a new release"
2. Tag: v2.2.0
3. Title: "v2.2.0 - Security Hardening"
4. Description: (copiar del tag message)
5. Publish

### **3. Verificar deployment:**
```bash
# Ver tu sitio live
curl -I https://hit-cargo.pages.dev

# Verificar headers de seguridad
curl -I https://hit-cargo.pages.dev | grep -E "X-Frame|Content-Security"
```

### **4. Configurar dominio custom (opcional):**
1. Cloudflare Pages → hit-cargo
2. Custom domains → "Set up a custom domain"
3. Agregar: `hit-cargo.com`

### **5. Configurar notificaciones:**
1. Cloudflare Pages → hit-cargo → Settings
2. Notifications → Add webhook
3. Conectar con Slack/Discord/Email

---

## 📚 Comandos Útiles

```bash
# Ver estado de deployments
git log --oneline --graph --all -10

# Ver tags
git tag --list

# Ver qué está en producción
git log origin/master -1

# Ver diferencias entre ramas
git diff staging..master

# Ver archivos cambiados desde último tag
git diff v2.2.0..HEAD --name-only

# Crear tag anotado con editor
git tag -a v2.3.0

# Ver info de un tag
git show v2.2.0

# Eliminar tag local
git tag -d v2.2.0

# Eliminar tag remoto
git push origin --delete v2.2.0
```

---

## 🆘 Troubleshooting

### **Build falla en Cloudflare:**
```bash
# 1. Verificar que build funciona localmente
pnpm build

# 2. Ver logs en Cloudflare
Dashboard → Deployments → Click en el fallido → View logs

# 3. Verificar environment variables
Dashboard → Settings → Environment variables
```

### **Headers no se aplican:**
```bash
# Verificar que _headers está en dist/
ls dist/_headers

# Verificar contenido
cat dist/_headers

# Rebuild y redeploy
git commit --allow-empty -m "Trigger rebuild"
git push origin master
```

### **Preview no funciona:**
```bash
# Verificar que la rama fue pusheada
git push origin nombre-rama

# Ver en Cloudflare
Dashboard → Deployments → Filter by branch
```

---

**Fecha:** 23 de Abril de 2025
**Estado:** ✅ CI/CD Completamente Configurado
**Próxima acción:** Push tag v2.2.0 al remoto