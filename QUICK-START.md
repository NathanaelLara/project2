# Inicio Rápido - TalentoLocal

Esta es la guía más rápida para poner tu proyecto en funcionamiento.

---

## Paso 1: Instalar Dependencias (2 minutos)

```bash
# Abre terminal en la carpeta del proyecto
cd project2

# Instala las dependencias
npm install
```

---

## Paso 2: Configurar Formulario (5 minutos)

### Crear Google Sheet
1. Ve a https://sheets.google.com
2. Nuevo > Hoja de cálculo en blanco
3. Nómbrala "TalentoLocal Leads"

### Configurar Apps Script
1. En la hoja: **Extensiones > Apps Script**
2. Abre el archivo `google-apps-script.js` de este proyecto
3. **Copia TODO el contenido**
4. Pégalo en el editor de Apps Script
5. **Línea 52**: Cambia el email por el tuyo:
   ```javascript
   const recipient = 'tu-email@ejemplo.com';
   ```
6. Guarda (Ctrl+S)

### Publicar como Web App
1. Clic en **"Implementar"** (arriba a la derecha)
2. **Nueva implementación**
3. Tipo: **Aplicación web**
4. Ejecutar como: **Yo**
5. Acceso: **Cualquier usuario**
6. **Implementar**
7. **COPIA LA URL** que te da (ejemplo: https://script.google.com/macros/s/ABC123.../exec)

### Conectar con el sitio
1. Abre `script.js` en tu editor
2. **Línea 5**: Pega la URL que copiaste:
   ```javascript
   FORM_ENDPOINT: 'https://script.google.com/macros/s/TU_URL_AQUI/exec',
   ```
3. Guarda el archivo

---

## Paso 3: Actualizar Información (3 minutos)

### En script.js (líneas 5-9)
```javascript
const CONFIG = {
  FORM_ENDPOINT: 'URL_DE_APPS_SCRIPT_AQUI',
  GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',  // Opcional por ahora
  SITE_NAME: 'TalentoLocal',
  WHATSAPP_NUMBER: '18091234567'  // Cambia por tu número
};
```

### En index.html

**Buscar y reemplazar** (Ctrl+H en la mayoría de editores):
- Busca: `hola@talentolocal.net`
- Reemplaza: `tu-email@ejemplo.com`

- Busca: `18090000000`
- Reemplaza: `18091234567` (tu WhatsApp)

**Línea 11** (URL del sitio):
```html
<meta property="og:url" content="https://tu-dominio.com/">
```

---

## Paso 4: Probar Localmente (2 minutos)

```bash
# Inicia el servidor de desarrollo
npm run dev
```

Se abrirá http://localhost:3000

### Verificar:
- [ ] El sitio se ve bien
- [ ] El menú móvil funciona (resize ventana)
- [ ] Llena el formulario y envía
- [ ] Verifica que llegue a tu Google Sheet
- [ ] Verifica que recibas el email

---

## Paso 5: Build para Producción (1 minuto)

```bash
# Genera la versión optimizada
npm run build

# La carpeta "dist" contendrá tu sitio listo para subir
```

---

## Paso 6: Deploy (Elige uno)

### Opción A: Netlify (Más fácil)
1. Ve a https://app.netlify.com
2. Arrastra la carpeta `dist` a Netlify
3. ¡Listo! Tu sitio está online

### Opción B: Vercel
1. Ve a https://vercel.com
2. **New Project**
3. Conecta tu repositorio Git
4. Deploy automático

### Opción C: Hosting Tradicional
1. Entra a tu cPanel/FTP
2. Sube TODO el contenido de la carpeta `dist/`
3. A la carpeta `public_html/`

---

## Troubleshooting

### El formulario no envía
- Verifica que copiaste bien la URL de Apps Script
- Verifica en Apps Script que esté publicado como "Cualquier usuario"
- Revisa la consola del navegador (F12) para ver errores

### No recibo el email
- Verifica que cambiaste el email en google-apps-script.js línea 52
- Revisa tu carpeta de spam
- Verifica en Google Sheets que los datos lleguen

### Los estilos no se ven
- Ejecuta `npm run build` de nuevo
- Limpia el cache del navegador (Ctrl+Shift+R)
- Verifica que subiste TODOS los archivos de la carpeta dist

### Error al instalar dependencias
- Verifica que tienes Node.js 18+ instalado
- Intenta borrar `node_modules` y `package-lock.json`
- Ejecuta `npm install` de nuevo

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor local

# Producción
npm run build        # Genera build
npm run preview      # Preview del build

# Calidad de código
npm run lint         # Revisa errores
npm run format       # Formatea código
```

---

## Documentación Completa

Para información detallada, consulta:

- **README.md** - Documentación técnica completa
- **CONFIGURATION.md** - Guía de configuración detallada
- **DEPLOYMENT.md** - Todas las opciones de deploy
- **PROJECT-SUMMARY.md** - Resumen del proyecto

---

## Checklist Final

Antes de considerar el proyecto completo:

- [ ] Dependencias instaladas (`npm install`)
- [ ] Google Apps Script configurado y publicado
- [ ] URL de Apps Script en script.js
- [ ] WhatsApp actualizado en todos lados
- [ ] Email actualizado en todos lados
- [ ] Formulario probado localmente
- [ ] Datos llegando a Google Sheet
- [ ] Email de notificación funcionando
- [ ] Build generado (`npm run build`)
- [ ] Sitio desplegado en producción
- [ ] Dominio configurado (si aplica)
- [ ] HTTPS habilitado
- [ ] Sitemap enviado a Google Search Console

---

## Próximos Pasos Opcionales

### Google Analytics (5 minutos)
1. Crea propiedad en https://analytics.google.com
2. Copia tu Measurement ID (G-XXXXXXXXXX)
3. Pégalo en `script.js` línea 6

### Dominio Personalizado (10 minutos)
1. Compra dominio (Namecheap, GoDaddy, etc)
2. Configura DNS según tu hosting
3. Habilita SSL/HTTPS

### Contenido Real (30 minutos)
1. Reemplaza testimonios con casos reales
2. Actualiza stats (líneas 594-606 en index.html)
3. Personaliza FAQs según tus necesidades
4. Agrega fotos reales si las tienes

---

## ¿Necesitas Ayuda?

1. **Revisa la documentación** en README.md
2. **Google** el error específico
3. **Consulta los logs** en la consola del navegador (F12)
4. **Revisa Apps Script logs** en el editor de Apps Script

---

**¡Éxito con tu proyecto!**

Tu sitio está ahora 100% profesional, optimizado y listo para recibir aplicantes.

---

*Tiempo total estimado: 15-20 minutos*
*Dificultad: Principiante/Intermedio*

