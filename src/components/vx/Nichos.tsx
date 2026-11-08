import { useState } from "react";
import { SectionHead } from "./shared";

const NICHOS = [
  { n: "Transportadoras", e: "Contratos, CT-e, acerto com terceiros e rentabilidade por placa" },
  { n: "Clínicas e saúde", e: "Agendamento, confirmação, lembretes e reativação de pacientes" },
  { n: "Imobiliárias", e: "Qualificação de lead, agenda de visitas e follow-up automático" },
  { n: "Contabilidades", e: "Coleta e classificação de documentos, cobrança de pendências" },
  { n: "Comércio e varejo", e: "Atendimento, pedidos, cobrança e pós-venda no WhatsApp" },
  { n: "Eventos", e: "Pedidos por QR code, PIX automático e operação de balcão" },
  { n: "Serviços B2B", e: "Propostas, contratos, prospecção e gestão de carteira" },
];

const Nichos = () => {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="py-16 md:py-36 border-t border-[var(--vx-line)]">
      <div className="vx-container">
        <SectionHead
          index="05"
          eyebrow="Para quem"
          title={
            <>
              O nicho muda. <span className="vx-serif text-[var(--vx-ink-2)]">O método, não.</span>
            </>
          }
          aside="Se existe processo repetitivo consumindo o seu time, provavelmente dá pra automatizar. Não achou o seu segmento? Chama mesmo assim."
        />

        <ul className="border-t border-[var(--vx-line)]" onMouseLeave={() => setHover(null)}>
          {NICHOS.map((x, i) => (
            <li
              key={x.n}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
              onMouseEnter={() => setHover(i)}
              className="group border-b border-[var(--vx-line)] grid md:grid-cols-12 items-baseline gap-2 md:gap-6 py-5 md:py-7 cursor-default"
            >
              <span className="hidden md:block md:col-span-1 vx-mono text-xs text-[var(--vx-ink-3)]">0{i + 1}</span>
              <span
                className={`md:col-span-5 text-[clamp(1.6rem,3.4vw,2.8rem)] font-semibold tracking-[-0.03em] leading-none transition-all duration-500 ${
                  hover === null || hover === i ? "text-[var(--vx-ink)]" : "text-[var(--vx-ink-3)]"
                } ${hover === i ? "md:translate-x-3" : ""}`}
              >
                {x.n}
              </span>
              <span
                className={`md:col-span-6 text-[var(--vx-ink-2)] md:text-right transition-colors duration-500 ${
                  hover === i ? "!text-[var(--vx-blue-hi)]" : ""
                }`}
              >
                {x.e}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Nichos;
