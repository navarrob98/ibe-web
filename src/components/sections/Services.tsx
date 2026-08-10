import { services } from "@/lib/site";
import { serviceIcons, IconCheck } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

const iconByKey = {
  preventivo: serviceIcons.mantenimiento,
  correctivo: serviceIcons.mantenimiento,
  calibracion: serviceIcons.calibracion,
  "seguridad-electrica": serviceIcons.calibracion,
  gestion: serviceIcons.gestion,
  consultoria: serviceIcons.consultoria,
  capacitacion: serviceIcons.capacitacion,
  documental: serviceIcons.cumplimiento,
} as const;

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow">Servicios</span>
            <h2 className="mt-4 max-w-2xl text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              El ciclo completo del equipo médico, en un solo modelo
            </h2>
          </div>
          <p className="text-slate lg:col-span-4 lg:text-right">
            El servicio contempla procesos documentados de principio a fin. La forma de
            entregarlos —directa, mediante aliados o por etapas— sigue por confirmarse.
          </p>
        </div>

        <div className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconByKey[service.key];
            return (
              <Reveal
                key={service.key}
                delay={(i % 3) * 70}
                className="group relative border-b border-line p-7 transition-colors duration-300 hover:bg-paper sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded border border-line bg-white text-navy transition-colors duration-300 group-hover:border-teal group-hover:text-teal">
                    <Icon width={22} height={22} />
                  </span>
                  <span className="eyebrow-index">{service.index}</span>
                </div>

                <h3 className="mt-6 text-lg font-bold leading-snug text-navy-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy-ink/80">
                      <IconCheck width={15} height={15} className="text-teal" />
                      {p}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-block rounded-full border border-line-soft bg-paper px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-slate-light">
                  {service.scopeLabel}
                </span>

                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
