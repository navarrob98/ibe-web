import { capabilities } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { IconCheck } from "@/components/Icons";

export function Capabilities() {
  return (
    <section className="border-b border-line bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow">Capacidades</span>
            <h2 className="mt-4 max-w-2xl text-[2rem] font-extrabold leading-tight text-navy-ink sm:text-[2.5rem]">
              Lo que el modelo de servicio está diseñado para ofrecer
            </h2>
          </div>
          <p className="text-slate lg:col-span-4 lg:text-right">
            IBEX está preparando su operación alrededor de una plataforma que documenta cada
            intervención, no solo la ejecuta.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal
              as="li"
              key={c.label}
              delay={(i % 4) * 70}
              className="flex flex-col gap-3 bg-white p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-teal">
                <IconCheck width={17} height={17} />
              </span>
              <div>
                <p className="font-heading text-base font-bold leading-snug text-navy-ink">
                  {c.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
