import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Ingeniería biomédica especializada: mantenimiento, calibración, gestión y cumplimiento del equipo médico. Mantenemos tu tecnología clínica segura, disponible y en norma.",
  keywords: [
    "ingeniería biomédica",
    "mantenimiento equipo médico",
    "calibración equipo médico",
    "gestión de tecnología biomédica",
    "servicios biomédicos",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: `${site.name} — ${site.descriptor}`,
    description: site.claim,
    siteName: site.name,
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
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
