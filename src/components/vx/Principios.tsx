import { ShieldCheck, ScrollText, Gauge, Handshake } from "lucide-react";
import { SectionHead } from "./shared";

const PRINCIPIOS = [
  {
    icon: ShieldCheck,
    t: "A IA sugere. Você confirma.",
    d: "Ação que mexe em dinheiro ou em cliente só acontece com o seu SIM. E dá pra desfazer.",
  },
  {
    icon: ScrollText,
    t: "Nada de caixa-preta.",
    d: "Cada ação dos agentes fica registrada: o que fez, quando e por quê. Você audita quando quiser.",
  },
  {
    icon: Gauge,
    t: "Métrica antes de feature.",
    d: "Toda entrega nasce com um número pra bater. Se não move o ponteiro, não é prioridade.",
  },
  {
    icon: Handshake,
    t: "Honestidade sobre o que não vale.",
    d: "Se a automação não se paga, a gente fala. Preferimos perder a venda a entregar enfeite.",
  },
];

const Principios = () => (
  <section className="py-24 md:py-36 bg-[var(--vx-bg-2)] border-t border-[var(--vx-line)] relative overflow-hidden">
    <div
      className="absolute -right-40 top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full blur-[140px] opacity-25"
      style={{ background: "radial-gradient(closest-side, #3d4bff, transparent)" }}
      aria-hidden="true"
    />
    <div className="vx-container relative">
      <SectionHead
        index="06"
        eyebrow="Princípios"
        title={
          <>
            IA com <span className="vx-serif text-[var(--vx-blue-hi)]">responsabilidade</span> de quem assina embaixo.
          </>
        }
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRINCIPIOS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.t} className="vx-card p-7 hover:-translate-y-1" data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
              <div className="h-11 w-11 rounded-xl border border-[var(--vx-line-2)] flex items-center justify-center text-[var(--vx-blue-hi)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] leading-snug">{p.t}</h3>
              <p className="mt-3 text-[var(--vx-ink-2)] leading-relaxed text-[0.95rem]">{p.d}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Principios;
