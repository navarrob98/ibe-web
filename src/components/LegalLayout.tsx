import Link from "next/link";
import { IconArrow } from "./Icons";

export function LegalLayout({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[820px] px-5 py-14 sm:px-8 lg:py-20">
          <Link
            href="/"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-slate"
          >
            <IconArrow width={16} height={16} className="rotate-180" />
            Volver al inicio
          </Link>
          <span className="eyebrow mt-8 block">Documento legal</span>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate">{subtitle}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-slate-light">
            Última actualización: {updated}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[820px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="legal-prose">{children}</div>
      </div>
    </article>
  );
}
