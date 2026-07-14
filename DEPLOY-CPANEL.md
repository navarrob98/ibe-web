# Despliegue en cPanel (Node.js)

Guía para publicar el sitio en un cPanel que tenga la opción
**"Setup Node.js App" / "Configurar aplicación Node.js"** (Passenger).

> Si tu cPanel **no** tiene esa opción, este método no aplica: avísame y lo
> adaptamos a una exportación estática con `sendmail.php` o a un servicio externo.

---

## 1. Crear la cuenta de correo

En cPanel → **Cuentas de correo electrónico** → crea, por ejemplo,
`contacto@tudominio.com` y anota la contraseña. Con eso se enviarán los mensajes
del formulario.

## 2. Generar el build (en tu computadora)

```bash
npm install
npm run build
```

Esto crea la carpeta **`.next`**. Súbela junto con el proyecto.

## 3. Subir los archivos

Sube el proyecto a una carpeta fuera de `public_html` (por ejemplo
`/home/usuario/ibe-web`). **Incluye**:

- `.next/`  ← el build
- `public/`
- `src/`
- `server.js`
- `package.json` y `package-lock.json`
- `next.config.mjs`

**No subas** `node_modules` (cPanel lo instala) ni `.env` (las claves se ponen aparte).

## 4. Crear la app de Node en cPanel

cPanel → **Setup Node.js App** → **Create Application**:

| Campo | Valor |
| --- | --- |
| Node.js version | 20 o 22 (la más alta disponible) |
| Application mode | Production |
| Application root | `ibe-web` (la carpeta que subiste) |
| Application URL | tu dominio o subdominio |
| Application startup file | `server.js` |

## 5. Variables de entorno

En la misma pantalla, sección **Environment variables**, agrega (ver `.env.example`):

```
SMTP_HOST     = mail.tudominio.com
SMTP_PORT     = 465
SMTP_SECURE   = true
SMTP_USER     = contacto@tudominio.com
SMTP_PASS     = (la contraseña del buzón)
CONTACT_INBOX = contacto@tudominio.com
CONTACT_FROM  = contacto@tudominio.com
```

## 6. Instalar dependencias y arrancar

1. Pulsa **Run NPM Install** (instala `next`, `react`, `nodemailer`, etc.).
2. Pulsa **Restart** (o **Start**).

Abre tu dominio: el sitio carga y el formulario envía el correo a tu buzón.

---

## Actualizaciones posteriores

Cada vez que cambies el código:

```bash
npm run build          # en tu computadora
```

Sube la carpeta `.next` actualizada y pulsa **Restart** en cPanel.

## Notas

- El correo puede tardar unos segundos. Si no llega, revisa la carpeta de spam y
  que `CONTACT_FROM` sea del **mismo dominio** que el servidor SMTP.
- Si el puerto 465 falla, prueba `SMTP_PORT=587` y `SMTP_SECURE=false`.
- En desarrollo local, sin variables SMTP, el formulario responde correctamente y
  registra la solicitud en la consola (no envía correo).
