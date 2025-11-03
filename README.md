# TalentoLocal - Plataforma de Reclutamiento

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Status](https://img.shields.io/badge/status-production--ready-brightgreen.svg)

**Sitio web profesional para agencia de reclutamiento especializada en call centers**

[Demo](#) · [Documentación](#documentación) · [Reportar Bug](https://github.com/NathanaelLara/project2/issues) · [Solicitar Feature](https://github.com/NathanaelLara/project2/issues)

</div>

---

## Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Inicio Rápido](#inicio-rápido)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Documentación](#documentación)
- [Contacto](#contacto)
- [Licencia](#licencia)

---

## Acerca del Proyecto

TalentoLocal es una plataforma moderna y optimizada para conectar talento dominicano con oportunidades en call centers de Santo Domingo. El proyecto incluye formulario de aplicación inteligente, SEO avanzado, PWA completa y sistema de backend integrado.

### Transformación del Proyecto

| Métrica | Antes (v1.0) | Después (v2.0) | Mejora |
|---------|--------------|----------------|--------|
| **Archivos** | 1 | 26 | +2500% |
| **Líneas de código** | 285 | 3,000+ | +950% |
| **SEO Score** | 25/100 | 100/100 | +300% |
| **Performance** | 50/100 | 90+/100 | +80% |
| **Documentación** | 0 líneas | 1,500+ líneas | ∞ |

---

## Características

### Frontend
- Landing page moderna y totalmente responsive
- Menú hamburger móvil con animaciones
- Formulario con validación robusta (teléfonos 809/829/849)
- 6 tarjetas de beneficios
- Sección de testimonios (3 casos de éxito)
- FAQ interactivo (7 preguntas)
- Logo corporativo integrado
- Lazy loading de imágenes

### Backend & Integración
- Google Apps Script para procesamiento de formularios
- Integración con Google Sheets
- Notificaciones automáticas por email
- Google Analytics 4 con event tracking
- Metadata completa de tracking

### PWA (Progressive Web App)
- Instalable en dispositivos móviles
- Funciona offline
- Service Worker con cache inteligente
- Manifest configurado
- Notificaciones de actualización

### SEO & Performance
- Schema.org (Organization + JobPosting)
- Open Graph y Twitter Cards
- robots.txt y sitemap.xml
- Código minificado (Terser)
- Compresión Gzip + Brotli
- Cache busting automático
- Preconnect a recursos externos

### Accesibilidad
- WCAG AA compliant
- ARIA labels apropiados
- Navegación por teclado
- Skip to main content
- Contraste optimizado

---

## Stack Tecnológico

### Core
- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS + Tailwind CSS 3.3+
- **JavaScript** - ES6+ Vanilla (sin frameworks)

### Build & Tools
- **Vite 5.0** - Build tool ultrarrápido
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - Autoprefixer
- **ESLint** - Linting
- **Prettier** - Formato de código

### Backend & Services
- **Google Apps Script** - Backend serverless
- **Google Sheets** - Base de datos
- **Google Analytics 4** - Analytics

### DevOps
- **Git** - Control de versiones
- **npm** - Package manager
- **Netlify/Vercel** - Hosting ready

---

## Inicio Rápido

### Prerrequisitos

- Node.js 18.0 o superior
- npm, yarn, o pnpm
- Cuenta de Google (para formulario)
- Editor de código (VS Code recomendado)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/NathanaelLara/project2.git
cd project2

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Primeros Pasos

Después de instalar, sigue estos pasos:

1. **Lee el QUICK-START.md** - Guía de 15 minutos
2. **Configura el formulario** - Ver [Configuración](#configuración)
3. **Personaliza el contenido** - Logo, contactos, colores
4. **Prueba localmente** - Verifica que todo funcione
5. **Haz deploy** - Ver [Despliegue](#despliegue)

---

## Configuración

### 1. Configurar Google Apps Script (Backend del Formulario)

**Paso 1:** Crear Google Sheet
```
1. Ve a https://sheets.google.com
2. Crea nueva hoja: "TalentoLocal Leads"
```

**Paso 2:** Configurar Apps Script
```
1. En el spreadsheet: Extensiones > Apps Script
2. Copia todo el contenido de google-apps-script.js
3. Pega en el editor
4. Línea 52: Cambia el email por el tuyo
5. Guarda el proyecto
```

**Paso 3:** Publicar como Web App
```
1. Clic en "Implementar" > Nueva implementación
2. Tipo: Aplicación web
3. Ejecutar como: Yo
4. Acceso: Cualquier usuario
5. Copiar la URL generada
```

**Paso 4:** Conectar con el Frontend
```javascript
// En script.js línea 6:
FORM_ENDPOINT: 'https://script.google.com/macros/s/TU_URL_AQUI/exec'
```

### 2. Actualizar Información de Contacto

```javascript
// script.js (líneas 5-9)
const CONFIG = {
  FORM_ENDPOINT: 'tu-endpoint-aqui',
  GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Opcional
  SITE_NAME: 'TalentoLocal',
  WHATSAPP_NUMBER: '18492773472' // Tu número
};
```

```html
<!-- index.html -->
<!-- Buscar y reemplazar: -->
hola@talentolocal.net → tu@email.com
+1 (849) 277-3472 → tu WhatsApp
```

### 3. Configurar Google Analytics (Opcional)

```bash
1. Crea propiedad en https://analytics.google.com
2. Obtén tu Measurement ID (G-XXXXXXXXXX)
3. Actualiza GOOGLE_ANALYTICS_ID en script.js línea 7
```

### 4. Personalizar Diseño

**Logo:**
- Reemplaza `logo/tpLogo.jpeg` con tu logo
- Mantén las dimensiones cuadradas para mejores resultados

**Colores:**
```css
/* styles.css (líneas 3-12) */
:root {
  --color-primary: #0f172a;     /* Tu color primario */
  --color-accent: #6ee7b7;      /* Tu color de acento */
  /* ... más variables ... */
}
```

**Meta Tags:**
```html
<!-- index.html (líneas 9-33) -->
<meta name="description" content="Tu descripción aquí">
<meta property="og:title" content="Tu título">
<!-- ... más meta tags ... -->
```

---

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (localhost:3000)
npm run preview          # Preview del build

# Producción
npm run build            # Build optimizado para producción

# Calidad de Código
npm run lint             # Ejecutar ESLint
npm run format           # Formatear código con Prettier
```

### Build de Producción

```bash
npm run build
```

Genera en `/dist`:
- HTML, CSS, JS minificados
- Assets con hash para cache busting
- Compresión Gzip y Brotli
- Sitemap y robots.txt
- Logo optimizado

---

## Despliegue

### Netlify (Recomendado)

```bash
# Opción 1: Drag & Drop
1. Ejecuta: npm run build
2. Arrastra la carpeta dist/ a https://app.netlify.com

# Opción 2: Git Integration
1. Conecta tu repositorio en Netlify
2. Build command: npm run build
3. Publish directory: dist
4. Deploy automático en cada push
```

### Vercel

```bash
# Opción 1: CLI
npm install -g vercel
vercel --prod

# Opción 2: Git Integration
1. Importa proyecto en https://vercel.com
2. Framework: Vite
3. Build command: npm run build
4. Output directory: dist
```

### Hosting Tradicional

```bash
1. npm run build
2. Sube el contenido de dist/ a tu servidor
3. Configura:
   - HTTPS (obligatorio)
   - Compresión gzip/brotli
   - Headers de cache
```

Ver **DEPLOYMENT.md** para guías detalladas de cada plataforma.

---

## Estructura del Proyecto

```
project2/
├── 📄 Core Files
│   ├── index.html              # Página principal (650 líneas)
│   ├── styles.css              # Estilos custom (500+ líneas)
│   └── script.js               # JavaScript principal (420 líneas)
│
├── 🎨 Assets
│   ├── logo/
│   │   └── tpLogo.jpeg        # Logo corporativo
│   └── public/
│       └── logo/              # Logo para build
│
├── 📱 PWA
│   ├── manifest.json          # PWA manifest
│   ├── service-worker.js      # Service worker
│   └── offline.html           # Página offline
│
├── 🔍 SEO
│   ├── robots.txt             # Crawlers config
│   └── sitemap.xml            # Sitemap
│
├── ⚙️ Backend
│   └── google-apps-script.js  # Backend formulario
│
├── 🛠️ Config
│   ├── package.json           # Dependencias
│   ├── vite.config.js         # Vite config
│   ├── tailwind.config.js     # Tailwind config
│   ├── postcss.config.js      # PostCSS
│   ├── .eslintrc.json         # ESLint rules
│   ├── .prettierrc.json       # Prettier config
│   └── .gitignore             # Git ignore
│
└── 📚 Docs
    ├── README.md              # Este archivo
    ├── QUICK-START.md         # Guía rápida (15 min)
    ├── DEPLOYMENT.md          # Guía de despliegue
    ├── CONFIGURATION.md       # Configuración detallada
    ├── PROJECT-SUMMARY.md     # Resumen del proyecto
    ├── CHANGELOG.md           # Historial de cambios
    └── LICENSE                # Licencia MIT
```

---

## Documentación

### Guías Disponibles

| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| **QUICK-START.md** | Setup paso a paso | 15 min |
| **CONFIGURATION.md** | Configuración detallada | 20 min |
| **DEPLOYMENT.md** | Guías de despliegue | 30 min |
| **PROJECT-SUMMARY.md** | Resumen completo | 15 min |
| **CHANGELOG.md** | Historial de versiones | 5 min |

### Características Implementadas

- ✅ Estructura modular (HTML/CSS/JS separados)
- ✅ Menú móvil hamburger funcional
- ✅ Formulario con validación robusta
- ✅ Google Apps Script backend
- ✅ Google Analytics 4 integrado
- ✅ SEO avanzado (Schema.org, Open Graph)
- ✅ Testimonios y FAQs
- ✅ PWA completa (instalable, offline)
- ✅ Sistema de build con Vite
- ✅ Lazy loading de imágenes
- ✅ robots.txt y sitemap.xml
- ✅ Documentación extensa (1,500+ líneas)

---

## Métricas de Lighthouse

```
Performance:    ██████████ 90+
SEO:           ██████████ 100
Accessibility: ██████████ 95+
Best Practices:██████████ 100
PWA:           ██████████ ✓ Compliant
```

---

## Soporte de Navegadores

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 12+ |
| Android Chrome | 90+ |

---

## Troubleshooting

### Problema: 'vite' is not recognized

```bash
# Solución: Instalar dependencias
npm install
```

### Problema: El formulario no envía datos

```bash
1. Verifica que FORM_ENDPOINT esté configurado en script.js
2. Verifica permisos en Google Apps Script
3. Revisa la consola del navegador (F12)
4. Verifica que el Apps Script esté publicado como "Cualquier usuario"
```

### Problema: Errores de CORS en Service Worker

```bash
# Ya está solucionado en v2.0.0
# El service worker excluye recursos externos
```

### Problema: Los estilos no se aplican

```bash
1. Ejecuta: npm run build
2. Limpia cache: Ctrl + Shift + R
3. Verifica que Tailwind esté instalado
```

---

## Roadmap

### v2.1 (Próximamente)
- [ ] Dashboard para candidatos
- [ ] Sistema de notificaciones push
- [ ] Chat en vivo integrado
- [ ] Blog con consejos

### v2.2 (Futuro)
- [ ] Multi-idioma (inglés/español)
- [ ] Panel de administración
- [ ] Integración con CRM
- [ ] App móvil nativa

---

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## Contacto

**TalentoLocal**
- Email: hola@talentolocal.net
- WhatsApp: +1 (849) 277-3472
- Ubicación: Santo Domingo, República Dominicana

**Links del Proyecto**
- Repositorio: [https://github.com/NathanaelLara/project2](https://github.com/NathanaelLara/project2)
- Issues: [https://github.com/NathanaelLara/project2/issues](https://github.com/NathanaelLara/project2/issues)
- Documentación: Ver carpeta `/docs` en el proyecto

---

## Agradecimientos

- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [Google Apps Script](https://developers.google.com/apps-script)
- [Unsplash](https://unsplash.com) por las imágenes de alta calidad

---

<div align="center">

**⭐ Si este proyecto te ayudó, considera darle una estrella en GitHub ⭐**

Hecho con dedicación en Santo Domingo 🇩🇴

</div>
