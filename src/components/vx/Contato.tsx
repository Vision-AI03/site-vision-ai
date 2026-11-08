import { useState } from "react";
import { ArrowUpRight, Check, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DIAGNOSTICO_URL, openWhatsapp } from "./shared";

// Mesmos destinos do formulário anterior (instruções do Apps Script no histórico do Contact.tsx)
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwrXEkshD4jdi-hsHJckgCfcqgy0iiw24KtwQLHEgHMVjwXI20XQERnC9IdqOVE2VddGQ/exec";
const WEBHOOK_URL = "https://sfezwprbanvxsnwgvkhh.supabase.co/functions/v1/capture-lead-website";
const WEBHOOK_TOKEN = "visionai_site_webhook_2026";

const DESAFIOS = ["Atendimento", "Vendas e leads", "Financeiro", "Operação", "Sistema próprio", "Ainda não sei"];

/** "(19) 99794-8118" na tela. */
const mascara = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

/** Formato que a planilha/CRM já recebia: "55 19 9 9794-8118". */
const telefoneLegado = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length < 10) return d;
  return `55 ${d.slice(0, 2)} ${d.slice(2, 3)}${d.slice(3, 7)}-${d.slice(7)}`;
};

const Campo = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="vx-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)]">{label}</span>
    <input
      {...props}
      className="mt-2 w-full bg-transparent border-b border-[var(--vx-line-2)] py-3 text-lg text-[var(--vx-ink)] placeholder:text-[var(--vx-ink-3)] outline-none focus:border-[var(--vx-blue-hi)] transition-colors"
    />
  </label>
);

const Contato = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", empresa: "", telefone: "", email: "", mensagem: "" });
  const [desafios, setDesafios] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: k === "telefone" ? mascara(e.target.value) : e.target.value });

  const toggle = (d: string) => setDesafios((xs) => (xs.includes(d) ? xs.filter((x) => x !== d) : [...xs, d]));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    const payload = {
      nome: form.nome,
      empresa: form.empresa,
      telefone: telefoneLegado(form.telefone),
      email: form.email,
      mensagem: [desafios.length ? `[Desafios: ${desafios.join(", ")}]` : "", form.mensagem].filter(Boolean).join(" "),
    };
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script exige no-cors
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, origem: "site-visionai", api_token: WEBHOOK_TOKEN }),
        });
      } catch {
        // Supabase é secundário, não bloqueia
      }
      setEnviado(true);
      setForm({ nome: "", empresa: "", telefone: "", email: "", mensagem: "" });
      setDesafios([]);
    } catch {
      toast({
        title: "Não conseguimos enviar",
        description: "Tente de novo ou chame a gente direto no WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-36 border-t border-[var(--vx-line)] overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 vx-grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 bottom-0 h-[500px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full blur-[140px] opacity-40"
        style={{ background: "radial-gradient(closest-side, #3d4bff, transparent)" }}
        aria-hidden="true"
      />

      <div className="vx-container relative grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5" data-reveal>
          <div className="vx-eyebrow mb-6">
            <span className="text-[var(--vx-blue-hi)]">08</span> Diagnóstico gratuito
          </div>
          <h2 className="vx-display text-[clamp(2.25rem,4.4vw,3.75rem)]">
            Vamos <span className="vx-serif text-[var(--vx-blue-hi)]">enxergar</span> a sua operação?
          </h2>
          <p className="mt-6 text-lg text-[var(--vx-ink-2)] leading-relaxed max-w-md">
            Uma conversa de 30 minutos pra entender como o seu negócio funciona hoje. Você sai com um mapa honesto do que
            vale automatizar, e do que ainda não vale.
          </p>
          <ul className="mt-8 space-y-3">
            {["Sem compromisso e sem custo", "Conversa com quem constrói, não com vendedor", "Resposta em até 1 dia útil"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[var(--vx-ink-2)]">
                <Check className="h-4 w-4 text-[var(--vx-blue-hi)]" /> {t}
              </li>
            ))}
          </ul>
          <button onClick={() => openWhatsapp(DIAGNOSTICO_URL)} className="vx-btn vx-btn-ghost mt-8 md:mt-10 w-full sm:w-auto">
            <MessageCircle className="h-4 w-4" /> Prefiro falar no WhatsApp
          </button>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ ["--d" as string]: "120ms" }}>
          <div className="rounded-[1.5rem] border border-[var(--vx-line-2)] bg-[rgba(13,15,20,0.85)] backdrop-blur-xl p-6 md:p-10">
            {enviado ? (
              <div className="min-h-[460px] flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-[var(--vx-blue)] flex items-center justify-center">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.02em]">Recebemos. Obrigado!</h3>
                <p className="mt-3 text-[var(--vx-ink-2)] max-w-sm">
                  Em até 1 dia útil a gente chama você pra marcar o diagnóstico. Se for urgente, o WhatsApp é mais rápido.
                </p>
                <button onClick={() => setEnviado(false)} className="mt-8 vx-mono text-xs text-[var(--vx-ink-3)] underline underline-offset-4">
                  enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-7">
                  <Campo label="Seu nome" required autoComplete="name" value={form.nome} onChange={set("nome")} placeholder="Como te chamamos" />
                  <Campo label="Empresa" required autoComplete="organization" value={form.empresa} onChange={set("empresa")} placeholder="Nome da empresa" />
                  <Campo
                    label="WhatsApp"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={form.telefone}
                    onChange={set("telefone")}
                    placeholder="(19) 99999-9999"
                    pattern="\(\d{2}\) \d{4,5}-\d{4}"
                    title="Informe DDD e número"
                  />
                  <Campo label="E-mail" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={set("email")} placeholder="voce@empresa.com.br" />
                </div>

                <div>
                  <span className="vx-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)]">
                    Onde mais dói hoje?
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {DESAFIOS.map((d) => {
                      const on = desafios.includes(d);
                      return (
                        <button
                          type="button"
                          key={d}
                          onClick={() => toggle(d)}
                          aria-pressed={on}
                          className={`rounded-full border px-4 min-h-[44px] text-sm transition-all ${
                            on
                              ? "border-[var(--vx-blue)] bg-[var(--vx-blue)] text-white"
                              : "border-[var(--vx-line-2)] text-[var(--vx-ink-2)] hover:border-[var(--vx-ink-3)]"
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="vx-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--vx-ink-3)]">
                    Conte um pouco (opcional)
                  </span>
                  <textarea
                    value={form.mensagem}
                    onChange={set("mensagem")}
                    rows={3}
                    placeholder="Ex.: perdemos muito tempo conferindo pedidos e lançando no financeiro"
                    className="mt-2 w-full resize-none bg-transparent border-b border-[var(--vx-line-2)] py-3 text-lg text-[var(--vx-ink)] placeholder:text-[var(--vx-ink-3)] outline-none focus:border-[var(--vx-blue-hi)] transition-colors"
                  />
                </label>

                <button type="submit" disabled={enviando} className="vx-btn vx-btn-primary w-full !h-14 disabled:opacity-60">
                  {enviando ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Enviando
                    </>
                  ) : (
                    <>
                      Quero meu diagnóstico <ArrowUpRight className="vx-arrow h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
