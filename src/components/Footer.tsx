import Link from "next/link";
import Image from "next/image";
import { IconMail, IconPhone, IconPin } from "./Icons";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-ink text-white/80">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/brand/logo-horizontal-light.png"
              alt="IBEX Biomedical Solutions"
              width={1200}
              height={300}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
              {site.descriptor}. {site.claim}.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {site.values.map((v) => (
                <span key={v} className="eyebrow" style={{ color: "var(--color-cyan)" }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="space-y-3 text-[0.95rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/65 transition-colors hover:text-cyan">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-4 text-[0.95rem]">
              <li className="flex items-start gap-3">
                <IconMail width={18} height={18} className="mt-0.5 shrink-0 text-cyan" />
                <a href={`mailto:${site.contact.email}`} className="text-white/70 hover:text-cyan">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconPhone width={18} height={18} className="mt-0.5 shrink-0 text-cyan" />
                <a href={`tel:${site.contact.phoneHref}`} className="text-white/70 hover:text-cyan">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconPin width={18} height={18} className="mt-0.5 shrink-0 text-cyan" />
                <span className="text-white/70">{site.contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.85rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacidad" className="hover:text-cyan">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-cyan">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
