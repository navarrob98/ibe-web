import { cmmsFeatures } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { IconCheck } from "@/components/Icons";
import { CmmsPreview } from "@/components/sections/CmmsPreview";

export function Cmms() {
  return (
    <section id="cmms" className="scroll-mt-20 border-b border-white/10 bg-navy-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid min-w-0 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <span className="eyebrow" style={{ color: "var(--color-cyan)" }}>
              CMMS
            </span>
            <h2 className="mt-5 text-[2rem] font-extrabold leading-tight text-white sm:text-[2.5rem]">
              Todo el historial técnico de tus equipos en un solo lugar
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              El modelo de servicio incorpora una plataforma de gestión de mantenimiento (CMMS)
              como parte del propio servicio, no como un producto aparte. La plataforma permite
              concentrar instituciones, equipos, órdenes de trabajo y documentos en un mismo
              expediente digital.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {cmmsFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                  <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-cyan" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <CmmsPreview />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
