import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { Instrumentation } from "@/components/sections/Instrumentation";
import { Cmms } from "@/components/sections/Cmms";
import { Sectors } from "@/components/sections/Sectors";
import { Approach } from "@/components/sections/Approach";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: [site.shortName],
  url: `${site.url}/`,
};

// No se afirman acreditaciones, horarios ni redes sociales: solo datos
// de contacto y área de servicio que la empresa ha confirmado.
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: `${site.url}/`,
  logo: `${site.url}/icon.png`,
  email: site.contact.email,
  telephone: site.contact.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tijuana",
    addressRegion: "Baja California",
    addressCountry: "MX",
  },
  areaServed: ["Tijuana", "Baja California"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteStructuredData, organizationStructuredData]),
        }}
      />
      <Hero />
      <Capabilities />
      <Services />
      <Instrumentation />
      <Cmms />
      <Sectors />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
