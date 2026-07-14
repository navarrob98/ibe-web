import { ContactForm } from "@/components/ContactForm";
import { IconMail, IconPhone, IconPin, IconClock } from "@/components/Icons";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-line bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">Contacto</span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Hablemos de tu parque tecnológico
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Cuéntanos qué necesitas y te proponemos un plan de diagnóstico sin compromiso.
              Respondemos en menos de 24 horas hábiles.
            </p>

            <ul className="mt-10 space-y-6">
              <ContactItem icon={<IconMail width={20} height={20} />} label="Correo">
                <a href={`mailto:${site.contact.email}`} className="link-underline text-navy">
                  {site.contact.email}
                </a>
              </ContactItem>
              <ContactItem icon={<IconPhone width={20} height={20} />} label="Teléfono">
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline text-navy">
                  {site.contact.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<IconPin width={20} height={20} />} label="Ubicación">
                {site.contact.location}
              </ContactItem>
              <ContactItem icon={<IconClock width={20} height={20} />} label="Horario">
                {site.contact.hours}
              </ContactItem>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-line bg-white text-teal">
        {icon}
      </span>
      <div>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-light">
          {label}
        </p>
        <p className="mt-1 font-medium text-navy-ink">{children}</p>
      </div>
    </li>
  );
}
