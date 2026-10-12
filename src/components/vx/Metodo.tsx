import { SectionHead } from "./shared";

const ETAPAS = [
  {
    n: "01",
    t: "Diagnóstico",
    d: "Sentamos com quem faz o trabalho. Mapeamos o processo de ponta a ponta, onde o tempo escorre e quanto isso custa.",
    e: "Mapa de oportunidades com retorno estimado",
    tag: "gratuito",
  },
  {
    n: "02",
    t: "Arquitetura",
    d: "Desenhamos a solução e, tão importante quanto, o que não vale automatizar agora. Escopo fechado, sem surpresa.",
    e: "Proposta com escopo, prazo e métrica de sucesso",
  },
  {
    n: "03",
    t: "Construção",
    d: "Entregas curtas, testadas com os seus dados reais. Você usa desde a primeira semana e a gente ajusta pelo uso.",
    e: "Sistema em produção, entrando em etapas",
  },
  {
    n: "04",
    t: "Evolução",
    d: "Acompanhamos os números, corrigimos o que aparece e propomos o próximo passo. Não é entregar e sumir.",
    e: "Relatório de resultado e próximo ciclo",
  },
];

const Metodo = () => (
  <section id="metodo" className="py-24 md:py-36 scroll-mt-20 border-t border-[var(--vx-line)] relative overflow-hidden">
    <div className="vx-container">
      <SectionHead
        index="04"
        eyebrow="Método"
        title={
          <>
            Processo antes de <span className="vx-serif text-[var(--vx-blue-hi)]">promessa.</span>
          </>
        }
        aside="A maioria chega com o chatbot pronto antes de entender o seu negócio. A gente faz o contrário, e é por isso que o que entregamos continua de pé meses depois."
      />

      <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--vx-line)] rounded-[1.25rem] overflow-hidden border border-[var(--vx-line)]">
        {ETAPAS.map((e, i) => (
          <li
            key={e.n}
            data-reveal
            style={{ ["--d" as string]: `${i * 110}ms` }}
            className="group relative bg-[var(--vx-bg)] p-7 md:p-8 min-h-[360px] flex flex-col hover:bg-[var(--vx-bg-2)] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="vx-display text-[4.5rem] text-transparent [-webkit-text-stroke:1px_rgba(236,232,223,0.25)] group-hover:[-webkit-text-stroke:1px_#8a93ff] transition-all">
                {e.n}
              </span>
              {e.tag && (
                <span className="vx-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--vx-signal)] border border-[rgba(255,178,62,0.4)] rounded-full px-2.5 py-1">
                  {e.tag}
                </span>
              )}
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{e.t}</h3>
            <p className="mt-3 text-[var(--vx-ink-2)] leading-relaxed text-[0.95rem]">{e.d}</p>
            <div className="mt-auto pt-8">
              <div className="vx-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)] mb-2">Você recebe</div>
              <p className="text-sm text-[var(--vx-ink)]">{e.e}</p>
            </div>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[var(--vx-blue)] group-hover:w-full transition-all duration-700" />
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Metodo;
