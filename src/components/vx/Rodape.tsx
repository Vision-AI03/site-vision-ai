import { Wordmark, scrollToId } from "./shared";

const Rodape = () => {
  const ano = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--vx-line)] pt-20 pb-10 overflow-hidden">
      <div className="vx-container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-5 text-[var(--vx-ink-2)] max-w-sm leading-relaxed">
              Agentes de IA, automações e sistemas sob medida para empresas que querem operar com inteligência.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="vx-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)] mb-5">Navegar</div>
            <ul className="space-y-3 text-[var(--vx-ink-2)]">
              {[
                ["solucoes", "Soluções"],
                ["agentes", "Agentes de IA"],
                ["casos", "Casos"],
                ["metodo", "Método"],
                ["faq", "Perguntas"],
              ].map(([id, l]) => (
                <li key={id}>
                  <button onClick={() => scrollToId(id)} className="hover:text-[var(--vx-ink)] transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="vx-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)] mb-5">Contato</div>
            <ul className="space-y-3 text-[var(--vx-ink-2)]">
              <li>
                <a href="mailto:visionaicontato@gmail.com" className="hover:text-[var(--vx-ink)] transition-colors">
                  visionaicontato@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/5519997948118" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--vx-ink)] transition-colors">
                  (19) 99794-8118
                </a>
              </li>
              <li>Ipeúna, SP · atendemos todo o Brasil</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="vx-container mt-16 flex flex-col md:flex-row justify-between gap-3 border-t border-[var(--vx-line)] pt-6 vx-mono text-[0.68rem] text-[var(--vx-ink-3)]">
        <span>© {ano} Vision AI. Todos os direitos reservados.</span>
        <span>Feito em casa, com o mesmo método que vendemos.</span>
      </div>
    </footer>
  );
};

export default Rodape;
