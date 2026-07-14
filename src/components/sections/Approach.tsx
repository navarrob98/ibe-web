import { approach } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section id="enfoque" className="scroll-mt-20 bg-navy-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-cyan" aria-hidden="true" />
            <span className="eyebrow" style={{ color: "var(--color-cyan)" }}>
              Cómo trabajamos
            </span>
          </div>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white sm:text-[2.5rem]">
            Un método claro, medible y trazable
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Cada intervención sigue un proceso estructurado. Sabes qué se hace, cuándo y con qué
            resultado.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((step, i) => (
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
