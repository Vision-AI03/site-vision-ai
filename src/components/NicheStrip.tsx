import { Truck, Stethoscope, Home, FileText, Store } from "lucide-react";

const NicheStrip = () => {
  const niches = [
    { icon: Truck, label: "Transportadoras", gradient: "from-blue-500 to-indigo-600" },
    { icon: Stethoscope, label: "Clínicas", gradient: "from-cyan-500 to-blue-600" },
    { icon: Home, label: "Imobiliárias", gradient: "from-indigo-500 to-purple-600" },
    { icon: FileText, label: "Contabilidades", gradient: "from-emerald-500 to-teal-600" },
    { icon: Store, label: "Comércio e serviços", gradient: "from-orange-500 to-red-600" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🎯 Nichos atendidos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pra quem a gente <span className="text-gradient">constrói</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O nicho muda. O método não — a gente sempre começa entendendo a sua operação.
          </p>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-12">
          {niches.map((niche, idx) => {
            const Icon = niche.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 bg-white rounded-2xl py-4 px-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${niche.gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-base md:text-lg">
                  {niche.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Microcopy */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Não achou o seu segmento na lista? Chama a gente mesmo assim. Se a sua operação tem processo manual te consumindo tempo, provavelmente dá pra automatizar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NicheStrip;
