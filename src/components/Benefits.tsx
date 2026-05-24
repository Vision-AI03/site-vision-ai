import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Animated Counter ─── */
interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState<number | string>(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const parsed = parseInt(value);
    const isAnimatable = !isNaN(parsed) && String(parsed) === value;
    if (isAnimatable) {
      let start = 0;
      const end = parsed;
      const duration = 1800;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    } else {
      setCount(value);
    }
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-2xl font-bold text-gradient" style={{ fontFamily: "var(--va-font-display)" }}>
      {prefix}{count}{suffix}
    </div>
  );
};

/* ─── WhatsApp Mockup SVG ─── */
const WhatsAppMockup = () => (
  <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="phone-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0E1117" />
        <stop offset="100%" stopColor="#141921" />
      </linearGradient>
      <linearGradient id="msg-out" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#005C4B" />
        <stop offset="100%" stopColor="#007A63" />
      </linearGradient>
      <linearGradient id="header-wpp" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00875A" />
        <stop offset="100%" stopColor="#00A36C" />
      </linearGradient>
      <filter id="shadow-card">
        <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.5" />
      </filter>
      <clipPath id="phone-clip">
        <rect x="60" y="10" width="220" height="260" rx="20" />
      </clipPath>
    </defs>

    {/* Phone frame */}
    <rect x="60" y="10" width="220" height="260" rx="20" fill="#1A1F2A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" filter="url(#shadow-card)" />

    {/* Screen bg */}
    <rect x="60" y="10" width="220" height="260" rx="20" fill="url(#phone-bg)" clipPath="url(#phone-clip)" />

    {/* Status bar */}
    <rect x="60" y="10" width="220" height="22" rx="0" fill="rgba(0,0,0,0.3)" />
    <text x="170" y="24" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="DM Sans, sans-serif">9:41</text>

    {/* WhatsApp Header */}
    <rect x="60" y="32" width="220" height="40" fill="url(#header-wpp)" />
    <circle cx="90" cy="52" r="13" fill="rgba(255,255,255,0.15)" />
    <text x="90" y="56" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="DM Sans, sans-serif">VA</text>
    <text x="110" y="48" fill="white" fontSize="8.5" fontWeight="700" fontFamily="DM Sans, sans-serif">Assistente Vision AI</text>
    <circle cx="112" cy="55" r="3" fill="#7FFFD4" />
    <text x="117" y="58" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="DM Sans, sans-serif">Online agora</text>

    {/* Chat bg texture */}
    <rect x="60" y="72" width="220" height="168" fill="#0B1117" />

    {/* Message in — cliente */}
    <rect x="70" y="80" width="120" height="32" rx="8" fill="#1E2733" />
    <text x="80" y="93" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="DM Sans, sans-serif">Qual o prazo de entrega</text>
    <text x="80" y="104" fill="rgba(255,255,255,0.85)" fontSize="7.5" fontFamily="DM Sans, sans-serif">para SP capital?</text>
    <text x="182" y="109" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="DM Sans, sans-serif">10:23</text>

    {/* Message out — IA */}
    <rect x="100" y="120" width="168" height="52" rx="8" fill="url(#msg-out)" />
    <text x="110" y="134" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="DM Sans, sans-serif">Olá! Para SP capital, nosso</text>
    <text x="110" y="146" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="DM Sans, sans-serif">prazo é 1–2 dias úteis. 🚀</text>
    <text x="110" y="158" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="DM Sans, sans-serif">Posso gerar um orçamento?</text>
    <text x="250" y="167" fill="rgba(255,255,255,0.45)" fontSize="6" fontFamily="DM Sans, sans-serif">✓✓</text>
    <text x="222" y="167" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="DM Sans, sans-serif">10:23</text>

    {/* Typing indicator */}
    <rect x="70" y="180" width="62" height="22" rx="11" fill="#1E2733" />
    <circle cx="87" cy="191" r="4" fill="rgba(255,255,255,0.25)">
      <animate attributeName="opacity" values="0.25;0.9;0.25" dur="1.2s" begin="0s" repeatCount="indefinite" />
    </circle>
    <circle cx="101" cy="191" r="4" fill="rgba(255,255,255,0.25)">
      <animate attributeName="opacity" values="0.25;0.9;0.25" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="115" cy="191" r="4" fill="rgba(255,255,255,0.25)">
      <animate attributeName="opacity" values="0.25;0.9;0.25" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
    </circle>

    {/* Speed badge */}
    <rect x="80" y="215" width="180" height="22" rx="11" fill="rgba(0,255,133,0.12)" stroke="rgba(0,255,133,0.35)" strokeWidth="0.75" />
    <circle cx="96" cy="226" r="5" fill="#00FF85" opacity="0.9" />
    <text x="106" y="230" fill="#00FF85" fontSize="7.5" fontWeight="600" fontFamily="DM Sans, sans-serif">⚡ Respondido em 1.2 segundos</text>

    {/* Input bar */}
    <rect x="60" y="244" width="220" height="26" rx="0" fill="#1A2026" />
    <rect x="70" y="249" width="148" height="16" rx="8" fill="#252D35" />
    <text x="78" y="260" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="DM Sans, sans-serif">Digite uma mensagem</text>
    <circle cx="234" cy="257" r="8" fill="#00FF85" />
    <text x="234" y="261" textAnchor="middle" fill="#0A0D0F" fontSize="9" fontWeight="700">↑</text>

    {/* Home indicator */}
    <rect x="140" y="266" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
  </svg>
);

/* ─── Funil SVG profissional ─── */
const FunnelMockup = () => (
  <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="funnel-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0D0F14" />
        <stop offset="100%" stopColor="#111520" />
      </linearGradient>
      <linearGradient id="f1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A2035" />
        <stop offset="100%" stopColor="#1E2640" />
      </linearGradient>
      <linearGradient id="f2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0D2235" />
        <stop offset="100%" stopColor="#103060" />
      </linearGradient>
      <linearGradient id="f3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#003A30" />
        <stop offset="100%" stopColor="#005C45" />
      </linearGradient>
      <linearGradient id="green-pulse" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00FF85" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#00C466" stopOpacity="0.7" />
      </linearGradient>
      <filter id="glow-green">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Background */}
    <rect width="340" height="280" fill="url(#funnel-bg)" rx="0" />

    {/* Grid sutil */}
    <g opacity="0.06">
      <line x1="0" y1="70" x2="340" y2="70" stroke="white" strokeWidth="0.5" />
      <line x1="0" y1="140" x2="340" y2="140" stroke="white" strokeWidth="0.5" />
      <line x1="0" y1="210" x2="340" y2="210" stroke="white" strokeWidth="0.5" />
      <line x1="85" y1="0" x2="85" y2="280" stroke="white" strokeWidth="0.5" />
      <line x1="170" y1="0" x2="170" y2="280" stroke="white" strokeWidth="0.5" />
      <line x1="255" y1="0" x2="255" y2="280" stroke="white" strokeWidth="0.5" />
    </g>

    {/* ── Estágio 1: Leads Captados ── */}
    {/* Trapézio topo */}
    <path d="M 34,30 L 306,30 L 270,82 L 70,82 Z" fill="url(#f1)" stroke="rgba(100,120,200,0.25)" strokeWidth="1" />
    {/* Label esquerda */}
    <text x="42" y="52" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="500">ETAPA 01</text>
    {/* Número grande */}
    <text x="60" y="68" fill="white" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="700">1.240</text>
    {/* Label direita */}
    <text x="230" y="52" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="DM Sans, sans-serif">Leads captados</text>
    <text x="230" y="64" fill="rgba(255,255,255,0.3)" fontSize="7.5" fontFamily="DM Sans, sans-serif">últimos 30 dias</text>
    {/* Barra de progresso lateral */}
    <rect x="312" y="30" width="4" height="52" rx="2" fill="rgba(100,120,200,0.15)" />
    <rect x="312" y="30" width="4" height="52" rx="2" fill="rgba(100,150,255,0.5)" />

    {/* Divisor animado */}
    <g opacity="0.6">
      <line x1="70" y1="88" x2="270" y2="88" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <circle cx="170" cy="88" r="4" fill="#1E2640">
        <animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="170" y="91.5" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6">↓</text>
      <text x="170" y="104" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="DM Sans, sans-serif">Taxa: 48%</text>
    </g>

    {/* ── Estágio 2: Qualificados ── */}
    <path d="M 70,108 L 270,108 L 220,162 L 120,162 Z" fill="url(#f2)" stroke="rgba(50,100,200,0.3)" strokeWidth="1" />
    <text x="82" y="128" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="500">ETAPA 02</text>
    <text x="82" y="145" fill="white" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="700">596</text>
    <text x="196" y="128" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="DM Sans, sans-serif">Qualificados</text>
    <text x="196" y="140" fill="rgba(100,160,255,0.7)" fontSize="7.5" fontFamily="DM Sans, sans-serif" fontWeight="600">IA Score ≥ 72</text>

    <rect x="312" y="108" width="4" height="54" rx="2" fill="rgba(50,100,200,0.15)" />
    <rect x="312" y="108" width="4" height="28" rx="2" fill="rgba(80,140,255,0.55)" />

    {/* Divisor */}
    <g opacity="0.6">
      <line x1="120" y1="168" x2="220" y2="168" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <circle cx="170" cy="168" r="4" fill="#103060">
        <animate attributeName="r" values="4;5.5;4" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <text x="170" y="171.5" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6">↓</text>
      <text x="170" y="185" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="DM Sans, sans-serif">Taxa: 29%</text>
    </g>

    {/* ── Estágio 3: Prontos p/ Venda ── */}
    <path d="M 120,190 L 220,190 L 195,240 L 145,240 Z" fill="url(#f3)" stroke="rgba(0,200,100,0.35)" strokeWidth="1" />
    <text x="170" y="210" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="500">ETAPA 03</text>
    <text x="170" y="230" textAnchor="middle" fill="#00FF85" fontSize="20" fontFamily="Syne, sans-serif" fontWeight="800" filter="url(#glow-green)">174</text>

    <rect x="312" y="190" width="4" height="50" rx="2" fill="rgba(0,200,100,0.1)" />
    <rect x="312" y="190" width="4" height="14" rx="2" fill="url(#green-pulse)" />

    {/* Badge final */}
    <rect x="128" y="248" width="84" height="18" rx="9" fill="rgba(0,255,133,0.12)" stroke="rgba(0,255,133,0.4)" strokeWidth="0.75" />
    <circle cx="140" cy="257" r="3.5" fill="#00FF85">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <text x="148" y="261" fill="#00FF85" fontSize="7.5" fontWeight="600" fontFamily="DM Sans, sans-serif">Prontos p/ fechar</text>

    {/* Stat chips no topo */}
    <rect x="34" y="14" width="62" height="13" rx="6.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <text x="65" y="23.5" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="DM Sans, sans-serif">14% conversão</text>
    <rect x="140" y="14" width="60" height="13" rx="6.5" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.2)" strokeWidth="0.5" />
    <text x="170" y="23.5" textAnchor="middle" fill="#00FF85" fontSize="7" fontFamily="DM Sans, sans-serif">↑ 2.3× vs antes</text>
    <rect x="244" y="14" width="62" height="13" rx="6.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <text x="275" y="23.5" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="DM Sans, sans-serif">0 esforço manual</text>
  </svg>
);

/* ─── Hub de Integrações ─── */
const IntegrationsMockup = () => (
  <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="hub-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#0E1520" />
        <stop offset="100%" stopColor="#08090F" />
      </radialGradient>
      <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,255,133,0.12)" />
        <stop offset="100%" stopColor="rgba(0,255,133,0)" />
      </radialGradient>
      <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00FF85" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF85" stopOpacity="0.1" />
      </linearGradient>
      <filter id="hub-shadow">
        <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00FF85" floodOpacity="0.3" />
      </filter>
      <filter id="node-glow">
        <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
      </filter>
    </defs>

    {/* BG */}
    <rect width="340" height="280" fill="url(#hub-bg)" />

    {/* Glow central */}
    <ellipse cx="170" cy="140" rx="90" ry="80" fill="url(#hub-glow)" />

    {/* Anéis orbitais */}
    <circle cx="170" cy="140" r="72" fill="none" stroke="rgba(0,255,133,0.06)" strokeWidth="0.75" strokeDasharray="4 6" />
    <circle cx="170" cy="140" r="48" fill="none" stroke="rgba(0,255,133,0.09)" strokeWidth="0.75" strokeDasharray="3 5" />

    {/* Linhas de conexão animadas */}
    {/* WhatsApp → Hub */}
    <line x1="56" y1="70" x2="138" y2="126" stroke="#25D366" strokeWidth="1" opacity="0.5" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
    </line>
    {/* Sheets → Hub */}
    <line x1="284" y1="70" x2="202" y2="126" stroke="#0F9D58" strokeWidth="1" opacity="0.5" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.3s" repeatCount="indefinite" />
    </line>
    {/* CRM → Hub */}
    <line x1="56" y1="210" x2="138" y2="154" stroke="#F97316" strokeWidth="1" opacity="0.5" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.9s" repeatCount="indefinite" />
    </line>
    {/* Calendar → Hub */}
    <line x1="284" y1="210" x2="202" y2="154" stroke="#4285F4" strokeWidth="1" opacity="0.5" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.1s" repeatCount="indefinite" />
    </line>
    {/* Supabase → Hub */}
    <line x1="170" y1="18" x2="170" y2="116" stroke="#3ECF8E" strokeWidth="1" opacity="0.4" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
    </line>

    {/* ── Hub Central ── */}
    <circle cx="170" cy="140" r="36" fill="#0A1A14" stroke="rgba(0,255,133,0.4)" strokeWidth="1.5" filter="url(#hub-shadow)" />
    <circle cx="170" cy="140" r="29" fill="rgba(0,255,133,0.08)" />
    {/* Ícone raio */}
    <path d="M175,125 L163,141 L170,141 L163,157 L178,137 L170,137 Z"
      fill="#00FF85" filter="url(#hub-shadow)" />
    <text x="170" y="169" textAnchor="middle" fill="rgba(0,255,133,0.7)" fontSize="7" fontFamily="DM Sans, sans-serif" fontWeight="600">VISION AI</text>

    {/* ── Nós satélite ── */}

    {/* WhatsApp */}
    <circle cx="56" cy="70" r="28" fill="#1A2A1E" stroke="rgba(37,211,102,0.3)" strokeWidth="1" filter="url(#node-glow)" />
    <circle cx="56" cy="62" r="13" fill="#25D366" />
    <rect x="49" y="57" width="14" height="10" rx="3.5" fill="white" opacity="0.9" />
    <path d="M50,67 L48,73 L55,70 Z" fill="white" opacity="0.9" />
    <circle cx="53" cy="62" r="1.3" fill="#25D366" />
    <circle cx="56" cy="62" r="1.3" fill="#25D366" />
    <circle cx="59" cy="62" r="1.3" fill="#25D366" />
    <text x="56" y="83" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600">WhatsApp</text>
    {/* Ping animado */}
    <circle cx="80" cy="48" r="4" fill="rgba(37,211,102,0.4)">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="48" r="3" fill="#25D366" />

    {/* Google Sheets */}
    <circle cx="284" cy="70" r="28" fill="#1A251E" stroke="rgba(15,157,88,0.3)" strokeWidth="1" filter="url(#node-glow)" />
    <rect x="272" y="55" width="24" height="30" rx="4" fill="#0F9D58" />
    <rect x="276" y="61" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.9)" />
    <rect x="276" y="67" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
    <rect x="276" y="73" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <line x1="284" y1="55" x2="284" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
    <text x="284" y="95" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600">G. Sheets</text>

    {/* CRM */}
    <circle cx="56" cy="210" r="28" fill="#251D15" stroke="rgba(249,115,22,0.3)" strokeWidth="1" filter="url(#node-glow)" />
    <circle cx="56" cy="202" r="9" fill="#F97316" />
    <path d="M40,222 Q40,210 56,210 Q72,210 72,222" fill="#F97316" opacity="0.85" />
    <text x="56" y="232" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600">CRM</text>

    {/* Google Calendar */}
    <circle cx="284" cy="210" r="28" fill="#151D2A" stroke="rgba(66,133,244,0.3)" strokeWidth="1" filter="url(#node-glow)" />
    <rect x="271" y="197" width="26" height="24" rx="4" fill="#4285F4" />
    <rect x="271" y="197" width="26" height="10" rx="4" fill="#1967D2" />
    <rect x="271" y="203" width="26" height="4" fill="#1967D2" />
    <rect x="275" y="211" width="5" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="282" y="211" width="5" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="289" y="211" width="5" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="275" y="217" width="5" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="282" y="217" width="5" height="4" rx="1" fill="#E53935" />
    <rect x="289" y="217" width="5" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <text x="284" y="232" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600">Calendar</text>

    {/* Supabase (topo centro) */}
    <circle cx="170" cy="18" r="20" fill="#0D1F18" stroke="rgba(62,207,142,0.3)" strokeWidth="1" filter="url(#node-glow)" />
    <path d="M164,12 L176,12 L170,24 Z" fill="#3ECF8E" opacity="0.9" />
    <path d="M170,14 L178,26 L162,26 Z" fill="#3ECF8E" opacity="0.5" />
    <text x="170" y="32" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7" fontFamily="DM Sans, sans-serif" fontWeight="600">Supabase</text>

    {/* Chip de status no fundo */}
    <rect x="85" y="258" width="170" height="18" rx="9" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.25)" strokeWidth="0.75" />
    <circle cx="100" cy="267" r="3.5" fill="#00FF85">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <text x="108" y="271" fill="rgba(0,255,133,0.85)" fontSize="7.5" fontFamily="DM Sans, sans-serif" fontWeight="500">5 integrações ativas • Tempo real</text>
  </svg>
);

/* ─── Benefícios ─── */
const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Seus agentes IA trabalham sem parar, oferecendo atendimento a qualquer hora.",
      stats: "9", suffix: "% uptime", prefix: "99,",
      color: "#00C4FF",
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Diminua custos operacionais enquanto aumenta a eficiência do atendimento.",
      stats: "60", suffix: "% economia", prefix: "Até ",
      color: "#00FF85",
    },
    {
      icon: TrendingUp,
      title: "Mais Conversões",
      description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento.",
      stats: "2", suffix: "× mais conversões",
      color: "#FFD700",
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Elimine tempo de espera com respostas imediatas e precisas.",
      stats: "30", suffix: "s", prefix: "< ",
      color: "#FF6B35",
    },
    {
      icon: Users,
      title: "Personalizado",
      description: "Atendimento baseado no histórico e preferências de cada cliente.",
      stats: "Sob medida", suffix: "",
      color: "#A78BFA",
    },
    {
      icon: Shield,
      title: "Escala Ilimitada",
      description: "Cresça sem limites. Nossos agentes se adaptam ao volume de demanda.",
      stats: "∞", suffix: " escala",
      color: "#F472B6",
    },
  ];

  const examples = [
    {
      label: "Atendimento",
      title: "Automação de Atendimento",
      desc: "Respostas instantâneas no WhatsApp, sem equipe adicional. O agente entende contexto, agenda e escalona para humanos só quando necessário.",
      tags: ["WhatsApp", "24/7", "< 2s"],
      mockup: <WhatsAppMockup />,
    },
    {
      label: "Qualificação",
      title: "Funil de Leads com IA",
      desc: "Captura, pontua e filtra oportunidades automaticamente. Só os leads prontos chegam até o seu time comercial.",
      tags: ["Score IA", "14% conversão", "0 esforço manual"],
      mockup: <FunnelMockup />,
    },
    {
      label: "Integrações",
      title: "Hub de Integrações",
      desc: "Um agente conectado a todos os seus sistemas: WhatsApp, planilhas, CRM e agenda. Fluxos automáticos de ponta a ponta.",
      tags: ["WhatsApp", "G. Sheets", "CRM + Calendar"],
      mockup: <IntegrationsMockup />,
    },
  ];

  return (
    <>
      {/* ════════ SEÇÃO DE BENEFÍCIOS (Cards de métricas) ════════ */}
      <section
        id="benefits"
        className="py-24 relative overflow-hidden"
        style={{ background: "#F7F8FA" }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-light" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge-va mb-5 inline-flex">
              <span className="dot-accent" />
              Vantagens Competitivas
            </span>
            <h2
              className="text-4xl md:text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--va-font-display)", letterSpacing: "-0.025em" }}
            >
              Por que escolher a{" "}
              <span className="text-gradient">Vision AI?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--va-font-body)" }}>
              Resultados reais para empresas que cansaram de perder tempo com tarefas manuais
            </p>
          </div>

          {/* Grid de benefícios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Acento colorido topo */}
                  <div
                    className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: benefit.color }}
                  />

                  {/* Ícone */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${benefit.color}18`, border: `1px solid ${benefit.color}30` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: benefit.color }} />
                  </div>

                  <h3
                    className="text-gray-900 text-lg mb-2"
                    style={{ fontFamily: "var(--va-font-display)", fontWeight: 700 }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--va-font-body)" }}>
                    {benefit.description}
                  </p>

                  <AnimatedCounter
                    value={benefit.stats}
                    suffix={benefit.suffix}
                    prefix={benefit.prefix || ""}
                  />
                </div>
              );
            })}
          </div>

          {/* ══════════════════════════════════════════════════════
               SEÇÃO DE EXEMPLOS — Nova identidade
          ══════════════════════════════════════════════════════ */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "var(--va-dark)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Grid dark interno */}
            <div className="absolute inset-0 bg-grid-dark" />

            {/* Glow de canto */}
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #00FF85 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #00C4FF 0%, transparent 70%)" }}
            />

            <div className="relative z-10 p-10 md:p-14">
              {/* Header da seção */}
              <div className="text-center mb-12">
                <span className="badge-va mb-5 inline-flex">
                  <span className="dot-accent" />
                  Exemplos Reais
                </span>
                <h3
                  className="text-3xl md:text-4xl text-white mb-3"
                  style={{ fontFamily: "var(--va-font-display)", letterSpacing: "-0.025em" }}
                >
                  Veja a IA em ação
                </h3>
                <p className="text-gray-400 text-base" style={{ fontFamily: "var(--va-font-body)" }}>
                  Automações reais que entregamos para nossos clientes
                </p>
              </div>

              {/* Cards de exemplos */}
              <div className="grid md:grid-cols-3 gap-6">
                {examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      transition: "border-color 0.3s, transform 0.3s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,133,0.2)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Número de ordem */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        style={{
                          fontFamily: "var(--va-font-display)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(0,255,133,0.6)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                        }}
                      >
                        0{idx + 1} — {ex.label}
                      </span>
                    </div>

                    {/* Mockup SVG */}
                    <div
                      className="w-full overflow-hidden"
                      style={{
                        height: "230px",
                        background: "rgba(0,0,0,0.25)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {ex.mockup}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6">
                      <h4
                        className="text-white text-lg mb-2"
                        style={{ fontFamily: "var(--va-font-display)", fontWeight: 700 }}
                      >
                        {ex.title}
                      </h4>
                      <p
                        className="text-gray-400 text-sm leading-relaxed mb-5"
                        style={{ fontFamily: "var(--va-font-body)" }}
                      >
                        {ex.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {ex.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            style={{
                              fontFamily: "var(--va-font-body)",
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "rgba(255,255,255,0.5)",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              padding: "3px 10px",
                              borderRadius: "99px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA interno */}
              <div className="text-center mt-12">
                <p
                  className="text-gray-400 text-sm mb-5"
                  style={{ fontFamily: "var(--va-font-body)" }}
                >
                  Quer ver esses resultados no seu negócio?
                </p>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-shimmer inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: "var(--va-green)",
                    color: "#0A0D0F",
                    fontFamily: "var(--va-font-display)",
                    fontSize: "15px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Quero uma demonstração
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
};

export default Benefits;
