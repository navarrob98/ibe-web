import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Sectors } from "@/components/sections/Sectors";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Approach />
      <Sectors />
      <About />
      <Contact />
    </>
  );
}
