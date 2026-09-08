import { processSteps } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section id="proceso" className="scroll-mt-20 bg-navy-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-cyan)" }}>
            Proceso
          </span>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white sm:text-[2.5rem]">
            De la solicitud a la evidencia final
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Así está diseñado el proceso operativo del modelo de servicio, del primer contacto a
            la evidencia documentada de cada intervención.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 80}
              className="relative bg-navy-ink p-7 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <span className="font-mono text-3xl font-light text-cyan/40">{step.index}</span>
              <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/60">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
