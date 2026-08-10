/**
 * Configuración central de contenido y datos de contacto.
 *
 * IBEX Biomedical Solutions aún no ha iniciado operaciones: todo el
 * contenido debe redactarse en tiempo futuro / condicional ("está
 * preparando", "el modelo contempla") y no debe afirmar clientes,
 * resultados, certificaciones o estadísticas que no existen todavía.
 */

export const site = {
  name: "IBEX Biomedical Solutions",
  shortName: "IBEX",
  descriptor: "Ingeniería Biomédica de Excelencia",
  claim: "Soluciones inteligentes de tecnología para salvar vidas",
  values: ["Ingeniería", "Precisión", "Confianza"],
  url: "https://ibexbiomedical.com",
  // Enlazado desde el header. Confirma que este subdominio esté desplegado
  // con una pantalla real (login) antes de publicar: un enlace roto aquí
  // pesa más que no tener el botón.
  portalUrl: "https://portal.ibexbiomedical.com",

  contact: {
    // Correo temporal sobre el dominio anterior; migrar a @ibexbiomedical.com
    // solo cuando ese buzón esté confirmado y operativo (ver DEPLOY-CPANEL.md).
    email: "contacto@ibebiomedic.com",
    phone: "+52 664 504 3057",
    phoneHref: "+526645043057",
    location: "Tijuana, Baja California, México",
  },

  nav: [
    { label: "Servicios", href: "/#servicios" },
    { label: "CMMS", href: "/#cmms" },
    { label: "Proceso", href: "/#proceso" },
    { label: "Instituciones", href: "/#instituciones" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/#contacto" },
  ],
} as const;

/**
 * Alcance de cada servicio: si se prestará de forma directa, mediante un
 * aliado o en una etapa posterior es una decisión de negocio pendiente.
 * Hasta que se confirme, todos los servicios muestran una etiqueta neutral.
 */
export type ServiceKey =
  | "preventivo"
  | "correctivo"
  | "calibracion"
  | "seguridad-electrica"
  | "gestion"
  | "consultoria"
  | "capacitacion"
  | "documental";

export const services: {
  key: ServiceKey;
  index: string;
  title: string;
  description: string;
  points: string[];
  scopeLabel: string;
}[] = [
  {
    key: "preventivo",
    index: "01",
    title: "Mantenimiento preventivo",
    description:
      "Rutinas programadas para revisar el estado y funcionamiento de cada equipo antes de que falle, con evidencia documentada en el expediente digital.",
    points: ["Rutinas calendarizadas", "Bitácora digital por equipo", "Checklist técnico por modelo"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "correctivo",
    index: "02",
    title: "Mantenimiento correctivo",
    description:
      "Atención a fallas y reparaciones de equipo médico, con registro del diagnóstico, la intervención y las piezas utilizadas.",
    points: ["Diagnóstico documentado", "Registro de intervención", "Historial de fallas por equipo"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "calibracion",
    index: "03",
    title: "Calibración y verificación metrológica",
    description:
      "Verificación del desempeño de parámetros críticos del equipo médico. El certificado y los datos de calibración quedan centralizados en el expediente digital.",
    points: ["Verificación de parámetros", "Centralización de certificados", "Vencimientos calendarizados"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "seguridad-electrica",
    index: "04",
    title: "Seguridad eléctrica",
    description:
      "Pruebas de seguridad eléctrica sobre el equipo médico, con reporte por dispositivo integrado a su historial.",
    points: ["Pruebas por dispositivo", "Reporte de resultados", "Historial integrado al expediente"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "gestion",
    index: "05",
    title: "Inventario y gestión de tecnología biomédica",
    description:
      "Levantamiento e inventario técnico del parque de equipo médico de la institución, como base para planear su mantenimiento y ciclo de vida.",
    points: ["Inventario técnico", "Ficha por equipo", "Calendario de vencimientos"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "consultoria",
    index: "06",
    title: "Consultoría y equipamiento",
    description:
      "Asesoría técnica para la selección, adquisición y puesta en marcha de equipo médico en áreas clínicas.",
    points: ["Selección de equipo", "Especificaciones técnicas", "Acompañamiento en puesta en marcha"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "capacitacion",
    index: "07",
    title: "Capacitación",
    description:
      "Formación orientada al personal técnico y clínico sobre el uso y cuidado adecuado del equipo médico.",
    points: ["Material de apoyo", "Sesiones por equipo o área", "Enfoque en operación segura"],
    scopeLabel: "Alcance por confirmar",
  },
  {
    key: "documental",
    index: "08",
    title: "Acompañamiento documental",
    description:
      "Organización y centralización de la evidencia técnica de cada equipo para apoyar procesos internos de revisión o auditoría de la institución.",
    points: ["Expedientes por equipo", "Evidencia centralizada", "Reportes exportables"],
    scopeLabel: "Alcance por confirmar",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Registro de la institución",
    description:
      "La institución registra sus datos y necesidades, y comparte el contexto de su parque de equipo médico.",
  },
  {
    index: "02",
    title: "Revisión de inventario y alcance",
    description:
      "Se revisa el inventario disponible y se define, en conjunto, el alcance del servicio aplicable a cada equipo.",
  },
  {
    index: "03",
    title: "Programación del servicio",
    description:
      "El servicio aplicable se programa o coordina según la criticidad y disponibilidad de cada equipo.",
  },
  {
    index: "04",
    title: "Evidencia centralizada",
    description:
      "Las evidencias técnicas de cada intervención se entregan y centralizan en el expediente digital del equipo.",
  },
];

export const institutionTypes = [
  "Hospitales públicos y privados",
  "Clínicas y consultorios",
  "Laboratorios clínicos",
  "Centros de imagenología",
  "Unidades especializadas",
  "Consultorios independientes",
];

/** Capacidades del modelo de servicio — no son resultados históricos. */
export const capabilities = [
  {
    label: "Expediente digital por equipo",
    detail: "Un historial técnico centralizado, propio de cada equipo médico.",
  },
  {
    label: "Trazabilidad de cada intervención",
    detail: "Registro ordenado de lo realizado, cuándo y por qué motivo.",
  },
  {
    label: "Órdenes de trabajo documentadas",
    detail: "Cada servicio queda respaldado por una orden de trabajo con evidencia.",
  },
  {
    label: "Reportes y certificados centralizados",
    detail: "Los documentos generados se concentran en un mismo lugar.",
  },
  {
    label: "Acceso documental por institución",
    detail: "La plataforma permite que cada institución consulte la información de su propio equipo.",
  },
  {
    label: "Inventario y calendario técnico",
    detail: "Vista del parque de equipo médico y sus próximos vencimientos.",
  },
  {
    label: "Mantenimiento, calibración y seguridad eléctrica integrados",
    detail: "Un mismo modelo para los distintos tipos de intervención técnica.",
  },
];

/** Instrumentación técnica disponible — sin afirmar calibración o acreditación vigente. */
export const instruments = [
  { model: "Pronk SimCube", use: "Simulación de paciente" },
  { model: "Pronk SimSlim 8", use: "Simulación de paciente" },
  { model: "Pronk OxSim", use: "Evaluación de oximetría" },
  { model: "Fluke ESA612", use: "Pruebas de seguridad eléctrica" },
];

/** Contenido del módulo CMMS — todos los datos mostrados son demostrativos. */
export const cmmsFeatures = [
  "Instituciones y equipos",
  "Inventario técnico",
  "Órdenes de trabajo",
  "Mantenimientos",
  "Reportes de servicio",
  "Calibraciones",
  "Pruebas de seguridad eléctrica",
  "Certificados y documentos",
  "Calendario y vencimientos",
  "Trazabilidad por equipo",
  "Portal de acceso documental por institución",
];

export const contactServiceOptions = [
  "Mantenimiento preventivo",
  "Mantenimiento correctivo",
  "Calibración y verificación metrológica",
  "Seguridad eléctrica",
  "Inventario y gestión de tecnología biomédica",
  "Consultoría y equipamiento",
  "Capacitación",
  "Acompañamiento documental",
  "Aún no lo sé",
] as const;

export const contactIntentOptions = [
  "Solicitar información",
  "Hablar sobre mi inventario",
  "Recibir aviso de apertura",
] as const;

export const contactEquipmentRangeOptions = [
  "1 a 10",
  "11 a 50",
  "51 a 150",
  "Más de 150",
  "No lo sé todavía",
] as const;
