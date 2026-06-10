import { Bot, MessageSquare, Users, Zap, Settings, TrendingUp } from "lucide-react";
import { WHATSAPP_URL } from "@/App";

const Services = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Agentes de Atendimento",
      description: "Seu negócio atendendo 24/7, sem equipe adicional",
      features: ["Responde dúvidas automaticamente", "Agenda reuniões e consultas", "Integra com WhatsApp, CRM e Site"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Agentes de Vendas",
      description: "IA que aborda, qualifica e encaminha leads para você fechar",
      features: ["Qualificação automática de prospects", "Follow-up sem esforço manual", "Integração com seu CRM", "Relatórios Semanais"],
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Agentes de Suporte",
      description: "Resolva 90% dos chamados sem intervenção humana",
      features: ["Base de conhecimento personalizada", "Escalação inteligente para humanos", "Histórico de atendimentos", "Integração com seu Site, WhatsApp e etc" ],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Bot,
      title: "Qualificação de Leads",
      description: "Pare de perder tempo com leads frios",
      features: ["Scoring automático por perfil", "Segmentação por interesse e momento", "Relatórios de conversão"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Automações com IA",
      description: "Elimine tarefas repetitivas do seu time",
      features: ["Fluxos automáticos entre sistemas", "Notificações e alertas inteligentes", "Integração com ferramentas existentes"],
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Settings,
      title: "Soluções Personalizadas",
      description: "Construímos do zero para o seu processo específico",
      features: ["Diagnóstico gratuito do seu negócio", "Desenvolvimento sob medida", "Suporte e evolução contínua"],
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ⚡ Soluções
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            O que a gente constrói
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada solução nasce de um processo seu. Aqui está o que a gente costuma construir — sempre depois de entender onde dói.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Gradient */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-500 transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${service.gradient}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="inline-flex flex-col items-center bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-3xl p-12 border border-indigo-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Não sabe por onde começar?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Conta pra gente como funciona a sua operação hoje. A gente te diz, de forma honesta, o que vale a pena automatizar — e o que ainda não vale.
            </p>
            <button
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
