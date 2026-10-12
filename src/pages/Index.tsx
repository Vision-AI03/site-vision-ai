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
import { useReveal } from "@/components/vx/shared";

const Index = () => {
  useReveal();
  return (
    <div className="vx min-h-screen">
      <div className="vx-grain" aria-hidden="true" />
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
    </div>
  );
};

export default Index;
