import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import AgentesIA from "./pages/AgentesIA";
import NotFound from "./pages/NotFound";
import WhatsappFloat from "@/components/WhatsappFloat";

const ConditionalWhatsappFloat = () => {
  const { pathname } = useLocation();
  if (pathname === "/agentes") return null;
  return <WhatsappFloat />;
};

export const WHATSAPP_URL = "https://wa.me/5519997948118?text=Olá!%20Vim%20pelo%20site%20da%20Vision%20AI%20e%20gostaria%20de%20saber%20mais.";
export const CONTACT_SECTION_ID = "contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agentes" element={<AgentesIA />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalWhatsappFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
