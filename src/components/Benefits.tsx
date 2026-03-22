import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
  gradient: string;
}

const AnimatedCounter = ({ value, suffix = "", prefix = "", gradient }: AnimatedCounterProps) => {
  const [count, setCount] = useState<number | string>(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
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
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      } else {
        setCount(value);
      }
    }
  }, [isVisible, value]);

  return (
    <div ref={ref} className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
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
      stats: "9",
      suffix: "% uptime",
      prefix: "99,",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Diminua significativamente os custos operacionais enquanto aumenta a eficiência do atendimento.",
      stats: "60",
      suffix: "% economia",
      prefix: "Até ",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Aumento de Conversões",
      description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento personalizado.",
      stats: "2",
      suffix: "x mais conversões",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Elimine o tempo de espera com respostas imediatas e precisas para todas as consultas.",
      stats: "30",
      suffix: " segundos",
      prefix: "< ",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Experiência Personalizada",
      description: "Ofereça atendimento personalizado baseado no histórico e preferências de cada cliente.",
      stats: "Sob medida",
      suffix: "",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Escalabilidade Garantida",
      description: "Cresça sem limites. Nossos agentes se adaptam automaticamente ao volume de demanda.",
      stats: "Escala ilimitada",
      suffix: "",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200 rounded-full filter blur-3xl opacity-20 animate-float-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚀 Vantagens Competitivas
          </div>
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Por que escolher</span> a VISION AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra os benefícios transformadores que nossas Automações e Agentes IA podem trazer para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon with Gradient Background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Animated Counter */}
                  <AnimatedCounter 
                    value={benefit.stats} 
                    suffix={benefit.suffix} 
                    prefix={benefit.prefix || ""} 
                    gradient={benefit.gradient}
                  />
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Examples Section with Modern Design */}
        <div className="relative">
          {/* Glow background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl opacity-10 blur-2xl"></div>
          
          <div className="relative glass rounded-3xl p-12 border border-white/50 shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">
                <span className="text-gradient">Exemplos de Aplicação</span>
              </h3>
              <p className="text-gray-600 text-lg">
                Veja como transformamos negócios com nossas soluções
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1: Automação de Atendimento — Phone/WhatsApp mockup */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div
                  className="w-full h-44 mb-6 rounded-xl overflow-hidden relative flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)' }}
                >
                  <svg viewBox="0 0 120 192" width="90" height="144" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="112" height="184" rx="14" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
                    <rect x="8" y="20" width="104" height="148" fill="#0f1923"/>
                    <rect x="44" y="8" width="32" height="8" rx="4" fill="#334155"/>
                    <rect x="44" y="170" width="32" height="8" rx="4" fill="#334155"/>
                    <rect x="8" y="20" width="104" height="24" fill="#075e54"/>
                    <circle cx="22" cy="32" r="9" fill="#128C7E"/>
                    <text x="22" y="36" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" fontWeight="bold">IA</text>
                    <text x="36" y="29" fill="white" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">Assistente Vision AI</text>
                    <text x="36" y="37" fill="rgba(255,255,255,0.55)" fontSize="5.5" fontFamily="sans-serif">● Online</text>
                    <rect x="8" y="44" width="104" height="116" fill="#0b141a"/>
                    <rect x="10" y="50" width="84" height="26" rx="5" fill="#202c33"/>
                    <text x="16" y="61" fill="rgba(255,255,255,0.85)" fontSize="6" fontFamily="sans-serif">Qual o horário de</text>
                    <text x="16" y="70" fill="rgba(255,255,255,0.85)" fontSize="6" fontFamily="sans-serif">funcionamento?</text>
                    <rect x="18" y="84" width="92" height="52" rx="5" fill="#005c4b"/>
                    <text x="24" y="96" fill="rgba(255,255,255,0.9)" fontSize="6" fontFamily="sans-serif">Olá! Funcionamos de</text>
                    <text x="24" y="105" fill="rgba(255,255,255,0.9)" fontSize="6" fontFamily="sans-serif">seg a sex, 8h às 18h.</text>
                    <text x="24" y="114" fill="rgba(255,255,255,0.9)" fontSize="6" fontFamily="sans-serif">Posso ajudar? 😊</text>
                    <text x="86" y="129" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="sans-serif">10:24 ✓✓</text>
                    <rect x="8" y="152" width="104" height="12" fill="#1f2c34"/>
                    <rect x="13" y="154" width="72" height="8" rx="4" fill="#2a3942"/>
                    <circle cx="105" cy="158" r="5" fill="#00a884"/>
                  </svg>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    <span className="text-yellow-400 text-[10px]">⚡</span>
                    <span className="text-white text-[10px] font-medium">Respondido em 2 segundos</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Automação de Atendimento</h4>
                <p className="text-gray-600 leading-relaxed">Implementamos agentes que atendem clientes de forma natural e instantânea, reduzindo a carga da equipe humana.</p>
              </div>

              {/* Card 2: Geração e Qualificação de Leads — Sales funnel */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div
                  className="w-full h-44 mb-6 rounded-xl overflow-hidden relative flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #be185d 100%)' }}
                >
                  <svg viewBox="0 0 200 158" width="200" height="158" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14,12 L186,12 L156,52 L44,52 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                    <text x="100" y="30" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">👥</text>
                    <text x="100" y="46" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="sans-serif" fontWeight="700">Leads Captados</text>
                    <path d="M44,55 L156,55 L130,97 L70,97 Z" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                    <text x="100" y="72" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">⚙️</text>
                    <text x="100" y="88" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="sans-serif" fontWeight="700">Qualificação Automática</text>
                    <path d="M70,100 L130,100 L113,140 L87,140 Z" fill="rgba(255,255,255,0.38)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                    <text x="100" y="115" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">🎯</text>
                    <text x="100" y="133" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="sans-serif" fontWeight="700">Prontos para Venda</text>
                    <path d="M93,143 L100,153 L107,143 Z" fill="rgba(255,255,255,0.7)"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Geração e Qualificação de Leads</h4>
                <p className="text-gray-600 leading-relaxed">Captura dados, qualifica oportunidades e direciona os leads prontos para o seu time comercial ou CRM.</p>
              </div>

              {/* Card 3: Integrações Inteligentes — Hub diagram */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div
                  className="w-full h-44 mb-6 rounded-xl overflow-hidden relative flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0e7490 0%, #1e40af 100%)' }}
                >
                  <svg viewBox="0 0 200 160" width="200" height="160" xmlns="http://www.w3.org/2000/svg">
                    <line x1="100" y1="80" x2="44" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="100" y1="80" x2="156" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="100" y1="80" x2="156" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="100" y1="80" x2="44" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <circle cx="72" cy="55" r="3.5" fill="rgba(255,255,255,0.8)">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="128" cy="55" r="3.5" fill="rgba(255,255,255,0.8)">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="128" cy="105" r="3.5" fill="rgba(255,255,255,0.8)">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="1s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="72" cy="105" r="3.5" fill="rgba(255,255,255,0.8)">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="100" cy="80" r="24" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                    <circle cx="100" cy="80" r="17" fill="rgba(255,255,255,0.2)"/>
                    <path d="M104,67 L96,80 L103,80 L96,93 L108,77 L101,77 Z" fill="white"/>
                    {/* WhatsApp */}
                    <circle cx="44" cy="28" r="18" fill="#25D366"/>
                    <rect x="36" y="21" width="16" height="12" rx="4" fill="white" opacity="0.9"/>
                    <path d="M37,33 L35,40 L43,36 Z" fill="white" opacity="0.9"/>
                    <circle cx="41" cy="27" r="1.5" fill="#25D366"/>
                    <circle cx="44" cy="27" r="1.5" fill="#25D366"/>
                    <circle cx="47" cy="27" r="1.5" fill="#25D366"/>
                    <text x="44" y="54" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">WhatsApp</text>
                    {/* Google Sheets */}
                    <rect x="138" y="12" width="36" height="32" rx="5" fill="#0F9D58"/>
                    <rect x="142" y="17" width="28" height="4" rx="1.5" fill="rgba(255,255,255,0.9)"/>
                    <rect x="142" y="23" width="28" height="4" rx="1.5" fill="rgba(255,255,255,0.7)"/>
                    <rect x="142" y="29" width="20" height="4" rx="1.5" fill="rgba(255,255,255,0.6)"/>
                    <rect x="142" y="35" width="14" height="4" rx="1.5" fill="rgba(255,255,255,0.4)"/>
                    <rect x="150" y="17" width="1.5" height="22" fill="rgba(255,255,255,0.35)"/>
                    <text x="156" y="54" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">G. Sheets</text>
                    {/* Google Calendar */}
                    <rect x="138" y="116" width="36" height="30" rx="5" fill="#4285F4"/>
                    <rect x="138" y="116" width="36" height="12" rx="5" fill="#1967D2"/>
                    <rect x="138" y="122" width="36" height="6" fill="#1967D2"/>
                    <rect x="142" y="131" width="7" height="5" rx="1" fill="rgba(255,255,255,0.85)"/>
                    <rect x="151" y="131" width="7" height="5" rx="1" fill="rgba(255,255,255,0.85)"/>
                    <rect x="160" y="131" width="7" height="5" rx="1" fill="rgba(255,255,255,0.85)"/>
                    <rect x="142" y="138" width="7" height="5" rx="1" fill="rgba(255,255,255,0.85)"/>
                    <rect x="151" y="138" width="7" height="5" rx="1" fill="#E8453C"/>
                    <rect x="160" y="138" width="7" height="5" rx="1" fill="rgba(255,255,255,0.85)"/>
                    <text x="156" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">Calendar</text>
                    {/* CRM */}
                    <circle cx="44" cy="130" r="18" fill="#F97316"/>
                    <circle cx="44" cy="123" r="6" fill="white" opacity="0.85"/>
                    <path d="M32,140 Q32,132 44,132 Q56,132 56,140" fill="white" opacity="0.85"/>
                    <text x="44" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">CRM</text>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Integrações Inteligentes</h4>
                <p className="text-gray-600 leading-relaxed">Conectamos agentes a plataformas como WhatsApp, Google Sheets, CRMs e agendas, criando fluxos automatizados de ponta a ponta.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
