# TalentoLocal - Plataforma de Reclutamiento

Sitio web profesional para agencia de reclutamiento especializada en call centers en Santo Domingo, República Dominicana.

## Características

### Funcionalidades Principales
- Landing page moderna y responsive con diseño profesional
- Formulario de aplicación con validación robusta
- Integración con Google Sheets vía Apps Script
- SEO optimizado con Schema.org y meta tags completos
- Google Analytics 4 listo para implementar
- Sistema de FAQ interactivo
- Sección de testimonios
- Menú móvil hamburger completamente funcional
- PWA (Progressive Web App) ready con manifest.json

### Tecnologías Utilizadas
- HTML5 semántico con accesibilidad
- CSS3 moderno con animaciones suaves
- Tailwind CSS para estilos utility-first
- JavaScript vanilla (ES6+) sin dependencias
- Vite como build tool para producción
- Google Apps Script para backend del formulario

### SEO y Performance
- Structured Data (JSON-LD) para Organization y JobPosting
- Meta tags Open Graph y Twitter Card optimizados
- robots.txt y sitemap.xml incluidos
- Lazy loading para imágenes
- Preconnect a recursos externos
- Código minificado y comprimido (Gzip + Brotli)

## Estructura del Proyecto

```
project2/
├── index.html              # Página principal
├── styles.css              # Estilos personalizados
├── script.js               # JavaScript principal
├── manifest.json           # PWA manifest
├── robots.txt             # Instrucciones para crawlers
├── sitemap.xml            # Mapa del sitio
├── google-apps-script.js  # Backend para formulario
├── package.json           # Dependencias del proyecto
├── vite.config.js         # Configuración de Vite
├── tailwind.config.js     # Configuración de Tailwind
├── postcss.config.js      # Configuración de PostCSS
├── .eslintrc.json         # Reglas de ESLint
├── .prettierrc.json       # Reglas de Prettier
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Este archivo
```

## Instalación y Configuración

### 1. Requisitos Previos
- Node.js 18+ y npm/yarn/pnpm
- Cuenta de Google (para Google Sheets + Apps Script)
- Cuenta de Google Analytics (opcional)

### 2. Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd project2

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:3000
```

### 3. Configuración del Formulario

#### Opción A: Google Apps Script (Recomendado)

1. **Crear Google Spreadsheet**
   - Ve a https://sheets.google.com
   - Crea nueva hoja: "TalentoLocal Leads"

2. **Configurar Apps Script**
   - En el spreadsheet: Extensiones > Apps Script
   - Copia el contenido de `google-apps-script.js`
   - Pega en el editor de Apps Script
   - Cambia el email de notificación (línea 52)
   - Guarda el proyecto

3. **Implementar como Web App**
   - Implementar > Nueva implementación
   - Tipo: Aplicación web
   - Ejecutar como: Yo
   - Acceso: Cualquier usuario
   - Copiar la URL generada

4. **Actualizar el Frontend**
   - Abre `script.js`
   - Línea 5: Pega la URL en `FORM_ENDPOINT`
   - Guarda los cambios

#### Opción B: Formspree (Alternativa Rápida)

1. Crear cuenta en https://formspree.io
2. Crear nuevo formulario
3. Copiar endpoint URL
4. Actualizar `FORM_ENDPOINT` en `script.js`

### 4. Configuración de Google Analytics

1. Crear propiedad GA4 en https://analytics.google.com
2. Obtener Measurement ID (formato: G-XXXXXXXXXX)
3. Actualizar `GOOGLE_ANALYTICS_ID` en `script.js` (línea 6)

### 5. Personalización

#### Actualizar Información de Contacto
- `script.js` línea 7: Número de WhatsApp
- `index.html` línea 229-230: Email y WhatsApp en footer

#### Actualizar Meta Tags y SEO
- `index.html` líneas 9-13: Meta description y keywords
- `index.html` líneas 33-61: Structured data
- `sitemap.xml`: Actualizar fechas y URLs

#### Personalizar Colores y Estilos
- `styles.css` líneas 3-12: Variables CSS
- `tailwind.config.js`: Extender tema de Tailwind

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build optimizado en /dist
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
```

## Build para Producción

```bash
# Generar build optimizado
npm run build

# La carpeta /dist contendrá:
# - HTML, CSS, JS minificados
# - Assets con hash para cache busting
# - Archivos comprimidos (gzip + brotli)
# - Sitemap y robots.txt
```

### Despliegue

#### Netlify
```bash
# Configuración automática detectada
# Build command: npm run build
# Publish directory: dist
```

#### Vercel
```bash
# Framework Preset: Vite
# Build Command: npm run build
# Output Directory: dist
```

#### Hosting Tradicional
1. Ejecuta `npm run build`
2. Sube el contenido de `/dist` a tu servidor
3. Configura servidor para:
   - Servir archivos comprimidos (gzip/brotli)
   - Headers de cache para assets
   - Redirects para SPA si es necesario

## Optimizaciones Implementadas

### Performance
- Código CSS y JS minificado
- Tree-shaking de código no utilizado
- Compresión Gzip y Brotli
- Lazy loading de imágenes
- Preconnect a recursos externos
- Cache busting con hash en nombres de archivo

### SEO
- Semantic HTML5
- Structured Data (Schema.org)
- Meta tags completos (Open Graph, Twitter)
- robots.txt y sitemap.xml
- URLs limpias y descriptivas
- Headings jerárquicos correctos

### Accesibilidad
- Skip to main content link
- ARIA labels apropiados
- Contraste de colores WCAG AA
- Navegación por teclado
- Focus states visibles

### UX/UI
- Diseño responsive mobile-first
- Animaciones suaves y profesionales
- Estados de loading y error claros
- Validación de formulario en tiempo real
- Scroll suave entre secciones

## Mantenimiento

### Actualizar Contenido
- Testimonios: `index.html` líneas 357-407
- FAQs: `index.html` líneas 419-501
- Vacantes: `index.html` líneas 572-590

### Agregar Nueva Sección
1. Agregar HTML en `index.html`
2. Agregar estilos en `styles.css` si es necesario
3. Agregar JavaScript en `script.js` si requiere interactividad
4. Actualizar navegación en header

### Analytics y Tracking
Los eventos están configurados para rastrear:
- Envío de formulario
- Clicks en CTAs
- Navegación por secciones
- Tiempo en página

## Seguridad

### Implementado
- Validación de formulario client-side
- Sanitización de datos antes de enviar
- HTTPS obligatorio en producción
- Headers de seguridad recomendados

### Recomendaciones Adicionales
- Implementar reCAPTCHA v3 si hay spam
- Rate limiting en el backend
- Validación adicional en Google Apps Script
- Revisar logs regularmente

## Soporte para Navegadores

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- iOS Safari 12+
- Android Chrome 90+

## Roadmap Futuro

### Fase 2 (Corto Plazo)
- [ ] Dashboard para candidatos
- [ ] Sistema de tracking de aplicaciones
- [ ] Chat en vivo / WhatsApp widget
- [ ] Blog con consejos de empleo

### Fase 3 (Mediano Plazo)
- [ ] Panel de administración
- [ ] CRM integrado
- [ ] Automatización de emails
- [ ] Multi-idioma (inglés)

### Fase 4 (Largo Plazo)
- [ ] App móvil nativa
- [ ] Sistema de referidos
- [ ] Marketplace de candidatos
- [ ] API pública

## Troubleshooting

### El formulario no envía datos
1. Verificar que `FORM_ENDPOINT` esté configurado
2. Verificar permisos en Google Apps Script
3. Revisar console del navegador para errores
4. Probar endpoint directamente con Postman

### Analytics no registra eventos
1. Verificar que `GOOGLE_ANALYTICS_ID` esté configurado
2. Verificar que no esté bloqueado por adblocker
3. Revisar en GA4 DebugView (modo debug)

### Estilos no se aplican correctamente
1. Ejecutar `npm run build` para regenerar CSS
2. Limpiar cache del navegador
3. Verificar que Tailwind esté procesando correctamente

## Licencia

MIT License - Ver archivo LICENSE para más detalles

## Contacto y Soporte

Para preguntas sobre el proyecto:
- Email: hola@talentolocal.net
- WhatsApp: +1 (809) 000-0000

## Changelog

### v2.0.0 (2024-11-02)
- Refactorización completa del código
- Separación en archivos modulares
- Implementación de Vite para build
- Mejoras de SEO y performance
- Sección de testimonios y FAQs
- Menú móvil funcional
- PWA ready
- Integración con Google Apps Script

### v1.0.0 (Inicial)
- Landing page básica
- Formulario simple
- Diseño responsive

