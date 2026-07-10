# 🔧 Cloudflare Pages - Configuración Estática

## ❌ Problema Actual

El deployment está fallando porque Cloudflare está intentando usar el modo **SSR (Server)** con Workers y el adapter `@astrojs/cloudflare`, pero nuestro sitio es completamente **estático** y no necesita SSR.

**Error actual:**
```
a namespace with this account ID and title already exists [code: 10014]
```

Esto ocurre porque Wrangler está intentando crear recursos de Workers que no necesitamos.

---

## ✅ Solución: Usar Pages en Modo Estático

### **OPCIÓN 1: Configurar Pages SIN el "Build command personalizado"** (RECOMENDADO)

1. **Ir a Cloudflare Dashboard:**
   ```
   https://dash.cloudflare.com/
   ```

2. **Workers & Pages → hit-landing → Settings**

3. **Build settings:**
   - **Framework preset:** Astro
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Root directory:** (vacío)

4. **Environment variables:**
   ```
   NODE_VERSION = 20
   ```

5. **IMPORTANTE - Deployment method:**
   - **❌ DESACTIVAR:** "Deploy command" personalizado
   - **✅ USAR:** Build normal de Cloudflare Pages

6. **En "Build Configuration" → Build command override:**
   ```
   (dejar vacío o poner: pnpm build)
   ```

7. **Deploy command (dejar VACÍO):**
   ```
   (eliminar cualquier referencia a wrangler deploy)
   ```

8. **Guardar y hacer Retry del deployment**

---

### **OPCIÓN 2: Eliminar el Proyecto y Recrearlo Limpio**

Si la Opción 1 no funciona:

1. **Eliminar el proyecto actual:**
   - Dashboard → Workers & Pages → hit-landing
   - Settings → Delete project

2. **Crear nuevo proyecto:**
   - Click "Create application"
   - Tab "Pages"
   - "Connect to Git"
   - Seleccionar repositorio: `carlosrenatohr/hit-landing`

3. **Configuración:**
   ```yaml
   Project name: hit-cargo
   Production branch: master
   Build command: pnpm build
   Build output directory: dist
   Root directory: (dejar vacío)

   Environment variables:
   NODE_VERSION: 20
   ```

4. **NO agregar ningún "Deploy command" personalizado**

5. **Save and Deploy**

---

### **OPCIÓN 3: Usar .wrangler/config pero en modo Static**

Si quieres seguir usando wrangler pero sin SSR:

1. **Crear archivo de configuración:**

```bash
# Crear wrangler.toml en la raíz
cat > wrangler.toml <<'EOF'
name = "hit-cargo"
compatibility_date = "2024-04-23"

# Usar Pages modo estático
pages_build_output_dir = "dist"

# Sin adapter de Cloudflare, solo archivos estáticos
[build]
command = "pnpm build"

# Headers de seguridad (se aplicarán desde public/_headers)
EOF
```

2. **Commit y push:**
```bash
git add wrangler.toml
git commit -m "config: Add wrangler static configuration"
git push origin fix/redirects-cloudflare
```

---

## 🎯 Configuración Recomendada Final

### En Cloudflare Dashboard:

**Framework preset:** Astro
**Build command:** `pnpm build`
**Build output directory:** `dist`
**Production branch:** `master`

**Environment variables:**
```
NODE_VERSION = 20
```

**Deploy command:** (VACÍO - no usar wrangler deploy)

### Resultado Esperado:

```
✅ Build exitoso
✅ Deploy estático sin Workers
✅ Headers aplicados desde _headers file
✅ URL: https://hit-cargo.pages.dev
```

---

## 📝 Verificar Configuración Actual

### En tu Dashboard de Cloudflare:

1. Ve a: **Workers & Pages → hit-landing → Settings**

2. **Builds & deployments:**
   - Ver "Build command override"
   - Ver "Deploy command"

3. **Si ves:**
   ```
   Deploy command: npx wrangler deploy
   ```
   **❌ ESTO ES EL PROBLEMA**

4. **Cambiar a:**
   ```
   Deploy command: (VACÍO)
   ```

---

## 🔍 Por qué está fallando

El error muestra que Cloudflare está ejecutando:

```bash
Executing user deploy command: npx wrangler deploy
```

Esto hace que Wrangler intente:
1. Agregar el adapter `@astrojs/cloudflare`
2. Cambiar el modo de `static` a `server` (SSR)
3. Crear KV namespace para sesiones
4. Crear recursos de Workers innecesarios

**Lo que queremos:**
- Modo: **static**
- No adapter
- No Workers
- Solo archivos HTML/CSS/JS servidos desde CDN

---

## ✅ Pasos Inmediatos

### Para arreglar AHORA:

1. **Ve al Dashboard:**
   ```
   https://dash.cloudflare.com/ → Workers & Pages → hit-landing
   ```

2. **Settings → Builds & deployments**

3. **Edit configuration:**
   - Build command: `pnpm build`
   - Deploy command: **(ELIMINAR - dejar vacío)**

4. **Save**

5. **Deployments tab → Retry deployment** del último build

---

## 🎓 Explicación Técnica

### Modo Static (lo que queremos):
```javascript
// astro.config.mjs (actual - correcto)
export default defineConfig({
  site: 'https://hit-cargo.com',
  integrations: [preact(), tailwind(), sitemap()],
  // Sin adapter = modo static
});
```

**Build output:**
```
dist/
  ├── index.html
  ├── track/index.html
  ├── _astro/...
  ├── _headers
  └── _redirects
```

### Modo Server/SSR (lo que Wrangler está forzando):
```javascript
// Cuando Wrangler agrega adapter
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',  // ❌ No queremos esto
  adapter: cloudflare(),
  // ...
});
```

**Build output:**
```
dist/
  ├── client/  (archivos estáticos)
  └── server/  (Worker code)
```

---

## 📞 Si Nada Funciona

**Plan B: Deploy manual temporal:**

```bash
# En tu máquina local
pnpm build

# Login a Cloudflare (si no lo has hecho)
wrangler login

# Deploy como páginas estáticas (sin Workers)
wrangler pages deploy dist --project-name=hit-cargo --branch=production
```

Esto hará un deploy directo sin el auto-deployment de GitHub, pero funcionará.

---

**Última actualización:** 23 de Abril de 2025
**Problema:** KV namespace collision
**Solución:** Desactivar "Deploy command" en Cloudflare Dashboard