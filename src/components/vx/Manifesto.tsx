const VERDADES = [
  {
    n: "01",
    t: "Automatizar bagunça só acelera a bagunça.",
    d: "Antes de qualquer agente, a gente desenha o processo. Em um cliente, o mesmo frete era digitado até quatro vezes em planilhas diferentes. O problema não era falta de IA.",
  },
  {
    n: "02",
    t: "Chatbot não é estratégia.",
    d: "O ganho real está no que acontece depois da conversa: o dado que vai pro sistema, o financeiro que bate sozinho, o dono que recebe o resumo do dia sem pedir.",
  },
  {
    n: "03",
    t: "Se não dá pra medir, não entra.",
    d: "Cada entrega nasce com uma métrica: horas devolvidas, erros evitados, receita recuperada. Se o número não aparece, a gente revê o caminho.",
  },
];

const Manifesto = () => (
  <>
    {/* Manifesto em fundo claro: quebra o ritmo escuro e dá peso editorial */}
    <section className="bg-[var(--vx-bone)] text-[var(--vx-coal)] py-16 md:py-32 relative">
      <div className="vx-container">
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <div className="vx-eyebrow !text-[rgba(11,12,16,0.55)] mb-6">01 · Por que a Vision AI existe</div>
          <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.15] tracking-[-0.03em]">
            A maioria das empresas não precisa de mais um chatbot.
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-[rgba(11,12,16,0.7)] max-w-3xl mx-auto">
            Precisa <span className="font-semibold text-[var(--vx-blue)]">parar de digitar</span> a mesma informação três
            vezes, saber o que está acontecendo sem abrir cinco planilhas e deixar o time livre para o trabalho que só
            gente sabe fazer.
          </p>
        </div>

        <div className="vx-snap mt-10 md:mt-20 -mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5">
          {VERDADES.map((v, i) => (
            <div
              key={v.n}
              data-reveal
              style={{ ["--d" as string]: `${i * 120}ms` }}
              className="rounded-2xl bg-[rgba(255,255,255,0.55)] border border-[rgba(11,12,16,0.08)] p-6 md:p-8 w-[84%] shrink-0 snap-start md:w-auto"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--vx-blue)] text-white text-sm font-semibold">
                {v.n}
              </span>
              <h3 className="mt-5 md:mt-6 text-xl font-bold tracking-[-0.02em] leading-snug">{v.t}</h3>
              <p className="mt-3 text-[rgba(11,12,16,0.68)] leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Manifesto;
