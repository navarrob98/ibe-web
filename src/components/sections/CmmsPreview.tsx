"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";

type TabKey = "equipos" | "ordenes" | "calibraciones" | "seguridad" | "certificados" | "calendario";
type Tone = "success" | "warning" | "info" | "neutral";

const TABS: { key: TabKey; label: string }[] = [
  { key: "equipos", label: "Equipos" },
  { key: "ordenes", label: "Órdenes" },
  { key: "calibraciones", label: "Calibraciones" },
  { key: "seguridad", label: "Seguridad eléctrica" },
  { key: "certificados", label: "Certificados" },
  { key: "calendario", label: "Calendario" },
];

const AUTOPLAY_MS = 4200;

const toneClass: Record<Tone, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  info: "border-aqua/40 bg-aqua/10 text-teal",
  neutral: "border-line text-slate-light",
};

function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[0.68rem] font-medium ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

function Row({
  title,
  subtitle,
  tone,
  tag,
}: {
  title: string;
  subtitle: string;
  tone: Tone;
  tag: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 border-t border-line-soft px-3 py-2.5 first:border-t-0">
      <div className="min-w-0">
        <p className="truncate text-[0.85rem] font-medium text-navy-ink">{title}</p>
        <p className="truncate text-xs text-slate-light">{subtitle}</p>
      </div>
      <Badge tone={tone}>{tag}</Badge>
    </li>
  );
}

const equiposTable = [
  { id: "DEMO-001", type: "Monitor de signos vitales", status: "Al día", tone: "success" as Tone },
  { id: "DEMO-002", type: "Bomba de infusión", status: "Calibración próxima", tone: "warning" as Tone },
  { id: "DEMO-003", type: "Electrobisturí", status: "Orden abierta", tone: "info" as Tone },
];

const ordenes = [
  { title: "OT-DEMO-001 · Mantenimiento preventivo", subtitle: "DEMO-002 · Bomba de infusión", tone: "info" as Tone, tag: "En proceso" },
  { title: "OT-DEMO-002 · Seguridad eléctrica", subtitle: "DEMO-001 · Monitor de signos vitales", tone: "neutral" as Tone, tag: "Programada" },
  { title: "OT-DEMO-003 · Mantenimiento correctivo", subtitle: "DEMO-003 · Electrobisturí", tone: "success" as Tone, tag: "Completada" },
];

const calibraciones = [
  { title: "DEMO-001 · Monitor de signos vitales", subtitle: "Próxima verificación: 22 ago 2026", tone: "warning" as Tone, tag: "Próxima" },
  { title: "DEMO-002 · Bomba de infusión", subtitle: "Próxima verificación: 12 sep 2026", tone: "neutral" as Tone, tag: "Calendarizada" },
  { title: "DEMO-003 · Electrobisturí", subtitle: "Última verificación: 15 jul 2026", tone: "success" as Tone, tag: "Vigente" },
];

const seguridad = [
  { title: "Prueba de fuga a tierra", subtitle: "DEMO-001 · Monitor de signos vitales", tone: "success" as Tone, tag: "Conforme" },
  { title: "Resistencia de puesta a tierra", subtitle: "DEMO-002 · Bomba de infusión", tone: "warning" as Tone, tag: "Pendiente" },
  { title: "Corriente de fuga en carcasa", subtitle: "DEMO-003 · Electrobisturí", tone: "success" as Tone, tag: "Conforme" },
];

const certificados = [
  { title: "Certificado de calibración", subtitle: "DEMO-001 · Emitido por el responsable del servicio", tone: "neutral" as Tone, tag: "PDF" },
  { title: "Reporte de seguridad eléctrica", subtitle: "DEMO-003 · Emitido por el responsable del servicio", tone: "neutral" as Tone, tag: "PDF" },
  { title: "Orden de trabajo firmada", subtitle: "OT-DEMO-001 · Mantenimiento preventivo", tone: "neutral" as Tone, tag: "PDF" },
];

const calendario = [
  { title: "15 ago · Mantenimiento preventivo", subtitle: "DEMO-002 · Bomba de infusión", tone: "info" as Tone, tag: "Programado" },
  { title: "22 ago · Calibración", subtitle: "DEMO-001 · Monitor de signos vitales", tone: "warning" as Tone, tag: "Próximo" },
  { title: "30 ago · Seguridad eléctrica", subtitle: "DEMO-003 · Electrobisturí", tone: "neutral" as Tone, tag: "Programado" },
];

function EquiposPanel() {
  return (
    <div className="overflow-x-auto rounded border border-line">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-paper text-[0.68rem] uppercase tracking-[0.08em] text-slate-light">
            <th scope="col" className="px-3 py-2 font-medium">Equipo</th>
            <th scope="col" className="px-3 py-2 font-medium">Tipo</th>
            <th scope="col" className="px-3 py-2 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody>
          {equiposTable.map((row) => (
            <tr key={row.id} className="border-t border-line-soft">
              <td className="px-3 py-2.5 font-mono text-[0.78rem] text-navy-ink">{row.id}</td>
              <td className="px-3 py-2.5 text-slate">{row.type}</td>
              <td className="px-3 py-2.5">
                <Badge tone={row.tone}>{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListPanel({ rows }: { rows: { title: string; subtitle: string; tone: Tone; tag: string }[] }) {
  return (
    <ul className="overflow-hidden rounded border border-line bg-white">
      {rows.map((row) => (
        <Row key={row.title} {...row} />
      ))}
    </ul>
  );
}

const panelHeading: Record<TabKey, string> = {
  equipos: "Equipos registrados",
  ordenes: "Órdenes de trabajo",
  calibraciones: "Calibraciones",
  seguridad: "Seguridad eléctrica",
  certificados: "Certificados y documentos",
  calendario: "Próximos vencimientos",
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export function CmmsPreview() {
  const [active, setActive] = useState<TabKey>("equipos");
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    equipos: null,
    ordenes: null,
    calibraciones: null,
    seguridad: null,
    certificados: null,
    calendario: null,
  });

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const i = TABS.findIndex((t) => t.key === cur);
        return TABS[(i + 1) % TABS.length].key;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, reducedMotion, active]);

  function selectTab(key: TabKey, focus = false) {
    setActive(key);
    setPlaying(false);
    if (focus) tabRefs.current[key]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent) {
    const i = TABS.findIndex((t) => t.key === active);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab(TABS[(i + 1) % TABS.length].key, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(TABS[(i - 1 + TABS.length) % TABS.length].key, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(TABS[0].key, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(TABS[TABS.length - 1].key, true);
    }
  }

  const panels: Record<TabKey, React.ReactNode> = {
    equipos: <EquiposPanel />,
    ordenes: <ListPanel rows={ordenes} />,
    calibraciones: <ListPanel rows={calibraciones} />,
    seguridad: <ListPanel rows={seguridad} />,
    certificados: <ListPanel rows={certificados} />,
    calendario: <ListPanel rows={calendario} />,
  };

  return (
    <div>
      <div
        role="status"
        className="mb-3 rounded border border-cyan/25 bg-cyan/[0.07] px-4 py-2.5 text-center text-xs font-medium text-cyan sm:text-left"
      >
        Datos demostrativos. No corresponden a hospitales, clientes ni pacientes reales.
      </div>

      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-white shadow-[0_30px_60px_-30px_rgba(10,23,48,0.55)]">
        {/* barra superior de la app */}
        <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-ink">
              IBEX CMMS — Institución demostrativa
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded text-slate-light hover:bg-line-soft hover:text-navy"
            aria-label={playing && !reducedMotion ? "Pausar demostración automática" : "Reanudar demostración automática"}
          >
            {playing && !reducedMotion ? <IconPause /> : <IconPlay />}
          </button>
        </div>

        {/* pestañas */}
        <div
          role="tablist"
          aria-label="Módulos del CMMS (vista de demostración)"
          onKeyDown={onTabKeyDown}
          className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[tab.key] = el;
                }}
                role="tab"
                id={`cmms-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls={`cmms-panel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(tab.key)}
                className={`relative shrink-0 whitespace-nowrap rounded px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                  isActive ? "bg-navy text-white" : "text-slate hover:bg-line-soft"
                }`}
              >
                {tab.label}
                {isActive && playing && !reducedMotion && (
                  <span
                    key={active}
                    aria-hidden="true"
                    className="absolute inset-x-1.5 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/25"
                  >
                    <span
                      className="block h-full bg-cyan cmms-progress-fill"
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* contenido de la pestaña activa */}
        <div className="p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate-light">
            {panelHeading[active]}
          </p>
          <div
            key={active}
            role="tabpanel"
            id={`cmms-panel-${active}`}
            aria-labelledby={`cmms-tab-${active}`}
            tabIndex={0}
            className="mt-2 cmms-fade-in"
          >
            {panels[active]}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
