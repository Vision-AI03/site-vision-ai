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
      title: "Aumento de Conversões",
      description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento personalizado.",
      stats: "2", suffix: "x mais conversões",
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
            🚀 Vantagens Competitivas
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
            <span className="text-gradient">Por que escolher</span>{" "}
            <span style={{ color: '#111418' }}>a VISION AI?</span>
          </h2>
          <p style={{ fontFamily: 'var(--va-font-body)', fontSize: '1.1rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Descubra os benefícios transformadores que nossas Automações e Agentes IA podem trazer para o seu negócio
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

        {/* Examples section — dark container */}
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
              position: 'absolute', top: 0, left: 0, width: '400px', height: '300px',
              background: 'radial-gradient(ellipse at top left, rgba(0,255,133,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          {/* Glow bottom-right blue */}
          <div
            style={{
              position: 'absolute', bottom: 0, right: 0, width: '400px', height: '300px',
              background: 'radial-gradient(ellipse at bottom right, rgba(0,196,255,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative p-10 lg:p-16" style={{ zIndex: 10 }}>
            {/* Inner header */}
            <div className="text-center mb-12">
              <span className="badge-va" style={{ marginBottom: '16px', display: 'inline-flex' }}>Casos de uso</span>
              <h3
                style={{
                  fontFamily: 'var(--va-font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                  marginTop: '12px',
                  marginBottom: '12px',
                }}
              >
                Veja a IA em ação
              </h3>
              <p style={{ fontFamily: 'var(--va-font-body)', color: 'rgba(255,255,255,0.45)', fontSize: '1rem' }}>
                Veja como transformamos negócios com nossas soluções
              </p>
            </div>

            {/* 3 example cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <ExampleCard1 />
              <ExampleCard2 />
              <ExampleCard3 />
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
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
                Quero uma demonstração
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

/* ─── Example Card wrapper ─── */
const ExampleCardWrapper = ({ label, title, description, tags, children }: {
  label: string; title: string; description: string; tags: string[]; children: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(0,255,133,0.2)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Label */}
      <div style={{ padding: '14px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: 'var(--va-font-display)', fontSize: '11px', fontWeight: 600, color: '#00FF85', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
      </div>
      {/* Mockup area */}
      <div style={{ height: '230px', background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {children}
      </div>
      {/* Text area */}
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontFamily: 'var(--va-font-display)', fontWeight: 700, fontSize: '1rem', color: '#ffffff', marginBottom: '8px' }}>{title}</h4>
        <p style={{ fontFamily: 'var(--va-font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '12px' }}>{description}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--va-font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '999px', padding: '3px 10px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Card 1: WhatsApp Mockup ─── */
const ExampleCard1 = () => (
  <ExampleCardWrapper
    label="01 — Atendimento"
    title="Automação de Atendimento"
    description="Agentes que atendem clientes de forma natural e instantânea, reduzindo a carga da equipe humana."
    tags={['WhatsApp', '24/7', 'IA Conversacional']}
  >
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="screen-clip">
          <rect x="55" y="8" width="210" height="244" rx="18"/>
        </clipPath>
        <linearGradient id="wpp-header" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00875A"/>
          <stop offset="100%" stopColor="#00A36C"/>
        </linearGradient>
        <linearGradient id="msg-sent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#005C4B"/>
          <stop offset="100%" stopColor="#017A62"/>
        </linearGradient>
      </defs>

      {/* Phone shell */}
      <rect x="55" y="8" width="210" height="244" rx="18" fill="#1A1F2A" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

      {/* Screen area */}
      <g clipPath="url(#screen-clip)">
        {/* Status bar */}
        <rect x="55" y="8" width="210" height="20" fill="#0B1117"/>
        <text x="160" y="21" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="sans-serif">9:41</text>

        {/* WhatsApp header */}
        <rect x="55" y="28" width="210" height="38" fill="url(#wpp-header)"/>
        {/* Back arrow */}
        <text x="68" y="50" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">‹</text>
        {/* Avatar circle */}
        <circle cx="84" cy="47" r="12" fill="rgba(255,255,255,0.15)"/>
        {/* Logo oficial WhatsApp no avatar */}
        <image href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" x="75" y="38" width="18" height="18"/>
        {/* Contact name */}
        <text x="102" y="44" fill="white" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Assistente Vision AI</text>
        <circle cx="103" cy="52" r="2.5" fill="#7FFFD4"/>
        <text x="108" y="55" fill="rgba(255,255,255,0.65)" fontSize="6.5" fontFamily="sans-serif">online</text>

        {/* Chat background */}
        <rect x="55" y="66" width="210" height="160" fill="#0B1117"/>

        {/* Received message */}
        <rect x="63" y="74" width="118" height="30" rx="8" fill="#1E2733"/>
        <text x="72" y="86" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">Qual o prazo de entrega</text>
        <text x="72" y="97" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">para SP capital?</text>
        <text x="172" y="101" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="sans-serif">10:23</text>

        {/* Sent message */}
        <rect x="95" y="112" width="160" height="46" rx="8" fill="url(#msg-sent)"/>
        <text x="104" y="125" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">Olá! Para SP capital nosso</text>
        <text x="104" y="136" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">prazo é 1–2 dias úteis. 🚀</text>
        <text x="104" y="147" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">Posso gerar um orçamento?</text>
        <text x="237" y="154" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="sans-serif">✓✓</text>

        {/* Typing indicator */}
        <rect x="63" y="166" width="56" height="20" rx="10" fill="#1E2733"/>
        <circle cx="77" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite"/>
        </circle>
        <circle cx="89" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="101" cy="176" r="3.5" fill="rgba(255,255,255,0.3)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
        </circle>

        {/* Speed badge */}
        <rect x="68" y="194" width="184" height="18" rx="9" fill="rgba(0,200,100,0.12)" stroke="rgba(0,200,100,0.4)" strokeWidth="0.75"/>
        <circle cx="81" cy="203" r="3.5" fill="#00C864">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <text x="89" y="207" fill="#00C864" fontSize="7" fontWeight="600" fontFamily="sans-serif">⚡ Respondido em 1.2 segundos</text>

        {/* Input bar */}
        <rect x="55" y="218" width="210" height="34" fill="#182026"/>
        <rect x="63" y="224" width="140" height="18" rx="9" fill="#252D35"/>
        <text x="72" y="235" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Mensagem</text>
        <circle cx="224" cy="233" r="9" fill="#00A36C"/>
        <text x="224" y="237" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">↑</text>
      </g>

      {/* Home indicator */}
      <rect x="130" y="247" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
    </svg>
  </ExampleCardWrapper>
);

/* ─── Card 2: Lead Funnel ─── */
const ExampleCard2 = () => (
  <ExampleCardWrapper
    label="02 — Funil de Leads"
    title="Funil de Leads com IA"
    description="Captura dados, qualifica oportunidades e direciona os leads prontos para o time comercial."
    tags={['Qualificação IA', 'CRM', 'Pipeline']}
  >
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="stage1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2240"/>
          <stop offset="100%" stopColor="#1e2850"/>
        </linearGradient>
        <linearGradient id="stage2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2235"/>
          <stop offset="100%" stopColor="#0f2d50"/>
        </linearGradient>
        <linearGradient id="stage3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#003a28"/>
          <stop offset="100%" stopColor="#005c3a"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="260" fill="#0D0F14"/>

      {/* Grid sutil */}
      <line x1="0" y1="65" x2="320" y2="65" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="0" y1="130" x2="320" y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="0" y1="195" x2="320" y2="195" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="80" y1="0" x2="80" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="160" y1="0" x2="160" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="240" y1="0" x2="240" y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

      {/* Stat chips no topo */}
      <rect x="14" y="10" width="82" height="14" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <text x="55" y="20" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">14% conversão total</text>
      <rect x="112" y="10" width="72" height="14" rx="7" fill="rgba(0,200,100,0.1)" stroke="rgba(0,200,100,0.25)" strokeWidth="0.5"/>
      <text x="148" y="20" textAnchor="middle" fill="#00C864" fontSize="7" fontFamily="sans-serif">↑ 2.3× vs antes</text>
      <rect x="200" y="10" width="92" height="14" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <text x="246" y="20" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">0 esforço manual</text>

      {/* ETAPA 1 — trapézio largo */}
      <path d="M 22,32 L 298,32 L 262,80 L 58,80 Z" fill="url(#stage1)" stroke="rgba(100,130,220,0.3)" strokeWidth="1"/>
      <text x="55" y="50" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 01</text>
      <text x="55" y="68" fill="white" fontSize="20" fontFamily="sans-serif" fontWeight="700">1.240</text>
      <text x="220" y="50" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">Leads captados</text>
      <text x="220" y="62" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="sans-serif">últimos 30 dias</text>
      {/* Barra lateral progresso */}
      <rect x="304" y="32" width="4" height="48" rx="2" fill="rgba(100,130,220,0.1)"/>
      <rect x="304" y="32" width="4" height="48" rx="2" fill="rgba(100,150,255,0.55)"/>

      {/* Divisor + taxa */}
      <line x1="58" y1="85" x2="262" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="160" cy="85" r="5" fill="#1a2240">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="160" y="101" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Taxa: 48%</text>

      {/* ETAPA 2 — trapézio médio */}
      <path d="M 58,106 L 262,106 L 214,156 L 106,156 Z" fill="url(#stage2)" stroke="rgba(50,100,220,0.3)" strokeWidth="1"/>
      <text x="70" y="124" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 02</text>
      <text x="70" y="144" fill="white" fontSize="20" fontFamily="sans-serif" fontWeight="700">596</text>
      <text x="194" y="124" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">Qualificados</text>
      <text x="194" y="136" fill="rgba(100,170,255,0.7)" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">IA Score ≥ 72</text>
      <rect x="304" y="106" width="4" height="50" rx="2" fill="rgba(50,100,220,0.1)"/>
      <rect x="304" y="106" width="4" height="26" rx="2" fill="rgba(80,140,255,0.55)"/>

      {/* Divisor + taxa */}
      <line x1="106" y1="161" x2="214" y2="161" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="160" cy="161" r="5" fill="#0d2235">
        <animate attributeName="r" values="5;7;5" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
      <text x="160" y="177" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Taxa: 29%</text>

      {/* ETAPA 3 — trapézio pequeno */}
      <path d="M 106,182 L 214,182 L 188,226 L 132,226 Z" fill="url(#stage3)" stroke="rgba(0,200,100,0.35)" strokeWidth="1"/>
      <text x="160" y="200" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" fontWeight="600">ETAPA 03</text>
      <text x="160" y="220" textAnchor="middle" fill="#00C864" fontSize="22" fontFamily="sans-serif" fontWeight="800">174</text>
      <rect x="304" y="182" width="4" height="44" rx="2" fill="rgba(0,200,100,0.1)"/>
      <rect x="304" y="182" width="4" height="13" rx="2" fill="#00C864"/>

      {/* Badge final */}
      <rect x="106" y="234" width="108" height="18" rx="9" fill="rgba(0,200,100,0.1)" stroke="rgba(0,200,100,0.35)" strokeWidth="0.75"/>
      <circle cx="120" cy="243" r="3.5" fill="#00C864">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="130" y="247" fill="#00C864" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">Prontos p/ fechar</text>
    </svg>
  </ExampleCardWrapper>
);

/* ─── Card 3: Integration Hub ─── */
const ExampleCard3 = () => (
  <ExampleCardWrapper
    label="03 — Integrações"
    title="Hub de Integrações"
    description="Conectamos agentes a WhatsApp, Google Sheets, Calendar, Supabase e CRMs em tempo real."
    tags={['WhatsApp', 'Google', 'Supabase', 'CRM']}
  >
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="orb-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0E1520"/>
          <stop offset="100%" stopColor="#08090F"/>
        </radialGradient>
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.2)"/>
          <stop offset="100%" stopColor="rgba(99,102,241,0)"/>
        </radialGradient>
      </defs>

      <rect width="320" height="260" fill="url(#orb-bg)"/>

      {/* Glow central */}
      <ellipse cx="160" cy="130" rx="85" ry="75" fill="url(#center-glow)"/>

      {/* Anéis orbitais */}
      <circle cx="160" cy="130" r="88" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="4 6"/>
      <circle cx="160" cy="130" r="55" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="1" strokeDasharray="3 5"/>

      {/* Linhas de conexão animadas */}
      <line x1="52" y1="62" x2="128" y2="116" stroke="#25D366" strokeWidth="1.2" opacity="0.5" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.2s" repeatCount="indefinite"/>
      </line>
      <line x1="268" y1="62" x2="192" y2="116" stroke="#0F9D58" strokeWidth="1.2" opacity="0.5" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.5s" repeatCount="indefinite"/>
      </line>
      <line x1="52" y1="198" x2="128" y2="144" stroke="#F97316" strokeWidth="1.2" opacity="0.5" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite"/>
      </line>
      <line x1="268" y1="198" x2="192" y2="144" stroke="#4285F4" strokeWidth="1.2" opacity="0.5" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.3s" repeatCount="indefinite"/>
      </line>
      <line x1="160" y1="18" x2="160" y2="104" stroke="#3ECF8E" strokeWidth="1.2" opacity="0.45" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.6s" repeatCount="indefinite"/>
      </line>

      {/* Hub central Vision AI */}
      <circle cx="160" cy="130" r="34" fill="#0A0F1A" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"/>
      <circle cx="160" cy="130" r="27" fill="rgba(99,102,241,0.08)"/>
      <path d="M165,117 L153,131 L160,131 L153,145 L169,127 L162,127 Z" fill="#818CF8"/>
      <text x="160" y="156" textAnchor="middle" fill="rgba(139,143,255,0.7)" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">VISION AI</text>

      {/* NÓ 1 — WhatsApp (top-left) */}
      <circle cx="52" cy="62" r="26" fill="#0D1F15" stroke="rgba(37,211,102,0.35)" strokeWidth="1"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" x="38" y="48" width="28" height="28"/>
      <text x="52" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7.5" fontFamily="sans-serif" fontWeight="500">WhatsApp</text>
      {/* Ping animado */}
      <circle cx="72" cy="44" r="5" fill="rgba(37,211,102,0.3)">
        <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="72" cy="44" r="4" fill="#25D366"/>

      {/* NÓ 2 — Google Sheets (top-right) */}
      <circle cx="268" cy="62" r="26" fill="#0D1F14" stroke="rgba(15,157,88,0.35)" strokeWidth="1"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" x="254" y="48" width="28" height="28"/>
      <text x="268" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7.5" fontFamily="sans-serif" fontWeight="500">Sheets</text>

      {/* NÓ 3 — CRM (bottom-left) */}
      <circle cx="52" cy="198" r="26" fill="#1A1208" stroke="rgba(249,115,22,0.35)" strokeWidth="1"/>
      <circle cx="52" cy="191" r="10" fill="#F97316" opacity="0.9"/>
      <path d="M34,212 Q34,200 52,200 Q70,200 70,212" fill="#F97316" opacity="0.85"/>
      <text x="52" y="232" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7.5" fontFamily="sans-serif" fontWeight="500">CRM</text>

      {/* NÓ 4 — Google Calendar (bottom-right) */}
      <circle cx="268" cy="198" r="26" fill="#0D1525" stroke="rgba(66,133,244,0.35)" strokeWidth="1"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" x="254" y="184" width="28" height="28"/>
      <text x="268" y="232" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7.5" fontFamily="sans-serif" fontWeight="500">Calendar</text>

      {/* NÓ 5 — Supabase (top-center) */}
      <circle cx="160" cy="18" r="18" fill="#0A1F16" stroke="rgba(62,207,142,0.35)" strokeWidth="1"/>
      <image href="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" x="149" y="7" width="22" height="22"/>
      <text x="160" y="44" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontFamily="sans-serif" fontWeight="500">Supabase</text>

      {/* Badge de status */}
      <rect x="72" y="245" width="176" height="16" rx="8" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.25)" strokeWidth="0.75"/>
      <circle cx="86" cy="253" r="3" fill="#818CF8">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="94" y="257" fill="rgba(139,143,255,0.8)" fontSize="7" fontFamily="sans-serif" fontWeight="500">5 integrações ativas · Tempo real</text>
    </svg>
  </ExampleCardWrapper>
);

export default Benefits;
