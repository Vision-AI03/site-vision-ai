import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryCta, Wordmark, scrollToId } from "./shared";

const LINKS = [
  { id: "solucoes", label: "Soluções" },
  { id: "agentes", label: "Agentes de IA" },
  { id: "casos", label: "Casos" },
  { id: "metodo", label: "Método" },
  { id: "faq", label: "Perguntas" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between rounded-full px-4 py-2.5 md:px-5 transition-all duration-500 ${
          scrolled || open
            ? "bg-[rgba(13,15,20,0.78)] backdrop-blur-xl border border-[var(--vx-line)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
            : "border border-transparent"
        }`}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Início">
          <Wordmark />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="px-4 py-2 text-sm text-[var(--vx-ink-2)] hover:text-[var(--vx-ink)] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <PrimaryCta label="Diagnóstico gratuito" className="!h-10 !px-5 !text-sm" />
        </div>

        <button className="md:hidden p-2.5 -mr-1.5 text-[var(--vx-ink)]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-auto mt-2 max-w-[1240px] rounded-3xl border border-[var(--vx-line)] bg-[rgba(13,15,20,0.96)] backdrop-blur-xl p-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full text-left px-3 py-3 text-lg text-[var(--vx-ink)] border-b border-[var(--vx-line)]"
            >
              {l.label}
            </button>
          ))}
          <PrimaryCta label="Diagnóstico gratuito" className="mt-3 w-full" />
        </div>
      )}
    </header>
  );
};

export default Nav;
