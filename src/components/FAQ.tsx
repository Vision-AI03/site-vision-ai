import { ChevronDown, ChevronUp, HelpCircle, Bot, Sparkles, Users, Code, Globe, BarChart } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Posso substituir totalmente minha equipe de vendas e atendimento por Agentes de IA?",
      answer: "Embora seja possível, recomendamos usar a IA para otimizar seus atendimentos e vendas, sem substituir totalmente a equipe humana. O equilíbrio entre agentes IA e humanos geralmente oferece os melhores resultados. A IA cuida das consultas iniciais, qualificação de leads e atendimento 24/7, enquanto humanos focam em negociações complexas e relacionamentos estratégicos.",
      icon: <Users className="h-5 w-5" />,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      question: "Quem configura e treina o Agente de IA para o meu negócio?",
      answer: "A Vision AI é responsável por todo o processo. Nós entendemos seu negócio, seu funil e seu atendimento, e entregamos um Agente de IA já treinado para falar com seus clientes e vender do jeito certo.",
      icon: <Bot className="h-5 w-5" />,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      question: "O Agente já vem pronto para atender ou preciso montar algo?",
      answer: "Sim. O Agente já chega totalmente configurado, pronto para responder clientes, apresentar seus serviços, qualificar leads e iniciar vendas desde o primeiro dia.",
      icon: <Code className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      question: "Vou precisar mexer em sistemas, tecnologia ou integrações?",
      answer: "Não. Todas as integrações, como WhatsApp, site, agenda e outros canais, são feitas pela Vision AI. Você não precisa lidar com ferramentas técnicas.",
      icon: <Sparkles className="h-5 w-5" />,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      question: "Meu processo de vendas é complexo. O Agente de IA consegue aprender e se adaptar?",
      answer: "Sim! Nossos agentes IA são desenvolvidos para lidar com vendas complexas e processos específicos de cada negócio. Eles aprendem com cada interação e podem ser treinados com cenários específicos do seu setor. Para situações muito complexas, o agente pode transferir automaticamente para um especialista humano.",
      icon: <BarChart className="h-5 w-5" />,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      question: "O Agente de IA consegue vender, qualificar leads e agendar automaticamente?",
      answer: "Sim. Ele conduz conversas, entende o interesse do cliente, filtra oportunidades reais e pode agendar ou encaminhar para fechamento, mesmo em processos de venda mais complexos.",
      icon: <Globe className="h-5 w-5" />,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float-slow" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            Perguntas Frequentes
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient-purple">Dúvidas Frequentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Esclarecemos as principais questões sobre agentes de IA e automações. 
            Ainda tem dúvidas? Nossa equipe está pronta para ajudar!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl'
              }`}
            >
              {/* Gradient Border on Active */}
              {openIndex === index && (
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${faq.gradient}`}></div>
              )}
              
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {faq.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 animate-fade-in-up">
                  <div className="pl-16 pr-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-base pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl"></div>
          
          <div className="relative glass rounded-3xl p-12 text-center border border-white/50 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse-glow">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Nossa equipe especializada está pronta para esclarecer todas as suas questões 
              sobre agentes de IA e mostrar como eles podem transformar seu negócio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/message/UMOFX66X4CY2K1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
              >
                Falar com Especialista
              </a>
              <p className="text-sm text-gray-500">
                Atendimento personalizado • Consultoria gratuita
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
