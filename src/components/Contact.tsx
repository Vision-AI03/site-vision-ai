/*
  SETUP GOOGLE SHEETS — executar UMA vez:
  1. Abra a planilha: https://docs.google.com/spreadsheets/d/17DdIyTIOUP7QkRq46a83ybIcE6-F9V-KFobDmbbNQuk
  2. Menu: Extensões → Apps Script
  3. Cole o código abaixo e salve (Ctrl+S)
  4. Clique em "Implantar" → "Nova implantação"
  5. Tipo: Aplicativo da Web
  6. Executar como: Eu (sua conta)
  7. Quem tem acesso: Qualquer pessoa
  8. Clique em "Implantar" e autorize as permissões
  9. Copie a URL gerada e substitua GOOGLE_SCRIPT_URL abaixo

  --- CÓDIGO DO APPS SCRIPT ---
  function doPost(e) {
    try {
      var sheet = SpreadsheetApp.openById("17DdIyTIOUP7QkRq46a83ybIcE6-F9V-KFobDmbbNQuk").getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      sheet.appendRow([
        data.nome || "",
        data.empresa || "",
        data.telefone || "",
        data.email || "",
        data.mensagem || "",
        new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch(err) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  function doGet() {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  --- FIM DO CÓDIGO ---

  IMPORTANTE: Sempre que editar o script, crie uma NOVA implantação
  (não edite a existente) para as mudanças entrarem em vigor.
*/

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Substitua pela URL gerada no Google Apps Script após o deploy
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrXEkshD4jdi-hsHJckgCfcqgy0iiw24KtwQLHEgHMVjwXI20XQERnC9IdqOVE2VddGQ/exec";

// Mantém o Supabase como fallback secundário
const WEBHOOK_URL = "https://sfezwprbanvxsnwgvkhh.supabase.co/functions/v1/capture-lead-website";
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
      const payload = {
        nome: formData.name,
        empresa: formData.company,
        telefone: formData.phone,
        email: formData.email,
        mensagem: formData.message,
      };

      // Envio primário: Google Sheets via Apps Script
      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "COLE_AQUI_A_URL_DO_APPS_SCRIPT") {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Apps Script exige no-cors
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        // no-cors não retorna response legível, assumimos sucesso se não jogar erro
      }

      // Envio secundário: Supabase (mantém captura original)
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            origem: "site-visionai",
            api_token: WEBHOOK_TOKEN,
          }),
        });
      } catch {
        // Supabase falhou, não bloqueia o fluxo
      }

      setIsSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Recebemos seu contato. Em breve nossa equipe vai falar com você.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive",
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
              💬 Diagnóstico sem compromisso
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gradient">Bora conversar sobre a sua operação?</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Chama a gente no WhatsApp ou preenche o formulário com um resumo da sua operação. A gente te retorna com um diagnóstico honesto do que dá pra automatizar — sem compromisso.
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
