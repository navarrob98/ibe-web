import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo IBE Biomedical Solutions recopila, usa y protege tus datos personales conforme a la normativa aplicable.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      subtitle="Tu información es importante. Aquí explicamos qué datos tratamos, con qué fin y cuáles son tus derechos."
      updated="5 de junio de 2026"
    >
      <p>
        En <strong>{site.name}</strong> (en adelante, “IBE”, “nosotros”) respetamos tu privacidad y
        nos comprometemos a proteger los datos personales que nos confías a través de este sitio web.
        Esta política describe el tratamiento que damos a dicha información.
      </p>
      <p>
        <strong>Aviso:</strong> este documento es una plantilla de referencia. Antes de publicarlo,
        debe ser revisado y adaptado por un asesor legal conforme a la legislación aplicable en tu
        jurisdicción.
      </p>

      <h2 id="responsable">1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es {site.name}, con domicilio en{" "}
        {site.contact.location}. Para cualquier asunto relacionado con tu privacidad puedes
        escribirnos a <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>

      <h2 id="datos">2. Datos que recopilamos</h2>
      <p>Recopilamos únicamente los datos que nos proporcionas de forma voluntaria, en particular:</p>
      <ul>
        <li>Datos de identificación y contacto: nombre, correo electrónico y teléfono.</li>
        <li>Datos de tu organización: nombre de la institución o empresa.</li>
        <li>Contenido del mensaje y el servicio de interés que indiques en el formulario.</li>
        <li>
          Datos técnicos de navegación generados automáticamente (dirección IP, tipo de dispositivo
          y navegador) con fines de seguridad y mejora del sitio.
        </li>
      </ul>

      <h2 id="finalidades">3. Finalidades del tratamiento</h2>
      <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
      <ul>
        <li>Atender tus solicitudes de información, cotización o contacto.</li>
        <li>Dar seguimiento a la relación comercial y prestar nuestros servicios.</li>
        <li>Enviarte comunicaciones relacionadas con el servicio solicitado.</li>
        <li>Cumplir con obligaciones legales y contractuales aplicables.</li>
      </ul>
      <p>
        No utilizamos tus datos para fines distintos de los aquí señalados sin recabar tu
        consentimiento previo.
      </p>

      <h2 id="base">4. Base de legitimación</h2>
      <p>
        El tratamiento de tus datos se basa en tu consentimiento, otorgado al enviar el formulario de
        contacto, así como en el interés legítimo de atender tu solicitud y, en su caso, en la
        ejecución de una relación contractual.
      </p>

      <h2 id="conservacion">5. Conservación</h2>
      <p>
        Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas y,
        posteriormente, durante los plazos legales que resulten aplicables. Cuando dejen de ser
        necesarios, los eliminamos de forma segura.
      </p>

      <h2 id="transferencias">6. Comunicación a terceros</h2>
      <p>
        No vendemos ni rentamos tus datos personales. Podremos compartirlos únicamente con
        proveedores que nos prestan servicios (por ejemplo, alojamiento web o correo electrónico),
        bajo acuerdos de confidencialidad, o cuando exista una obligación legal de hacerlo.
      </p>

      <h2 id="derechos">7. Tus derechos</h2>
      <p>
        Puedes ejercer en todo momento tus derechos de acceso, rectificación, cancelación y oposición
        al tratamiento de tus datos, así como revocar el consentimiento otorgado. Para ello, envía tu
        solicitud a <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> indicando tu
        nombre y el derecho que deseas ejercer.
      </p>

      <h2 id="seguridad">8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra pérdida,
        uso indebido o acceso no autorizado. Ninguna transmisión por Internet es completamente segura,
        por lo que no podemos garantizar una seguridad absoluta.
      </p>

      <h2 id="cookies">9. Cookies</h2>
      <p>
        Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. En caso de
        incorporar cookies analíticas o de terceros, se solicitará tu consentimiento y se detallarán
        en un apartado específico.
      </p>

      <h2 id="cambios">10. Cambios a esta política</h2>
      <p>
        Podremos actualizar esta Política de Privacidad para reflejar cambios legales o en nuestros
        servicios. Publicaremos cualquier modificación en esta misma página, indicando la fecha de la
        última actualización.
      </p>

      <h2 id="contacto-privacidad">11. Contacto</h2>
      <p>
        Si tienes dudas sobre esta política o sobre el tratamiento de tus datos, escríbenos a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
