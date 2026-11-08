import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/App";
import logoVisionAI from "@/assets/logo-vision-ai.png";

export const DIAGNOSTICO_URL =
  "https://wa.me/5519997948118?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Vision%20AI%20e%20quero%20agendar%20um%20diagn%C3%B3stico%20da%20minha%20opera%C3%A7%C3%A3o.";

export const openWhatsapp = (url: string = WHATSAPP_URL) => window.open(url, "_blank", "noopener");

export const scrollToId = (id: string) => {
  // "agentes" é a primeira aba de Soluções: garante que ela esteja aberta antes de rolar
  if (id === "agentes") window.dispatchEvent(new CustomEvent("vx-aba", { detail: 0 }));
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/** Logo original da Vision AI, igual ao cabeçalho anterior. */
export const Wordmark = () => (
  <span className="flex items-center gap-2">
    <img src={logoVisionAI} alt="Vision AI Logo" className="h-8 w-auto rounded-md" />
    <span className="font-bold text-xl">
      <span className="text-[var(--vx-ink)]">VISION</span> <span className="text-[var(--vx-blue-hi)]">AI</span>
    </span>
  </span>
);

export const PrimaryCta = ({ label = "Agendar diagnóstico", className = "" }: { label?: string; className?: string }) => (
  <button onClick={() => openWhatsapp(DIAGNOSTICO_URL)} className={`vx-btn vx-btn-primary ${className}`}>
    {label}
    <ArrowUpRight className="vx-arrow h-4 w-4" />
  </button>
);

/** Ativa as revelações por scroll em todos os [data-reveal] da página. */
export const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".vx [data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export const SectionHead = ({
  index,
  eyebrow,
  title,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) => (
  <div className="grid gap-5 md:gap-8 lg:grid-cols-12 lg:items-end mb-10 md:mb-20">
    <div className="lg:col-span-8" data-reveal>
      <div className="vx-eyebrow mb-4 md:mb-6">
        <span className="text-[var(--vx-blue-hi)]">{index}</span> {eyebrow}
      </div>
      <h2 className="vx-h2">{title}</h2>
    </div>
    {aside && (
      <p className="lg:col-span-4 text-[var(--vx-ink-2)] text-base md:text-lg leading-relaxed" data-reveal style={{ ["--d" as string]: "120ms" }}>
        {aside}
      </p>
    )}
  </div>
);
