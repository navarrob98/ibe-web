import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const valueDetails: Record<string, string> = {
  Innovación:
    "Incorporamos herramientas y métodos actuales para anticipar fallas y extender la vida útil del equipo.",
  Precisión:
    "Trabajamos con instrumentos calibrados y procedimientos verificables. Cada dato queda registrado.",
  Confianza:
    "Construimos relaciones de largo plazo basadas en transparencia, cumplimiento y respuesta puntual.",
};

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow">Nosotros</span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Ingeniería al servicio de la vida
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              {site.name} nace de la convicción de que la tecnología médica solo cumple su propósito
              cuando funciona de forma segura y continua. Combinamos conocimiento de ingeniería
              biomédica con una operación disciplinada y cercana.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              No vendemos cajas: cuidamos el equipo que sostiene cada diagnóstico y cada tratamiento.
            </p>

            <blockquote className="mt-9 border-l-2 border-teal pl-5">
              <p className="font-heading text-xl font-semibold leading-snug text-navy">
                “{site.claim}.”
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line">
              {site.values.map((value, i) => (
                <Reveal
                  key={value}
                  delay={i * 80}
                  className="flex gap-6 bg-white p-7 sm:p-9"
                >
                  <span className="font-mono text-sm text-teal">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold text-navy-ink">{value}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-slate">
                      {valueDetails[value]}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
