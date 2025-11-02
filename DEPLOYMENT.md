# Guía de Despliegue - TalentoLocal

Esta guía te ayudará a desplegar tu sitio web de TalentoLocal en diferentes plataformas.

## Tabla de Contenidos
1. [Preparación](#preparación)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [GitHub Pages](#github-pages)
5. [Hosting Tradicional](#hosting-tradicional)
6. [Configuración Post-Despliegue](#configuración-post-despliegue)

---

## Preparación

Antes de desplegar, asegúrate de:

1. **Configurar el formulario** (ver README.md)
2. **Actualizar las URLs** en los archivos:
   - `index.html`: Actualizar Open Graph URLs
   - `sitemap.xml`: Cambiar URLs a tu dominio
   - `manifest.json`: Actualizar start_url si es necesario

3. **Probar localmente**:
```bash
npm run build
npm run preview
```

---

## Netlify

### Opción 1: Deploy desde Git

1. **Conectar Repositorio**
   - Ve a https://app.netlify.com
   - Clic en "New site from Git"
   - Conecta tu repositorio (GitHub/GitLab/Bitbucket)

2. **Configurar Build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Variables de Entorno** (opcional)
   - Settings > Environment variables
   - Agregar si tienes API keys

4. **Deploy**
   - Clic en "Deploy site"
   - Tu sitio estará disponible en `random-name.netlify.app`

### Opción 2: Deploy Manual (CLI)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Configuración Adicional Netlify

Crear archivo `netlify.toml` en la raíz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Vercel

### Opción 1: Deploy desde Git

1. **Conectar Repositorio**
   - Ve a https://vercel.com
   - Clic en "New Project"
   - Importa tu repositorio de Git

2. **Configuración Automática**
   - Vercel detecta Vite automáticamente
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Clic en "Deploy"
   - Tu sitio estará en `project-name.vercel.app`

### Opción 2: Deploy Manual (CLI)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Configuración Adicional Vercel

Crear archivo `vercel.json` en la raíz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## GitHub Pages

### Configuración

1. **Instalar gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Actualizar package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://tu-usuario.github.io/tu-repo"
}
```

3. **Actualizar vite.config.js**
```javascript
export default defineConfig({
  base: '/tu-repo/', // Nombre de tu repositorio
  // ... resto de configuración
});
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configurar en GitHub**
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

---

## Hosting Tradicional

Para hostings como cPanel, Hostinger, HostGator, etc.

### Paso 1: Build Local

```bash
npm run build
```

### Paso 2: Preparar Archivos

La carpeta `dist/` contendrá:
```
dist/
├── index.html
├── assets/
│   ├── index.[hash].js
│   ├── index.[hash].css
│   └── ...
├── manifest.json
├── robots.txt
├── sitemap.xml
└── ...
```

### Paso 3: Subir Archivos

**Via FTP/SFTP:**
1. Conecta con FileZilla o similar
2. Sube todo el contenido de `dist/` a `public_html/` o `www/`

**Via cPanel:**
1. File Manager > public_html
2. Upload > Selecciona archivos de `dist/`
3. Extrae si subiste como ZIP

### Paso 4: Configuración del Servidor

#### Apache (.htaccess)

Crear archivo `.htaccess` en el directorio raíz:

```apache
# Habilitar compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Habilitar cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Headers de seguridad
<IfModule mod_headers.c>
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirigir a HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Nginx

Configuración para nginx:

```nginx
server {
    listen 80;
    server_name talentolocal.net www.talentolocal.net;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name talentolocal.net www.talentolocal.net;
    
    root /var/www/html;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Configuración Post-Despliegue

### 1. Verificar Funcionalidad

- [ ] El sitio carga correctamente
- [ ] Todos los estilos se aplican
- [ ] Las imágenes se cargan
- [ ] El menú móvil funciona
- [ ] El formulario envía datos
- [ ] Los enlaces funcionan

### 2. Configurar Dominio Personalizado

#### Netlify
1. Site settings > Domain management
2. Add custom domain
3. Actualizar DNS en tu registrador:
   ```
   A record: @ -> 75.2.60.5
   CNAME: www -> tu-sitio.netlify.app
   ```

#### Vercel
1. Settings > Domains
2. Add domain
3. Seguir instrucciones de DNS

### 3. Configurar SSL/HTTPS

Tanto Netlify como Vercel proporcionan SSL gratis (Let's Encrypt).
Para hosting tradicional, usa:
- Let's Encrypt (gratis)
- Cloudflare SSL (gratis)
- SSL del hosting

### 4. SEO Post-Despliegue

1. **Google Search Console**
   - Agregar propiedad
   - Verificar dominio
   - Enviar sitemap: `https://tudominio.com/sitemap.xml`

2. **Google Analytics**
   - Verificar que los eventos se registren
   - Configurar conversiones

3. **Meta Tags**
   - Verificar con https://metatags.io
   - Probar compartir en redes sociales

### 5. Performance Testing

Probar en:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse (Chrome DevTools)

Objetivo: Puntaje 90+ en todas las métricas

### 6. Monitoreo

Configurar:
- Google Analytics
- Search Console
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry, opcional)

---

## Troubleshooting Común

### Problema: 404 en rutas
**Solución**: Configurar SPA fallback (ver configuraciones de servidor arriba)

### Problema: Assets no cargan
**Solución**: Verificar `base` en vite.config.js

### Problema: CSS no se aplica
**Solución**: Verificar que Tailwind esté configurado correctamente en build

### Problema: Formulario no funciona
**Solución**: Verificar CORS y endpoint URL

---

## Checklist Final

Antes de considerar el deploy completo:

- [ ] Sitio accesible en producción
- [ ] HTTPS funcionando
- [ ] Dominio personalizado configurado
- [ ] Formulario enviando datos
- [ ] Analytics funcionando
- [ ] SEO verificado (meta tags, sitemap)
- [ ] Performance > 90
- [ ] Responsive en todos los dispositivos
- [ ] Cross-browser testing
- [ ] Backup configurado

---

## Recursos Adicionales

- [Documentación Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Web.dev Performance](https://web.dev/performance/)

---

¿Problemas con el deployment? Contacta al desarrollador o abre un issue en el repositorio.

