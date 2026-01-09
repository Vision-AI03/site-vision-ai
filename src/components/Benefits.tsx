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
    if (isVisible && value !== "∞") {
      let start = 0;
      const end = parseInt(value);
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
    } else if (value === "∞") {
      setCount(value);
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
      stats: "100",
      suffix: "% uptime",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Diminua significativamente os custos operacionais enquanto aumenta a eficiência do atendimento.",
      stats: "70",
      suffix: "% economia",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Aumento de Conversões",
      description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento personalizado.",
      stats: "45",
      suffix: "% conversões",
      prefix: "+",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Elimine o tempo de espera com respostas imediatas e precisas para todas as consultas.",
      stats: "10",
      suffix: " segundos",
      prefix: "< ",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Experiência Personalizada",
      description: "Ofereça atendimento personalizado baseado no histórico e preferências de cada cliente.",
      stats: "100",
      suffix: "% personalizado",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Escalabilidade Garantida",
      description: "Cresça sem limites. Nossos agentes se adaptam automaticamente ao volume de demanda.",
      stats: "∞",
      suffix: " crescimento",
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
              {[
                {
                  title: "Automação de Atendimento",
                  description: "Implementamos agentes que atendem clientes de forma natural e instantânea, reduzindo a carga da equipe humana.",
                  gradient: "from-blue-500 to-indigo-600"
                },
                {
                  title: "Geração e Qualificação de Leads",
                  description: "Captura dados, qualifica oportunidades e direciona os leads prontos para o seu time comercial ou CRM.",
                  gradient: "from-purple-500 to-pink-600"
                },
                {
                  title: "Integrações Inteligentes",
                  description: "Conectamos agentes a plataformas como WhatsApp, Google Sheets, CRMs e agendas, criando fluxos automatizados de ponta a ponta.",
                  gradient: "from-cyan-500 to-blue-600"
                }
              ].map((example, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${example.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform`}></div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">{example.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
