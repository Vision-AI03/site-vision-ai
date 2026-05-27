import { useState, useEffect } from "react";
import {
  MessageSquare,
  Calendar,
  TrendingUp,
  Truck,
  HeartHandshake,
  Settings,
  MessageCircle,
  Rocket,
  BarChart,
  CheckCircle,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_URL } from "@/App";
import logoVisionAI from "@/assets/logo-vision-ai.png";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwrXEkshD4jdi-hsHJckgCfcqgy0iiw24KtwQLHEgHMVjwXI20XQERnC9IdqOVE2VddGQ/exec";
const WEBHOOK_URL =
  "https://sfezwprbanvxsnwgvkhh.supabase.co/functions/v1/capture-lead-website";
const WEBHOOK_TOKEN = "visionai_site_webhook_2026";

/* ──────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────── */
const agentTypes = [
  {
    icon: MessageSquare,
    gradient: "from-green-500 to-emerald-600",
    title: "Agente de Atendimento",
    description:
      "Responde perguntas frequentes, envia informações de produto e resolve dúvidas — sem fila de espera.",
    bullets: [
      "Funciona 24h, 7 dias por semana",
      "Base de conhecimento da sua empresa",
      "Tom de voz personalizado",
    ],
  },
  {
    icon: Calendar,
    gradient: "from-blue-500 to-indigo-600",
    title: "Agente de Agendamento",
    description:
      "Agenda, confirma e lembra consultas ou reuniões diretamente pelo WhatsApp. Zero no-show.",
    bullets: [
      "Integrado ao Google Calendar",
      "Confirmação automática 24h antes",
      "Reagendamento sem esforço humano",
    ],
  },
  {
    icon: TrendingUp,
    gradient: "from-indigo-500 to-purple-600",
    title: "Agente de Vendas",
    description:
      "Aborda leads, coleta informações, qualifica interesse e entrega o contato quente para você fechar.",
    bullets: [
      "Qualificação automática por perfil",
      "Follow-up sem esforço manual",
      "Integração com seu CRM ou planilha",
    ],
  },
  {
    icon: Truck,
    gradient: "from-orange-500 to-red-600",
    title: "Agente de Cotação",
    description:
      "Ideal para transportadoras e distribuidoras. Recebe pedido, calcula e responde o orçamento na hora.",
    bullets: [
      "Tabela de preços configurável",
      "Resposta em segundos",
      "Histórico de cotações em planilha",
    ],
  },
  {
    icon: HeartHandshake,
    gradient: "from-pink-500 to-rose-600",
    title: "Agente de Suporte",
    description:
      "Resolve os chamados mais comuns sem intervenção humana. Escalona para você só quando necessário.",
    bullets: [
      "Resolve 70-80% dos tickets sozinho",
      "Escalação inteligente para humanos",
      "Histórico de atendimento completo",
    ],
  },
  {
    icon: Settings,
    gradient: "from-cyan-500 to-teal-600",
    title: "Agente Personalizado",
    description:
      "Tem um processo específico que não se encaixa nos modelos acima? Construímos do zero para o seu negócio.",
    bullets: [
      "Diagnóstico gratuito do seu processo",
      "Desenvolvimento sob medida",
      "Suporte e evolução contínua",
    ],
  },
];

const howItWorksSteps = [
  {
    icon: MessageCircle,
    number: "01",
    gradient: "from-blue-500 to-indigo-600",
    title: "Diagnóstico gratuito",
    description:
      "Você me conta como funciona seu atendimento hoje. Em 30 minutos identificamos onde o agente vai fazer mais diferença.",
    details: [
      "Reunião de 30 min pelo WhatsApp ou Zoom",
      "Mapeamos fluxo de atendimento atual",
      "Definimos o escopo e resultado esperado",
    ],
  },
  {
    icon: Settings,
    number: "02",
    gradient: "from-indigo-500 to-purple-600",
    title: "Configuração e treinamento",
    description:
      "Treinamos o agente com as informações da sua empresa: produtos, preços, políticas, tom de voz. Você revisa e aprova.",
    details: [
      "Você envia materiais da empresa",
      "Agente aprende seu negócio em detalhes",
      "Rodadas de ajuste até ficar perfeito",
    ],
  },
  {
    icon: Rocket,
    number: "03",
    gradient: "from-purple-500 to-pink-600",
    title: "Ativação no seu WhatsApp",
    description:
      "Conectamos o agente ao número da sua empresa. Você não precisa instalar nada — funciona no WhatsApp que você já usa.",
    details: [
      "Integração com WhatsApp Business ou API",
      "Testes completos antes de ir ao ar",
      "Treinamento rápido para sua equipe",
    ],
  },
  {
    icon: BarChart,
    number: "04",
    gradient: "from-pink-500 to-red-600",
    title: "Monitoramento e evolução",
    description:
      "Acompanhamos os resultados mensalmente e evoluímos o agente com base no que os clientes perguntam de verdade.",
    details: [
      "Relatório mensal de atendimentos",
      "Ajustes contínuos de script e base",
      "Você sempre tem controle total",
    ],
  },
];

/* ──────────────────────────────────────────────────
   PHONE CAROUSEL
────────────────────────────────────────────────── */
const phoneSlides = [
  {
    label: "Agente IA — Atendimento",
    color: "#10B981",
    contactName: "Assistente Vision AI",
    messages: [
      { from: "client", text: "Oi, vocês entregam para Campinas?" },
      { from: "agent", text: "Olá! Sim, atendemos Campinas e toda região. Posso te passar os valores de frete e prazo agora mesmo. Qual produto você tem interesse?" },
      { from: "client", text: "Quero saber sobre o produto X" },
      { from: "agent", text: "Ótimo! O produto X custa R$ 297 com entrega em 2 dias úteis pra Campinas. Quer que eu reserve uma unidade para você? 😊" },
    ],
    badge: "⚡ Respondido em 1.4 segundos",
  },
  {
    label: "Agente IA — Vendas",
    color: "#6366F1",
    contactName: "Assistente Vision AI",
    messages: [
      { from: "client", text: "Vi o anúncio de vocês, quanto custa?" },
      { from: "agent", text: "Oi! Que bom que você viu 😊 Antes de te passar o valor, me conta: é pra uso pessoal ou empresa? Assim consigo te passar a opção certa." },
      { from: "client", text: "É pra minha empresa, somos 8 pessoas" },
      { from: "agent", text: "Perfeito! Para times de até 10 pessoas temos o Plano Pro por R$ 497/mês. Inclui onboarding e suporte prioritário. Posso agendar uma demo rápida com você?" },
    ],
    badge: "🎯 Lead qualificado automaticamente",
  },
  {
    label: "Agente IA — Suporte",
    color: "#F59E0B",
    contactName: "Assistente Vision AI",
    messages: [
      { from: "client", text: "Meu pedido não chegou ainda, já faz 5 dias" },
      { from: "agent", text: "Olá! Me passa o número do seu pedido que eu verifico agora mesmo 🔍" },
      { from: "client", text: "Pedido #48291" },
      { from: "agent", text: "Encontrei! Seu pedido #48291 está com a transportadora e chega hoje até as 18h. Você recebe uma notificação quando sair pra entrega. Posso te ajudar com mais alguma coisa?" },
    ],
    badge: "✅ Resolvido sem intervenção humana",
  },
  {
    label: "Agente IA — Interno",
    color: "#EC4899",
    contactName: "Assistente Interno",
    messages: [
      { from: "client", text: "Resume a reunião de ontem pra mim" },
      { from: "agent", text: "Claro! Reunião de 15/05 — Pontos principais:\n• Meta de vendas revista para R$ 85k\n• Lucas assume o cliente Acme a partir de hoje\n• Próxima reunião: 22/05 às 14h\n\nQuer que eu já coloque no calendário?" },
      { from: "client", text: "Sim, coloca lá" },
      { from: "agent", text: "✅ Reunião de 22/05 às 14h adicionada no calendário de todos os participantes. Notificações configuradas para 1h antes." },
    ],
    badge: "🤖 Produtividade interna automatizada",
  },
];

const PhoneCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % phoneSlides.length);
        setIsTransitioning(false);
      }, 400);
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  const slide = phoneSlides[activeSlide];

  const goTo = (idx: number) => {
    setIsTransitioning(true);
    setTimeout(() => { setActiveSlide(idx); setIsTransitioning(false); }, 400);
  };

  return (
    <div style={{ position: "relative", width: "280px", margin: "0 auto" }}>
      {/* Slide label */}
      <div style={{ textAlign: "center", marginBottom: "16px", transition: "opacity 0.4s", opacity: isTransitioning ? 0 : 1 }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: 600,
          color: slide.color,
          background: slide.color + "15",
          border: `1px solid ${slide.color}30`,
          borderRadius: "999px",
          padding: "4px 14px",
        }}>
          {slide.label}
        </span>
      </div>

      {/* Phone frame */}
      <div style={{
        background: "#1A1A2E",
        borderRadius: "42px",
        padding: "12px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90px",
          height: "24px",
          background: "#0D0D1A",
          borderRadius: "0 0 16px 16px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2A2A4A" }} />
          <div style={{ width: "32px", height: "4px", borderRadius: "2px", background: "#2A2A4A" }} />
        </div>

        {/* Screen */}
        <div style={{
          background: "#0B1117",
          borderRadius: "32px",
          overflow: "hidden",
          height: "520px",
          display: "flex",
          flexDirection: "column" as const,
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}>
          {/* Status bar */}
          <div style={{ background: "#0B1117", padding: "28px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>9:41</span>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <rect x="0" y="6" width="3" height="6" rx="1" fill="rgba(255,255,255,0.8)" />
                <rect x="4.5" y="4" width="3" height="8" rx="1" fill="rgba(255,255,255,0.8)" />
                <rect x="9" y="2" width="3" height="10" rx="1" fill="rgba(255,255,255,0.8)" />
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="rgba(255,255,255,0.8)" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <path d="M8 9.5L10.5 7C9.8 6.4 8.9 6 8 6C7.1 6 6.2 6.4 5.5 7L8 9.5Z" fill="rgba(255,255,255,0.8)" />
                <path d="M8 6.5L12 2.5C10.7 1.4 9.4 1 8 1C6.6 1 5.3 1.4 4 2.5L8 6.5Z" fill="rgba(255,255,255,0.4)" />
              </svg>
              <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                <div style={{ width: "22px", height: "11px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "3px", padding: "2px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "75%", height: "100%", background: "rgba(255,255,255,0.8)", borderRadius: "1px" }} />
                </div>
                <div style={{ width: "2px", height: "5px", background: "rgba(255,255,255,0.4)", borderRadius: "0 1px 1px 0" }} />
              </div>
            </div>
          </div>

          {/* WhatsApp header */}
          <div style={{ background: "linear-gradient(135deg, #00875A, #00A36C)", padding: "10px 14px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.8)", lineHeight: 1 }}>‹</span>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: "26px", height: "26px" }} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>{slide.contactName}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7FFFD4" }} />
                online
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            background: "#0B1117",
            padding: "12px 10px",
            overflowY: "auto" as const,
            display: "flex",
            flexDirection: "column" as const,
            gap: "8px",
            backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.04) 0%, transparent 60%)",
          }}>
            {slide.messages.map((msg, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: msg.from === "client" ? "flex-start" : "flex-end" }}>
                <div style={{
                  maxWidth: "78%",
                  padding: "8px 11px",
                  borderRadius: msg.from === "client" ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
                  background: msg.from === "client" ? "#1E2733" : "linear-gradient(135deg, #005C4B, #017A62)",
                  fontSize: "11.5px",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line" as const,
                }}>
                  {msg.text}
                  {msg.from === "agent" && (
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", textAlign: "right" as const, marginTop: "3px" }}>✓✓</div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#00C864", background: "rgba(0,200,100,0.1)", border: "1px solid rgba(0,200,100,0.3)", borderRadius: "999px", padding: "3px 10px" }}>
                {slide.badge}
              </span>
            </div>
          </div>

          {/* Input bar */}
          <div style={{ background: "#182026", padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ flex: 1, background: "#252D35", borderRadius: "20px", padding: "8px 14px", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
              Mensagem
            </div>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#00A36C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21L23 12 2 3v7l15 2-15 2z" /></svg>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
          <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
        </div>
      </div>

      {/* Navigation dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        {phoneSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            style={{
              width: idx === activeSlide ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: idx === activeSlide ? slide.color : "rgba(0,0,0,0.15)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────
   BENEFIT CARD (section 5)
────────────────────────────────────────────────── */
interface BenefitItem {
  icon: React.ElementType;
  color: string;
  title: string;
  text: string;
}

const BenefitCardItem = ({ icon: Icon, color, title, text }: BenefitItem) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "36px",
        border: "1px solid #F3F4F6",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s, transform 0.3s",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Accent line top */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "2px",
        width: hovered ? "100%" : "0%",
        background: color,
        transition: "width 0.4s ease",
        borderRadius: "20px 20px 0 0",
      }} />
      {/* Icon */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: "14px",
        background: color + "18",
        border: `1px solid ${color}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}>
        <Icon size={22} style={{ color }} />
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#111827", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
        {text}
      </p>
    </div>
  );
};

const benefitItems: BenefitItem[] = [
  {
    icon: Zap,
    color: "#6366F1",
    title: "Responde antes da concorrência",
    text: "Enquanto seu concorrente ainda está digitando, seu agente já enviou a resposta, coletou os dados e agendou o próximo passo.",
  },
  {
    icon: Clock,
    color: "#10B981",
    title: "Sua equipe foca no que gera dinheiro",
    text: "Perguntas repetitivas, confirmações e triagem ficam com o agente. Sua equipe só entra quando o cliente já está pronto para fechar.",
  },
  {
    icon: TrendingUp,
    color: "#F59E0B",
    title: "Nenhum lead esfria na fila de espera",
    text: "O agente responde em segundos, qualquer hora do dia. Cliente que recebe atenção imediata compra mais e reclama menos.",
  },
  {
    icon: Shield,
    color: "#EC4899",
    title: "Você mantém controle total",
    text: "Acompanha todas as conversas, ajusta respostas quando quiser e decide quando entrar na conversa. O agente trabalha para você, não no lugar de você.",
  },
];

/* ──────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────── */
const AgentesIA = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setHeaderSolid(scrollTop > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "") value = "55";
    if (!value.startsWith("55")) value = "55" + value.replace(/^55/, "");
    if (value.length > 13) value = value.slice(0, 13);
    let formatted = value;
    if (value.length > 2) {
      formatted = "55";
      if (value.length > 4) {
        formatted += " " + value.slice(2, 4);
        if (value.length > 6) {
          formatted += " " + value.slice(4, 5);
          if (value.length > 9) {
            formatted += value.slice(5, 9) + "-" + value.slice(9);
          } else {
            formatted += value.slice(5);
          }
        } else {
          formatted += value.slice(4);
        }
      } else {
        formatted += value.slice(2);
      }
    }
    setFormData({ ...formData, phone: formatted });
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!formData.phone) setFormData({ ...formData, phone: "55" });
    setTimeout(() => {
      const pos = formData.phone.length > 0 ? formData.phone.length : 2;
      e.target.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        nome: formData.name,
        telefone: formData.phone,
        empresa: formData.company,
        mensagem: formData.message,
        origem: "lp-agentes-ia",
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, api_token: WEBHOOK_TOKEN }),
        });
      } catch {
        // non-blocking fallback
      }

      setIsSuccess(true);
      toast({
        title: "Diagnóstico solicitado!",
        description: "Recebemos seu contato. Em breve nossa equipe vai falar com você.",
      });
      setFormData({ name: "", phone: "", company: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Houve um problema. Tente novamente ou fale pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* ── 1. HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: headerSolid ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: headerSolid ? "blur(20px)" : "none",
          boxShadow: headerSolid ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="https://www.agenciavisionai.com.br" className="flex items-center gap-2">
              <img src={logoVisionAI} alt="Vision AI" className="h-8 w-auto" />
              <span className="font-bold text-lg tracking-tight text-gray-900">
                VISION <span className="text-indigo-600">AI</span>
              </span>
            </a>
            <Button
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white btn-shimmer h-10 px-5 text-sm md:h-11 md:px-6"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
        {/* Scroll progress bar */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ── 2. HERO ── */}
      <section className="relative pt-28 md:pt-36 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                ⚡ Agente IA para WhatsApp · Atende 24/7
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Seu WhatsApp atendendo
                <br />
                clientes às 3h da manhã —
                <br />
                <span className="text-gradient">sem você precisar acordar</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Criamos um Agente de IA personalizado para o WhatsApp da sua empresa.
                Ele responde dúvidas, agenda horários, qualifica leads e nunca
                fica de folga — enquanto você foca no que realmente importa.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                {["Setup em até 7 dias", "Integrado ao seu processo", "Treinado com seus dados"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => window.open(WHATSAPP_URL, "_blank")}
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white btn-shimmer h-14 px-8 text-lg"
                >
                  Quero meu Agente IA agora →
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 h-14 px-8 text-lg"
                >
                  Ver como funciona
                </Button>
              </div>
            </div>

            {/* Right — phone carousel + 2 stat cards */}
            <div className="animate-scale-in">
              <PhoneCarousel />
              <div className="grid grid-cols-2 gap-3 mt-6 max-w-xs mx-auto">
                {[
                  { value: "< 3s", label: "tempo de resposta", color: "#F59E0B" },
                  { value: "24/7", label: "sem interrupção", color: "#6366F1" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. AGENT TYPES ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🤖 Tipos de Agente
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Escolha o agente certo para o seu negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada agente é treinado com as informações da sua empresa. Você não precisa entender de IA — a gente cuida de tudo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentTypes.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${agent.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-500 transition-all duration-300">
                      {agent.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{agent.description}</p>
                    <ul className="space-y-3">
                      {agent.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.gradient} mr-3 flex-shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${agent.gradient}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section id="como-funciona" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📋 Processo simples
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Do zero ao seu agente funcionando em 7 dias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Um processo simples e transparente, sem surpresas e sem precisar entender de tecnologia
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200" />

            <div className="space-y-24">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up ${isEven ? "lg:flex-row-reverse" : ""}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-1 lg:w-5/12">
                      <div className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${isEven ? "lg:text-right" : ""}`}>
                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${step.gradient} p-[2px]`}>
                          <div className="w-full h-full bg-white rounded-3xl" />
                        </div>
                        <div className="relative z-10">
                          <div className={`flex items-center gap-4 mb-6 ${isEven ? "lg:justify-end" : ""}`}>
                            <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div className={isEven ? "lg:text-right" : ""}>
                              <span className={`font-bold text-lg bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                                Step {step.number}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{step.description}</p>
                          <ul className={`space-y-3 ${isEven ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-gray-700">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} flex-shrink-0 ${isEven ? "lg:order-last" : ""}`} />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`absolute ${isEven ? "top-0 left-0" : "top-0 right-0"} w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-5 ${isEven ? "rounded-br-full" : "rounded-bl-full"}`} />
                      </div>
                    </div>

                    <div className="hidden lg:flex w-24 h-24 relative z-20">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl animate-pulse-glow`}>
                        <span className="text-white font-bold text-2xl">{step.number}</span>
                      </div>
                    </div>

                    <div className="flex-1 lg:w-5/12 hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BENEFÍCIOS ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Por que funciona
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              O que muda quando seu WhatsApp trabalha por você
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sem contratar ninguém. Sem complicação técnica. Só resultado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefitItems.map((item, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <BenefitCardItem {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONTACT / CTA FINAL ── */}
      <section id="contato" className="py-24 bg-gradient-to-br from-white via-indigo-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200 rounded-full filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              💬 Consultoria gratuita
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Fale com a gente agora</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Resposta em até 2 horas. Sem compromisso, sem enrolação.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* WhatsApp block */}
            <div
              className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prefere pelo WhatsApp?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fale direto com Wesley. Conta o que você precisa e a gente responde na hora.
              </p>
              <button
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
                style={{
                  width: "100%",
                  height: "56px",
                  background: "#25D366",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "16px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#128C7E"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#25D366"; }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  style={{ width: "24px", height: "24px" }}
                />
                Chamar no WhatsApp agora
              </button>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400 whitespace-nowrap">ou preencha o formulário →</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <ul className="space-y-3">
                {[
                  "Diagnóstico gratuito sem compromisso",
                  "Resposta em até 2 horas",
                  "Nenhum custo até você aprovar a proposta",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form block */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
              <div className="relative glass rounded-3xl p-8 border border-white/50 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Nome</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">WhatsApp</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onFocus={handlePhoneFocus}
                      onKeyDown={(e) => {
                        if ((e.key === "Backspace" || e.key === "Delete") && formData.phone.length <= 2) {
                          e.preventDefault();
                        }
                      }}
                      required
                      placeholder="55 19 99999-9999"
                      disabled={isSubmitting}
                      maxLength={16}
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Empresa</label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                      disabled={isSubmitting}
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Qual é o maior problema no seu atendimento hoje?
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Descreva o principal gargalo no seu atendimento..."
                      disabled={isSubmitting}
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl min-h-[120px] transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Enviando...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Enviado com Sucesso!
                      </>
                    ) : (
                      "Quero meu diagnóstico gratuito →"
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    ✓ Sem spam · Suas informações são confidenciais
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ── */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center">
        <div className="container mx-auto px-4">
          <a href="https://www.agenciavisionai.com.br" className="inline-flex items-center gap-2 mb-3">
            <img src={logoVisionAI} alt="Vision AI" className="h-6 w-auto" />
            <span className="font-bold text-gray-900">
              VISION <span className="text-indigo-600">AI</span>
            </span>
          </a>
          <p className="text-sm text-gray-500 mb-2">
            © 2026 Vision AI · Agentes de IA para empresas · agenciavisionai.com.br
          </p>
          <a
            href="https://www.agenciavisionai.com.br"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </footer>

    </div>
  );
};

export default AgentesIA;
