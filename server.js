/**
 * Archivo de arranque para cPanel (Passenger) — "Application startup file".
 *
 * Requisitos previos:
 *   1. Haber ejecutado `npm run build` (genera la carpeta .next).
 *   2. Tener las dependencias instaladas (cPanel lo hace con "Run NPM Install").
 *
 * Passenger asigna el puerto mediante la variable de entorno PORT.
 */
const { createServer } = require("http");
const path = require("path");
const fs = require("fs");
const next = require("next");

/**
 * Al subir el build comprimido desde Windows, las carpetas pueden quedar sin
 * permiso de ejecución en Linux, lo que provoca EACCES al leer .next/static.
 * Esto reaplica permisos correctos (dirs 755, archivos 644) al arrancar.
 * Como somos los dueños de los archivos, chmod funciona aunque falte el permiso.
 */
function fixPerms(rel) {
  const root = path.join(__dirname, rel);
  if (!fs.existsSync(root)) return;
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    try {
      const st = fs.statSync(cur);
      if (st.isDirectory()) {
        fs.chmodSync(cur, 0o755);
        for (const entry of fs.readdirSync(cur)) stack.push(path.join(cur, entry));
      } else {
        fs.chmodSync(cur, 0o644);
      }
    } catch {
      /* ignorar archivos puntuales que no se puedan ajustar */
    }
  }
}
[".next", "public"].forEach(fixPerms);

const port = process.env.PORT || 3000;
// Passenger puede iniciar Node con un directorio de trabajo distinto al
// Application root. Fijar `dir` evita que Next cargue un build anterior.
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`> IBEX web lista en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al iniciar el servidor:", err);
    process.exit(1);
  });
