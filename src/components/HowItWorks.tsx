import { MessageCircle, Settings, Rocket, BarChart } from "lucide-react";
import { WHATSAPP_URL } from "@/App";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Entendemos a sua operação",
      description: "Mapeamento dos processos atuais, onde dói e o que te trava. Antes de qualquer linha de código, a gente precisa saber como o seu negócio funciona de verdade.",
      details: ["Mapeamento dos processos atuais", "Onde a operação dói hoje", "O que te trava no dia a dia"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Settings,
      number: "02",
      title: "Construímos sob medida",
      description: "Agentes e sistema treinados com os seus dados, seus fluxos e a forma como você fala com cliente. Nada de template pronto.",
      details: ["Treinamento com os seus dados", "Fluxos desenhados pro seu processo", "Integração com o que você já usa"],
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Rocket,
      number: "03",
      title: "Implementamos e testamos",
      description: "Entra gradual, testado, sem quebrar o que já funciona. A gente acompanha cada etapa de perto pra você não ficar no escuro.",
      details: ["Deploy gradual e controlado", "Teste em cenário real", "Ajuste fino com feedback seu"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: BarChart,
      number: "04",
      title: "Acompanhamos e otimizamos",
      description: "Monitoramento contínuo do que está rodando e ajuste constante pra operação seguir melhorando — não é entregar e sumir.",
      details: ["Monitoramento em tempo real", "Relatórios do que está rodando", "Otimizações contínuas"],
      gradient: "from-pink-500 to-red-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📋 Método Vision AI
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Como a gente trabalha: <span className="text-gradient">processo antes de promessa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A maioria das agências chega com chatbot pronto antes de entender o seu negócio. A gente faz o contrário: primeiro mergulha na sua operação, vê onde você perde tempo e dinheiro, e só então decide o que vale a pena automatizar.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200"></div>

          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div 
                  key={index} 
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content Card */}
                  <div className="flex-1 lg:w-5/12">
                    <div 
                      className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${isEven ? 'lg:text-right' : ''}`}
                    >
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${step.gradient} p-[2px]`}>
                        <div className="w-full h-full bg-white rounded-3xl"></div>
                      </div>
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:justify-end' : ''}`}>
                          <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className={isEven ? 'lg:text-right' : ''}>
                            <span className={`font-bold text-lg bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                              Etapa {step.number}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details List */}
                        <ul className={`space-y-3 ${isEven ? 'lg:flex lg:flex-col lg:items-end' : ''}`}>
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} ${isEven ? 'lg:order-last' : ''}`}></div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Corner Accent */}
                      <div className={`absolute ${isEven ? 'top-0 left-0' : 'top-0 right-0'} w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-5 ${isEven ? 'rounded-br-full' : 'rounded-bl-full'}`}></div>
                    </div>
                  </div>

                  {/* Timeline Node (Desktop) */}
                  <div className="hidden lg:flex w-24 h-24 relative z-20">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl animate-pulse-glow`}>
                      <span className="text-white font-bold text-2xl">{step.number}</span>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 lg:w-5/12 hidden lg:block"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl"></div>
          
          <div className="relative glass rounded-3xl p-12 text-center border border-white/50 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-bold mb-6">
                <span className="text-gradient">Quer ver o que dá pra automatizar no seu caso?</span>
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Fala com a gente no WhatsApp. Sem compromisso — só uma conversa pra entender a sua operação.
              </p>
              <button
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
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

export default HowItWorks;
