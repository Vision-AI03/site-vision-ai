import { ArrowRight, Bot, Zap, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/App";

const Hero = () => {

  const valueProps = [
    {
      icon: Bot,
      title: "Entendemos antes de automatizar",
      description: "A gente mapeia os seus processos primeiro. Sem processo definido, a IA só acelera a bagunça.",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Settings,
      title: "Construímos sistema de verdade",
      description: "Nada de caixa-preta. Sistemas e agentes feitos sob medida pra sua operação, que você entende e controla.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Você ganha, a gente ganha",
      description: "Quanto mais a sua operação economiza e fatura, mais sentido faz seguir junto.",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              IA aplicada à operação de PMEs
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Primeiro entendemos a sua{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                operação
              </span>
              . Depois automatizamos só o que dá resultado.
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Nada de jogar chatbot em cima da bagunça. A gente senta, entende os seus processos — atendimento, vendas, financeiro — e constrói a automação certa pro seu negócio. Sem firula e sem promessa vazia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white btn-shimmer h-14 px-8 text-lg"
              >
                Falar no WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 h-14 px-8 text-lg"
              >
                Quero um diagnóstico
              </Button>
            </div>
          </div>

          {/* Value Proposition Cards */}
          <div className="relative animate-scale-in space-y-4">
            {valueProps.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-5 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
