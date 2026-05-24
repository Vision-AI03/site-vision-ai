import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// URL da Edge Function do sistema central Vision AI
// Substitua pelo seu PROJECT_REF real do Supabase do sistema central
const WEBHOOK_URL = "https://sfezwprbanvxsnwgvkhh.supabase.co/functions/v1/capture-lead-website";

// Token de segurança para validar que a requisição vem do site
// Defina esse mesmo token nos secrets da Edge Function: WEBHOOK_API_TOKEN
const WEBHOOK_TOKEN = "visionai_site_webhook_2026";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          empresa: formData.company,
          telefone: formData.phone,
          mensagem: formData.message,
          origem: "site-visionai",
          api_token: WEBHOOK_TOKEN,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Falha ao enviar dados");
      }

      setIsSuccess(true);

      toast({
        title: "Mensagem enviada!",
        description: "Recebemos seu contato. Em breve nossa equipe vai falar com você."
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
      });

      // Reset do estado de sucesso após 3 segundos
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: error?.message || "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    
    if (value === '') {
      value = '55';
    }
    
    if (!value.startsWith('55')) {
      value = '55' + value.replace(/^55/, '');
    }
    
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = '55';
      if (value.length > 4) {
        formattedValue += ' ' + value.slice(2, 4);
        if (value.length > 6) {
          formattedValue += ' ' + value.slice(4, 5);
          if (value.length > 9) {
            formattedValue += value.slice(5, 9) + '-' + value.slice(9);
          } else {
            formattedValue += value.slice(5);
          }
        } else {
          formattedValue += value.slice(4);
        }
      } else {
        formattedValue += value.slice(2);
      }
    }
    
    setFormData({
      ...formData,
      phone: formattedValue
    });
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && formData.phone.length <= 2) {
      e.preventDefault();
    }
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (formData.phone === '') {
      setFormData({
        ...formData,
        phone: '55'
      });
    }
    
    setTimeout(() => {
      const cursorPos = formData.phone.length > 0 ? formData.phone.length : 2;
      e.target.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-indigo-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200 rounded-full filter blur-3xl opacity-20 animate-float-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              💬 Entre em Contato
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gradient">Fale Conosco</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para ajudar você a implementar soluções de IA que realmente fazem a diferença no seu negócio.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl opacity-20 blur-2xl"></div>
            
            <div className="relative glass rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Nome *
                    </label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all" 
                      placeholder="Seu nome completo" 
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all" 
                      placeholder="seu@email.com" 
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                      Empresa
                    </label>
                    <Input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all" 
                      placeholder="Nome da sua empresa" 
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                      Telefone
                    </label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      onFocus={handlePhoneFocus}
                      className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl h-12 transition-all" 
                      placeholder="(99) 99999-9999" 
                      disabled={isSubmitting}
                      maxLength={16}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Mensagem *
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    className="bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl min-h-[150px] transition-all resize-none" 
                    placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white py-6 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Enviado com Sucesso!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>

                <div style={{ textAlign: "center", margin: "8px 0" }}>
                  <span style={{ fontSize: "13px", color: "rgba(107,114,128,1)" }}>ou</span>
                </div>

                <a
                  href="https://wa.me/5519997948118?text=Olá!%20Vim%20pelo%20site%20da%20Vision%20AI%20e%20gostaria%20de%20saber%20mais."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    background: "#25D366",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.9"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  <svg viewBox="0 0 48 48" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M24 4C12.95 4 4 12.95 4 24c0 3.55.92 6.89 2.54 9.78L4 44l10.5-2.5A19.87 19.87 0 0024 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.07 0-5.97-.8-8.48-2.2l-.6-.36-6.23 1.48 1.52-6.06-.4-.63A15.93 15.93 0 018 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.73-11.97c-.48-.24-2.83-1.4-3.27-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.75-3.87-2.39-1.43-1.28-2.4-2.85-2.68-3.33-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.14.5 2.04.8 2.73 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.83-1.16 3.23-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
                  </svg>
                  Falar pelo WhatsApp agora
                </a>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Resposta em até 24 horas</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
