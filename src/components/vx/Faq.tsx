import { Plus } from "lucide-react";
import { SectionHead } from "./shared";

const PERGUNTAS = [
  {
    q: "Vocês vão substituir o meu time?",
    a: "Não é esse o objetivo. A gente tira do seu time o trabalho repetitivo (digitar, conferir, cobrar, responder a mesma pergunta) pra ele cuidar do que precisa de gente: negociar, resolver, vender.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Integrações, configuração, treinamento dos agentes e manutenção ficam com a gente. Você participa do diagnóstico e valida as entregas, na linguagem do seu negócio.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do tamanho do problema, e é por isso que começamos pelo diagnóstico gratuito. Você sai dele com o escopo, o prazo e o retorno esperado antes de decidir qualquer coisa.",
  },
  {
    q: "Quanto tempo até ver resultado?",
    a: "Trabalhamos em entregas curtas. A primeira parte útil costuma entrar em produção nas primeiras semanas, e o restante vem em etapas, já com você usando.",
  },
  {
    q: "E se a IA errar?",
    a: "Por isso as ações críticas exigem a sua confirmação, tudo fica registrado e pode ser desfeito. Os agentes também sabem a hora de passar a conversa para uma pessoa.",
  },
  {
    q: "Funciona com os sistemas que eu já uso?",
    a: "Na maioria dos casos, sim. Integramos com ERPs, TMS, CRMs, planilhas, bancos e WhatsApp. Quando não existe integração possível, avaliamos construir o sistema sob medida.",
  },
  {
    q: "E os meus dados?",
    a: "Ficam em infraestrutura com controle de acesso por perfil, e cada agente só enxerga o que precisa para a tarefa dele. Os dados são do seu negócio, não nossos.",
  },
];

const Faq = () => (
  <section id="faq" className="py-24 md:py-36 scroll-mt-20 border-t border-[var(--vx-line)]">
    <div className="vx-container grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead
            index="07"
            eyebrow="Perguntas"
            title={
              <>
                Antes de <span className="vx-serif text-[var(--vx-blue-hi)]">conversar.</span>
              </>
            }
          />
        </div>
      </div>
      <div className="lg:col-span-7 border-t border-[var(--vx-line)]">
        {PERGUNTAS.map((p, i) => (
          <details key={p.q} className="group border-b border-[var(--vx-line)]" data-reveal style={{ ["--d" as string]: `${i * 50}ms` }}>
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 md:py-7">
              <span className="text-lg md:text-xl font-medium tracking-[-0.01em] group-hover:text-[var(--vx-blue-hi)] transition-colors">
                {p.q}
              </span>
              <span className="vx-plus shrink-0 h-9 w-9 rounded-full border border-[var(--vx-line-2)] flex items-center justify-center transition-transform duration-300">
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="pb-7 pr-14 text-[var(--vx-ink-2)] leading-relaxed">{p.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
