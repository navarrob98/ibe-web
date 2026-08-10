import { institutionTypes } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { IconPlus } from "@/components/Icons";

export function Sectors() {
  return (
    <section id="instituciones" className="scroll-mt-20 border-b border-line bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Instituciones</span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Diseñado para instituciones que necesitan mayor control documental
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Hospitales, clínicas, consultorios, laboratorios, centros de imagenología y unidades
              especializadas que busquen organizar el mantenimiento y la trazabilidad de su
              tecnología médica.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid overflow-hidden rounded-[6px] border border-line bg-white sm:grid-cols-2">
              {institutionTypes.map((sector, i) => (
                <Reveal
                  as="li"
                  key={sector}
                  delay={(i % 2) * 60}
                  className="group flex items-center gap-4 border-b border-line p-6 transition-colors duration-300 last:border-b-0 hover:bg-paper sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-slate-light transition-colors group-hover:border-teal group-hover:text-teal">
                    <IconPlus width={16} height={16} />
                  </span>
                  <span className="font-heading font-semibold text-navy-ink">{sector}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
