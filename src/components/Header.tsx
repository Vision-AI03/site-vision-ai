import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoVisionAI from "@/assets/logo-vision-ai.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(Math.min(scrolled, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <img 
              alt="Vision AI Logo" 
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" 
              src={logoVisionAI}
            />
            <span className="font-bold text-xl">
              <span className="text-gray-900">VISION</span>{" "}
              <span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'services', label: 'Serviços' },
              { id: 'benefits', label: 'Benefícios' },
              { id: 'how-it-works', label: 'Como Funciona' },
              { id: 'contact', label: 'Contato' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-cyan-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
              </button>
            ))}
            
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="ml-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white btn-shimmer relative overflow-hidden"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Começar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {[
                { id: 'services', label: 'Serviços' },
                { id: 'benefits', label: 'Benefícios' },
                { id: 'how-it-works', label: 'Como Funciona' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white w-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Começar Agora
              </Button>
            </div>
          </nav>
        )}
      </div>

      {/* Progress bar de scroll */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
};

export default Header;
