const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy sin nonces.
 *
 * El proyecto se sirve mediante `server.js` (Node estándar en cPanel, sin
 * Proxy/Middleware), por lo que generar un nonce distinto por request no es
 * viable sin pasar TODAS las páginas a renderizado dinámico (perdiendo la
 * generación estática, indeseable en un hosting compartido con memoria y
 * CPU limitadas). Next.js documenta esta variante "sin nonces" como la
 * alternativa válida para ese caso (ver
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 *
 * - script-src incluye 'unsafe-inline': se verificó el HTML generado por
 *   `next build` (.next/server/app/index.html) y, incluso en una página
 *   100% estática, Next.js inserta scripts inline propios para hidratar
 *   React Server Components (`self.__next_f.push(...)`) y para su loader
 *   de scripts (`self.__next_s`). Sin nonces, no hay forma de permitir solo
 *   esos scripts sin 'unsafe-inline'; es la misma conclusión que el ejemplo
 *   oficial de Next.js para CSP sin nonces. El único script propio del sitio
 *   (marcar <html> con la clase "js") igualmente se sirve como archivo
 *   externo (/js-detect.js) para no depender de esa concesión.
 * - style-src incluye 'unsafe-inline' porque React aplica algunos estilos
 *   en línea (por ejemplo, el retraso de las animaciones Reveal); también
 *   sigue el ejemplo oficial de Next.js para CSP sin nonces.
 * - Las fuentes (next/font) se auto-alojan en build, por lo que no hace
 *   falta permitir dominios externos de fuentes.
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`
  .replace(/\s{2,}/g, " ")
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera el sitio en modo servidor Node (necesario para /api/contact en cPanel).
  poweredByHeader: false,
  compress: true,
  experimental: {
    // El hosting compartido de cPanel limita memoria y procesos durante el build.
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          // HSTS solo tiene sentido en producción servida por HTTPS; en
          // desarrollo (http://localhost) forzarla rompería el sitio.
          ...(isDev
            ? []
            : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
        ],
      },
    ];
  },
};

export default nextConfig;
