import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Bot, Zap, Send, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Hero = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Experimente você mesmo: Converse com nossa consultora Sophia, um agente de IA que tira suas dúvidas sobre nossas soluções e veja como um agente IA pode mudar sua operação!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'error'>('online');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [sessionId] = useState(() => `session_${userId}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const WEBHOOK_URL = "https://n8n.agenciavisionai.com/webhook/chat-sophia";
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const extractBotMessages = (data: any): string[] => {
    if (data?.messages && Array.isArray(data.messages) && data.messages.length > 0) {
      return data.messages;
    }
    
    const singleMessage = data?.message || data?.response || data?.output || data?.text;
    if (singleMessage && typeof singleMessage === 'string') {
      return [singleMessage];
    }
    
    if (typeof data === 'string' && data.trim()) {
      return [data.trim()];
    }
    
    return ["Desculpe, não consegui processar sua mensagem no momento."];
  };
  
  const addMessagesWithDelay = async (messagesArray: string[]) => {
    const MIN_DELAY = 5000;
    const CHARS_PER_SECOND = 40;
    
    for (let i = 0; i < messagesArray.length; i++) {
      if (i > 0) {
        const previousMessageLength = messagesArray[i - 1].length;
        const calculatedDelay = Math.max(MIN_DELAY, (previousMessageLength / CHARS_PER_SECOND) * 1000);
        await new Promise(resolve => setTimeout(resolve, calculatedDelay));
      }
      
      const botMessage: Message = {
        id: Date.now() + i,
        text: messagesArray[i],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };
  
  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setConnectionStatus('online');
    
    try {
      const requestBody = {
        message: message.trim(),
        messageType: 'text',
        userId: userId,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }
      
      const botMessages = extractBotMessages(data);
      await addMessagesWithDelay(botMessages);
      setConnectionStatus('online');
      
    } catch (error: any) {
      let errorMessage;
      
      if (error.name === 'AbortError') {
        errorMessage = "A requisição demorou muito. Tente novamente.";
        setConnectionStatus('error');
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "Problema de conexão. Verifique sua internet.";
        setConnectionStatus('offline');
      } else {
        errorMessage = "Desculpe, estou com problemas técnicos no momento.";
        setConnectionStatus('error');
      }
      
      const errorMsg: Message = {
        id: Date.now() + 999,
        text: errorMessage,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'online': return 'bg-emerald-400';
      case 'offline': return 'bg-yellow-400';
      case 'error': return 'bg-red-400';
      default: return 'bg-emerald-400';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'online': return 'Online';
      case 'offline': return 'Conexão instável';
      case 'error': return 'Erro de conexão';
      default: return 'Online';
    }
  };

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
              Powered by Artificial Intelligence
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transforme seu negócio com{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Agentes de IA
              </span>
              {" "}e Automações
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Criamos agentes de IA personalizados para atendimento, vendas, suporte e qualificação de leads. 
              Além de automações inteligentes que otimizam seus processos e aumentam sua produtividade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white btn-shimmer h-14 px-8 text-lg"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 h-14 px-8 text-lg"
              >
                Ver Serviços
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Agentes IA</p>
                  <p className="text-sm text-gray-600">Personalizados</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Automações</p>
                  <p className="text-sm text-gray-600">Inteligentes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Widget com Glassmorphism */}
          <div className="relative animate-scale-in">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl opacity-20 blur-2xl animate-pulse-glow"></div>
              
              <div className="relative glass rounded-3xl p-2 shadow-2xl">
                {/* Header com gradiente */}
                <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 animate-float ring-2 ring-white/30">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces" 
                        alt="Sophia" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Sophia</p>
                      <p className="text-xs opacity-90">Consultora da Vision AI</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${connectionStatus === 'online' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-xs opacity-75">{getStatusText()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="h-96 overflow-y-auto p-5 space-y-4 bg-gradient-to-br from-gray-50 to-white"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 animate-fade-in-up ${message.isBot ? '' : 'justify-end'}`}
                    >
                      {message.isBot && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-indigo-100">
                          <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces" 
                            alt="Sophia" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md ${message.isBot ? '' : 'order-first'}`}>
                        <div
                          className={`rounded-2xl p-4 shadow-md ${
                            message.isBot 
                              ? 'bg-white border border-gray-100' 
                              : 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        </div>
                        <p className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-gray-400 text-right'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {!message.isBot && (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-white text-sm font-medium">U</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3 animate-fade-in-up">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg ring-2 ring-indigo-100">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces" 
                          alt="Sophia" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-4">
                        <div className="flex gap-1">
                          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce"></div>
                          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white rounded-b-2xl">
                  {connectionStatus !== 'online' && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">{getStatusText()}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                        maxLength={500}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!inputMessage.trim() || isLoading}
                      className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full flex items-center justify-center hover:from-indigo-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
