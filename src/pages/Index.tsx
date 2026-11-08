import "@/styles/vx.css";
import Nav from "@/components/vx/Nav";
import Hero from "@/components/vx/Hero";
import Manifesto from "@/components/vx/Manifesto";
import Solucoes from "@/components/vx/Solucoes";
import Casos from "@/components/vx/Casos";
import Metodo from "@/components/vx/Metodo";
import Nichos from "@/components/vx/Nichos";
import Principios from "@/components/vx/Principios";
import Faq from "@/components/vx/Faq";
import Contato from "@/components/vx/Contato";
import Rodape from "@/components/vx/Rodape";
import MobileCta from "@/components/vx/MobileCta";
import { useReveal } from "@/components/vx/shared";

const Index = () => {
  useReveal();
  return (
    <div className="vx min-h-screen">
      {/* Grão só no desktop: overlay fixo com filtro SVG pesa no scroll do celular */}
      <div className="vx-grain hidden md:block" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Solucoes />
        <Casos />
        <Metodo />
        <Nichos />
        <Principios />
        <Faq />
        <Contato />
      </main>
      <Rodape />
      <MobileCta />
    </div>
  );
};

export default Index;
