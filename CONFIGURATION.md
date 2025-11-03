# Guía de Configuración Rápida - TalentoLocal

Esta guía te ayudará a configurar el proyecto en 15 minutos.

## Configuración Paso a Paso

### 1. Formulario (5 minutos)

#### Configurar Google Apps Script

1. Abre https://sheets.google.com y crea nueva hoja
2. Extensiones > Apps Script
3. Copia el contenido de `google-apps-script.js`
4. Cambia el email en línea 52:
   ```javascript
   const recipient = 'tu-email@ejemplo.com';
   ```
5. Implementar > Nueva implementación > Aplicación web
6. Configurar:
   - Ejecutar como: Yo
   - Acceso: Cualquier usuario
7. Copiar la URL generada (ejemplo: `https://script.google.com/macros/s/ABC123.../exec`)

8. Abre `script.js` y actualiza línea 5:
   ```javascript
   FORM_ENDPOINT: 'https://script.google.com/macros/s/TU_URL_AQUI/exec'
   ```

### 2. Google Analytics (2 minutos)

1. Crea cuenta en https://analytics.google.com
2. Crea propiedad GA4
3. Copia tu Measurement ID (formato: G-XXXXXXXXXX)
4. Actualiza `script.js` línea 6:
   ```javascript
   GOOGLE_ANALYTICS_ID: 'G-TU-ID-AQUI'
   ```

### 3. Información de Contacto (3 minutos)

#### script.js línea 7
```javascript
WHATSAPP_NUMBER: '18091234567' // Tu número real
```

#### index.html
- **Línea 229**: Email en footer
- **Línea 230**: WhatsApp en footer
- **Línea 608**: WhatsApp en botón de ayuda

Busca y reemplaza:
- `hola@talentolocal.net` → tu email
- `18090000000` → tu WhatsApp

### 4. Meta Tags y SEO (3 minutos)

#### index.html

**Línea 10**: Actualizar descripción
```html
<meta name="description" content="Tu descripción personalizada aquí">
```

**Líneas 20-28**: Open Graph
```html
<meta property="og:url" content="https://tu-dominio.com/">
<meta property="og:title" content="Tu Título">
<meta property="og:description" content="Tu Descripción">
```

**Línea 64**: Canonical URL
```html
<link rel="canonical" href="https://tu-dominio.com/">
```

### 5. Sitemap (1 minuto)

Abre `sitemap.xml` y cambia todas las URLs:
```xml
<loc>https://tu-dominio.com/</loc>
```

### 6. Personalización Opcional

#### Cambiar Colores
`styles.css` líneas 3-12:
```css
:root {
  --color-primary: #0f172a;      /* Color principal */
  --color-accent: #6ee7b7;        /* Color de acento */
  /* ... */
}
```

#### Cambiar Stats
`index.html` líneas 594-606:
```html
<div class="stat-number">10k+</div> <!-- Actualiza números -->
```

#### Actualizar Testimonios
`index.html` líneas 357-407 - Reemplaza con testimonios reales

#### Actualizar FAQs
`index.html` líneas 419-501 - Personaliza preguntas

## Verificación Final

### Checklist de Configuración

- [ ] Formulario configurado y probado
- [ ] Google Analytics configurado
- [ ] WhatsApp actualizado en todos los lugares
- [ ] Email actualizado en todos los lugares
- [ ] Meta tags actualizados
- [ ] Sitemap actualizado con tu dominio
- [ ] Colores personalizados (opcional)
- [ ] Stats actualizados (opcional)

### Probar Localmente

```bash
npm install
npm run dev
```

Visita http://localhost:3000 y prueba:
1. Navegación móvil
2. Formulario (llena y envía)
3. Verifica que llegue a Google Sheets
4. Verifica notificación por email

### Problemas Comunes

**Q: El formulario no envía**
A: Verifica que el endpoint esté correcto y que el Apps Script esté publicado como "Cualquier usuario"

**Q: No llegan notificaciones por email**
A: Verifica el email en `google-apps-script.js` línea 52

**Q: Analytics no registra**
A: Espera 24-48 horas para ver datos, o usa DebugView en GA4

**Q: Los estilos no se ven**
A: Ejecuta `npm run build` y `npm run preview`

## Configuración Avanzada (Opcional)

### reCAPTCHA v3 (Anti-spam)

1. Obtén keys en https://www.google.com/recaptcha/admin
2. Agrega en `index.html` antes de `</head>`:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=TU_SITE_KEY"></script>
   ```
3. Modifica `script.js` función `initFormHandling()`:
   ```javascript
   // Antes de fetch, agregar:
   const token = await grecaptcha.execute('TU_SITE_KEY', {action: 'submit'});
   data._recaptcha = token;
   ```

### Pixel de Facebook

Agrega antes de `</head>` en `index.html`:
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### WhatsApp Business API

Para automatizar respuestas, considera:
- Twilio WhatsApp API
- 360dialog
- MessageBird

Integra con Google Apps Script para enviar confirmación automática.

## Recursos de Ayuda

- **Soporte Google Apps Script**: https://developers.google.com/apps-script
- **Documentación GA4**: https://support.google.com/analytics/answer/10089681
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com

## Soporte

¿Necesitas ayuda? Consulta:
1. README.md - Documentación completa
2. DEPLOYMENT.md - Guía de despliegue
3. Issues en GitHub

---

¡Listo! Tu sitio debería estar configurado y funcionando. Procede a hacer build y deploy.

