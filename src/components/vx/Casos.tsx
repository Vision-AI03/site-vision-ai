import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "./shared";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="vx-mono text-[0.66rem] uppercase tracking-[0.12em] rounded-full border border-[var(--vx-line-2)] px-3 py-1 text-[var(--vx-ink-2)]">
    {children}
  </span>
);

const Casos = () => (
  <section id="casos" className="py-16 md:py-36 scroll-mt-20 border-t border-[var(--vx-line)]">
    <div className="vx-container">
      <SectionHead
        index="03"
        eyebrow="Casos"
        title={
          <>
            Não é promessa. <span className="vx-serif text-[var(--vx-blue-hi)]">Está rodando.</span>
          </>
        }
        aside="Sistemas que estão em produção hoje, com resultados medidos na operação real de cada cliente."
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Caso principal */}
        <article className="vx-card lg:col-span-12 overflow-hidden" data-reveal>
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 md:p-12">
              <div className="flex flex-wrap gap-2">
                <Tag>Transportadora</Tag>
                <Tag>Interior de SP</Tag>
                <Tag>Sistema + Agentes + WhatsApp</Tag>
              </div>
              <h3 className="mt-6 md:mt-8 text-[1.75rem] md:text-[2.6rem] font-semibold tracking-[-0.03em] leading-[1.05]">
                O mesmo frete era digitado <span className="vx-serif text-[var(--vx-blue-hi)]">até quatro vezes.</span>
              </h3>
              <p className="mt-6 text-[var(--vx-ink-2)] leading-relaxed max-w-2xl">
                Três pessoas alimentavam planilhas de fretes, clientes, recebimentos e pagamentos a terceiros. Construímos
                um sistema de gestão integrado ao TMS, com IA que lê os contratos em PDF e confere com o CT-e, envio
                automático de comprovantes pela API oficial do WhatsApp e um assistente que responde faturamento e dá
                baixa em contas, sempre pedindo confirmação.
              </p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[var(--vx-ink-2)]">
                {[
                  "Fretes sincronizados direto do TMS",
                  "Contratos lidos e conferidos por IA",
                  "Comprovantes enviados sozinhos",
                  "Rentabilidade por placa e por cliente",
                  "Assistente de gestão no WhatsApp",
                  "Rotina que caça duplicidades no banco",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--vx-blue-hi)]">→</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[var(--vx-line)] bg-[var(--vx-bg-2)] p-6 md:p-12 flex flex-col justify-between gap-6 md:gap-10">
              {[
                { n: "884", u: "horas/ano", l: "devolvidas ao time administrativo" },
                { n: "86%", u: "", l: "menos esforço manual no controle de fretes" },
                { n: "4×", u: "→ 1×", l: "o frete que era digitado até quatro vezes agora entra uma só" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="vx-display text-[2.5rem] md:text-6xl">
                    {m.n}
                    <span className="text-xl md:text-2xl text-[var(--vx-ink-3)] font-medium tracking-normal ml-1">{m.u}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--vx-ink-3)]">{m.l}</p>
                </div>
              ))}
              <p className="vx-mono text-[0.62rem] text-[var(--vx-ink-3)] leading-relaxed">
                Estimativa conservadora, base de ~196 fretes/mês.
              </p>
            </div>
          </div>
        </article>

        {/* COT-AI */}
        <article className="vx-card lg:col-span-7 p-6 md:p-10 flex flex-col" data-reveal>
          <div className="flex flex-wrap gap-2">
            <Tag>Produto próprio</Tag>
            <Tag>SaaS</Tag>
          </div>
          <h3 className="mt-6 md:mt-8 text-2xl md:text-3xl font-semibold tracking-[-0.025em] leading-tight">
            COT-AI: cotação de frete em um minuto, com piso ANTT e pedágio da rota.
          </h3>
          <p className="mt-5 text-[var(--vx-ink-2)] leading-relaxed">
            Nascido de dentro de uma transportadora, virou produto: calcula o custo real da rota, compara com o piso
            legal e audita CT-es para encontrar frete cobrado abaixo do custo. Assinatura recorrente, pagamento
            integrado e agente de suporte com IA.
          </p>
          <div className="mt-auto pt-8 md:pt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-sm text-[var(--vx-ink-3)] max-w-xs">
              A prova de que a gente não só integra ferramentas: a gente constrói produto.
            </p>
            <a
              href="https://cot-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="vx-btn vx-btn-ghost !h-11 shrink-0"
            >
              cot-ai.com <ArrowUpRight className="vx-arrow h-4 w-4" />
            </a>
          </div>
        </article>

        {/* Evento */}
        <article className="vx-card lg:col-span-5 p-6 md:p-10 flex flex-col" data-reveal style={{ ["--d" as string]: "100ms" }}>
          <div className="flex flex-wrap gap-2">
            <Tag>Evento</Tag>
            <Tag>4 dias</Tag>
          </div>
          <h3 className="mt-6 md:mt-8 text-2xl md:text-3xl font-semibold tracking-[-0.025em] leading-tight">
            Festa com fila no caixa? Não mais.
          </h3>
          <p className="mt-5 text-[var(--vx-ink-2)] leading-relaxed">
            O público pede pelo QR code da mesa, paga no PIX e o banco confirma sozinho. Cada barraca recebe o pedido
            no painel em tempo real e a ficha sai impressa com senha por setor.
          </p>
          <div className="mt-auto pt-8 md:pt-10 grid grid-cols-3 gap-3 text-center">
            {["QR code", "PIX automático", "Painel + impressora"].map((t) => (
              <div key={t} className="rounded-xl border border-[var(--vx-line)] py-3 px-2 vx-mono text-[0.66rem] text-[var(--vx-ink-2)]">
                {t}
              </div>
            ))}
          </div>
        </article>

        {/* Casa própria */}
        <article
          className="lg:col-span-12 rounded-[1.25rem] p-6 md:p-12 relative overflow-hidden border border-[rgba(138,147,255,0.35)]"
          style={{ background: "linear-gradient(120deg, rgba(61,75,255,0.22), rgba(61,75,255,0.04) 60%)" }}
          data-reveal
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Tag>Em casa</Tag>
                <Tag>Vision AI</Tag>
              </div>
              <h3 className="mt-6 md:mt-8 text-2xl md:text-[2.2rem] font-semibold tracking-[-0.025em] leading-tight">
                A gente usa o que vende. <span className="vx-serif">Todo dia.</span>
              </h3>
              <p className="mt-5 text-[var(--vx-ink-2)] leading-relaxed max-w-2xl">
                A própria Vision AI roda num sistema que construímos: CRM, contratos gerados por IA, prospecção, radar de
                anúncios e um conselho de analistas de IA, um por setor, que entrega um briefing priorizado toda manhã.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {["Analista financeiro", "Analista de prospecção", "Analista de CRM", "Analista de contratos"].map((a, i) => (
                <div
                  key={a}
                  className="rounded-xl border border-[var(--vx-line-2)] bg-[rgba(8,9,12,0.55)] p-4 flex items-center gap-3"
                >
                  <span className="vx-live" style={{ animationDelay: `${i * 300}ms` }} />
                  <span className="text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default Casos;
