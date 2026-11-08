import { useEffect, useState } from "react";
import { Bot, Workflow, LayoutDashboard, LineChart, Check, ArrowUpRight } from "lucide-react";
import { DIAGNOSTICO_URL, SectionHead, openWhatsapp } from "./shared";

type Msg = { eu: boolean; t: string };
type Exemplo = {
  nome: string;
  titulo: string;
  desc: string;
  itens: string[];
  ideal: string[];
  chat?: Msg[];
  status?: string;
};

/* ---------- Visuais ---------- */

const Chat = ({ msgs, status }: { msgs: Msg[]; status?: string }) => (
  <div className="space-y-3 p-6 md:p-7 w-full">
    <div className="flex items-center gap-3 pb-4 mb-1 border-b border-[var(--vx-line)]">
      <div className="h-9 w-9 rounded-full bg-[var(--vx-blue)] flex items-center justify-center">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div>
        <div className="text-sm font-semibold">Agente Vision AI</div>
        <div className="text-[0.7rem] text-[#5ee39a]">online agora</div>
      </div>
    </div>
    {msgs.map((m, i) => (
      <div key={i} className={`flex ${m.eu ? "justify-end" : ""} vx-rise`} style={{ ["--d" as string]: `${i * 260}ms` }}>
        <div
          className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-snug ${
            m.eu ? "bg-[var(--vx-blue)] text-white rounded-br-md" : "bg-[var(--vx-bg-3)] text-[var(--vx-ink)] rounded-bl-md"
          }`}
        >
          {m.t}
        </div>
      </div>
    ))}
    {status && (
      <div className="flex items-center gap-2 pt-2 text-[0.72rem] text-[var(--vx-ink-3)] vx-rise" style={{ ["--d" as string]: `${msgs.length * 260}ms` }}>
        <span className="vx-live shrink-0" /> {status}
      </div>
    )}
  </div>
);

const VisualFluxo = () => {
  const nos = [
    { x: 20, y: 40, t: "Contrato PDF" },
    { x: 20, y: 180, t: "WhatsApp" },
    { x: 180, y: 110, t: "IA extrai e confere" },
    { x: 340, y: 30, t: "Sistema" },
    { x: 340, y: 110, t: "Financeiro" },
    { x: 340, y: 190, t: "Aviso ao cliente" },
  ];
  const arestas = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ];
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto p-5">
      {arestas.map(([a, b], i) => {
        const A = nos[a];
        const B = nos[b];
        const x1 = A.x + 104;
        const y1 = A.y + 18;
        const x2 = B.x;
        const y2 = B.y + 18;
        const mx = (x1 + x2) / 2;
        const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        return (
          <g key={i}>
            <path d={d} stroke="rgba(236,232,223,0.14)" fill="none" />
            <path d={d} stroke="#8a93ff" strokeWidth="1.6" fill="none" className="vx-flow" />
          </g>
        );
      })}
      {nos.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width="104" height="36" rx="10" fill={i === 2 ? "#3d4bff" : "#13161d"} stroke={i === 2 ? "#8a93ff" : "rgba(236,232,223,0.16)"} />
          <text x={n.x + 52} y={n.y + 22} textAnchor="middle" fontSize="11" fill="#ece8df" fontFamily="Inter, sans-serif">
            {n.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

const VisualSistema = () => {
  const barras = [38, 52, 44, 61, 58, 72, 66, 84, 78, 92];
  return (
    <div className="p-6 md:p-7 w-full flex flex-col">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Receita do mês", v: "R$ 412k" },
          { l: "Margem", v: "23,4%" },
          { l: "A receber", v: "R$ 96k" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-[var(--vx-line)] bg-[var(--vx-bg-3)] p-3">
            <div className="text-[0.65rem] uppercase tracking-wider text-[var(--vx-ink-3)]">{k.l}</div>
            <div className="mt-1 text-lg font-semibold">{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 h-[170px] flex items-end gap-2 border-b border-[var(--vx-line)]">
        {barras.map((h, i) => (
          <div
            key={i}
            className="vx-bar flex-1 rounded-t-md"
            style={{ height: `${h}%`, animationDelay: `${i * 60}ms`, background: i === barras.length - 1 ? "#3d4bff" : "rgba(138,147,255,0.28)" }}
          />
        ))}
      </div>
      <div className="mt-3 text-[0.68rem] text-[var(--vx-ink-3)]">dados ilustrativos</div>
    </div>
  );
};

const VisualGestao = () => (
  <div className="p-6 md:p-7 w-full">
    <div className="rounded-2xl border border-[var(--vx-line)] bg-[var(--vx-bg-3)] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--vx-blue-hi)]">Briefing · 08:00</span>
        <span className="text-[0.68rem] text-[var(--vx-ink-3)]">enviado no WhatsApp</span>
      </div>
      <p className="mt-3 text-[0.95rem] leading-relaxed">
        Bom dia! Ontem entraram <b>R$ 38,2 mil</b>. Três prioridades pra hoje:
      </p>
      <ol className="mt-3 space-y-2 text-sm text-[var(--vx-ink-2)]">
        {[
          ["alta", "2 boletos de clientes vencem amanhã sem confirmação"],
          ["média", "Leads de ontem ainda sem retorno: 5"],
          ["baixa", "Custo com combustível subiu 9% na semana"],
        ].map(([p, t]) => (
          <li key={t} className="flex gap-3">
            <span className={`text-[0.65rem] font-semibold uppercase mt-0.5 shrink-0 w-12 ${p === "alta" ? "text-[var(--vx-signal)]" : "text-[var(--vx-ink-3)]"}`}>{p}</span>
            {t}
          </li>
        ))}
      </ol>
    </div>
    <div className="mt-4 ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[var(--vx-blue)] px-4 py-2.5 text-sm text-white">
      Quanto falta receber da semana?
    </div>
  </div>
);

/* ---------- Conteúdo ---------- */

const AGENTES: Exemplo[] = [
  {
    nome: "Atendimento",
    titulo: "Agente de Atendimento",
    desc: "Responde dúvidas, envia informações de produto, preço e prazo e resolve o que é repetitivo, sem fila de espera.",
    itens: ["Funciona 24h, 7 dias por semana", "Treinado com a base de conhecimento da empresa", "Tom de voz da sua marca", "Passa para um humano quando precisa"],
    ideal: ["Comércio", "E-commerce", "Serviços"],
    chat: [
      { eu: false, t: "Oi, vocês entregam para Campinas?" },
      { eu: true, t: "Olá! Entregamos sim, em Campinas e região. Qual produto você tem interesse? Já te passo valor e prazo." },
      { eu: false, t: "O kit completo" },
      { eu: true, t: "O kit completo sai por R$ 297, com entrega em 2 dias úteis. Quer que eu reserve um pra você? 😊" },
    ],
    status: "dúvida resolvida em 40s · lead salvo no CRM",
  },
  {
    nome: "Agendamento",
    titulo: "Agente de Agendamento",
    desc: "Agenda, confirma e lembra consultas, visitas ou reuniões direto no WhatsApp. Reagenda sozinho e reduz faltas.",
    itens: ["Integrado à sua agenda", "Confirmação automática no dia anterior", "Reagendamento sem esforço do time", "Lista de espera para horários vagos"],
    ideal: ["Clínicas", "Consultórios", "Salões", "Oficinas"],
    chat: [
      { eu: false, t: "Oi! Vocês atendem sábado? Queria marcar uma avaliação." },
      { eu: true, t: "Atendemos sim! Tenho sábado às 9h ou 10h30. Qual fica melhor pra você?" },
      { eu: false, t: "10h30 por favor" },
      { eu: true, t: "Prontinho, agendado para sábado às 10h30. Te mando um lembrete na sexta. ✅" },
    ],
    status: "agenda atualizada · lembrete programado",
  },
  {
    nome: "Vendas (SDR)",
    titulo: "Agente de Vendas",
    desc: "Aborda o lead na hora em que ele chega, entende a necessidade, qualifica e entrega o contato quente para o seu time fechar.",
    itens: ["Resposta em segundos ao lead de anúncio", "Perguntas de qualificação do seu processo", "Follow-up automático de quem sumiu", "Registro de tudo no CRM"],
    ideal: ["Serviços B2B", "Escolas", "Imobiliárias", "SaaS"],
    chat: [
      { eu: false, t: "Vi o anúncio de vocês, quanto custa?" },
      { eu: true, t: "Oi! Que bom que você chegou 😊 Pra te passar a opção certa: é pra uso pessoal ou pra empresa?" },
      { eu: false, t: "Empresa, somos 8 pessoas" },
      { eu: true, t: "Perfeito! Pra times desse tamanho temos o plano Pro. Posso agendar uma demonstração de 20 min com nosso especialista amanhã às 10h?" },
    ],
    status: "lead qualificado · reunião agendada com o comercial",
  },
  {
    nome: "Imobiliário",
    titulo: "Agente para Imobiliárias",
    desc: "Recebe o lead do portal ou do anúncio, entende perfil e orçamento, sugere imóveis compatíveis e marca a visita com o corretor certo.",
    itens: ["Qualificação por faixa de valor e região", "Sugestão de imóveis da carteira", "Agenda de visitas por corretor", "Distribuição de leads automática"],
    ideal: ["Imobiliárias", "Incorporadoras", "Corretores"],
    chat: [
      { eu: false, t: "Vi o apartamento de 2 quartos no Cambuí. Ainda está disponível?" },
      { eu: true, t: "Está sim! Você pensa em financiar ou à vista? E qual faixa de valor fica confortável?" },
      { eu: false, t: "Financiar, até uns 550 mil" },
      { eu: true, t: "Esse cabe certinho, e tenho mais 2 opções parecidas na região. Posso marcar uma visita com o Rafael sábado às 10h?" },
    ],
    status: "perfil registrado · visita agendada com o corretor",
  },
  {
    nome: "Cotação",
    titulo: "Agente de Cotação",
    desc: "Recebe o pedido, calcula pela sua regra de preço e responde o orçamento na hora, sem ninguém parar o que está fazendo.",
    itens: ["Tabela e regras de preço configuráveis", "Resposta em segundos", "Histórico de cotações salvo", "Aviso ao comercial quando fecha"],
    ideal: ["Transportadoras", "Distribuidoras", "Indústria"],
    chat: [
      { eu: false, t: "Preciso de frete Campinas x Curitiba, 12 paletes, carga seca" },
      { eu: true, t: "Certo! Rota de ~420 km. Para 12 paletes em carreta, o frete fica em R$ 3.480 com coleta amanhã. Posso reservar?" },
      { eu: false, t: "Pode reservar" },
      { eu: true, t: "Reservado ✅ Já enviei a confirmação pro seu e-mail e avisei a programação." },
    ],
    status: "cotação salva · programação avisada",
  },
  {
    nome: "Suporte",
    titulo: "Agente de Suporte",
    desc: "Resolve os chamados mais comuns sozinho, consultando pedidos e sistemas, e só chama o time quando o caso exige uma pessoa.",
    itens: ["Consulta pedido, entrega e status", "Base de conhecimento sempre atualizada", "Escalação inteligente com resumo do caso", "Histórico completo de atendimento"],
    ideal: ["E-commerce", "SaaS", "Assistência técnica"],
    chat: [
      { eu: false, t: "Meu pedido não chegou ainda, já faz 5 dias" },
      { eu: true, t: "Poxa, vou verificar agora mesmo 🔍 Me passa o número do pedido?" },
      { eu: false, t: "Pedido #48291" },
      { eu: true, t: "Encontrei! Está com a transportadora e chega hoje até as 18h. Te aviso quando sair para entrega." },
    ],
    status: "chamado resolvido sem fila · cliente avisado",
  },
  {
    nome: "Cobrança",
    titulo: "Agente de Cobrança",
    desc: "Lembra antes do vencimento, cobra com educação depois, envia segunda via ou PIX e para sozinho quando o pagamento cai.",
    itens: ["Régua de lembretes antes e depois", "Segunda via e PIX copia e cola", "Baixa automática quando paga", "Negociação simples dentro das suas regras"],
    ideal: ["Contabilidades", "Escolas", "Condomínios", "Serviços recorrentes"],
    chat: [
      { eu: true, t: "Oi, Marina! Tudo bem? O boleto de outubro venceu ontem. Quer que eu te mande o PIX copia e cola?" },
      { eu: false, t: "Ah, esqueci! Manda sim" },
      { eu: true, t: "Aqui está 👇\n00020126...br.gov.bcb.pix\nAssim que cair eu te confirmo por aqui." },
      { eu: true, t: "Pagamento recebido. Obrigado, Marina! 💙" },
    ],
    status: "pagamento conciliado · régua encerrada",
  },
  {
    nome: "Reativação",
    titulo: "Agente de Pós-venda e Reativação",
    desc: "Chama de volta quem já comprou na hora certa: retorno, revisão, recompra. Receita que estava parada na sua base.",
    itens: ["Gatilhos por tempo desde a última compra", "Mensagem personalizada pelo histórico", "Agenda ou pedido direto na conversa", "Pesquisa de satisfação automática"],
    ideal: ["Clínicas", "Óticas", "Varejo", "Oficinas"],
    chat: [
      { eu: true, t: "Oi, Carlos! Faz 6 meses da sua última limpeza. Tenho quinta às 15h ou sexta às 9h. Quer que eu reserve?" },
      { eu: false, t: "Quinta 15h fica ótimo" },
      { eu: true, t: "Reservado! Te mando a confirmação um dia antes. Até quinta 😊" },
    ],
    status: "paciente reativado · retorno agendado",
  },
  {
    nome: "Assistente interno",
    titulo: "Assistente Interno do Time",
    desc: "Um assistente para a sua equipe: resume reuniões, consulta processos e sistemas, organiza tarefas e lembra prazos.",
    itens: ["Resumo de reuniões e conversas", "Consulta a manuais e procedimentos", "Criação de tarefas e lembretes", "Acesso por perfil a cada informação"],
    ideal: ["Gestão", "Equipes administrativas", "Operações"],
    chat: [
      { eu: false, t: "Resume a reunião de ontem pra mim" },
      { eu: true, t: "Claro! Pontos principais:\n• Meta de vendas revista para R$ 85k\n• Lucas assume o cliente Acme\n• Próxima reunião: 22/10 às 14h" },
      { eu: false, t: "Coloca a próxima na agenda de todos" },
      { eu: true, t: "Feito ✅ Convite enviado com lembrete 1h antes." },
    ],
    status: "resumo salvo · agenda do time atualizada",
  },
];

const SOLUCOES: {
  id: string;
  icon: typeof Bot;
  nome: string;
  resumo: string;
  titulo: string;
  texto: string;
  rotulo: string;
  exemplos: Exemplo[];
  Visual?: () => JSX.Element;
}[] = [
  {
    id: "agentes",
    icon: Bot,
    nome: "Agentes de IA",
    resumo: `${AGENTES.length} tipos de agente`,
    titulo: "Atendem, qualificam, agendam e cobram. Às 3 da manhã também.",
    texto:
      "Agentes treinados com a sua forma de falar, o seu catálogo e as suas regras. Funcionam no WhatsApp, no site e no Instagram, e passam para uma pessoa quando faz sentido. Escolha um exemplo e veja a conversa.",
    rotulo: "Escolha um agente",
    exemplos: AGENTES,
  },
  {
    id: "automacoes",
    icon: Workflow,
    nome: "Automações",
    resumo: "6 fluxos frequentes",
    titulo: "O dado entra uma vez. E chega em todo lugar.",
    texto:
      "Conectamos os sistemas que você já usa e colocamos IA onde antes tinha alguém copiando e colando: leitura de documentos, conferência, conciliação e avisos automáticos.",
    rotulo: "Exemplos de automação",
    Visual: VisualFluxo,
    exemplos: [
      {
        nome: "Leitura de documentos",
        titulo: "Leitura de documentos por IA",
        desc: "Contratos, notas e boletos em PDF viram dados no sistema, já conferidos com o que estava cadastrado.",
        itens: ["Extração dos campos importantes", "Conferência com o sistema", "Alerta quando algo não bate"],
        ideal: ["Transportadoras", "Contabilidades", "Jurídico"],
      },
      {
        nome: "Conciliação financeira",
        titulo: "Conciliação de PIX e boletos",
        desc: "O pagamento cai e a baixa acontece sozinha no financeiro, sem ninguém conferindo extrato linha por linha.",
        itens: ["Confirmação automática pelo banco", "Baixa no contas a receber", "Aviso de divergências"],
        ideal: ["Comércio", "Eventos", "Serviços"],
      },
      {
        nome: "Avisos no WhatsApp",
        titulo: "Avisos e comprovantes no WhatsApp",
        desc: "Comprovantes, confirmações e lembretes enviados pela API oficial do WhatsApp, no momento certo e para a pessoa certa.",
        itens: ["API oficial com modelos aprovados", "Número conferido antes do envio", "Registro de cada mensagem enviada"],
        ideal: ["Transportadoras", "Clínicas", "Escolas"],
      },
      {
        nome: "Integração de sistemas",
        titulo: "Integração entre sistemas",
        desc: "ERP, TMS, CRM e planilhas conversando entre si. Acaba a digitação dupla e o “qual planilha está certa?”.",
        itens: ["Sincronização agendada", "Fim da digitação repetida", "Log de cada sincronização"],
        ideal: ["Indústria", "Distribuidoras", "Transportadoras"],
      },
      {
        nome: "Régua de cobrança",
        titulo: "Régua de cobrança automática",
        desc: "Lembretes antes e depois do vencimento, segunda via e PIX enviados sozinhos, parando assim que o cliente paga.",
        itens: ["Lembretes programados", "Segunda via automática", "Para quando o pagamento entra"],
        ideal: ["Contabilidades", "Escolas", "SaaS"],
      },
      {
        nome: "Relatórios automáticos",
        titulo: "Relatórios que chegam sozinhos",
        desc: "O relatório semanal ou mensal montado e entregue no seu e-mail ou WhatsApp, com os números já conferidos.",
        itens: ["Montagem automática", "Envio programado", "Mesmos números do sistema"],
        ideal: ["Gestão", "Financeiro", "Comercial"],
      },
    ],
  },
  {
    id: "sistemas",
    icon: LayoutDashboard,
    nome: "Sistemas sob medida",
    resumo: "6 tipos de sistema",
    titulo: "Software do tamanho exato da sua operação.",
    texto:
      "Quando a planilha não aguenta mais e o sistema de prateleira não serve, a gente constrói o seu. Web, rápido, seguro e com a IA já dentro, não como remendo.",
    rotulo: "O que já construímos",
    Visual: VisualSistema,
    exemplos: [
      {
        nome: "Gestão operacional",
        titulo: "Gestão operacional e financeira",
        desc: "Operação, contas a pagar e receber e rentabilidade em um lugar só, no formato do seu negócio.",
        itens: ["Fluxo desenhado para o seu processo", "Financeiro integrado à operação", "Rentabilidade por cliente e por ativo"],
        ideal: ["Transportadoras", "Indústria", "Serviços"],
      },
      {
        nome: "CRM sob medida",
        titulo: "CRM sob medida",
        desc: "Funil do seu jeito, com IA analisando conversas, sugerindo o próximo passo e gerando contratos.",
        itens: ["Funil com as suas etapas", "Análise de conversas por IA", "Contratos e propostas gerados"],
        ideal: ["Imobiliárias", "Serviços B2B", "Agências"],
      },
      {
        nome: "Pedidos e pagamentos",
        titulo: "Pedidos com QR code e PIX",
        desc: "O cliente pede pelo celular, paga no PIX e o pedido aparece no painel de quem prepara, com ficha impressa.",
        itens: ["Cardápio digital por QR code", "PIX confirmado automaticamente", "Painel por setor e impressão"],
        ideal: ["Eventos", "Restaurantes", "Food service"],
      },
      {
        nome: "SaaS para vender",
        titulo: "Um SaaS para você vender",
        desc: "Transformamos o seu conhecimento em produto: assinatura, pagamento recorrente, vários clientes no mesmo sistema.",
        itens: ["Planos e cobrança recorrente", "Cadastro e teste grátis", "Suporte com agente de IA"],
        ideal: ["Especialistas", "Consultorias", "Nichos técnicos"],
      },
      {
        nome: "Portal do cliente",
        titulo: "Portal do cliente",
        desc: "Seu cliente acompanha pedidos, documentos e pagamentos sozinho, sem precisar te chamar no WhatsApp.",
        itens: ["Acesso individual e seguro", "Documentos e segunda via", "Status em tempo real"],
        ideal: ["Contabilidades", "Serviços", "Logística"],
      },
      {
        nome: "Painéis e indicadores",
        titulo: "Painéis e indicadores",
        desc: "Os números da empresa num painel que bate com o financeiro, atualizado sozinho, sem montar planilha.",
        itens: ["Indicadores do seu negócio", "Atualização automática", "Acesso por perfil"],
        ideal: ["Gestão", "Diretoria", "Financeiro"],
      },
    ],
  },
  {
    id: "gestao",
    icon: LineChart,
    nome: "Inteligência de gestão",
    resumo: "6 recursos para o dono",
    titulo: "O seu negócio respondendo no WhatsApp.",
    texto:
      "Pergunte quanto faturou, o que vence amanhã ou qual cliente sumiu, e receba a resposta com o número certo. Todo dia de manhã, um resumo com o que merece a sua atenção.",
    rotulo: "Recursos",
    Visual: VisualGestao,
    exemplos: [
      {
        nome: "Assistente de dados",
        titulo: "Assistente de dados no WhatsApp",
        desc: "Pergunte em português e receba o número certo, puxado direto do seu sistema, em segundos.",
        itens: ["Faturamento, contas e saldos", "Busca por cliente ou documento", "Permissão por perfil de usuário"],
        ideal: ["Donos", "Gestores", "Financeiro"],
      },
      {
        nome: "Briefing diário",
        titulo: "Briefing diário",
        desc: "Todo dia de manhã, um resumo do que aconteceu e das prioridades do dia, direto no seu WhatsApp.",
        itens: ["Resumo do dia anterior", "Prioridades ordenadas", "Alertas do que exige atenção"],
        ideal: ["Donos", "Diretoria"],
      },
      {
        nome: "Analistas por setor",
        titulo: "Conselho de analistas de IA",
        desc: "Um analista de IA para cada área (financeiro, comercial, operação) e um resumo que cruza tudo.",
        itens: ["Um analista por setor", "Recomendações priorizadas", "Memória do que já foi aprendido"],
        ideal: ["Empresas em crescimento", "Gestão"],
      },
      {
        nome: "Ações com confirmação",
        titulo: "Ações com confirmação",
        desc: "Peça para dar baixa numa conta ou marcar um recebimento: o assistente prepara, você responde SIM e pode desfazer.",
        itens: ["Nada acontece sem o seu SIM", "Registro de cada ação", "Desfazer quando precisar"],
        ideal: ["Financeiro", "Donos"],
      },
      {
        nome: "Alertas inteligentes",
        titulo: "Alertas inteligentes",
        desc: "Vencimentos sem confirmação, margem caindo, cliente que parou de comprar: você fica sabendo antes de virar problema.",
        itens: ["Regras do seu negócio", "Aviso no canal certo", "Menos surpresa no fim do mês"],
        ideal: ["Financeiro", "Comercial", "Operação"],
      },
      {
        nome: "Radar de mercado",
        titulo: "Radar de anúncios e mercado",
        desc: "Seus anúncios analisados toda semana e as notícias do seu setor resumidas, com o que fazer a respeito.",
        itens: ["Métricas de anúncios explicadas", "Notícias do setor filtradas", "Sugestões de ação"],
        ideal: ["Marketing", "Donos"],
      },
    ],
  },
];

/* ---------- Seção ---------- */

const Solucoes = () => {
  const [ativo, setAtivo] = useState(0);
  const [ex, setEx] = useState(0);
  const S = SOLUCOES[ativo];
  const E = S.exemplos[ex] ?? S.exemplos[0];
  const Visual = S.Visual;

  // O link "Agentes de IA" do menu abre direto a aba de agentes
  useEffect(() => {
    const abrir = (e: Event) => {
      setAtivo((e as CustomEvent<number>).detail);
      setEx(0);
    };
    window.addEventListener("vx-aba", abrir);
    return () => window.removeEventListener("vx-aba", abrir);
  }, []);

  const trocarAba = (i: number) => {
    setAtivo(i);
    setEx(0);
  };

  return (
    <section id="solucoes" className="py-16 md:py-32 scroll-mt-20">
      <div className="vx-container">
        <SectionHead
          index="02"
          eyebrow="Soluções"
          title={
            <>
              Quatro frentes. <span className="text-[var(--vx-blue-hi)]">Um só objetivo:</span> a operação rodando sem
              você empurrar.
            </>
          }
          aside="Raramente um cliente precisa de uma coisa só. Por isso desenhamos a solução inteira e entregamos em etapas, começando pelo que dá retorno primeiro."
        />

        {/* Abas */}
        <div id="agentes" className="grid grid-cols-2 lg:grid-cols-4 gap-2 scroll-mt-28" data-reveal>
          {SOLUCOES.map((s, i) => {
            const Icon = s.icon;
            const on = i === ativo;
            return (
              <button
                key={s.id}
                onClick={() => trocarAba(i)}
                className={`text-left rounded-2xl border px-3 py-3 md:px-5 md:py-5 transition-all duration-300 ${
                  on ? "border-[var(--vx-blue)] bg-[rgba(61,75,255,0.1)]" : "border-[var(--vx-line)] hover:border-[var(--vx-line-2)]"
                }`}
              >
                <div className="flex items-center gap-2.5 md:gap-3">
                  <span
                    className={`h-8 w-8 md:h-9 md:w-9 shrink-0 rounded-xl flex items-center justify-center ${
                      on ? "bg-[var(--vx-blue)] text-white" : "bg-[var(--vx-bg-3)] text-[var(--vx-ink-3)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className={`text-[0.9rem] md:text-base font-semibold leading-tight ${on ? "text-[var(--vx-ink)]" : "text-[var(--vx-ink-2)]"}`}>{s.nome}</div>
                    <div className="hidden sm:block text-xs text-[var(--vx-ink-3)] mt-0.5">{s.resumo}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Painel */}
        <div key={ativo} className="mt-4 vx-card overflow-hidden vx-rise">
          {/* Introdução da frente */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 p-6 md:p-10 border-b border-[var(--vx-line)]">
            <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.025em] leading-tight">{S.titulo}</h3>
            <p className="text-[var(--vx-ink-2)] leading-relaxed lg:pt-1">{S.texto}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Lista de exemplos */}
            <div className="min-w-0 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[var(--vx-line)] p-4 md:p-5">
              <div className="vx-eyebrow !text-[0.68rem] px-2 mb-3">{S.rotulo}</div>
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible -mx-1 px-1 pr-10 lg:pr-1 pb-1 [mask-image:linear-gradient(to_right,#000_78%,transparent)] lg:[mask-image:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {S.exemplos.map((x, i) => {
                  const on = i === ex;
                  return (
                    <button
                      key={x.nome}
                      onClick={() => setEx(i)}
                      className={`shrink-0 text-left rounded-xl px-3 py-2.5 text-sm transition-colors flex items-center justify-between gap-3 ${
                        on ? "bg-[var(--vx-blue)] text-white" : "text-[var(--vx-ink-2)] hover:bg-[var(--vx-bg-3)] hover:text-[var(--vx-ink)]"
                      }`}
                    >
                      <span className="whitespace-nowrap">{x.nome}</span>
                      <span className={`hidden lg:inline text-xs ${on ? "text-white/80" : "text-[var(--vx-ink-3)]"}`}>{String(i + 1).padStart(2, "0")}</span>
                    </button>
                  );
                })}
                {ativo === 0 && (
                  <button
                    onClick={() => openWhatsapp(DIAGNOSTICO_URL)}
                    className="shrink-0 text-left rounded-xl px-3 py-2.5 text-sm text-[var(--vx-blue-hi)] border border-dashed border-[rgba(138,147,255,0.4)] hover:bg-[rgba(61,75,255,0.08)] transition-colors lg:mt-2 flex items-center justify-between gap-3"
                  >
                    <span className="whitespace-nowrap">Agente personalizado</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Detalhe do exemplo */}
            <div key={`${ativo}-${ex}`} className="min-w-0 lg:col-span-4 p-6 md:p-8 flex flex-col vx-rise">
              <h4 className="text-xl md:text-2xl font-bold tracking-[-0.02em]">{E.titulo}</h4>
              <p className="mt-3 text-[var(--vx-ink-2)] leading-relaxed">{E.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {E.itens.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[0.95rem]">
                    <Check className="h-4 w-4 mt-1 text-[var(--vx-blue-hi)] shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--vx-ink-3)] mb-2.5">Ideal para</div>
                <div className="flex flex-wrap gap-2">
                  {E.ideal.map((n) => (
                    <span key={n} className="rounded-full border border-[var(--vx-line-2)] px-3 py-1 text-xs text-[var(--vx-ink-2)]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[var(--vx-line)] bg-[var(--vx-bg-2)] min-h-[320px] md:min-h-[380px] flex items-center">
              {E.chat ? <Chat key={`${ativo}-${ex}`} msgs={E.chat} status={E.status} /> : Visual ? <Visual /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solucoes;
