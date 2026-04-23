# Claude.md - Hit Cargo Nicaragua

## Descripción del Proyecto

Hit Cargo Nicaragua es una plataforma web moderna para servicios de logística internacional, especializada en importaciones desde Estados Unidos, China, Panamá y otros países hacia Nicaragua. El proyecto utiliza una arquitectura de última generación optimizada para performance y experiencia de usuario.

## Stack Tecnológico

### Frontend
- **Framework**: [Astro 5.0](https://astro.build/) - Static Site Generation con Island Architecture
- **UI Library**: [Preact 10.23](https://preactjs.com/) - Para componentes interactivos (3KB vs 45KB de React)
- **Styling**: Tailwind CSS 3.4 + Tailwind Animate
- **Icons**: Lucide Preact
- **Build Tool**: Vite 7.3

### Testing
- **Unit/Integration**: Vitest 2.1
- **E2E**: Playwright (configurado para futuro uso)

### Package Management
- **pnpm** - Gestión eficiente de dependencias con deduplicación

## Arquitectura del Proyecto

```
hit-cargo-web-v-1.2/
├── src/
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes Astro y Preact
│   │   ├── home/        # Componentes de página principal
│   │   ├── layout/      # Header, Footer, Navigation
│   │   ├── preact/      # Componentes interactivos (Preact)
│   │   ├── seo/         # Componentes SEO y meta tags
│   │   └── ui/          # Componentes UI reutilizables
│   ├── config/          # Configuración global
│   │   ├── seo.ts       # Configuración SEO
│   │   └── site.ts      # Información del sitio
│   ├── content/         # Contenido estructurado
│   │   ├── copy.ts      # Textos de la página
│   │   ├── services.ts  # Servicios ofrecidos
│   │   └── meta.ts      # Metadata SEO
│   ├── layouts/         # Layouts base de Astro
│   ├── pages/           # Rutas de la aplicación
│   │   ├── index.astro  # Página principal
│   │   └── track.astro  # Portal de tracking
│   ├── styles/          # Estilos globales
│   └── utils/           # Utilidades y helpers
│       └── tracking.ts  # Lógica de tracking
├── public/              # Archivos públicos estáticos
├── docs/                # Documentación del proyecto
└── dist/                # Build de producción
```

## Principios de Desarrollo

### 1. Performance First
- **Zero-JS por defecto**: Componentes estáticos renderizan HTML puro
- **Island Architecture**: JavaScript solo donde es necesario
- **Optimización de bundle**: < 100KB JS total (gzipped)

### 2. SEO Optimizado
- Server-side rendering para contenido principal
- URLs limpias sin hash routing
- Schema markup con JSON-LD
- Meta tags dinámicos

### 3. Mobile First
- Diseño responsivo con Tailwind
- Optimizado para conexiones 3G/LTE
- Touch-friendly interfaces
- Performance budget estricto

### 4. Developer Experience
- TypeScript para type safety
- Hot Module Replacement (HMR)
- Aliases de importación (`@/`)
- Testing integrado

## Componentes Principales

### Páginas
- `index.astro` - Landing page con todas las secciones
- `track.astro` - Portal de tracking de envíos

### Componentes Estáticos (Astro)
- `HeroSection.astro` - Hero con CTA principal
- `ServicesSection.astro` - Grid de servicios
- `TestimonialsSection.astro` - Testimonios de clientes
- `Footer.astro` - Footer con información de contacto

### Componentes Interactivos (Preact)
- `TrackingPortal.tsx` - Sistema de tracking
- `TrackingForm.tsx` - Formulario de búsqueda
- `FAQSection.tsx` - FAQ accordion interactivo
- `Header.tsx` - Navigation con mobile menu

## Configuración

### Información del Sitio
```typescript
// src/config/site.ts
{
  name: "HIT Cargo",
  url: "https://hit-cargo.com",
  phone: "+505 8208-5181",
  email: "ventas@hit-cargo.com",
  address: "Carr Masaya Km 14.5, Residencial El Cortez B7"
}
```

### Variables de Entorno
```env
# .env (no existe actualmente, necesario crear)
PUBLIC_API_URL=https://api.hit-cargo.com
PUBLIC_TRACKING_API=https://tracking.hit-cargo.com
PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo en http://localhost:4321
pnpm build        # Build de producción
pnpm preview      # Preview del build

# Testing
pnpm test         # Ejecutar tests con Vitest

# Utilidades
pnpm format       # Formatear código con Prettier
```

## Convenciones de Código

### Naming
- **Archivos**: PascalCase para componentes, kebab-case para utils
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case (Tailwind utilities)

### Estructura de Componentes
```typescript
// Componente Preact
interface Props {
  title: string;
  description?: string;
}

export function Component({ title, description }: Props) {
  // Lógica del componente
  return <div>...</div>;
}
```

```astro
---
// Componente Astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section>
  <!-- Markup -->
</section>
```

### Importaciones
```typescript
// Usar alias @ para src/
import { Button } from '@/components/ui/Button.astro';
import { siteConfig } from '@/config/site';
```

## Estado Actual

### ✅ Completado
- Migración de React SPA a Astro
- Implementación de Preact para interactividad
- Sistema de tracking básico
- Optimización de performance
- SEO básico implementado
- Dark mode con persistencia
- Responsive design

### 🚧 En Progreso
- Sistema de tracking avanzado con API
- Portal de clientes
- Integración con backend

### 📋 Pendiente
- Autenticación de usuarios
- Dashboard administrativo
- API pública
- Sistema de notificaciones
- PWA capabilities
- Internacionalización (i18n)

## Performance Metrics

### Objetivos
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

### Bundle Size
- **JavaScript**: < 100KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Imágenes**: Optimizadas con Sharp

## Deployment

### Plataformas Soportadas
- Cloudflare Pages (recomendado)
- Vercel
- Netlify
- Self-hosted con Node.js

### Build Settings
```yaml
Build Command: pnpm build
Output Directory: dist
Node Version: 20.x
```

## Recursos

### Documentación
- [Astro Docs](https://docs.astro.build)
- [Preact Docs](https://preactjs.com/guide/v10/getting-started)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Archivos de Referencia
- [Plan Maestro 2025](docs/master-plan-2025.md)
- [Plan Scraper Everest](docs/everest-scraper-plan.md)
- [Plan de Migración](MIGRATION_PLAN.md)

## Contacto

**Desarrollo**: Renato
**Repositorio**: hit-cargo-web-v-1.2
**Versión**: 2.0.0

---

*Última actualización: 21 de Abril de 2025*