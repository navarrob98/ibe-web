import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "@/components/Icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="absolute right-0 top-0 hidden h-full w-px bg-line lg:block lg:left-[58%]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1180px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Columna editorial */}
        <div className="lg:col-span-7 lg:pr-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-teal" aria-hidden="true" />
            <span className="eyebrow">{site.descriptor}</span>
          </div>

          <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.04] tracking-tight text-navy-ink sm:text-[3.2rem] lg:text-[3.6rem]">
            Tecnología médica
            <br />
            que opera{" "}
            <span className="relative whitespace-nowrap text-navy">
              sin paros
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-teal" aria-hidden="true" />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
            Ingeniería biomédica especializada en mantenimiento, calibración y gestión del equipo
            clínico. Mantenemos tus equipos seguros, disponibles y en cumplimiento, para que tu
            atención nunca se detenga.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contacto" className="btn btn-primary">
              Solicitar diagnóstico
              <IconArrowUpRight width={16} height={16} />
            </Link>
            <Link href="/#servicios" className="btn btn-ghost">
              Ver servicios
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {["Técnicos certificados", "Refacciones trazables", "Atención en sitio"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-navy-ink">
                <IconCheck width={17} height={17} className="text-teal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Panel visual — monitor biomédico */}
        <div className="lg:col-span-5">
          <MonitorPanel />
        </div>
      </div>
    </section>
  );
}

function MonitorPanel() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[6px] border border-navy/15 bg-navy-ink shadow-[0_30px_60px_-30px_rgba(0,26,71,0.55)]">
        {/* barra superior del panel */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan">
            Monitor · IBEX-04
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Operativo
          </span>
        </div>

        {/* área de señal */}
        <div className="relative px-5 pb-6 pt-7">
          <svg viewBox="0 0 360 150" className="w-full" role="img" aria-label="Señal de monitoreo de equipo">
            <defs>
              <pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M30 0H0V30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="360" height="150" fill="url(#g)" />
            <path
              d="M0 95 H70 l10 -8 8 16 9 -52 11 70 9 -26 H150 l12 -34 9 60 8 -26 H360"
              fill="none"
              stroke="#00b3c6"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="95" r="2.5" fill="#6cd8d8" />
          </svg>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { k: "Disponibilidad", v: "99.2", u: "%" },
              { k: "Equipos", v: "184", u: "activos" },
              { k: "Servicios", v: "12", u: "/ mes" },
            ].map((m) => (
              <div key={m.k} className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
                  {m.k}
                </p>
                <p className="mt-1.5 font-heading text-xl font-bold text-white">
                  {m.v}
                  <span className="ml-1 text-[0.62rem] font-normal text-cyan">{m.u}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* etiqueta flotante */}
      <div className="absolute -bottom-4 -left-3 hidden rounded border border-line bg-white px-4 py-3 shadow-[var(--shadow-lift)] sm:block">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-slate-light">
          Próximo servicio
        </p>
        <p className="mt-1 text-sm font-semibold text-navy-ink">Calibración programada</p>
      </div>
    </div>
  );
}
