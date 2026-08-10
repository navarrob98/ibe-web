import { instruments, type InstrumentUse } from "@/lib/site";
import { IconVitalSigns, IconOxygen, IconElectricalSafety } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

const useIcon: Record<InstrumentUse, typeof IconVitalSigns> = {
  "Simulación de paciente": IconVitalSigns,
  "Evaluación de oximetría": IconOxygen,
  "Pruebas de seguridad eléctrica": IconElectricalSafety,
};

export function Instrumentation() {
  return (
    <section aria-labelledby="instrumentacion-heading" className="border-b border-line bg-paper py-16 lg:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">Instrumentación</span>
            <h2 id="instrumentacion-heading" className="mt-3 text-xl font-extrabold leading-snug text-navy-ink sm:text-2xl">
              Instrumentación técnica disponible
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              IBEX está preparando su operación con instrumentación especializada de fabricantes
              reconocidos en el sector biomédico, para simulación de paciente, evaluación de
              oximetría y pruebas de seguridad eléctrica.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {instruments.map((item, i) => {
                const Icon = useIcon[item.use];
                return (
                  <Reveal as="li" key={item.model} delay={i * 60}>
                    <div className="group h-full rounded border border-line bg-white px-4 py-4 transition-colors duration-300 hover:border-teal">
                      <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-navy transition-colors duration-300 group-hover:border-teal group-hover:text-teal">
                        <Icon width={18} height={18} />
                      </span>
                      <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate-light">
                        {item.maker}
                      </p>
                      <p className="mt-0.5 font-heading text-sm font-bold text-navy-ink">{item.model}</p>
                      <p className="mt-1 text-xs leading-snug text-slate">{item.use}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-slate-light">
              La disponibilidad de este equipo no implica calibración vigente, trazabilidad ni
              acreditación. El alcance de cada dispositivo médico a cubrir se confirma caso por
              caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
