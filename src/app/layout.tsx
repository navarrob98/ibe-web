import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#002460",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "IBEX Biomedical Solutions | Gestión biomédica en Tijuana",
    template: `%s — ${site.name}`,
  },
  description:
    "Próximo inicio de operaciones en Tijuana y Baja California. Mantenimiento, verificaciones técnicas y trazabilidad digital para la gestión de equipo médico.",
  keywords: [
    "ingeniería biomédica Tijuana",
    "mantenimiento de equipo médico Baja California",
    "calibración de equipo médico",
    "gestión de tecnología biomédica",
    "CMMS biomédico",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "IBEX Biomedical Solutions | Gestión biomédica en Tijuana",
    description:
      "Próximo inicio de operaciones en Tijuana y Baja California. Mantenimiento, verificaciones técnicas y trazabilidad digital para la gestión de equipo médico.",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "IBEX Biomedical Solutions | Gestión biomédica en Tijuana",
    description:
      "Próximo inicio de operaciones en Tijuana y Baja California. Mantenimiento, verificaciones técnicas y trazabilidad digital para la gestión de equipo médico.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        {/* Se sirve como archivo externo (no inline) para cumplir con la CSP. */}
        <Script src="/js-detect.js" strategy="beforeInteractive" />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
