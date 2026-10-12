import { ArrowDown } from "lucide-react";
import { PrimaryCta, scrollToId } from "./shared";

const Hero = () => (
  <section className="relative pt-36 pb-20 md:pt-48 md:pb-28">
    <div className="absolute inset-0 vx-grid-bg opacity-70" aria-hidden="true" />
    <div
      className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[120px] opacity-30"
      style={{ background: "radial-gradient(closest-side, #3d4bff, transparent)" }}
      aria-hidden="true"
    />

    <div className="vx-container relative">
      <div className="vx-rise vx-eyebrow mb-8" style={{ ["--d" as string]: "50ms" }}>
        Engenharia de IA para operações reais
      </div>

      <h1 className="vx-display text-[clamp(2.75rem,7.2vw,6.75rem)]">
        <span className="vx-rise block" style={{ ["--d" as string]: "120ms" }}>
          Visão primeiro.
        </span>
        <span className="vx-rise block text-[var(--vx-blue-hi)]" style={{ ["--d" as string]: "240ms" }}>
          Inteligência depois.
        </span>
      </h1>

      <div className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
        <p
          className="vx-rise lg:col-span-7 max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--vx-ink-2)]"
          style={{ ["--d" as string]: "400ms" }}
        >
          Primeiro a gente enxerga onde a sua operação trava. Depois construímos a inteligência que falta: agentes de IA,
          automações e sistemas sob medida para empresas que cresceram mais rápido que os próprios processos.
        </p>

        <div
          className="vx-rise lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end"
          style={{ ["--d" as string]: "520ms" }}
        >
          <PrimaryCta />
          <button onClick={() => scrollToId("casos")} className="vx-btn vx-btn-ghost">
            Ver o que já construímos
            <ArrowDown className="vx-arrow h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Faixa de números reais */}
      <div className="mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--vx-line)]">
        {[
          { n: "884h", l: "por ano devolvidas a uma única operação de transporte" },
          { n: "86%", l: "menos esforço manual no controle de fretes do cliente" },
          { n: "24/7", l: "agentes atendendo, conferindo e avisando sem pausa" },
          { n: "1×", l: "o dado entra uma vez e chega em todo lugar que precisa" },
        ].map((s, i) => (
          <div
            key={s.n}
            data-reveal
            style={{ ["--d" as string]: `${i * 90}ms` }}
            className={`pt-8 pb-2 pr-6 ${i > 0 ? "lg:pl-8 lg:border-l border-[var(--vx-line)]" : ""} ${
              i % 2 === 1 ? "pl-6 border-l lg:pl-8" : ""
            }`}
          >
            <div className="vx-display text-5xl md:text-6xl">{s.n}</div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--vx-ink-3)] max-w-[15rem]">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
