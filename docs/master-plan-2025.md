# Claude.md - Plan Maestro Hit Cargo Nicaragua 🚀

## Resumen Ejecutivo

Hit Cargo Nicaragua está ejecutando una transformación digital completa, migrando de una arquitectura tradicional React SPA hacia un ecosistema moderno basado en Astro 5 + Preact con integración completa del stack de Cloudflare. Este documento define el roadmap completo, las decisiones técnicas y el timing estimado para cada fase del proyecto.

### Estado Actual del Proyecto
- **Versión Actual**: v2.0.0 (Migración a Astro completada)
- **Stack Base**: Astro 5 + Preact + Tailwind CSS
- **Optimización**: Zero-JS por defecto, Island Architecture
- **Performance**: TTI reducido ~90% en conexiones 3G/LTE

### Visión a Futuro
Convertir Hit Cargo en la plataforma líder de logística internacional en Nicaragua, con:
- Sistema de tracking automatizado con IA
- Portal de clientes empresariales
- Sistema de puntos y fidelización
- Dashboard interno inteligente
- API pública para integraciones

---

## FASE 1: Fundación y Optimización Web ✅
**Estado: COMPLETADO**
**Duración Real: 2 semanas**

### 1.1 Migración a Astro (Completado)
- ✅ Migración de React SPA a Astro 5
- ✅ Implementación de Preact para componentes interactivos
- ✅ Optimización de bundle size (-150KB JS)
- ✅ SEO mejorado con renderizado estático
- ✅ Clean URLs sin hash-routing

### 1.2 Performance Optimization (Completado)
- ✅ Zero-JS para componentes estáticos
- ✅ Island Architecture implementada
- ✅ Tailwind CSS optimizado
- ✅ Dark mode con persistencia
- ✅ Testing con Vitest configurado

---

## FASE 2: Sistema de Tracking Inteligente con IA 🤖
**Estado: EN PLANIFICACIÓN**
**Duración Estimada: 6-8 semanas**
**Fecha Inicio: 15 de Marzo 2025**
**Fecha Finalización Target: 30 de Abril 2025**

### 2.1 Infraestructura Cloudflare (Semana 1-2)
**15-28 de Marzo**

#### Tareas Técnicas:
- [ ] Configurar Cloudflare Browser Rendering API
- [ ] Setup Cloudflare Workers para API Hono
- [ ] Configurar Cloudflare KV para cache de sesiones
- [ ] Setup Upstash Redis para cookie vault
- [ ] Configurar Cloudflare Cron Triggers

#### Entregables:
- Worker desplegado en producción
- Sistema de cache configurado
- Documentación de API inicial

### 2.2 Integración Supabase (Semana 2-3)
**22 de Marzo - 4 de Abril**

#### Base de Datos:
```sql
-- Tabla principal de envíos
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  warehouse_id VARCHAR(20),
  client_id UUID REFERENCES clients(id),
  weight DECIMAL(10,2),
  dimensions JSONB,
  status VARCHAR(50),
  origin_country VARCHAR(50),
  destination_address TEXT,
  tracking_history JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_scraped_at TIMESTAMP,
  metadata JSONB
);

-- Tabla de clientes empresariales
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  tier VARCHAR(20) DEFAULT 'basic',
  points_balance DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sistema de puntos
CREATE TABLE points_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  shipment_id UUID REFERENCES shipments(id),
  points_earned DECIMAL(10,2),
  points_type VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Entregables:
- Schema de base de datos implementado
- Supabase Auth configurado
- RLS policies configuradas
- Backup automatizado

### 2.3 Scraper Inteligente Everest (Semana 3-5)
**1-14 de Abril**

#### Componentes Core:
```typescript
// Arquitectura del Scraper
interface ScraperSystem {
  // 1. Session Manager
  sessionManager: {
    login(): Promise<SessionCookies>;
    refresh(): Promise<void>;
    rotate(): void;
    validateSession(): boolean;
  };

  // 2. Browser Controller
  browserController: {
    initCloudflareRenderer(): Promise<Browser>;
    navigateToTracking(trackingId: string): Promise<Page>;
    extractTableHTML(): Promise<string>;
  };

  // 3. AI Parser con GPT-4o-mini
  aiParser: {
    parseShipmentData(html: string): Promise<ShipmentData>;
    extractEvents(table: string): Promise<TrackingEvent[]>;
    validateData(data: any): boolean;
  };

  // 4. Data Pipeline
  dataPipeline: {
    fetchFromEverest(id: string): Promise<RawData>;
    transformData(raw: RawData): ShipmentData;
    saveToSupabase(data: ShipmentData): Promise<void>;
    updateCache(data: ShipmentData): void;
  };
}
```

#### Features Específicos:
- Login automático en everest.cargotrack.net
- Manejo de sesiones ASP clásico
- Rotación de cookies cada 15 minutos
- Parsing con IA de tablas HTML legacy
- Detección de cambios en estructura HTML

#### Entregables:
- Scraper funcional en Cloudflare Worker
- Sistema de sesiones implementado
- Parser IA integrado
- Tests de integración

### 2.4 API Hono v1 (Semana 5-6)
**14-21 de Abril**

#### Endpoints Principales:
```typescript
// API Routes
app.get('/api/v1/track/:id', trackingHandler);
app.get('/api/v1/shipments', shipmentsListHandler);
app.post('/api/v1/shipments/refresh', refreshHandler);
app.get('/api/v1/clients/:id/points', pointsHandler);
app.post('/api/v1/webhook/update', webhookHandler);
```

#### Features:
- Cache inteligente con Cloudflare KV
- Rate limiting por IP/Cliente
- Webhook para actualizaciones
- Respuestas en < 200ms
- Documentación OpenAPI

### 2.5 Integración Frontend (Semana 6-8)
**21-30 de Abril**

#### Componentes Nuevos:
- `TrackingPortal.tsx` mejorado con real-time updates
- `TrackingHistory.tsx` timeline visual
- `ShipmentDetails.tsx` información completa
- `NotificationBanner.tsx` para actualizaciones

#### Entregables:
- Portal de tracking funcional
- UI/UX optimizada
- Tests E2E con Playwright
- Deploy en producción

---

## FASE 3: Portal de Clientes Empresariales 🏢
**Estado: PLANIFICADO**
**Duración Estimada: 8-10 semanas**
**Fecha Inicio: 1 de Mayo 2025**
**Fecha Finalización Target: 10 de Julio 2025**

### 3.1 Sistema de Autenticación (Semana 1-2)
**1-14 de Mayo**

#### Implementación:
- [ ] Supabase Auth con OAuth providers
- [ ] Magic link authentication
- [ ] 2FA para cuentas empresariales
- [ ] Role-based access control (RBAC)
- [ ] Session management

#### Roles y Permisos:
```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',     // Hit Cargo staff
  ADMIN = 'admin',                  // Client company admin
  MANAGER = 'manager',              // Client manager
  EMPLOYEE = 'employee',            // Client employee
  VIEWER = 'viewer'                 // Read-only access
}
```

### 3.2 Dashboard Cliente (Semana 3-5)
**15 de Mayo - 1 de Junio**

#### Páginas y Features:
```
/portal
├── /dashboard          # Overview con métricas
├── /shipments         # Lista de todos los envíos
├── /shipments/:id     # Detalle de envío
├── /analytics         # Analytics y reportes
├── /invoices          # Facturas y pagos
├── /team              # Gestión de usuarios
├── /settings          # Configuración cuenta
└── /api-docs          # Documentación API
```

#### Componentes Dashboard:
- Métricas en tiempo real
- Gráficos de tendencias (Chart.js)
- Tabla de envíos con filtros
- Exportación a Excel/PDF
- Notificaciones push

### 3.3 Sistema de Puntos y Fidelización (Semana 5-7)
**1-20 de Junio**

#### Lógica de Puntos:
```typescript
// Cálculo de puntos por envío
interface PointsCalculator {
  basePoints: (weight: number) => number;
  tierMultiplier: (tier: ClientTier) => number;
  volumeBonus: (monthlyVolume: number) => number;
  specialPromos: (promoCode?: string) => number;

  calculate(shipment: Shipment, client: Client): {
    base: number;
    bonus: number;
    total: number;
    breakdown: PointsBreakdown[];
  };
}

// Sistema de recompensas
interface RewardsSystem {
  tiers: {
    BRONZE: { threshold: 0, benefits: [...] },
    SILVER: { threshold: 1000, benefits: [...] },
    GOLD: { threshold: 5000, benefits: [...] },
    PLATINUM: { threshold: 10000, benefits: [...] }
  };

  rewards: {
    DISCOUNT_10: { cost: 500, value: '10% off' },
    FREE_SHIPPING: { cost: 1000, value: 'Free shipping' },
    PRIORITY_HANDLING: { cost: 750, value: 'Priority' }
  };
}
```

### 3.4 API para Clientes (Semana 7-8)
**20 de Junio - 5 de Julio**

#### API Pública v2:
```typescript
// Endpoints para integraciones
app.post('/api/v2/auth/token', generateAPIToken);
app.get('/api/v2/shipments', getShipments);
app.get('/api/v2/shipments/:id', getShipmentDetail);
app.post('/api/v2/shipments/bulk-track', bulkTracking);
app.get('/api/v2/account/points', getPointsBalance);
app.post('/api/v2/account/redeem', redeemPoints);
app.get('/api/v2/reports/generate', generateReport);
```

### 3.5 Testing y Deployment (Semana 9-10)
**5-10 de Julio**

#### Testing Completo:
- Unit tests (Vitest)
- Integration tests (API)
- E2E tests (Playwright)
- Load testing (k6)
- Security audit

---

## FASE 4: Dashboard Interno y Herramientas Admin 🛠️
**Estado: PLANIFICADO**
**Duración Estimada: 6-8 semanas**
**Fecha Inicio: 15 de Julio 2025**
**Fecha Finalización Target: 10 de Septiembre 2025**

### 4.1 Dashboard Administrativo (Semana 1-3)
**15 de Julio - 5 de Agosto**

#### Módulos Admin:
```
/admin
├── /overview          # KPIs y métricas globales
├── /clients           # Gestión de clientes
├── /shipments         # Todos los envíos
├── /scraper           # Monitor del scraper
├── /analytics         # Business Intelligence
├── /finance           # Facturación y cobros
├── /support           # Tickets de soporte
├── /settings          # Configuración sistema
└── /logs              # Audit logs
```

### 4.2 Herramientas de Operación (Semana 4-5)
**5-20 de Agosto**

#### Features Operacionales:
- Bulk operations en envíos
- Generación automática de reportes
- Alertas y notificaciones configurables
- Import/Export de datos masivos
- Integración con sistemas contables

### 4.3 Monitor y Alertas (Semana 6-7)
**20 de Agosto - 5 de Septiembre**

#### Sistema de Monitoreo:
```typescript
interface MonitoringSystem {
  // Health checks
  healthChecks: {
    api: HealthCheck;
    scraper: HealthCheck;
    database: HealthCheck;
    cache: HealthCheck;
  };

  // Alertas
  alerts: {
    scraperFailure: Alert;
    highResponseTime: Alert;
    lowCacheHitRate: Alert;
    databaseConnection: Alert;
  };

  // Métricas
  metrics: {
    apiLatency: Metric;
    scraperSuccess: Metric;
    cacheHitRate: Metric;
    activeUsers: Metric;
  };
}
```

### 4.4 Deploy y Training (Semana 8)
**5-10 de Septiembre**

- Deployment gradual
- Training para staff
- Documentación interna
- Playbooks operacionales

---

## FASE 5: Optimización y Escalabilidad 📈
**Estado: FUTURO**
**Duración Estimada: 8-10 semanas**
**Fecha Inicio: 15 de Septiembre 2025**
**Fecha Finalización Target: 20 de Noviembre 2025**

### 5.1 Optimización de Performance (Semana 1-3)
**15 de Septiembre - 5 de Octubre**

#### Áreas de Optimización:
- Edge caching con Cloudflare
- Database query optimization
- Image optimization (WebP, AVIF)
- Code splitting avanzado
- Service Worker para offline

### 5.2 Multi-tenancy y White Label (Semana 4-6)
**5-25 de Octubre**

#### Features Multi-tenant:
```typescript
interface TenantSystem {
  tenant: {
    id: string;
    domain: string;
    branding: BrandingConfig;
    features: FeatureFlags;
    limits: ResourceLimits;
  };

  isolation: {
    database: 'schema' | 'row' | 'database';
    storage: 'shared' | 'isolated';
    compute: 'shared' | 'dedicated';
  };
}
```

### 5.3 Integraciones Externas (Semana 7-8)
**25 de Octubre - 10 de Noviembre**

#### Integraciones Planificadas:
- WhatsApp Business API
- Google Sheets sync
- Zapier integration
- Slack notifications
- Email marketing (SendGrid)

### 5.4 Machine Learning Features (Semana 9-10)
**10-20 de Noviembre**

#### ML Features:
- Predicción de tiempos de entrega
- Detección de anomalías en tracking
- Clasificación automática de paquetes
- Optimización de rutas
- Forecast de demanda

---

## FASE 6: Expansión Regional 🌎
**Estado: VISIÓN FUTURA**
**Duración Estimada: 12-16 semanas**
**Fecha Inicio: Q1 2026**

### 6.1 Internacionalización
- Multi-idioma (ES, EN, PT)
- Multi-moneda
- Regulaciones por país
- Partnerships regionales

### 6.2 Mobile Apps
- App nativa iOS/Android
- Push notifications
- Offline mode
- Biometric authentication

### 6.3 Blockchain Integration
- Tracking inmutable
- Smart contracts para pagos
- Tokenización de rewards
- Supply chain transparency

---

## Stack Tecnológico Completo

### Frontend
```yaml
Core:
  - Astro 5.0 (SSG/SSR)
  - Preact 10.23 (Interactive components)
  - TypeScript 5.5

Styling:
  - Tailwind CSS 3.4
  - Tailwind Animate

State Management:
  - Preact Signals (future)
  - Context API (current)

Testing:
  - Vitest (Unit)
  - Playwright (E2E)
```

### Backend
```yaml
API:
  - Hono (Cloudflare Workers)
  - GraphQL (future consideration)

Database:
  - Supabase (PostgreSQL)
  - Cloudflare KV (Cache)
  - Upstash Redis (Sessions)

AI/ML:
  - OpenAI GPT-4o-mini (Parsing)
  - Claude 3 (future: customer support)

Infrastructure:
  - Cloudflare Workers
  - Cloudflare Browser Rendering
  - Cloudflare R2 (Storage)
  - Cloudflare Analytics
```

### DevOps
```yaml
CI/CD:
  - GitHub Actions
  - Cloudflare Pages

Monitoring:
  - Sentry (Errors)
  - Cloudflare Analytics
  - Custom dashboards

Security:
  - Cloudflare WAF
  - Rate limiting
  - DDoS protection
  - SSL/TLS
```

---

## Métricas de Éxito (KPIs)

### Technical KPIs
- **Page Load Time**: < 2s (3G connection)
- **API Response Time**: < 200ms (p95)
- **Scraper Success Rate**: > 99.5%
- **Cache Hit Rate**: > 85%
- **Uptime**: > 99.9%

### Business KPIs
- **Active Users**: 1,000+ monthly (Year 1)
- **Enterprise Clients**: 50+ (Year 1)
- **API Calls**: 100K+ monthly
- **Customer Satisfaction**: > 4.5/5
- **Revenue Growth**: 40% YoY

### Performance Budget
```javascript
{
  "javascript": "< 100KB (gzipped)",
  "css": "< 50KB (gzipped)",
  "images": "< 500KB (total)",
  "fonts": "< 100KB (subset)",
  "firstContentfulPaint": "< 1.5s",
  "timeToInteractive": "< 3s",
  "cumulativeLayoutShift": "< 0.1"
}
```

---

## Riesgos y Mitigaciones

### Riesgos Técnicos
| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Cambios en Everest HTML | Alto | Media | Parser IA adaptativo + alertas |
| Rate limiting APIs | Medio | Baja | Rotación de sesiones + cache |
| Escalabilidad DB | Alto | Baja | Sharding + read replicas |
| Seguridad de datos | Alto | Baja | Encriptación + audit logs |

### Riesgos de Negocio
| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Competencia | Medio | Alta | Diferenciación por UX + features |
| Adopción lenta | Medio | Media | Incentivos + onboarding |
| Costos cloud | Medio | Baja | Optimización + monitoring |

---

## Presupuesto Estimado

### Costos Mensuales (USD)
```yaml
Infrastructure:
  Cloudflare Workers: $5-50
  Cloudflare KV: $5-20
  Browser Rendering: $50-200
  Supabase: $25-125
  Upstash Redis: $10-30
  Domain/SSL: $10

AI/ML:
  OpenAI API: $50-200

Development:
  GitHub: $0 (public repo)
  Monitoring: $20-50

Total Monthly: $175-685
```

### ROI Proyectado
- **Año 1**: Break-even
- **Año 2**: 150% ROI
- **Año 3**: 300% ROI

---

## Equipo Requerido

### Fase Actual (MVP)
- 1 Full-stack Developer (tú)
- 1 DevOps (part-time)
- 1 QA Tester (contractor)

### Fase Escalamiento
- 2 Backend Developers
- 1 Frontend Developer
- 1 DevOps Engineer
- 1 Product Manager
- 2 Customer Support

---

## Conclusión

Este plan maestro establece una visión clara y ejecutable para transformar Hit Cargo Nicaragua en la plataforma líder de logística internacional. La arquitectura moderna basada en Cloudflare permite escalabilidad infinita con costos controlados, mientras que la integración de IA garantiza una experiencia superior para los usuarios.

### Próximos Pasos Inmediatos (Marzo 2025)
1. ✅ Finalizar documentación técnica
2. ⏳ Configurar Cloudflare Browser Rendering
3. ⏳ Iniciar desarrollo del scraper
4. ⏳ Setup base de datos Supabase
5. ⏳ Prototipo funcional para el 15 de Marzo

### Factores Críticos de Éxito
- **Velocidad de ejecución**: MVP funcional en 6 semanas
- **Calidad del scraping**: 99.5% accuracy
- **UX excepcional**: Simplicidad y velocidad
- **Soporte al cliente**: Respuesta < 24h
- **Iteración continua**: Updates semanales

---

## Anexos

### A. Comandos Útiles
```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm test                   # Run tests

# Deployment
pnpm deploy:staging         # Deploy to staging
pnpm deploy:production      # Deploy to production

# Monitoring
pnpm logs:api              # View API logs
pnpm logs:scraper          # View scraper logs
pnpm metrics:dashboard     # Open metrics dashboard
```

### B. Enlaces Importantes
- [Documentación Astro](https://docs.astro.build)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [Hono Framework](https://hono.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Browser Rendering API](https://developers.cloudflare.com/browser-rendering)

### C. Contactos Clave
- **Desarrollo**: @renato
- **Infraestructura**: Cloudflare Support
- **Base de Datos**: Supabase Support
- **AI/ML**: OpenAI Support

---

*Documento generado el 21 de Abril de 2025*
*Última actualización: v1.0.0*
*Próxima revisión: 15 de Mayo de 2025*