import Link from "next/link";
import { IconArrowUpRight } from "@/components/Icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="absolute right-0 top-0 hidden h-full w-px bg-line lg:block lg:left-[58%]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1180px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Columna editorial */}
        <div className="lg:col-span-7 lg:pr-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/[0.06] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy">
              Próximo inicio de operaciones en Tijuana y Baja California
            </span>
          </div>

          <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy-ink sm:text-[3rem] lg:text-[3.4rem]">
            Tecnología médica segura, disponible y{" "}
            <span className="relative whitespace-nowrap text-navy">
              documentada
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-teal" aria-hidden="true" />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
            Estamos construyendo una nueva forma de gestionar el servicio biomédico en Tijuana y
            Baja California: mantenimiento, verificaciones técnicas y trazabilidad digital de cada
            equipo, desde la solicitud hasta la evidencia final.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contacto" className="btn btn-primary">
              Solicitar información
              <IconArrowUpRight width={16} height={16} />
            </Link>
            <Link href="/#servicios" className="btn btn-ghost">
              Conocer el modelo de servicio
            </Link>
          </div>

          <p className="mt-10 font-heading text-base font-semibold italic text-navy/80">
            “{site.claim}”
          </p>
        </div>

        {/* Panel visual — vista previa del expediente digital (CMMS) */}
        <div className="lg:col-span-5">
          <RecordPreviewPanel />
        </div>
      </div>
    </section>
  );
}

function RecordPreviewPanel() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[6px] border border-navy/15 bg-navy-ink shadow-[0_30px_60px_-30px_rgba(0,26,71,0.55)]">
        {/* barra superior del panel */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan">
            Vista previa · Expediente digital
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-teal/70" /> Demo
          </span>
        </div>

        {/* contenido demostrativo */}
        <div className="px-5 pb-6 pt-6">
          <div className="rounded border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/45">Equipo</p>
            <p className="mt-1 font-heading text-base font-bold text-white">DEMO-001</p>
            <p className="mt-0.5 text-xs text-white/55">Institución demostrativa</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { k: "Última orden", v: "OT-DEMO-001" },
              { k: "Estado", v: "Documentado" },
            ].map((m) => (
              <div key={m.k} className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/45">
                  {m.k}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">{m.v}</p>
              </div>
            ))}
          </div>

          <ul className="mt-3 space-y-1.5">
            {["Mantenimiento", "Calibración", "Seguridad eléctrica"].map((row) => (
              <li
                key={row}
                className="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/65"
              >
                {row}
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cyan/70">
                  Pendiente
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 text-center text-[0.68rem] leading-snug text-slate-light lg:text-left">
        Datos demostrativos. No corresponden a hospitales, clientes ni pacientes reales.
      </p>
    </div>
  );
}
