# IBE Biomedical Solutions — Sitio web

Sitio corporativo de servicios profesionales de ingeniería biomédica, construido con
**Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS v4**.

## Identidad de marca

La paleta y la tipografía se extrajeron de la guía de marca oficial:

| Token | Uso | Hex |
| --- | --- | --- |
| `navy` | Color primario | `#002460` |
| `royal` | Profundidad | `#002478` |
| `steel` | Secundario | `#00549c` |
| `teal` | Acento (cruz tech del logo) | `#0098a8` |
| `cyan` | Highlights | `#6cd8d8` |
| `ink` / `slate` / `line` / `paper` | Neutros | — |

- **Títulos:** Montserrat (600–800)
- **Cuerpo:** Inter
- **Etiquetas técnicas:** JetBrains Mono

Todos los tokens viven en `src/app/globals.css` (`@theme`).

## Estructura

```
src/
  app/
    layout.tsx          Layout raíz: fuentes, SEO, Header, Footer
    page.tsx            Home (ensambla las secciones)
    privacidad/         Política de Privacidad
    terminos/           Términos y Condiciones
    api/contact/        Endpoint del formulario (validación en servidor)
  components/
    Header / Footer / Logo / Icons (SVG propios, sin emojis)
    Reveal              Animación de entrada (mejora progresiva)
    ContactForm         Formulario con validación cliente + servidor
    sections/           Hero, Services, Approach, Sectors, About, Contact
  lib/
    site.ts             Contenido central y datos de contacto
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Antes de publicar

1. **Datos de contacto:** edita `src/lib/site.ts` (correo, teléfono, ubicación, horario).
2. **Envío de correo:** conecta tu proveedor en `src/app/api/contact/route.ts`
   (Resend, SendGrid, SMTP, etc.) y define las variables de entorno.
3. **Textos legales:** las páginas de Términos y Privacidad son plantillas de
   referencia; deben ser revisadas y adaptadas por un asesor legal.
4. **Dominio:** actualiza `site.url` en `src/lib/site.ts` para SEO/Open Graph.

## Decisiones de UI/UX

- Estética "blueprint" de ingeniería clínica: retícula sutil, etiquetas
  monoespaciadas y secciones numeradas.
- Iconografía vectorial propia y coherente (sin emojis ni librerías de iconos).
- Layout editorial asimétrico, jerarquía tipográfica marcada y mucho espacio en blanco.
- Accesibilidad: HTML semántico, foco visible, `prefers-reduced-motion`, contraste alto,
  y contenido visible sin JavaScript.
