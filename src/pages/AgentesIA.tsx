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
   SVG COMPONENTS
────────────────────────────────────────────────── */
const WhatsAppHeroMockup = () => (
  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <clipPath id="hero-screen-clip">
        <rect x="55" y="8" width="210" height="244" rx="18" />
      </clipPath>
      <linearGradient id="hero-wpp-header" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00875A" />
        <stop offset="100%" stopColor="#00A36C" />
      </linearGradient>
      <linearGradient id="hero-msg-sent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#005C4B" />
        <stop offset="100%" stopColor="#017A62" />
      </linearGradient>
    </defs>
    {/* Phone shell */}
    <rect x="55" y="8" width="210" height="244" rx="18" fill="#1A1F2A" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <g clipPath="url(#hero-screen-clip)">
      {/* Status bar */}
      <rect x="55" y="8" width="210" height="20" fill="#0B1117" />
      <text x="160" y="21" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="sans-serif">9:41</text>
      {/* WhatsApp header */}
      <rect x="55" y="28" width="210" height="38" fill="url(#hero-wpp-header)" />
      <text x="68" y="50" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">‹</text>
      <circle cx="84" cy="47" r="12" fill="rgba(255,255,255,0.15)" />
      <image href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" x="75" y="38" width="18" height="18" />
      <text x="102" y="44" fill="white" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Assistente Vision AI</text>
      <circle cx="103" cy="52" r="2.5" fill="#7FFFD4" />
      <text x="108" y="55" fill="rgba(255,255,255,0.65)" fontSize="6.5" fontFamily="sans-serif">online</text>
      {/* Chat bg */}
      <rect x="55" y="66" width="210" height="160" fill="#0B1117" />
      {/* Received msg */}
      <rect x="63" y="74" width="118" height="30" rx="8" fill="#1E2733" />
      <text x="72" y="86" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">Qual o prazo de entrega</text>
      <text x="72" y="97" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">para SP capital?</text>
      <text x="172" y="101" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="sans-serif">10:23</text>
      {/* Sent msg */}
      <rect x="95" y="112" width="160" height="46" rx="8" fill="url(#hero-msg-sent)" />
      <text x="104" y="125" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">Olá! Para SP capital nosso</text>
      <text x="104" y="136" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">prazo é 1–2 dias úteis. 🚀</text>
      <text x="104" y="147" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">Posso gerar um orçamento?</text>
      <text x="237" y="154" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="sans-serif">✓✓</text>
      {/* Typing indicator */}
      <rect x="63" y="166" width="56" height="20" rx="10" fill="#1E2733" />
      <circle cx="77" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite" />
      </circle>
      <circle cx="89" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="101" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      {/* Speed badge */}
      <rect x="68" y="194" width="184" height="18" rx="9" fill="rgba(0,200,100,0.12)" stroke="rgba(0,200,100,0.4)" strokeWidth="0.75" />
      <circle cx="81" cy="203" r="3.5" fill="#00C864">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="89" y="207" fill="#00C864" fontSize="7" fontWeight="600" fontFamily="sans-serif">⚡ Respondido em 1.2 segundos</text>
      {/* Input bar */}
      <rect x="55" y="218" width="210" height="34" fill="#182026" />
      <rect x="63" y="224" width="140" height="18" rx="9" fill="#252D35" />
      <text x="72" y="235" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Mensagem</text>
      <circle cx="224" cy="233" r="9" fill="#00A36C" />
      <text x="224" y="237" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">↑</text>
    </g>
    <rect x="130" y="247" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
  </svg>
);

/* Dark result card wrapper */
const DarkResultCard = ({
  label, title, description, tags, children,
}: {
  label: string;
  title: string;
  description: string;
  tags: string[];
  children: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(0,255,133,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ padding: "14px 16px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#00FF85", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <div style={{ height: "230px", background: "rgba(0,0,0,0.25)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {children}
      </div>
      <div style={{ padding: "20px" }}>
        <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "#ffffff", marginBottom: "8px" }}>{title}</h4>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "12px" }}>{description}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" as const }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "3px 10px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Result Card 1 — Response Time Bar Chart */
const ResultCard1 = () => (
  <DarkResultCard
    label="01 — Tempo de resposta"
    title="De 4 horas para 3 segundos"
    description="O agente responde instantaneamente qualquer hora do dia. Sem cliente esperando, sem venda perdida."
    tags={["WhatsApp API", "24/7", "Resposta imediata"]}
  >
    <svg viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rc1-bar-before" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="rc1-bar-after" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF85" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="320" height="230" fill="#0D0F14" />
      <text x="160" y="28" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif" fontWeight="600">Tempo médio de resposta</text>
      {/* Antes bar */}
      <text x="80" y="54" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Antes</text>
      <rect x="50" y="60" width="60" height="100" rx="6" fill="url(#rc1-bar-before)" />
      <text x="80" y="178" textAnchor="middle" fill="#818cf8" fontSize="20" fontFamily="sans-serif" fontWeight="800">4h</text>
      <text x="80" y="195" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">sem agente</text>
      {/* Arrow */}
      <text x="160" y="118" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="32" fontFamily="sans-serif">→</text>
      <text x="160" y="138" textAnchor="middle" fill="#00FF85" fontSize="9" fontFamily="sans-serif" fontWeight="600">4800× mais rápido</text>
      {/* Depois bar */}
      <text x="240" y="54" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Depois</text>
      <rect x="210" y="142" width="60" height="18" rx="6" fill="url(#rc1-bar-after)" />
      <text x="240" y="178" textAnchor="middle" fill="#00FF85" fontSize="20" fontFamily="sans-serif" fontWeight="800">3s</text>
      <text x="240" y="195" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">com agente IA</text>
      {/* Badge */}
      <rect x="70" y="210" width="180" height="15" rx="7.5" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.25)" strokeWidth="0.75" />
      <circle cx="86" cy="217.5" r="3" fill="#00FF85">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="94" y="221" fill="#00FF85" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">Resposta instantânea · 24/7</text>
    </svg>
  </DarkResultCard>
);

/* Result Card 2 — Donut Chart */
const ResultCard2 = () => (
  <DarkResultCard
    label="02 — Carga da equipe"
    title="80% dos chamados resolvidos sem você"
    description="Sua equipe só recebe os casos que realmente precisam de atenção humana. O resto o agente resolve."
    tags={["Triagem automática", "Escalação inteligente", "Produtividade"]}
  >
    <svg viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rc2-agent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00FF85" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="rc2-human" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <rect width="320" height="230" fill="#0D0F14" />
      {/* Donut — circumference of r=70: 2π×70 ≈ 439.8 */}
      {/* Track */}
      <circle cx="160" cy="108" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="28" />
      {/* 80% green: 439.8×0.8=351.8, gap=88 */}
      <circle cx="160" cy="108" r="70" fill="none" stroke="url(#rc2-agent)" strokeWidth="28"
        strokeDasharray="351.8 88" strokeLinecap="round" transform="rotate(-90 160 108)" />
      {/* 20% indigo: length=87.96, offset back so it starts after green */}
      <circle cx="160" cy="108" r="70" fill="none" stroke="url(#rc2-human)" strokeWidth="26"
        strokeDasharray="79 360.8" strokeDashoffset="-355.8" strokeLinecap="round" transform="rotate(-90 160 108)" />
      {/* Center text */}
      <text x="160" y="100" textAnchor="middle" fill="#00FF85" fontSize="28" fontFamily="sans-serif" fontWeight="800">80%</text>
      <text x="160" y="118" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="sans-serif">pelo agente</text>
      {/* Legend */}
      <rect x="42" y="192" width="10" height="10" rx="3" fill="#00FF85" />
      <text x="56" y="201" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="sans-serif">Resolvido pelo agente (80%)</text>
      <rect x="190" y="192" width="10" height="10" rx="3" fill="#6366f1" />
      <text x="204" y="201" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="sans-serif">Humanos (20%)</text>
      {/* Badge */}
      <rect x="68" y="214" width="184" height="14" rx="7" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.2)" strokeWidth="0.75" />
      <circle cx="82" cy="221" r="3" fill="#00FF85">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="90" y="225" fill="#00FF85" fontSize="7" fontFamily="sans-serif" fontWeight="600">Equipe foca no que realmente importa</text>
    </svg>
  </DarkResultCard>
);

/* Result Card 3 — Lead Funnel */
const ResultCard3 = () => (
  <DarkResultCard
    label="03 — Leads qualificados"
    title="Leads quentes direto no seu CRM"
    description="O agente coleta dados, qualifica por interesse e só passa para você quem está pronto para comprar."
    tags={["Qualificação IA", "Pipeline", "Conversão"]}
  >
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rc3-stage1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2240" />
          <stop offset="100%" stopColor="#1e2850" />
        </linearGradient>
        <linearGradient id="rc3-stage2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2235" />
          <stop offset="100%" stopColor="#0f2d50" />
        </linearGradient>
        <linearGradient id="rc3-stage3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#003a28" />
          <stop offset="100%" stopColor="#005c3a" />
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="#0D0F14" />
      <line x1="0" y1="65" x2="320" y2="65" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="130" x2="320" y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="195" x2="320" y2="195" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="80" y1="0" x2="80" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="160" y1="0" x2="160" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="240" y1="0" x2="240" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* Stat chips */}
      <rect x="14" y="10" width="82" height="14" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="55" y="20" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">14% conversão total</text>
      <rect x="112" y="10" width="72" height="14" rx="7" fill="rgba(0,200,100,0.1)" stroke="rgba(0,200,100,0.25)" strokeWidth="0.5" />
      <text x="148" y="20" textAnchor="middle" fill="#00C864" fontSize="7" fontFamily="sans-serif">↑ 2.3× vs antes</text>
      <rect x="200" y="10" width="92" height="14" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="246" y="20" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">0 esforço manual</text>
      {/* Stage 1 */}
      <path d="M 22,32 L 298,32 L 262,80 L 58,80 Z" fill="url(#rc3-stage1)" stroke="rgba(100,130,220,0.3)" strokeWidth="1" />
      <text x="55" y="50" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 01</text>
      <text x="55" y="68" fill="white" fontSize="20" fontFamily="sans-serif" fontWeight="700">1.240</text>
      <text x="220" y="50" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">Leads captados</text>
      <text x="220" y="62" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="sans-serif">últimos 30 dias</text>
      <rect x="304" y="32" width="4" height="48" rx="2" fill="rgba(100,150,255,0.55)" />
      <line x1="58" y1="85" x2="262" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="160" cy="85" r="5" fill="#1a2240">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="160" y="101" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Taxa: 48%</text>
      {/* Stage 2 */}
      <path d="M 58,106 L 262,106 L 214,156 L 106,156 Z" fill="url(#rc3-stage2)" stroke="rgba(50,100,220,0.3)" strokeWidth="1" />
      <text x="70" y="124" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 02</text>
      <text x="70" y="144" fill="white" fontSize="20" fontFamily="sans-serif" fontWeight="700">596</text>
      <text x="194" y="124" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">Qualificados</text>
      <text x="194" y="136" fill="rgba(100,170,255,0.7)" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">IA Score ≥ 72</text>
      <rect x="304" y="106" width="4" height="26" rx="2" fill="rgba(80,140,255,0.55)" />
      <line x1="106" y1="161" x2="214" y2="161" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="160" cy="161" r="5" fill="#0d2235">
        <animate attributeName="r" values="5;7;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <text x="160" y="177" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Taxa: 29%</text>
      {/* Stage 3 */}
      <path d="M 106,182 L 214,182 L 188,226 L 132,226 Z" fill="url(#rc3-stage3)" stroke="rgba(0,200,100,0.35)" strokeWidth="1" />
      <text x="160" y="200" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 03</text>
      <text x="160" y="220" textAnchor="middle" fill="#00C864" fontSize="22" fontFamily="sans-serif" fontWeight="800">174</text>
      <rect x="304" y="182" width="4" height="13" rx="2" fill="#00C864" />
      <rect x="106" y="234" width="108" height="18" rx="9" fill="rgba(0,200,100,0.1)" stroke="rgba(0,200,100,0.35)" strokeWidth="0.75" />
      <circle cx="120" cy="243" r="3.5" fill="#00C864">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="130" y="247" fill="#00C864" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">Prontos p/ fechar</text>
    </svg>
  </DarkResultCard>
);

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
                {["Setup em até 7 dias", "Sem TI necessário", "Integrado ao seu processo"].map((item) => (
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

            {/* Right — mockup + stats */}
            <div className="animate-scale-in">
              <div className="w-full max-w-sm mx-auto">
                <WhatsAppHeroMockup />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { value: "< 3s", label: "tempo de resposta", color: "#F59E0B" },
                  { value: "24/7", label: "sem interrupção", color: "#6366F1" },
                  { value: "0", label: "sem TI necessário", color: "#10B981" },
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
            {/* Central timeline line */}
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

                    {/* Timeline node */}
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

      {/* ── 5. DARK RESULTS SECTION ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0A0D0F" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute top-0 left-0 w-96 h-72 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top left, rgba(0,255,133,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-72 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, rgba(0,196,255,0.07) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ background: "rgba(0,255,133,0.1)", border: "1px solid rgba(0,255,133,0.25)", color: "#00FF85" }}
            >
              Resultados reais
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              O que muda depois de 30 dias com o agente
            </h3>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
              Dados reais de negócios que implementaram agentes de IA no WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ResultCard1 />
            <ResultCard2 />
            <ResultCard3 />
          </div>

          <div className="text-center">
            <button
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              style={{
                background: "#00FF85",
                color: "#0A0D0F",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "14px 32px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "-0.01em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              Quero ver uma demonstração
            </button>
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
                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors text-lg"
              >
                <MessageCircle className="h-5 w-5" />
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
                    <label className="block text-sm font-semibold text-gray-700">Nome *</label>
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
                    <label className="block text-sm font-semibold text-gray-700">WhatsApp *</label>
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
                      Qual é o maior problema no seu atendimento hoje? *
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
