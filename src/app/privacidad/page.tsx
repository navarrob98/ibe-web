import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad provisional",
  description:
    "Aviso de privacidad provisional del sitio de IBEX Biomedical Solutions: qué datos se recopilan a través del formulario de contacto y con qué fin.",
};

// NOTA INTERNA: este aviso lo redactó el propio proyecto a partir de los
// datos disponibles en el repositorio. No ha sido revisado por un asesor
// legal ni confirma cumplimiento con ninguna normativa de protección de
// datos específica. Antes de tratarlo como definitivo, debe pasar por
// revisión legal y completarse con los datos societarios/regulatorios que
// falten (razón social, domicilio fiscal, responsable designado, etc.).
export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Aviso de privacidad provisional"
      subtitle="Qué datos recopila este sitio a través del formulario de contacto, con qué fin y cuáles son tus opciones."
      updated="9 de agosto de 2026"
    >
      <div className="mb-8 rounded border border-teal/30 bg-teal/[0.05] px-5 py-4 text-[0.95rem] leading-relaxed text-navy-ink">
        <strong>Este es un aviso de privacidad provisional del sitio.</strong> IBEX Biomedical
        Solutions aún no ha iniciado operaciones y este documento no ha sido revisado por un
        asesor legal ni afirma cumplimiento completo con ninguna normativa específica de
        protección de datos. Se publica para describir, de forma honesta, el único tratamiento
        de datos que ocurre hoy en este sitio: el formulario de contacto.
      </div>

      <h2 id="responsable">1. Quién trata tus datos</h2>
      <p>
        Los datos que envías a través del formulario de este sitio son tratados por{" "}
        <strong>{site.name}</strong>, con operación prevista en {site.contact.location}. IBEX aún
        no ha confirmado públicamente su razón social ni un domicilio fiscal completo; en cuanto
        estos datos estén disponibles, se incorporarán a este aviso. Para cualquier asunto
        relacionado con tu privacidad puedes escribir a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>

      <h2 id="datos">2. Datos que recopilamos</h2>
      <p>Recopilamos únicamente los datos que envías de forma voluntaria en el formulario de contacto:</p>
      <ul>
        <li>Nombre, correo electrónico y, si lo indicas, teléfono.</li>
        <li>Nombre de tu institución y ciudad.</li>
        <li>El servicio de tu interés, el motivo de tu solicitud y, si lo compartes, el número aproximado de equipos.</li>
        <li>El mensaje que escribas y tu consentimiento para ser contactado.</li>
      </ul>
      <p>
        Además, el servidor y la infraestructura de hosting pueden generar registros técnicos
        estándar (por ejemplo, dirección IP, fecha y hora de la solicitud) con fines de seguridad
        y diagnóstico. Estos registros dependen de la configuración del proveedor de hosting y no
        son controlados directamente desde el código de este sitio.
      </p>

      <h2 id="finalidades">3. Para qué usamos tus datos</h2>
      <p>Usamos los datos del formulario únicamente para:</p>
      <ul>
        <li>Responder tu solicitud de información o de contacto.</li>
        <li>Dar seguimiento al registro de tu interés.</li>
        <li>Avisarte cuando IBEX inicie operaciones, si así lo autorizaste.</li>
      </ul>
      <p>
        No usamos tus datos para fines distintos de los aquí señalados sin recabar tu
        consentimiento previo, y no vendemos ni rentamos tu información.
      </p>

      <h2 id="base">4. Base para el tratamiento</h2>
      <p>
        El tratamiento se basa en el consentimiento que otorgas al marcar la casilla de
        autorización y enviar el formulario. Puedes retirar ese consentimiento en cualquier
        momento escribiendo al correo de contacto.
      </p>

      <h2 id="conservacion">5. Conservación</h2>
      <p>
        Conservamos tus datos mientras sean necesarios para dar seguimiento a tu solicitud o,
        en su caso, hasta que retires tu consentimiento. Este sitio no define todavía un plazo de
        conservación específico; ese detalle se incorporará junto con la revisión legal del aviso.
      </p>

      <h2 id="transferencias">6. Terceros que pueden intervenir</h2>
      <p>
        No vendemos ni rentamos tus datos personales. El envío del formulario puede pasar por
        proveedores de correo electrónico y de alojamiento (hosting) necesarios para operar este
        sitio. Aún no están confirmados los nombres específicos de esos proveedores, por lo que no
        se listan aquí; se añadirán cuando estén definidos.
      </p>

      <h2 id="cookies">7. Cookies y analítica</h2>
      <p>
        Este sitio no utiliza actualmente herramientas de analítica ni cookies publicitarias o de
        terceros. Si en el futuro se incorporan, se actualizará este aviso y se solicitará tu
        consentimiento cuando corresponda.
      </p>

      <h2 id="derechos">8. Tus opciones</h2>
      <p>
        Puedes pedirnos en cualquier momento que corrijamos o eliminemos los datos que enviaste
        por el formulario, o que dejemos de contactarte. Para ello, escribe a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> indicando tu nombre y lo
        que necesitas.
      </p>

      <h2 id="seguridad">9. Seguridad</h2>
      <p>
        El formulario valida y limita la información en el servidor antes de procesarla, y las
        respuestas del sitio no se almacenan en caché. Ninguna transmisión por Internet es
        completamente segura, por lo que no podemos garantizar una seguridad absoluta.
      </p>

      <h2 id="cambios">10. Cambios a este aviso</h2>
      <p>
        Este aviso se actualizará conforme IBEX confirme sus datos societarios, avance en su
        revisión legal y se acerque al inicio de operaciones. La fecha de la última actualización
        se indica al inicio de esta página.
      </p>

      <h2 id="contacto-privacidad">11. Contacto</h2>
      <p>
        Si tienes dudas sobre este aviso o sobre el tratamiento de tus datos, escríbenos a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
