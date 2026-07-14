import { sectors, capabilities } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { IconPlus } from "@/components/Icons";

export function Sectors() {
  return (
    <section id="sectores" className="scroll-mt-20 border-b border-line bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Sectores</span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Donde la tecnología no puede fallar
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Acompañamos a instituciones de salud de distinta escala. Adaptamos el alcance del
              servicio a la criticidad de cada área.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              {capabilities.map((c) => (
                <div key={c.label} className="border-l-2 border-teal pl-4">
                  <dt className="font-heading text-base font-bold text-navy-ink">{c.label}</dt>
                  <dd className="mt-1 text-sm leading-snug text-slate">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid overflow-hidden rounded-[6px] border border-line bg-white sm:grid-cols-2">
              {sectors.map((sector, i) => (
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
