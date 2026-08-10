import { instruments } from "@/lib/site";

export function Instrumentation() {
  return (
    <section aria-labelledby="instrumentacion-heading" className="border-b border-line bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h2 id="instrumentacion-heading" className="text-lg font-bold text-navy-ink">
              Instrumentación técnica disponible
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              IBEX está preparando su operación con instrumentación especializada para simulación
              de paciente, evaluación de oximetría y pruebas de seguridad eléctrica. La
              disponibilidad de este equipo no implica calibración vigente, trazabilidad ni
              acreditación, y el alcance de cada dispositivo médico a cubrir se confirma caso por
              caso.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {instruments.map((item) => (
              <li key={item.model} className="rounded border border-line bg-paper px-4 py-3.5">
                <p className="font-heading text-sm font-bold text-navy-ink">{item.model}</p>
                <p className="mt-1 text-xs leading-snug text-slate-light">{item.use}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
