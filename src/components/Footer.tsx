import { Bot, Mail, Phone, MapPin, Heart } from "lucide-react";
import logoVisionAI from "@/assets/logo-vision-ai.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-6 group">
                <img 
                  src={logoVisionAI}
                  alt="Vision AI Logo" 
                  className="h-8 w-auto group-hover:scale-110 transition-transform" 
                />
                <span className="font-bold text-2xl">
                  <span className="text-white">VISION</span>{" "}
                  <span className="text-indigo-400">AI</span>
                </span>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Transformamos negócios com inteligência artificial. Criamos agentes IA personalizados 
                e automações inteligentes que otimizam processos e aumentam resultados.
              </p>
              
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 w-fit">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Especialistas em</p>
                  <p className="font-semibold text-white">Automações & IA</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Links Rápidos
              </h3>
              <ul className="space-y-3">
                {[
                  { id: 'services', label: 'Serviços' },
                  { id: 'benefits', label: 'Benefícios' },
                  { id: 'how-it-works', label: 'Como Funciona' },
                  { id: 'contact', label: 'Contato' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })} 
                      className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Contato
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, text: 'agenciavisionai@gmail.com' },
                  { icon: Phone, text: '(19) 99794-8118' },
                  { icon: MapPin, text: 'Ipeúna, SP' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group hover:translate-x-2 transition-transform">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:from-indigo-500/40 group-hover:to-cyan-500/40 transition-colors">
                      <item.icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 flex items-center gap-2">
              © {currentYear} Vision AI. Todos os direitos reservados. 
              <span className="hidden md:inline">Feito com</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
              <span className="hidden md:inline">e IA</span>
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
