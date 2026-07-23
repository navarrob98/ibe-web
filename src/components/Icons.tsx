/**
 * Iconografía propia de IBEX — trazo coherente (1.6px), 24×24, currentColor.
 * Sin librerías externas ni emojis: cada icono está dibujado a mano.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconMaintenance(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5a3.5 3.5 0 0 0-4.6 4.4L4 15.8a2 2 0 1 0 2.8 2.8l5.9-5.9a3.5 3.5 0 0 0 4.4-4.6l-2.3 2.3-2.2-.6-.6-2.2 2.5-2.1Z" />
      <circle cx="5.6" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function IconCalibration(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-4" />
      <circle cx="12" cy="16" r="1.1" />
      <path d="M4 16h1.5M18.5 16H20M12 8.5V10" />
    </svg>
  );
}

export function IconManagement(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <path d="M13 16.5h7M16.5 13v7" />
    </svg>
  );
}

export function IconConsulting(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V17h5.4v-1.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
      <path d="M9.6 20h4.8M10.3 17h3.4" />
    </svg>
  );
}

export function IconTraining(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 3 8.5 12 13l9-4.5L12 4Z" />
      <path d="M7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" />
      <path d="M21 8.5V14" />
    </svg>
  );
}

export function IconCompliance(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 5.6v5c0 4 2.9 7.4 7 8.4 4.1-1 7-4.4 7-8.4v-5L12 3Z" />
      <path d="m9.2 11.6 1.9 1.9 3.7-3.8" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 4h3l1.2 3.5-1.8 1.3a11 11 0 0 0 4.5 4.5l1.3-1.8L18 12.5v3a1.5 1.5 0 0 1-1.6 1.5A12.5 12.5 0 0 1 5 5.6 1.5 1.5 0 0 1 6.5 4Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 5.5L20 7" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c4.5-4.2 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 2.5 6.8 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1.3-3.7A7.5 7.5 0 1 1 8 19.1L4 20Z" />
      <path d="M9.2 8.6c-.2.6 0 1.6.6 2.6.7 1.1 1.7 2 2.8 2.5 1 .4 1.8.3 2.3 0" />
    </svg>
  );
}

export const serviceIcons = {
  mantenimiento: IconMaintenance,
  calibracion: IconCalibration,
  gestion: IconManagement,
  consultoria: IconConsulting,
  capacitacion: IconTraining,
  cumplimiento: IconCompliance,
};
