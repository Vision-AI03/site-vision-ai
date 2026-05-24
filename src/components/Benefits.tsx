import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
    <svg viewBox="0 0 200 230" width="160" height="210" xmlns="http://www.w3.org/2000/svg">
      {/* Phone frame */}
      <rect x="20" y="4" width="160" height="222" rx="20" fill="#1A1F2A" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
      {/* Notch */}
      <rect x="72" y="8" width="56" height="10" rx="5" fill="#0D1117"/>
      {/* Status bar */}
      <rect x="20" y="18" width="160" height="14" fill="#0D1117"/>
      {/* WA Header */}
      <defs>
        <linearGradient id="waHeader" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00875A"/>
          <stop offset="100%" stopColor="#00A36C"/>
        </linearGradient>
      </defs>
      <rect x="20" y="32" width="160" height="38" fill="url(#waHeader)"/>
      {/* Avatar */}
      <circle cx="42" cy="51" r="13" fill="#005C4B"/>
      <text x="42" y="56" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">VA</text>
      {/* WA logo */}
      <image href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" x="77" y="39" width="26" height="26"/>
      {/* Name + status */}
      <text x="108" y="48" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="600">Assistente Vision AI</text>
      <circle cx="108" cy="57" r="3" fill="#25D366"/>
      <text x="114" y="60" fill="rgba(255,255,255,0.7)" fontSize="6.5" fontFamily="sans-serif">Online</text>
      {/* Chat background */}
      <rect x="20" y="70" width="160" height="152" fill="#0B1117"/>
      {/* Received message */}
      <rect x="26" y="78" width="112" height="26" rx="8" fill="#202C33"/>
      <text x="32" y="89" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">Qual o prazo de entrega para</text>
      <text x="32" y="98" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="sans-serif">SP capital?</text>
      {/* Sent message */}
      <defs>
        <linearGradient id="sentMsg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#005C4B"/>
          <stop offset="100%" stopColor="#007A63"/>
        </linearGradient>
      </defs>
      <rect x="52" y="112" width="124" height="36" rx="8" fill="url(#sentMsg)"/>
      <text x="58" y="123" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">Olá! Para SP capital o prazo</text>
      <text x="58" y="132" fill="rgba(255,255,255,0.92)" fontSize="7" fontFamily="sans-serif">é de 2 dias úteis. 🚚✅</text>
      <text x="148" y="142" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="sans-serif">✓✓</text>
      {/* Typing indicator */}
      <rect x="26" y="156" width="48" height="18" rx="9" fill="#202C33"/>
      <circle cx="38" cy="165" r="3.5" fill="rgba(255,255,255,0.5)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite"/>
      </circle>
      <circle cx="49" cy="165" r="3.5" fill="rgba(255,255,255,0.5)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="165" r="3.5" fill="rgba(255,255,255,0.5)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      {/* Badge */}
      <rect x="26" y="180" width="148" height="17" rx="8" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.35)" strokeWidth="0.8"/>
      <text x="100" y="192" textAnchor="middle" fill="#00FF85" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">⚡ Respondido em 1.2 segundos</text>
      {/* Input bar */}
      <rect x="20" y="198" width="160" height="26" fill="#1F2C34"/>
      <rect x="26" y="203" width="112" height="14" rx="7" fill="#2A3942"/>
      <circle cx="168" cy="211" r="9" fill="#00A884"/>
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
    <svg viewBox="0 0 340 230" width="310" height="210" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="340" height="230" fill="#0D0F14"/>
      {/* Grid */}
      <defs>
        <pattern id="funnelGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="340" height="230" fill="url(#funnelGrid)"/>

      {/* Stat chips top */}
      <rect x="8" y="8" width="98" height="18" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <text x="57" y="20" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="sans-serif">14% conversão total</text>
      <rect x="114" y="8" width="80" height="18" rx="9" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.2)" strokeWidth="0.5"/>
      <text x="154" y="20" textAnchor="middle" fill="#00FF85" fontSize="7" fontFamily="sans-serif">↑ 2.3× vs antes</text>
      <rect x="202" y="8" width="90" height="18" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <text x="247" y="20" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="sans-serif">0 esforço manual</text>

      {/* Stage 1 trapezoid */}
      <polygon points="20,36 300,36 272,82 48,82" fill="#1A2035" stroke="rgba(100,120,200,0.25)" strokeWidth="1.2"/>
      <text x="160" y="54" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">ETAPA 01</text>
      <text x="160" y="70" textAnchor="middle" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="700">1.240 leads captados</text>

      {/* Divider + conversion rate 1 */}
      <circle cx="160" cy="87" r="4" fill="#334155" stroke="rgba(100,150,200,0.3)" strokeWidth="1">
        <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="200" y="90" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Taxa: 48%</text>

      {/* Stage 2 trapezoid */}
      <polygon points="48,92 272,92 244,138 76,138" fill="#0D2235" stroke="rgba(50,100,200,0.3)" strokeWidth="1.2"/>
      <text x="160" y="110" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">ETAPA 02</text>
      <text x="160" y="128" textAnchor="middle" fill="white" fontSize="11" fontFamily="sans-serif" fontWeight="700">596 qualificados · IA Score ≥72</text>

      {/* Divider + conversion rate 2 */}
      <circle cx="160" cy="143" r="4" fill="#334155" stroke="rgba(0,200,100,0.3)" strokeWidth="1">
        <animate attributeName="r" values="3.5;5;3.5" dur="2s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      <text x="200" y="146" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Taxa: 29%</text>

      {/* Stage 3 trapezoid */}
      <polygon points="76,148 244,148 220,190 100,190" fill="#003A30" stroke="rgba(0,200,100,0.35)" strokeWidth="1.2"/>
      <text x="160" y="166" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">ETAPA 03</text>
      <text x="160" y="184" textAnchor="middle" fill="#00FF85" fontSize="15" fontFamily="sans-serif" fontWeight="700">174 prontos para fechar</text>

      {/* Side progress bar */}
      <rect x="312" y="36" width="6" height="154" rx="3" fill="rgba(255,255,255,0.06)"/>
      <rect x="312" y="36" width="6" height="60" rx="3" fill="#3B82F6" opacity="0.6"/>
      <rect x="312" y="96" width="6" height="50" rx="3" fill="#6366F1" opacity="0.6"/>
      <rect x="312" y="146" width="6" height="44" rx="3" fill="#00FF85" opacity="0.8"/>

      {/* Badge footer */}
      <rect x="90" y="200" width="160" height="18" rx="9" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.25)" strokeWidth="0.8"/>
      <circle cx="104" cy="209" r="3" fill="#00FF85">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="180" y="213" textAnchor="middle" fill="#00FF85" fontSize="7" fontFamily="sans-serif" fontWeight="600">Prontos p/ fechar</text>
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
    <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E1520"/>
          <stop offset="100%" stopColor="#08090F"/>
        </radialGradient>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,255,133,0.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill="url(#bgGrad)"/>

      {/* Glow behind hub */}
      <ellipse cx="100" cy="100" rx="48" ry="48" fill="url(#hubGlow)"/>

      {/* Orbital rings */}
      <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(0,255,133,0.06)" strokeWidth="1" strokeDasharray="4 6"/>
      <circle cx="100" cy="100" r="48" fill="none" stroke="rgba(0,255,133,0.06)" strokeWidth="1" strokeDasharray="4 6"/>

      {/* Connection lines with animation */}
      {/* Hub to WhatsApp (top) */}
      <line x1="100" y1="100" x2="100" y2="22" stroke="rgba(0,255,133,0.15)" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite"/>
      </line>
      {/* Hub to Sheets (top-right) */}
      <line x1="100" y1="100" x2="162" y2="38" stroke="rgba(100,200,100,0.12)" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite"/>
      </line>
      {/* Hub to Calendar (bottom-right) */}
      <line x1="100" y1="100" x2="162" y2="162" stroke="rgba(66,133,244,0.15)" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.8s" repeatCount="indefinite"/>
      </line>
      {/* Hub to Supabase (bottom-left) */}
      <line x1="100" y1="100" x2="38" y2="162" stroke="rgba(62,207,142,0.15)" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.2s" repeatCount="indefinite"/>
      </line>
      {/* Hub to CRM (top-left) */}
      <line x1="100" y1="100" x2="38" y2="38" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.6s" repeatCount="indefinite"/>
      </line>

      {/* Central hub */}
      <circle cx="100" cy="100" r="30" fill="#0A1A14" stroke="rgba(0,255,133,0.4)" strokeWidth="1.5"/>
      {/* Lightning bolt icon */}
      <path d="M104,87 L96,100 L103,100 L96,113 L108,97 L101,97 Z" fill="#00FF85"/>
      <text x="100" y="120" textAnchor="middle" fill="rgba(0,255,133,0.7)" fontSize="6" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.5">VISION AI</text>

      {/* Satellite nodes */}
      {/* WhatsApp — top */}
      <circle cx="100" cy="18" r="18" fill="#0A1A0A" stroke="#25D366" strokeWidth="1.2"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" x="88" y="6" width="24" height="24"/>
      <text x="100" y="42" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">WhatsApp</text>
      {/* Ping on WhatsApp */}
      <circle cx="100" cy="18" r="18" fill="none" stroke="#25D366" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Google Sheets — top-right */}
      <circle cx="166" cy="34" r="18" fill="#0A150A" stroke="#0F9D58" strokeWidth="1.2"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" x="154" y="22" width="24" height="24"/>
      <text x="166" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">Sheets</text>

      {/* Google Calendar — bottom-right */}
      <circle cx="166" cy="166" r="18" fill="#0A0E1A" stroke="#4285F4" strokeWidth="1.2"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" x="154" y="154" width="24" height="24"/>
      <text x="166" y="190" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">Calendar</text>

      {/* Supabase — bottom-left */}
      <circle cx="34" cy="166" r="18" fill="#0A120F" stroke="#3ECF8E" strokeWidth="1.2"/>
      <image href="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" x="22" y="154" width="24" height="24"/>
      <text x="34" y="190" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">Supabase</text>

      {/* CRM — top-left */}
      <circle cx="34" cy="34" r="18" fill="#1A0E0A" stroke="#F97316" strokeWidth="1.2"/>
      {/* Person icon */}
      <circle cx="34" cy="28" r="5.5" fill="#F97316" opacity="0.85"/>
      <path d="M22,44 Q22,36 34,36 Q46,36 46,44" fill="#F97316" opacity="0.85"/>
      <text x="34" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">CRM</text>

      {/* Status chip */}
      <rect x="28" y="185" width="144" height="13" rx="6.5" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.2)" strokeWidth="0.7"/>
      <circle cx="40" cy="191.5" r="2.5" fill="#00FF85">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="102" y="195" textAnchor="middle" fill="#00FF85" fontSize="6" fontFamily="sans-serif" fontWeight="600">5 integrações ativas · Tempo real</text>
    </svg>
  </ExampleCardWrapper>
);

export default Benefits;
