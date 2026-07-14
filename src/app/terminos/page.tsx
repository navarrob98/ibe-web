import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio web de IBE Biomedical Solutions y de la información que en él se ofrece.",
};

export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      subtitle="Condiciones que regulan el acceso y uso de este sitio web y de los contenidos publicados en él."
      updated="5 de junio de 2026"
    >
      <p>
        Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de{" "}
        <strong>{site.name}</strong> (en adelante, “el Sitio”). Al navegar o utilizar el Sitio,
        aceptas quedar vinculado por estos términos. Si no estás de acuerdo, te pedimos no utilizarlo.
      </p>
      <p>
        <strong>Aviso:</strong> este documento es una plantilla de referencia y debe ser revisado y
        adaptado por un asesor legal conforme a la legislación aplicable antes de su publicación.
      </p>

      <h2 id="objeto">1. Objeto</h2>
      <p>
        El Sitio tiene como finalidad ofrecer información sobre los servicios de ingeniería biomédica
        de {site.name}, así como facilitar el contacto con personas interesadas en dichos servicios.
        La información mostrada tiene carácter general e informativo.
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

      <h2 id="servicios">3. Sobre los servicios</h2>
      <p>
        La información sobre servicios publicada en el Sitio no constituye una oferta vinculante. El
        alcance, las condiciones y los precios de cualquier servicio se definirán en una propuesta o
        contrato específico, formalizado de manera independiente con {site.name}.
      </p>

      <h2 id="propiedad">4. Propiedad intelectual</h2>
      <p>
        La marca, el logotipo, los textos, el diseño, las imágenes y demás elementos del Sitio son
        propiedad de {site.name} o de sus titulares, y están protegidos por la legislación de
        propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o
        modificación sin autorización expresa y por escrito.
      </p>

      <h2 id="responsabilidad">5. Limitación de responsabilidad</h2>
      <p>
        {site.name} procura que la información del Sitio sea correcta y esté actualizada, pero no
        garantiza la ausencia de errores ni la disponibilidad ininterrumpida del servicio. En la
        medida permitida por la ley, no seremos responsables por daños derivados del uso o la
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
        El tratamiento de los datos personales que nos proporciones se rige por nuestra{" "}
        <a href="/privacidad">Política de Privacidad</a>, que forma parte integral de estos términos.
      </p>

      <h2 id="modificaciones">8. Modificaciones</h2>
      <p>
        Podremos modificar estos Términos y Condiciones en cualquier momento. Las modificaciones
        entrarán en vigor desde su publicación en esta página. Te recomendamos revisarlos
        periódicamente.
      </p>

      <h2 id="legislacion">9. Legislación aplicable</h2>
      <p>
        Estos términos se rigen por la legislación aplicable en el domicilio de {site.name}. Cualquier
        controversia se someterá a los tribunales competentes de dicha jurisdicción, salvo que la ley
        disponga lo contrario.
      </p>

      <h2 id="contacto-terminos">10. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos, puedes escribirnos a{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
