# Guía de Deploy a Firebase Hosting

Esta guía te ayudará a desplegar TalentoLocal en Firebase Hosting.

## Prerrequisitos

- Node.js 18+ instalado
- Cuenta de Google
- Proyecto Firebase creado (o crear uno nuevo)

---

## Instalación de Firebase CLI

```bash
# Instalar Firebase Tools globalmente
npm install -g firebase-tools

# Verificar instalación
firebase --version
```

---

## Configuración Inicial

### 1. Login a Firebase

```bash
firebase login
```

Se abrirá tu navegador para autenticarte con Google.

### 2. Crear proyecto en Firebase Console

1. Ve a https://console.firebase.google.com
2. Clic en "Agregar proyecto"
3. Nombre: `talentolocal` (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Crear proyecto

### 3. Conectar proyecto local

```bash
# Inicializar Firebase en tu proyecto
firebase init hosting

# Respuestas sugeridas:
? Select a default Firebase project: Selecciona tu proyecto
? What do you want to use as your public directory? dist
? Configure as a single-page app? No
? Set up automatic builds? No
? File dist/index.html already exists. Overwrite? No
```

### 4. Actualizar configuración

El proyecto ya incluye `firebase.json` configurado. Solo actualiza `.firebaserc`:

```json
{
  "projects": {
    "default": "tu-proyecto-firebase-id"
  }
}
```

---

## Deploy

### Build y Deploy

```bash
# 1. Generar build de producción
npm run build

# 2. Preview local (opcional)
firebase serve

# 3. Deploy a Firebase
firebase deploy

# 4. Ver tu sitio
# Se mostrará la URL: https://tu-proyecto.web.app
```

### Solo Hosting

```bash
# Deploy solo hosting (más rápido)
firebase deploy --only hosting
```

---

## Dominio Personalizado

### Agregar dominio custom

1. En Firebase Console: Hosting > Agregar dominio personalizado
2. Ingresa tu dominio: `talentolocal.net`
3. Sigue las instrucciones para configurar DNS
4. Firebase proveerá registros A y TXT
5. Agrega esos registros en tu proveedor de dominio
6. Espera propagación (10 min - 48 hrs)

### Configuración DNS típica

```
Tipo    Nombre    Valor
────────────────────────────────────────────
A       @         151.101.1.195
A       @         151.101.65.195
TXT     @         valor-de-verificacion
CNAME   www       tu-proyecto.web.app
```

---

## GitHub Actions (Deploy Automático)

### Configuración

```bash
firebase init github
```

Esto creará `.github/workflows/firebase-hosting-pull-request.yml` y `firebase-hosting-merge.yml`

### Deploy automático en cada push a main

El workflow ya configurado hará:
1. Push a main → Build → Deploy automático
2. Pull Request → Preview deploy

---

## Comandos Útiles

```bash
# Ver proyectos
firebase projects:list

# Cambiar proyecto
firebase use proyecto-id

# Ver URLs del proyecto
firebase hosting:sites:list

# Ver logs
firebase hosting:logs

# Eliminar deploy
firebase hosting:disable

# Rollback a versión anterior
firebase hosting:clone source-site-id:version-id target-site-id
```

---

## Optimizaciones Firebase

### Headers de Seguridad (ya configurados)

El `firebase.json` incluye:
- X-Content-Type-Options
- X-Frame-Options  
- X-XSS-Protection
- Cache-Control para assets

### Compresión

Firebase comprime automáticamente:
- HTML, CSS, JS
- JSON, XML
- SVG

### CDN

Firebase usa CDN global automáticamente, sin configuración adicional.

---

## Monitoreo

### Performance

```bash
# Ver métricas
firebase hosting:metrics
```

O en Firebase Console: Hosting > Usage

### Analytics

Si habilitaste Google Analytics:
1. Firebase Console > Analytics
2. Ver tráfico en tiempo real
3. Métricas de performance

---

## Troubleshooting

### Error: Not authorized

```bash
firebase logout
firebase login
```

### Build no se actualiza

```bash
# Limpiar cache
rm -rf dist
npm run build
firebase deploy --only hosting
```

### 404 en rutas

Verifica `firebase.json`:
```json
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

### Service Worker no funciona

Verifica que tu sitio esté en HTTPS (Firebase lo incluye automáticamente).

---

## Costos

### Plan Spark (Gratis)
- 10 GB almacenamiento
- 360 MB/día transferencia (~10.8 GB/mes)
- HTTPS incluido
- Dominio custom incluido

### Plan Blaze (Pay as you go)
- $0.026 por GB almacenamiento
- $0.15 por GB transferencia
- Solo pagas lo que usas

**Nota:** Tu proyecto usa ~5 MB, así que el plan gratis es suficiente para miles de visitas/mes.

---

## Checklist Pre-Deploy

- [ ] `npm install` ejecutado
- [ ] `npm run build` sin errores
- [ ] Google Apps Script configurado (formulario)
- [ ] Google Analytics ID actualizado (opcional)
- [ ] WhatsApp y email actualizados
- [ ] Logo en carpeta public/
- [ ] firebase.json configurado
- [ ] .firebaserc con project ID correcto

---

## Deploy de Emergencia

Si necesitas revertir rápidamente:

```bash
# Ver versiones
firebase hosting:releases:list

# Rollback
firebase hosting:rollback
```

---

## Recursos

- [Documentación Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Dominios Personalizados](https://firebase.google.com/docs/hosting/custom-domain)

---

## Resumen Rápido

```bash
# Deploy completo (3 comandos)
npm install -g firebase-tools
firebase login
npm run build && firebase deploy

# Tu sitio estará en:
# https://tu-proyecto.web.app
```

---

**¡Listo! Tu sitio TalentoLocal estará online en minutos.** 🚀

