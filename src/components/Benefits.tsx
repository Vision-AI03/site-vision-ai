import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL } from "@/App";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
  color: string;
}

const AnimatedCounter = ({ value, suffix = "", prefix = "", color }: AnimatedCounterProps) => {
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
    if (isVisible) {
      const parsed = parseInt(value);
      const isAnimatable = !isNaN(parsed) && String(parsed) === value;
      if (isAnimatable) {
        let start = 0;
        const end = parsed;
        const duration = 2000;
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
    }
  }, [isVisible, value]);

  return (
    <div ref={ref} style={{ fontSize: '1.5rem', fontFamily: 'var(--va-font-display)', fontWeight: 700, color }}>
      {prefix}{count}{suffix}
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Seus agentes IA trabalham sem parar, oferecendo suporte e atendimento a qualquer hora do dia.",
      stats: "9", suffix: "% uptime", prefix: "99,",
      color: "#3B82F6",
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Diminua significativamente os custos operacionais enquanto aumenta a eficiência do atendimento.",
      stats: "60", suffix: "% economia", prefix: "Até ",
      color: "#10B981",
    },
    {
      icon: TrendingUp,
      title: "Mais conversões",
      description: "Qualificação inteligente e acompanhamento personalizado pra fechar mais sem precisar correr atrás.",
      stats: "Funil afiado", suffix: "",
      color: "#8B5CF6",
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Elimine o tempo de espera com respostas imediatas e precisas para todas as consultas.",
      stats: "30", suffix: " segundos", prefix: "< ",
      color: "#F59E0B",
    },
    {
      icon: Users,
      title: "Experiência Personalizada",
      description: "Ofereça atendimento personalizado baseado no histórico e preferências de cada cliente.",
      stats: "Sob medida", suffix: "",
      color: "#06B6D4",
    },
    {
      icon: Shield,
      title: "Escalabilidade Garantida",
      description: "Cresça sem limites. Nossos agentes se adaptam automaticamente ao volume de demanda.",
      stats: "Escala ilimitada", suffix: "",
      color: "#6366F1",
    },
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden" style={{ background: '#F7F8FA' }}>
      <div className="bg-grid-light absolute inset-0" />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="badge-va" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            🚀 Por que a gente
          </span>
          <h2
            style={{
              fontFamily: 'var(--va-font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.025em',
              marginBottom: '20px',
              marginTop: '16px',
            }}
          >
            <span className="text-gradient">Por que trabalhar</span>{" "}
            <span style={{ color: '#111418' }}>com a gente</span>
          </h2>
          <p style={{ fontFamily: 'var(--va-font-body)', fontSize: '1.1rem', color: '#6B7280', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            Sem mágica e sem número inventado. O que a gente entrega é operação rodando melhor — aqui está como.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <BenefitCard key={index} benefit={benefit} Icon={Icon} index={index} />
            );
          })}
        </div>

        {/* AJM Case — dark container */}
        <div
          style={{
            background: '#0A0D0F',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Grid inside dark container */}
          <div className="bg-grid-dark absolute inset-0" />

          {/* Glow top-left green */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, width: '500px', height: '380px',
              background: 'radial-gradient(ellipse at top left, rgba(0,255,133,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          {/* Glow bottom-right blue */}
          <div
            style={{
              position: 'absolute', bottom: 0, right: 0, width: '500px', height: '380px',
              background: 'radial-gradient(ellipse at bottom right, rgba(0,196,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative p-8 lg:p-14" style={{ zIndex: 10 }}>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Texto */}
              <div className="lg:col-span-6">
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--va-font-display)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#00FF85',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    background: 'rgba(0,255,133,0.08)',
                    border: '1px solid rgba(0,255,133,0.25)',
                    borderRadius: '999px',
                    padding: '6px 14px',
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF85', display: 'inline-block' }} />
                  Case real
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--va-font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    letterSpacing: '-0.025em',
                    color: '#ffffff',
                    marginTop: '20px',
                    marginBottom: '16px',
                    lineHeight: 1.1,
                  }}
                >
                  AJM Transportes
                </h3>

                <p style={{ fontFamily: 'var(--va-font-body)', color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '20px' }}>
                  Entramos numa operação de fretes que rodava em planilha e WhatsApp solto. Entendemos o processo inteiro e construímos um sistema de gestão completo — controle de fretes, faturamento, eficiência de frota e manutenção — com automação de WhatsApp que dispara adiantamentos e pagamentos sozinha, e um site institucional. Hoje a operação roda no sistema, não na cabeça de ninguém.
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {['Sistema de gestão', 'Automação WhatsApp', 'Site institucional', 'Faturamento', 'Frota'].map((tag) => (
                    <span key={tag} style={{ fontFamily: 'var(--va-font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '999px', padding: '5px 12px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Frase-ponte */}
                <div
                  style={{
                    borderLeft: '3px solid #00FF85',
                    background: 'rgba(0,255,133,0.04)',
                    borderRadius: '0 12px 12px 0',
                    padding: '16px 20px',
                  }}
                >
                  <p style={{ fontFamily: 'var(--va-font-display)', fontWeight: 600, color: '#ffffff', fontSize: '1.05rem', lineHeight: 1.55, margin: 0 }}>
                    Hoje é uma <span style={{ color: '#00FF85' }}>transportadora</span>. Amanhã pode ser a sua clínica, sua imobiliária ou sua contabilidade. O que não muda é que a gente começa entendendo a sua operação.
                  </p>
                </div>
              </div>

              {/* Mockup do painel */}
              <div className="lg:col-span-6">
                <AjmDashboardMockup />
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <button
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
                style={{
                  background: '#00FF85',
                  color: '#0A0D0F',
                  fontFamily: 'var(--va-font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Benefit Card ─── */
interface BenefitCardProps {
  benefit: { icon: React.ElementType; title: string; description: string; stats: string; suffix: string; prefix?: string; color: string };
  Icon: React.ElementType;
  index: number;
}

const BenefitCard = ({ benefit, Icon, index }: BenefitCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid #F3F4F6',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '2px',
          width: hovered ? '100%' : '0%',
          background: benefit.color,
          transition: 'width 0.4s ease',
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '14px',
          background: `${benefit.color}18`,
          border: `1px solid ${benefit.color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Icon size={22} style={{ color: benefit.color }} />
      </div>

      <h3 style={{ fontFamily: 'var(--va-font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#111827', marginBottom: '10px' }}>
        {benefit.title}
      </h3>
      <p style={{ fontFamily: 'var(--va-font-body)', fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '16px' }}>
        {benefit.description}
      </p>
      <AnimatedCounter value={benefit.stats} suffix={benefit.suffix} prefix={benefit.prefix || ""} color={benefit.color} />
    </div>
  );
};

/* ─── AJM Dashboard Mockup ─── */
const AjmDashboardMockup = () => (
  <div
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    }}
  >
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="ajm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E141B" />
          <stop offset="100%" stopColor="#0A0D0F" />
        </linearGradient>
        <linearGradient id="ajm-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id="ajm-spark-green" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(0,255,133,0.0)" />
          <stop offset="100%" stopColor="rgba(0,255,133,0.45)" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="520" height="360" fill="url(#ajm-bg)" />

      {/* Top bar (window chrome) */}
      <rect x="0" y="0" width="520" height="28" fill="#0A0D0F" />
      <circle cx="14" cy="14" r="4" fill="#FF5F57" />
      <circle cx="28" cy="14" r="4" fill="#FEBC2E" />
      <circle cx="42" cy="14" r="4" fill="#28C840" />
      <rect x="180" y="8" width="160" height="14" rx="7" fill="rgba(255,255,255,0.05)" />
      <text x="260" y="18" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif">ajm.visionai.app/dashboard</text>

      {/* Sidebar */}
      <rect x="0" y="28" width="98" height="332" fill="rgba(255,255,255,0.02)" />
      <rect x="0" y="28" width="98" height="332" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      {/* Brand */}
      <rect x="14" y="44" width="70" height="22" rx="6" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.25)" strokeWidth="0.75" />
      <circle cx="22" cy="55" r="3" fill="#00FF85" />
      <text x="30" y="58" fill="#00FF85" fontSize="8" fontWeight="700" fontFamily="sans-serif">AJM</text>
      {/* Nav items */}
      {[
        { y: 84, label: 'Dashboard', active: true },
        { y: 108, label: 'Fretes' },
        { y: 132, label: 'Faturamento' },
        { y: 156, label: 'Frota' },
        { y: 180, label: 'Manutenção' },
        { y: 204, label: 'WhatsApp' },
        { y: 228, label: 'Motoristas' },
      ].map((item, i) => (
        <g key={i}>
          {item.active && <rect x="8" y={item.y - 8} width="82" height="20" rx="6" fill="rgba(0,255,133,0.08)" />}
          {item.active && <rect x="8" y={item.y - 8} width="2" height="20" rx="1" fill="#00FF85" />}
          <rect x="16" y={item.y - 4} width="10" height="10" rx="2" fill={item.active ? 'rgba(0,255,133,0.5)' : 'rgba(255,255,255,0.15)'} />
          <text x="30" y={item.y + 4} fill={item.active ? '#ffffff' : 'rgba(255,255,255,0.45)'} fontSize="8" fontWeight={item.active ? 600 : 400} fontFamily="sans-serif">{item.label}</text>
        </g>
      ))}

      {/* Main content header */}
      <text x="112" y="50" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">VISÃO GERAL</text>
      <text x="112" y="66" fill="#ffffff" fontSize="14" fontWeight="700" fontFamily="sans-serif">Operação · Junho 2026</text>

      {/* KPI Cards row */}
      {/* Card 1: Fretes ativos */}
      <rect x="112" y="80" width="96" height="68" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="120" y="88" width="22" height="16" rx="4" fill="rgba(99,170,255,0.12)" />
      <text x="131" y="99" textAnchor="middle" fill="#6AAAFF" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">FRETE</text>
      <text x="120" y="120" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">Fretes ativos</text>
      <text x="120" y="138" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="sans-serif">47</text>
      <text x="156" y="138" fill="#00FF85" fontSize="7" fontFamily="sans-serif">+12%</text>

      {/* Card 2: Faturamento */}
      <rect x="216" y="80" width="96" height="68" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="224" y="88" width="38" height="16" rx="4" fill="rgba(0,255,133,0.12)" />
      <text x="243" y="99" textAnchor="middle" fill="#00FF85" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">FATURAR</text>
      <text x="224" y="120" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">Faturamento</text>
      <text x="224" y="138" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="sans-serif">R$ 218k</text>

      {/* Card 3: Frota */}
      <rect x="320" y="80" width="96" height="68" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="328" y="88" width="26" height="16" rx="4" fill="rgba(245,158,11,0.12)" />
      <text x="341" y="99" textAnchor="middle" fill="#F59E0B" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">FROTA</text>
      <text x="328" y="120" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">Eficiência</text>
      <text x="328" y="138" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="sans-serif">94%</text>

      {/* Card 4: Manutenção */}
      <rect x="424" y="80" width="84" height="68" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="432" y="88" width="38" height="16" rx="4" fill="rgba(139,92,246,0.12)" />
      <text x="451" y="99" textAnchor="middle" fill="#A78BFA" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">MANUT.</text>
      <text x="432" y="120" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">Pendentes</text>
      <text x="432" y="138" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="sans-serif">3</text>

      {/* Chart area */}
      <rect x="112" y="160" width="200" height="124" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="120" y="178" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="600" fontFamily="sans-serif">Receita por semana</text>
      <text x="120" y="190" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="sans-serif">Últimos 30 dias</text>

      {/* Grid lines */}
      <line x1="120" y1="225" x2="304" y2="225" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="120" y1="250" x2="304" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="120" y1="275" x2="304" y2="275" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Area chart */}
      <path
        d="M 120,260 L 150,242 L 180,250 L 210,228 L 240,235 L 270,215 L 304,200 L 304,278 L 120,278 Z"
        fill="url(#ajm-spark-green)"
      />
      <path
        d="M 120,260 L 150,242 L 180,250 L 210,228 L 240,235 L 270,215 L 304,200"
        fill="none"
        stroke="#00FF85"
        strokeWidth="1.5"
      />
      {/* Data points */}
      {[[120, 260], [150, 242], [180, 250], [210, 228], [240, 235], [270, 215], [304, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#0A0D0F" stroke="#00FF85" strokeWidth="1.5" />
      ))}

      {/* WhatsApp automation panel */}
      <rect x="320" y="160" width="188" height="124" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="328" y="178" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="600" fontFamily="sans-serif">Automação WhatsApp</text>

      {/* Status badge */}
      <rect x="446" y="170" width="54" height="14" rx="7" fill="rgba(0,255,133,0.12)" stroke="rgba(0,255,133,0.3)" strokeWidth="0.5" />
      <circle cx="455" cy="177" r="2.5" fill="#00FF85">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="461" y="180" fill="#00FF85" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">ATIVO</text>

      {/* Message rows */}
      {[
        { y: 196, color: '#00FF85', label: 'Adiantamento enviado', motorista: 'Roberto S.', valor: 'R$ 1.200' },
        { y: 220, color: '#6AAAFF', label: 'Pagamento final', motorista: 'Marcos L.', valor: 'R$ 3.450' },
        { y: 244, color: '#F59E0B', label: 'Confirmação de coleta', motorista: 'André V.', valor: '—' },
      ].map((msg, i) => (
        <g key={i}>
          <rect x="328" y={msg.y} width="172" height="20" rx="6" fill="rgba(255,255,255,0.03)" />
          <circle cx="338" cy={msg.y + 10} r="3" fill={msg.color} />
          <text x="346" y={msg.y + 13} fill="rgba(255,255,255,0.85)" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">{msg.label}</text>
          <text x="346" y={msg.y + 19} fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="sans-serif">→ {msg.motorista}</text>
          <text x="494" y={msg.y + 13} textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">{msg.valor}</text>
        </g>
      ))}

      <text x="328" y="278" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">218 mensagens enviadas hoje · 0 esforço manual</text>

      {/* Fretes em andamento list */}
      <rect x="112" y="296" width="396" height="52" rx="10" fill="url(#ajm-card)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <text x="120" y="312" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600" fontFamily="sans-serif">Fretes em andamento</text>
      <text x="500" y="312" textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">ver todos →</text>

      {[
        { x: 120, code: 'FRT-1184', rota: 'SP → BH', status: 'A caminho', color: '#00FF85' },
        { x: 250, code: 'FRT-1185', rota: 'CPS → GYN', status: 'Carregando', color: '#F59E0B' },
        { x: 380, code: 'FRT-1186', rota: 'POA → CWB', status: 'Entregue', color: '#6AAAFF' },
      ].map((frt, i) => (
        <g key={i}>
          <rect x={frt.x} y="320" width="120" height="22" rx="6" fill="rgba(255,255,255,0.04)" />
          <text x={frt.x + 8} y="330" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="700" fontFamily="sans-serif">{frt.code}</text>
          <text x={frt.x + 8} y="339" fill="rgba(255,255,255,0.45)" fontSize="6.5" fontFamily="sans-serif">{frt.rota}</text>
          <circle cx={frt.x + 110} cy="331" r="3" fill={frt.color} />
        </g>
      ))}
    </svg>
  </div>
);

export default Benefits;
