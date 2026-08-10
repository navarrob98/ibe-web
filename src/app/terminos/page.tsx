import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones (documento provisional)",
  description:
    "Condiciones provisionales de uso del sitio web de IBEX Biomedical Solutions y de la información que en él se ofrece.",
};

// NOTA INTERNA: documento provisional redactado a partir de la información
// disponible en el repositorio; no ha sido revisado por un asesor legal.
// Antes de publicarlo como definitivo, debe confirmarse la razón social,
// el domicilio y la legislación/jurisdicción aplicable.
export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      subtitle="Condiciones provisionales que regulan el acceso y uso de este sitio web y de los contenidos publicados en él."
      updated="9 de agosto de 2026"
    >
      <div className="mb-8 rounded border border-teal/30 bg-teal/[0.05] px-5 py-4 text-[0.95rem] leading-relaxed text-navy-ink">
        <strong>Este es un documento provisional.</strong> Aún no ha sido revisado por un asesor
        legal ni confirma la razón social, el domicilio o la jurisdicción aplicable de IBEX
        Biomedical Solutions. Se publica para dejar clara la naturaleza informativa del sitio
        mientras IBEX prepara su inicio de operaciones.
      </div>

      <p>
        Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de{" "}
        <strong>{site.name}</strong> (en adelante, “el Sitio”). Al navegar o utilizar el Sitio,
        aceptas quedar vinculado por estos términos. Si no estás de acuerdo, te pedimos no
        utilizarlo.
      </p>

      <h2 id="objeto">1. Objeto</h2>
      <p>
        El Sitio tiene como finalidad presentar el proyecto {site.name}, explicar su modelo de
        servicio previsto y facilitar el registro de interés de personas u organizaciones antes
        del inicio de operaciones. La información mostrada tiene carácter general e informativo y
        no constituye una oferta comercial vinculante.
      </p>

      <h2 id="uso">2. Uso del sitio</h2>
      <p>Al utilizar el Sitio, te comprometes a:</p>
      <ul>
        <li>Hacer un uso lícito, conforme a estos términos y a la legislación vigente.</li>
        <li>No introducir información falsa, engañosa o que vulnere derechos de terceros.</li>
        <li>
          No realizar acciones que puedan dañar, sobrecargar o afectar el funcionamiento del Sitio.
        </li>
        <li>No intentar acceder de forma no autorizada a sistemas o datos asociados al Sitio.</li>
      </ul>

      <h2 id="servicios">3. Sobre los servicios descritos</h2>
      <p>
        {site.name} aún no ha iniciado operaciones. Las categorías de servicio descritas en el
        Sitio corresponden al modelo que se está preparando y no representan servicios ya
        prestados. El alcance, las condiciones y los precios de cualquier servicio, así como si se
        prestará de forma directa o a través de terceros, se definirán en una propuesta o contrato
        específico, formalizado de manera independiente con {site.name}.
      </p>

      <h2 id="propiedad">4. Propiedad intelectual</h2>
      <p>
        La marca, el logotipo, los textos, el diseño, las imágenes y demás elementos del Sitio son
        propiedad de {site.name} o de sus titulares, y están protegidos por la legislación de
        propiedad intelectual e industrial aplicable. Queda prohibida su reproducción,
        distribución o modificación sin autorización expresa y por escrito.
      </p>

      <h2 id="responsabilidad">5. Limitación de responsabilidad</h2>
      <p>
        {site.name} procura que la información del Sitio sea correcta y esté actualizada, pero no
        garantiza la ausencia de errores ni la disponibilidad ininterrumpida del Sitio. En la
        medida permitida por la ley, no será responsable por daños derivados del uso o la
        imposibilidad de uso del Sitio.
      </p>

      <h2 id="enlaces">6. Enlaces a terceros</h2>
      <p>
        El Sitio puede contener enlaces a sitios de terceros. No controlamos ni respondemos por el
        contenido o las prácticas de privacidad de dichos sitios; su acceso es bajo tu propia
        responsabilidad.
      </p>

      <h2 id="privacidad">7. Privacidad</h2>
      <p>
        El tratamiento de los datos personales que nos proporciones a través del formulario de
        contacto se rige por nuestro{" "}
        <a href="/privacidad">Aviso de privacidad provisional</a>, que forma parte integral de
        estos términos.
      </p>

      <h2 id="modificaciones">8. Modificaciones</h2>
      <p>
        Podremos modificar estos Términos y Condiciones en cualquier momento, especialmente
        conforme avance la revisión legal y se acerque el inicio de operaciones. Las
        modificaciones entrarán en vigor desde su publicación en esta página.
      </p>

      <h2 id="legislacion">9. Legislación aplicable</h2>
      <p>
        La legislación y jurisdicción aplicables a estos términos se confirmarán junto con la
        revisión legal del Sitio y se indicarán en esta sección cuando estén definidas.
      </p>

      <h2 id="contacto-terminos">10. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos, puedes escribirnos a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
