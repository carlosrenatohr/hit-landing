# 🚀 Cloudflare Pages Deployment Guide - Hit Cargo

## Estado Actual
- ✅ Build completado: `dist/` (2.84s)
- ✅ Headers de seguridad incluidos: `_headers`, `_redirects`
- ✅ Tag creado: `v2.2.0`
- ✅ Wrangler CLI instalado

## 🎯 Métodos de Deployment

### **MÉTODO 1: Deployment Manual via Wrangler CLI (Recomendado para primera vez)**

#### Paso 1: Autenticarse con Cloudflare

```bash
# Opción A: Login interactivo (MÁS FÁCIL)
wrangler login

# Esto abrirá tu navegador para autorizar wrangler
# Después de autorizar, volverás a la terminal
```

#### Paso 2: Verificar autenticación

```bash
# Ver tu cuenta de Cloudflare
wrangler whoami
```

#### Paso 3: Deploy

```bash
# Deploy a producción
wrangler pages deploy dist --project-name=hit-cargo

# O crear preview deployment
wrangler pages deploy dist --project-name=hit-cargo --branch=preview
```

---

### **MÉTODO 2: Deployment Automático desde GitHub (RECOMENDADO para largo plazo)**

Este método deployará automáticamente cada vez que hagas push a GitHub.

#### Paso 1: Push tu código a GitHub

```bash
# Push tu rama y tag
git push origin feat/web-sec-launch
git push origin v2.2.0

# O push a master directamente si ya mergeaste
git push origin master
git push --tags
```

#### Paso 2: Conectar Cloudflare Pages con GitHub

1. **Ir a Cloudflare Dashboard:**
   - https://dash.cloudflare.com/
   - Login con tu cuenta

2. **Crear Proyecto en Pages:**
   - Click en "Workers & Pages" en el sidebar
   - Click en "Create application"
   - Click en "Pages" → "Connect to Git"

3. **Conectar GitHub:**
   - Autorizar Cloudflare a acceder a tu GitHub
   - Seleccionar repositorio: `carlosrenatohr/hit-landing`
   - Click "Begin setup"

4. **Configuración del Build:**
   ```yaml
   Framework preset: Astro
   Build command: pnpm build
   Build output directory: dist
   Root directory: /
   Environment variables:
     NODE_VERSION: 20
   ```

5. **Configuración de Branches:**
   ```
   Production branch: master
   Preview branches: All branches
   ```

6. **Click "Save and Deploy"**

#### Resultado:
- ✅ Deploy automático cuando hagas push a `master`
- ✅ Preview automático para otras ramas (staging, feat/*)
- ✅ URL de producción: `https://hit-cargo.pages.dev`
- ✅ Puedes agregar custom domain: `hit-cargo.com`

---

### **MÉTODO 3: Drag & Drop Manual (Más Simple, pero no recomendado)**

1. **Ir a Cloudflare Pages:**
   - https://dash.cloudflare.com/
   - Workers & Pages → Create application → Pages

2. **Upload assets:**
   - Click "Upload assets"
   - Arrastra la carpeta `dist/` completa
   - Click "Deploy"

**Limitaciones:**
- ❌ Sin CI/CD automático
- ❌ Tienes que hacer upload manual cada vez
- ❌ No hay historial de deployments desde Git

---

## 🔐 Configuración de Custom Domain

Una vez deployado, para usar `hit-cargo.com`:

### Paso 1: En Cloudflare Pages Dashboard

1. Click en tu proyecto "hit-cargo"
2. Tab "Custom domains"
3. Click "Set up a custom domain"
4. Ingresa: `hit-cargo.com`

### Paso 2: Configurar DNS

Cloudflare detectará automáticamente si tu dominio está en Cloudflare DNS:

**Si el dominio YA está en Cloudflare:**
- ✅ Se configura automáticamente
- ✅ SSL/TLS automático
- ✅ Listo en ~1 minuto

**Si el dominio NO está en Cloudflare:**
Necesitas agregar un CNAME record en tu DNS provider actual:
```
CNAME hit-cargo.com → hit-cargo.pages.dev
```

### Paso 3: Forzar HTTPS (opcional pero recomendado)

1. En Cloudflare Dashboard → SSL/TLS
2. Mode: **Full (strict)**
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

---

## 📊 Verificación Post-Deployment

### 1. Verificar que el sitio está live:
```bash
# Verificar respuesta
curl -I https://hit-cargo.pages.dev

# O con tu dominio custom
curl -I https://hit-cargo.com
```

### 2. Verificar Headers de Seguridad:
```bash
# Ver todos los headers
curl -I https://hit-cargo.pages.dev | grep -E "X-Frame|Content-Security|Strict-Transport|X-Content"

# Debería mostrar:
# X-Frame-Options: DENY
# Content-Security-Policy: default-src 'self'...
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000...
```

### 3. Test con herramientas online:

#### Security Headers:
```
https://securityheaders.com/?q=hit-cargo.pages.dev
```
**Objetivo:** Puntuación A o A+

#### Mozilla Observatory:
```
https://observatory.mozilla.org/analyze/hit-cargo.pages.dev
```
**Objetivo:** 90+ puntos

#### SSL Labs:
```
https://www.ssllabs.com/ssltest/analyze.html?d=hit-cargo.pages.dev
```
**Objetivo:** A+

#### PageSpeed Insights:
```
https://pagespeed.web.dev/report?url=https://hit-cargo.pages.dev
```
**Objetivo:** 90+ en todas las métricas

---

## 🚦 Variables de Entorno (Para futuro uso)

Cuando agregues API o features que necesiten secrets:

### En Cloudflare Dashboard:
1. Pages project → Settings
2. Environment variables
3. Agregar variables:
   ```
   Production:
     PUBLIC_API_URL=https://api.hit-cargo.com
     PUBLIC_TRACKING_API=https://tracking.hit-cargo.com

   Preview:
     PUBLIC_API_URL=https://staging-api.hit-cargo.com
     PUBLIC_TRACKING_API=https://staging-tracking.hit-cargo.com
   ```

**IMPORTANTE:**
- ❌ Nunca pongas variables en el código
- ✅ Usa variables de entorno de Cloudflare
- ✅ Prefijo `PUBLIC_` para variables expuestas al cliente
- ✅ Sin prefijo para secrets del servidor

---

## 🔄 Workflow de Deployment Futuro

Una vez configurado el deployment automático desde GitHub:

### Para releases de producción:

```bash
# 1. Hacer cambios en tu rama
git checkout -b feature/nueva-caracteristica

# 2. Commit cambios
git add .
git commit -m "feat: Nueva característica"

# 3. Push a GitHub (crea preview automático)
git push origin feature/nueva-caracteristica

# 4. Ver preview en: https://abc123.hit-cargo.pages.dev

# 5. Merge a master (via PR o directo)
git checkout master
git merge feature/nueva-caracteristica

# 6. Tag nuevo release
git tag -a v2.3.0 -m "Release v2.3.0: Nueva característica"

# 7. Push a producción
git push origin master
git push --tags

# 8. Cloudflare deploya automáticamente a:
#    https://hit-cargo.pages.dev
#    https://hit-cargo.com (si configuraste custom domain)
```

### Para hotfixes urgentes:

```bash
# Deploy directo sin esperar GitHub
pnpm build
wrangler pages deploy dist --project-name=hit-cargo
```

---

## 🆘 Troubleshooting

### Error: "Not authenticated"
```bash
# Solución:
wrangler logout
wrangler login
```

### Error: "Project not found"
```bash
# Listar tus proyectos
wrangler pages project list

# Crear proyecto si no existe
wrangler pages project create hit-cargo
```

### Build falla en Cloudflare
```bash
# Verificar que build funciona localmente
pnpm build

# Verificar node version
node --version  # Debería ser v20.x

# Agregar NODE_VERSION=20 en environment variables de Cloudflare
```

### Headers no se aplican
```bash
# Verificar que _headers está en dist/
ls -la dist/_headers

# Verificar formato del archivo _headers
cat dist/_headers

# Si no está, verificar que existe en public/_headers
ls -la public/_headers
```

### Deploy muy lento
```bash
# Limpiar cache y rebuild
rm -rf dist/ .astro/
pnpm build
wrangler pages deploy dist --project-name=hit-cargo
```

---

## 📞 Recursos

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Wrangler CLI Docs:** https://developers.cloudflare.com/workers/wrangler/
- **Astro Cloudflare Adapter:** https://docs.astro.build/en/guides/deploy/cloudflare/
- **Support:** https://discord.gg/cloudflaredev

---

## ✅ Checklist Final

Antes de deployar a producción:

- [ ] Build local exitoso: `pnpm build`
- [ ] Tests pasando: `pnpm test`
- [ ] Sin vulnerabilidades: `pnpm audit`
- [ ] Headers en dist: `ls dist/_headers dist/_redirects`
- [ ] Tag creado: `git tag v2.2.0`
- [ ] Código pusheado: `git push origin master --tags`
- [ ] Wrangler autenticado: `wrangler whoami`
- [ ] Deploy exitoso: `wrangler pages deploy dist`
- [ ] Verificar headers: `curl -I https://...`
- [ ] Test de seguridad: securityheaders.com

---

**Última actualización:** 23 de Abril de 2025
**Versión:** v2.2.0
**Estado:** ✅ Ready for deployment