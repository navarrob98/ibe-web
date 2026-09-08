import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const pillars: { label: string; detail: string }[] = [
  {
    label: "Ingeniería",
    detail:
      "El servicio se diseña con rigor de ingeniería biomédica: procedimientos documentados y decisiones basadas en datos técnicos.",
  },
  {
    label: "Precisión",
    detail:
      "La instrumentación y los procedimientos de verificación están pensados para dejar cada dato registrado y consultable.",
  },
  {
    label: "Trazabilidad",
    detail:
      "Cada intervención queda enlazada al expediente digital del equipo: qué se hizo, cuándo y con qué evidencia.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow">Nosotros</span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Ingeniería biomédica con una operación diseñada desde la trazabilidad
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              {site.name} está preparando su inicio de operaciones en Tijuana con un enfoque
              claro: integrar el servicio técnico y la documentación de cada equipo en un proceso
              ordenado, transparente y verificable.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              No se trata solo de intervenir el equipo médico, sino de dejar evidencia de cada
              intervención.
            </p>

            <blockquote className="mt-9 border-l-2 border-aqua pl-5">
              <p className="font-heading text-xl font-semibold leading-snug text-navy">
                “{site.claim}.”
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line">
              {pillars.map((pillar, i) => (
                <Reveal
                  key={pillar.label}
                  delay={i * 80}
                  className="flex gap-6 bg-white p-7 sm:p-9"
                >
                  <span className="font-mono text-sm text-teal">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold text-navy-ink">{pillar.label}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-slate">{pillar.detail}</p>
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
