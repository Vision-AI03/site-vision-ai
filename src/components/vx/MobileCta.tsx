import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/App";
import { DIAGNOSTICO_URL, openWhatsapp } from "./shared";

/**
 * Barra de ação fixa no rodapé da tela, só no mobile.
 * Aparece depois do hero (onde o CTA já está visível) e some ao chegar no formulário de contato.
 */
const MobileCta = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contato = document.getElementById("contact");
      const antesDoContato = !contato || contato.getBoundingClientRect().top > window.innerHeight;
      setShow(window.scrollY > window.innerHeight * 0.7 && antesDoContato);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[var(--vx-bg)] via-[rgba(8,9,12,0.92)] to-transparent transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-2">
        <button
          onClick={() => openWhatsapp(DIAGNOSTICO_URL)}
          tabIndex={show ? 0 : -1}
          className="vx-btn vx-btn-primary flex-1 !h-14 !text-base"
        >
          Diagnóstico gratuito
          <ArrowUpRight className="vx-arrow h-4 w-4" />
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          aria-label="Falar no WhatsApp"
          className="h-14 w-14 shrink-0 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_-8px_rgba(37,211,102,0.6)] active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
            <path
              fill="white"
              d="M24 4C12.95 4 4 12.95 4 24c0 3.55.92 6.89 2.54 9.78L4 44l10.5-2.5A19.87 19.87 0 0024 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.07 0-5.97-.8-8.48-2.2l-.6-.36-6.23 1.48 1.52-6.06-.4-.63A15.93 15.93 0 018 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.73-11.97c-.48-.24-2.83-1.4-3.27-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.75-3.87-2.39-1.43-1.28-2.4-2.85-2.68-3.33-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.14.5 2.04.8 2.73 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.83-1.16 3.23-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MobileCta;
