/**
 * Configuración central de contenido y datos de contacto.
 * Reemplaza los datos de contacto por los reales antes de publicar.
 */

export const site = {
  name: "IBEX Biomedical Solutions",
  shortName: "IBEX",
  descriptor: "Ingeniería Biomédica de Excelencia",
  claim: "Soluciones inteligentes de tecnología para salvar vidas",
  values: ["Ingeniería", "Precisión", "Confianza"],
  url: "https://www.ibebiomedic.com",
  // TODO: reemplazar con la URL real del Portal de Clientes en cuanto esté publicado.
  portalUrl: "#",

  contact: {
    email: "contacto@ibebiomedic.com",
    phone: "+52 664 504 3057",
    phoneHref: "+526645043057",
    whatsapp: "+52 664 504 3057",
    location: "Tijuana, Baja California, México",
    hours: "Lunes a viernes, 9:00 – 18:00",
  },

  nav: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Enfoque", href: "/#enfoque" },
    { label: "Sectores", href: "/#sectores" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/#contacto" },
  ],
} as const;

export type ServiceKey =
  | "mantenimiento"
  | "calibracion"
  | "gestion"
  | "consultoria"
  | "capacitacion"
  | "cumplimiento";

export const services: {
  key: ServiceKey;
  index: string;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    key: "mantenimiento",
    index: "01",
    title: "Mantenimiento preventivo y correctivo",
    description:
      "Programas de mantenimiento para equipo médico con trazabilidad documental y reducción de tiempos de paro.",
    points: ["Rutinas calendarizadas", "Bitácora por equipo", "Refacciones rastreables"],
  },
  {
    key: "calibracion",
    index: "02",
    title: "Calibración y verificación metrológica",
    description:
      "Calibración con patrones trazables y verificación de desempeño bajo la normativa vigente.",
    points: ["Patrones trazables", "Certificado de servicio", "Verificación de seguridad eléctrica"],
  },
  {
    key: "gestion",
    index: "03",
    title: "Gestión de tecnología biomédica",
    description:
      "Inventario, ciclo de vida y planeación de reemplazo de tu parque tecnológico clínico.",
    points: ["Inventario técnico", "Análisis de obsolescencia", "Plan de reemplazo"],
  },
  {
    key: "consultoria",
    index: "04",
    title: "Consultoría y equipamiento",
    description:
      "Asesoría técnica para la adquisición, diseño y puesta en marcha de áreas clínicas.",
    points: ["Diseño de áreas", "Selección de equipo", "Puesta en marcha"],
  },
  {
    key: "capacitacion",
    index: "05",
    title: "Capacitación clínica",
    description:
      "Formación a personal médico y técnico para la operación segura de los dispositivos.",
    points: ["Operación segura", "Buenas prácticas", "Material de apoyo"],
  },
  {
    key: "cumplimiento",
    index: "06",
    title: "Acompañamiento normativo",
    description:
      "Soporte documental para auditorías y procesos de certificación de tecnología médica.",
    points: ["Expedientes técnicos", "Preparación de auditorías", "Gestión de evidencias"],
  },
];

export const approach = [
  {
    index: "01",
    title: "Diagnóstico",
    description:
      "Evaluamos el estado, riesgo y criticidad de cada equipo de tu parque tecnológico.",
  },
  {
    index: "02",
    title: "Plan a la medida",
    description:
      "Diseñamos un programa con alcance, frecuencias e indicadores claros y medibles.",
  },
  {
    index: "03",
    title: "Ejecución",
    description:
      "Intervenimos con técnicos certificados, instrumentos calibrados y refacciones trazables.",
  },
  {
    index: "04",
    title: "Seguimiento",
    description:
      "Entregamos reportes, métricas de cumplimiento y recomendaciones de mejora continua.",
  },
];

export const sectors = [
  "Hospitales públicos y privados",
  "Clínicas y consultorios",
  "Laboratorios clínicos",
  "Centros de imagenología",
  "Unidades de cuidados intensivos",
  "Centros de especialidades",
];

export const capabilities = [
  { label: "Atención en sitio", detail: "Cobertura programada y por demanda" },
  { label: "Respuesta ágil", detail: "Tiempos de atención acordados por contrato" },
  { label: "Técnicos certificados", detail: "Personal con formación en ingeniería biomédica" },
  { label: "Trazabilidad total", detail: "Historial documental por cada equipo" },
];
