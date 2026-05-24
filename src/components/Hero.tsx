import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const terminalLines = [
    { text: '> Agente inicializado', color: '#00FF85', delay: '0.4s' },
    { text: '> Conectando ao WhatsApp...', color: 'rgba(255,255,255,0.5)', delay: '0.9s' },
    { text: '> 47 leads qualificados hoje', color: '#60A5FA', delay: '1.4s' },
    { text: '> R$ 12.400 em pipeline', color: '#FBBF24', delay: '1.9s' },
    { text: '> Status: Trabalhando 24/7', color: '#00FF85', delay: '2.4s' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '128px',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'var(--va-dark)',
      }}
    >
      {/* Grid pattern */}
      <div className="bg-grid-dark absolute inset-0 opacity-100" />

      {/* Radial green glow center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0,255,133,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <div className="space-y-8 animate-fade-in-up">
            <span className="badge-va">Powered by Artificial Intelligence</span>

            <h1
              style={{
                fontFamily: 'var(--va-font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Seu negócio<br />
              atendendo{" "}
              <span className="text-gradient">clientes</span>
              <br />
              enquanto você dorme
            </h1>

            <p
              style={{
                fontFamily: 'var(--va-font-body)',
                fontWeight: 300,
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '480px',
              }}
            >
              Agentes de IA personalizados para{" "}
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>transportadoras, clínicas, imobiliárias e contabilidades</span>
              {" "}— atendimento, qualificação de leads e automações rodando 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                style={{
                  background: '#00FF85',
                  color: '#0A0D0F',
                  fontFamily: 'var(--va-font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '-0.01em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                Quero Automatizar Meu Negócio
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--va-font-body)',
                  fontSize: '1rem',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                Ver Serviços
              </button>
            </div>

            {/* Stat chips */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Disponibilidade', value: '24/7' },
                { label: 'Tempo de resposta', value: '< 2s' },
                { label: 'Economia em custos', value: '60%' },
              ].map((stat) => (
                <div key={stat.value}>
                  <div style={{ fontFamily: 'var(--va-font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#00FF85' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--va-font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Terminal card */}
          <div className="relative animate-scale-in">
            {/* Terminal */}
            <div
              style={{
                background: '#0D1117',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,133,0.06)',
              }}
            >
              {/* macOS title bar */}
              <div
                style={{
                  background: '#161B22',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
                <span
                  style={{
                    marginLeft: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  vision-ai · agente-comercial
                </span>
              </div>

              {/* Terminal body */}
              <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.8' }}>
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="animate-terminal-line"
                    style={{ color: line.color, animationDelay: line.delay }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div
                style={{
                  background: '#161B22',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#00FF85',
                    display: 'inline-block',
                    boxShadow: '0 0 6px #00FF85',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span style={{ fontFamily: 'var(--va-font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  Agente ativo
                </span>
              </div>
            </div>

            {/* Floating badge top-right */}
            <div
              className="animate-float-slow"
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                background: 'rgba(10,13,15,0.95)',
                border: '1px solid rgba(0,255,133,0.25)',
                borderRadius: '12px',
                padding: '10px 14px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                animationDelay: '0s',
              }}
            >
              <div style={{ fontFamily: 'var(--va-font-display)', fontWeight: 700, fontSize: '13px', color: '#00FF85' }}>+47 leads hoje</div>
            </div>

            {/* Floating badge bottom-left */}
            <div
              className="animate-float-slow"
              style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-16px',
                background: 'rgba(10,13,15,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 14px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                animationDelay: '1s',
              }}
            >
              <div style={{ fontFamily: 'var(--va-font-display)', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>R$ 8.200 economia/mês</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, #F7F8FA)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};

export default Hero;
