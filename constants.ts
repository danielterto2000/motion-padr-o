import { NavItem, Template, Category, HowItWorksStep, Advantage, ChromaKeyTemplate, ChromaKeyCategory, Software, Specialization, TemplateUploadCategory, InspirationalQuote, Coupon, SupportCardItem, FAQItem, MogrtCategory, MogrtTemplate, MogrtUsageStep, MogrtTemplateSpecification, AdminNavItem, SimulatedTicket, TicketSubject, TicketStatus } from './types';

export interface DifferentialItem {
  id: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
}

export const ADMIN_EMAIL = "admin@broadcastmotion.com.br"; // Used for identifying admin user

export const NAV_LINKS: NavItem[] = [
  { label: 'Início', href: '#hero', activeId: 'hero'},
  { 
    label: 'Templates Gráficos', 
    href: '#templates-graficos', 
    activeId: 'templates-graficos',
    // No submenuItems, it's a direct link now
  },
  { label: 'Mockups .MOGRT', href: 'mogrtPage', activeId: 'pagina-mogrt' }, // Points to AppView 'mogrtPage'
  { label: 'Chroma Key', href: 'chromaKeyPage', activeId: 'pagina-chroma' }, // Points to AppView 'chromaKeyPage'
  { label: 'Sobre', href: '#about', activeId: 'about' },
  { label: 'Suporte', href: 'supportHub', activeId: 'support-hub' },
];

export const CATEGORIES_DATA: Category[] = [
  { id: 'all', name: 'Todos os Templates', filterValue: 'all' },
  { id: 'economy', name: 'Indicadores Econômicos', filterValue: 'economy' },
  { id: 'agriculture', name: 'Agropecuária', filterValue: 'agriculture' },
  { id: 'weather', name: 'Meteorologia', filterValue: 'weather' },
  { id: 'finance', name: 'Financeiro', filterValue: 'finance' },
  { id: 'tables', name: 'Tabelas', filterValue: 'tables' },
];

export const TEMPLATES_DATA: Template[] = [
  { 
    id: '1', 
    name: 'Indicadores Econômicos Modernos', 
    imageUrl: 'https://i.imgur.com/7iMb3HZ.png', 
    price: 299, 
    category: 'economy', 
    categoryDisplayName: 'Cotação & Mercado', 
    categoryColorClass: 'text-blue-600',
    detailedDescription: 'Pacote completo de indicadores econômicos com design moderno e animações suaves. Ideal para telejornais, programas de análise de mercado e conteúdo digital focado em finanças. Fácil integração e personalização de dados.',
    features: ["Textos editáveis para valores e legendas", "Cores personalizáveis", "Animação de entrada e saída", "Loopable", "Design responsivo para diferentes aspect ratios"],
    softwareCompatibility: ["Mago GC", "VizRT", "CasparCG", "vMix (GT Title)", "OBS (via Browser Source com HTML)"],
    resolution: "Full HD (1920x1080)",
    duration: "10-20 segundos (ajustável)",
    fileFormat: ".gtzip, HTML/CSS/JS"
  },
  { 
    id: '2', 
    name: 'Gráfico Exportação Soja BR x China', 
    imageUrl: 'https://i.imgur.com/oG8WllO.png', 
    price: 349, 
    category: 'agriculture', 
    categoryDisplayName: 'Gráfico de Exportação', 
    categoryColorClass: 'text-green-600',
    detailedDescription: 'Template de gráfico de barras comparativo, perfeito para visualizar dados de exportação entre dois países ou entidades. Foco em clareza e impacto visual para o setor agropecuário.',
    features: ["Dados dinâmicos (até 10 barras)", "Logos dos países/entidades customizáveis", "Animação de crescimento das barras", "Legendas e títulos editáveis"],
    softwareCompatibility: ["Mago GC", "Ross Xpression", "ChyronHego"],
    resolution: "Full HD (1920x1080) / 4K (3840x2160)",
    duration: "Ajustável",
    fileFormat: ".mgtemplate (Mago), .scene (Ross)"
  },
  { 
    id: '3', 
    name: 'Comparativo Exportação BR x Rússia', 
    imageUrl: 'https://i.imgur.com/RZHAMpO.png', 
    price: 349, 
    category: 'agriculture', 
    categoryDisplayName: 'Comparativo de Barras', 
    categoryColorClass: 'text-green-600',
    detailedDescription: 'Gráfico de barras horizontais para comparar dados de exportação, importação ou outros indicadores entre Brasil e Rússia. Design limpo e profissional.',
    features: ["Até 8 itens comparativos", "Valores e textos totalmente editáveis", "Paleta de cores ajustável", "Animações suaves"],
    softwareCompatibility: ["Mago GC", "VizRT", "OBS (HTML)"],
    resolution: "Full HD (1920x1080)",
    fileFormat: ".gtzip, .html"
  },
  { 
    id: '4', 
    name: 'Previsão do Tempo Completa (7 dias)', 
    imageUrl: 'https://i.imgur.com/bbFv54P.png', 
    price: 399, 
    category: 'weather', 
    categoryDisplayName: 'Meteorologia Avançada', 
    categoryColorClass: 'text-yellow-600',
    detailedDescription: 'Template de previsão do tempo para 7 dias, incluindo ícones climáticos animados, temperaturas máximas/mínimas e informações adicionais como umidade e vento. Ideal para telejornais e programas regionais.',
    features: ["Ícones animados para diversas condições climáticas", "Dados de temperatura (Max/Min) editáveis", "Campos para umidade, vento, sensação térmica", "Fundo personalizável (imagem ou vídeo)", "Integração com feed de dados (opcional, requer customização)"],
    softwareCompatibility: ["Mago GC", "VizRT (com scripting)", "CasparCG"],
    resolution: "Full HD (1920x1080)",
    duration: "Loopable / Controlado por dados",
    fileFormat: ".gtzip, .via (Viz Scene)"
  },
  { 
    id: '5', 
    name: 'Diferencial de Base Agrícola (Mapa)', 
    imageUrl: 'https://i.imgur.com/CUtv0T3.png', 
    price: 379, 
    category: 'agriculture', 
    categoryDisplayName: 'Mapa Agropecuário Interativo', 
    categoryColorClass: 'text-green-600',
    detailedDescription: 'Mapa do Brasil com indicadores de diferencial de base para produtos agrícolas por estado. Visualização clara e informativa para o agronegócio.',
    features: ["Mapa vetorial do Brasil", "Valores por estado editáveis", "Legenda dinâmica", "Cores personalizáveis por faixas de valores"],
    softwareCompatibility: ["Mago GC (HTML/JS)", "Adobe After Effects (para edição manual)"],
    resolution: "Full HD (1920x1080)",
    fileFormat: ".html, .aep"
  },
  { 
    id: '6', 
    name: 'Tabela Boi Gordo por Estado', 
    imageUrl: 'https://i.imgur.com/cm0XWiy.png', 
    price: 329, 
    category: 'tables', 
    categoryDisplayName: 'Tabela de Indicadores Agro', 
    categoryColorClass: 'text-purple-600',
    detailedDescription: 'Template de tabela para exibir cotações de boi gordo ou outros produtos agropecuários por estado. Design limpo e fácil de ler.',
    features: ["Até 10 linhas de dados", "Colunas personalizáveis (Estado, Preço, Variação)", "Cores e fontes ajustáveis", "Animação de entrada de dados"],
    softwareCompatibility: ["Mago GC", "vMix (GT Title)", "OBS (HTML)"],
    resolution: "Full HD (1920x1080)",
    fileFormat: ".gtzip, .html"
  },
  { 
    id: '7', 
    name: 'Comparativo Global Boi no Mundo', 
    imageUrl: 'https://i.imgur.com/OotXEft.png', 
    price: 359, 
    category: 'agriculture', 
    categoryDisplayName: 'Gráfico Comparativo Global', 
    categoryColorClass: 'text-green-600',
    detailedDescription: 'Gráfico comparativo para dados globais do mercado de bovinos, como produção, consumo ou exportação por país. Design impactante com mapa mundi estilizado.',
    features: ["Visualização em mapa estilizado", "Destaque para até 5 países", "Valores e legendas editáveis", "Animações sutis"],
    softwareCompatibility: ["Adobe After Effects (para render)", "Mago GC (versão simplificada HTML)"],
    resolution: "4K (3840x2160)",
    duration: "15 segundos",
    fileFormat: ".aep, .mp4 (renderizado), .html (limitado)"
  },
  { 
    id: '8', 
    name: 'Painel Fechamento do Mercado Financeiro', 
    imageUrl: 'https://i.imgur.com/STdTy9t.png', 
    price: 299, 
    category: 'economy', 
    categoryDisplayName: 'Indicadores Econômicos Essenciais', 
    categoryColorClass: 'text-blue-600',
    detailedDescription: 'Painel elegante para exibir os principais indicadores de fechamento do mercado financeiro: Ibovespa, Dólar, Euro e Ouro. Ideal para vinhetas ou inserções rápidas.',
    features: ["Campos para 4 indicadores principais", "Valores e variações editáveis", "Design limpo e moderno", "Animação de entrada e saída rápida"],
    softwareCompatibility: ["Mago GC", "VizRT", "vMix (GT Title)"],
    resolution: "Full HD (1920x1080)",
    duration: "8-12 segundos",
    fileFormat: ".gtzip, .via"
  },
  { 
    id: '9', 
    name: 'Gráfico Dólar Comercial - Linha (Estilo 1)', 
    imageUrl: 'https://i.imgur.com/jNxaPoi.png', 
    price: 319, 
    category: 'finance', 
    categoryDisplayName: 'Gráfico Financeiro de Linha', 
    categoryColorClass: 'text-indigo-600',
    detailedDescription: 'Template de gráfico de linha para acompanhar a variação do Dólar Comercial ou outros ativos financeiros. Estilo 1, com foco em clareza e tendências.',
    features: ["Até 30 pontos de dados editáveis", "Eixo X e Y customizáveis", "Cores e espessura da linha ajustáveis", "Título e subtítulo dinâmicos"],
    softwareCompatibility: ["Mago GC (HTML/JS)", "Adobe After Effects"],
    resolution: "Full HD (1920x1080)",
    fileFormat: ".html, .aep"
  },
  { 
    id: '10', 
    name: 'Gráfico Dólar Comercial - Linha (Estilo 2)', 
    imageUrl: 'https://i.imgur.com/UqwRTT2.png', 
    price: 319, 
    category: 'finance', 
    categoryDisplayName: 'Gráfico Financeiro Detalhado', 
    categoryColorClass: 'text-indigo-600',
    detailedDescription: 'Gráfico de linha avançado para Dólar Comercial, com destaque para pontos de máximo e mínimo e informações adicionais. Estilo 2, mais detalhado.',
    features: ["Plotagem de dados históricos", "Destaque para picos e vales", "Tooltips interativos (versão HTML)", "Legendas e informações contextuais"],
    softwareCompatibility: ["Mago GC (HTML/JS com Chart.js)", "OBS (Browser Source)"],
    resolution: "Full HD (1920x1080) / Ajustável para Web",
    fileFormat: ".html"
  },
  { 
    id: '11', 
    name: 'Painel de Clima Elegante', 
    imageUrl: 'https://i.imgur.com/4r8sSM8.png', 
    price: 359, 
    category: 'weather', 
    categoryDisplayName: 'Tempo & Cidade Atual', 
    categoryColorClass: 'text-yellow-600',
    detailedDescription: 'Painel de clima para exibição da temperatura atual, condição climática (com ícone) e nome da cidade. Design elegante e minimalista.',
    features: ["Ícones climáticos incluídos", "Temperatura e nome da cidade editáveis", "Fundo personalizável (cor sólida ou imagem)", "Animação sutil de entrada"],
    softwareCompatibility: ["Mago GC", "vMix (GT Title)", "OBS (HTML)"],
    resolution: "Full HD (1920x1080)",
    duration: "Loopable / 10 segundos",
    fileFormat: ".gtzip, .html"
  },
  { 
    id: '12', 
    name: 'Comparativo Exportações Agrícolas (Soja)', 
    imageUrl: 'https://i.imgur.com/anRuKtC.png', 
    price: 379, 
    category: 'agriculture', 
    categoryDisplayName: 'Comparativo Setorial Detalhado', 
    categoryColorClass: 'text-green-600',
    detailedDescription: 'Template gráfico detalhado para comparar dados de exportações agrícolas, com foco em soja ou outros produtos. Inclui gráficos de pizza e barras.',
    features: ["Gráfico de pizza para market share", "Gráfico de barras para evolução temporal", "Todos os dados e textos editáveis", "Cores e branding personalizáveis"],
    softwareCompatibility: ["Mago GC (HTML/JS)", "Adobe After Effects (para animações complexas)"],
    resolution: "Full HD (1920x1080)",
    duration: "20-30 segundos",
    fileFormat: ".html, .aep"
  },
];


export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    { id: 1, title: 'Escolha e Compre', description: 'Selecione os templates que deseja e finalize a compra em nosso site.' },
    { id: 2, title: 'Download e Importação Fácil', description: 'Após a compra, baixe os arquivos e importe facilmente em seu software de preferência.' },
    { id: 3, title: 'Pronto para Usar', description: 'Personalize conforme sua necessidade e comece a produzir com qualidade profissional.' },
];

export const ADVANTAGES_DATA: Advantage[] = [
    { id: 1, title: 'Uso Imediato e Flexível', description: 'Acesso rápido aos arquivos após pagamento, compatíveis com diversos sistemas.', iconClass: 'fas fa-bolt', iconBgClass: 'bg-blue-100', iconColorClass: 'text-blue-600' },
    { id: 2, title: 'Qualidade Broadcast', description: 'Templates desenvolvidos por profissionais com experiência em televisão e produções digitais.', iconClass: 'fas fa-tv', iconBgClass: 'bg-green-100', iconColorClass: 'text-green-600' },
    { id: 3, title: 'Suporte e Atualizações', description: 'Conte com nosso suporte e receba atualizações periódicas em nossos produtos.', iconClass: 'fas fa-sync-alt', iconBgClass: 'bg-purple-100', iconColorClass: 'text-purple-600' },
];

export const CHROMA_KEY_CATEGORIES_DATA: ChromaKeyCategory[] = [
  { id: 'all', name: 'Todos os Cenários', filterValue: 'all' },
  { id: 'news', name: 'Jornalismo', filterValue: 'news' },
  { id: 'talkshow', name: 'Talk Show', filterValue: 'talkshow' },
  { id: 'podcast', name: 'Podcast', filterValue: 'podcast' },
  { id: 'esports', name: 'Game / eSports', filterValue: 'esports' },
  { id: 'corporate', name: 'Corporativo', filterValue: 'corporate' },
];

export const CHROMA_KEY_TEMPLATES_DATA: ChromaKeyTemplate[] = [
  { id: 'ck1', name: 'Estúdio de Notícias Moderno', imageUrl: 'https://i.imgur.com/sFqk1qS.png', price: 499, category: 'news', categoryDisplayName: 'Jornalismo Central', categoryColorClass: 'text-red-600' },
  { id: 'ck2', name: 'Arena Gamer Iluminada', imageUrl: 'https://i.imgur.com/gOqcc6E.png', price: 459, category: 'esports', categoryDisplayName: 'Palco eSports', categoryColorClass: 'text-purple-600' },
  { id: 'ck3', name: 'Lounge para Talk Show', imageUrl: 'https://i.imgur.com/yN3z8qL.png', price: 529, category: 'talkshow', categoryDisplayName: 'Entrevistas', categoryColorClass: 'text-teal-600' },
  { id: 'ck4', name: 'Estúdio Podcast Minimalista', imageUrl: 'https://i.imgur.com/j6kZ4wT.png', price: 399, category: 'podcast', categoryDisplayName: 'Podcast Hub', categoryColorClass: 'text-orange-600' },
  { id: 'ck5', name: 'Redação de Jornal Dinâmica', imageUrl: 'https://i.imgur.com/iBv9L4M.png', price: 489, category: 'news', categoryDisplayName: 'News Desk', categoryColorClass: 'text-red-600' },
  { id: 'ck6', name: 'Escritório Corporativo Virtual', imageUrl: 'https://i.imgur.com/uJkF2wP.png', price: 429, category: 'corporate', categoryDisplayName: 'Apresentações', categoryColorClass: 'text-indigo-600' },
  { id: 'ck7', name: 'Cenário eSports Neon', imageUrl: 'https://i.imgur.com/k2wXvR8.png', price: 469, category: 'esports', categoryDisplayName: 'Competição Gamer', categoryColorClass: 'text-purple-600' },
  { id: 'ck8', name: 'Estúdio de Podcast Urbano', imageUrl: 'https://i.imgur.com/wPzX9vM.png', price: 419, category: 'podcast', categoryDisplayName: 'Estilo Industrial', categoryColorClass: 'text-orange-600' },
];

export const ABOUT_DIFFERENTIALS_DATA: DifferentialItem[] = [
  {
    id: 'automation',
    icon: 'fas fa-bullseye',
    iconBgColor: 'bg-red-100',
    iconTextColor: 'text-red-600',
    title: 'Foco na Automação',
    description: 'Acompanhamos a evolução da televisão com sistemas gráficos que automatizam a exibição de informações em tempo real.',
  },
  {
    id: 'specialized_team',
    icon: 'fas fa-brain',
    iconBgColor: 'bg-sky-100',
    iconTextColor: 'text-sky-600',
    title: 'Equipe Especializada',
    description: 'Nosso time é formado por profissionais experientes em design, motion graphics e engenharia de sistemas broadcast.',
  },
  {
    id: 'agility_quality',
    icon: 'fas fa-bolt',
    iconBgColor: 'bg-amber-100',
    iconTextColor: 'text-amber-600',
    title: 'Agilidade e Qualidade',
    description: 'Entregamos projetos prontos para uso, com visual moderno, animações suaves e integração simplificada.',
  },
  {
    id: 'versatility',
    icon: 'fas fa-sync-alt',
    iconBgColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600',
    title: 'Versatilidade',
    description: 'Templates adaptáveis a qualquer sistema: Mago GC, VizRT, Ross, vMix, OBS e muito mais.',
  },
];


export const FOOTER_LINKS_TEMPLATES = [ 
    {label: "Indicadores Econômicos", href: "#templates-graficos"}, // Points to the general templates section
    {label: "Gráficos Agropecuários", href: "#templates-graficos"}, // Points to the general templates section
    {label: "Meteorologia", href: "#templates-graficos"}, // Points to the general templates section
    {label: "Cenários Chroma Key", href: "chromaKeyPage"}, // Points to AppView 'chromaKeyPage'
    {label: "Mockups .MOGRT", href: "mogrtPage"}, // Points to AppView 'mogrtPage'
    {label: "Todos os Templates", href: "#templates-graficos"},
];

export const FOOTER_LINKS_INTEGRATION = [
    {label: "Como Funciona", href: "#how-it-works"},
    {label: "Projetos Sob Medida", href: "#custom-project-request"},
    {label: "Sobre Nós", href: "#about"},
    {label: "Suporte e FAQ", href: "supportHub"}, 
    {label: "Compatibilidade", href: "supportHub"}, 
    {label: "Perguntas Frequentes", href: "supportHub"},
];

export const FOOTER_SOCIAL_LINKS = [
    {label: "Facebook", href: "#", iconClass: "fab fa-facebook-f", hoverClass: "hover:text-white"},
    {label: "Twitter", href: "#", iconClass: "fab fa-twitter", hoverClass: "hover:text-blue-400"},
    {label: "Instagram", href: "#", iconClass: "fab fa-instagram", hoverClass: "hover:text-pink-600"},
    {label: "LinkedIn", href: "#", iconClass: "fab fa-linkedin-in", hoverClass: "hover:text-blue-700"},
    {label: "YouTube", href: "#", iconClass: "fab fa-youtube", hoverClass: "hover:text-red-600"},
];

// Creator Signup Constants
export const SOFTWARE_CHOICES: Software[] = [
  { id: 'afterEffects', label: 'Adobe After Effects' },
  { id: 'blender', label: 'Blender' },
  { id: 'c4d', label: 'Cinema 4D' },
  { id: 'photoshop', label: 'Adobe Photoshop' },
  { id: 'premiere', label: 'Adobe Premiere Pro' },
  { id: 'illustrator', label: 'Adobe Illustrator' },
  { id: 'figma', label: 'Figma' },
  { id: 'davinci', label: 'DaVinci Resolve' },
  { id: 'other', label: 'Outro(s)' },
];

export const SPECIALIZATION_AREAS: Specialization[] = [
  { id: 'broadcast', label: 'Broadcast TV (Emissoras)' },
  { id: 'youtube', label: 'Canais de YouTube' },
  { id: 'streamer', label: 'Streamers (Twitch, etc.)' },
  { id: 'social_media', label: 'Mídias Sociais (Instagram, TikTok)' },
  { id: 'corporate_video', label: 'Vídeos Corporativos/Institucionais' },
  { id: 'education', label: 'Conteúdo Educacional/E-learning' },
  { id: 'other', label: 'Outra' },
];

// Template Upload Constants
export const TEMPLATE_UPLOAD_CATEGORIES: TemplateUploadCategory[] = [
  { id: 'after-effects', label: 'Adobe After Effects' },
  { id: 'premiere-pro', label: 'Adobe Premiere Pro' },
  { id: 'photoshop', label: 'Adobe Photoshop' },
  { id: 'illustrator', label: 'Adobe Illustrator' },
  { id: 'blender', label: 'Blender' },
  { id: 'cinema-4d', label: 'Cinema 4D' },
  { id: 'vmix', label: 'vMix' },
  { id: 'obs-studio', label: 'OBS Studio' },
  { id: 'final-cut-pro', label: 'Final Cut Pro' },
  { id: 'davinci-resolve', label: 'DaVinci Resolve' },
  { id: 'virtual-set', label: 'Cenário Virtual (Chroma Key)' },
  { id: 'mago-gc', label: 'Mago GC (Compatível)' },
  { id: 'mogrt', label: '.MOGRT (Premiere Pro)'},
  { id: 'other', label: 'Outra Categoria' },
];

export const INSPIRATIONAL_QUOTES: InspirationalQuote[] = [
    { id: 'q1', text: "Compartilhe sua Criatividade com o Mundo." },
    { id: 'q2', text: "Transforme seu Design em Renda Passiva." },
    { id: 'q3', text: "Ganhe Dinheiro com seus Templates Profissionais." },
    { id: 'q4', text: "Crie, Venda e Alcance Novos Horizontes." },
    { id: 'q5', text: "Monetize Seu Talento Único na BroadcastMotion." },
    { id: 'q6', text: "Junte-se à nossa comunidade de criadores de sucesso!" },
];

export const COUPONS_DATA: Coupon[] = [
  { 
    code: 'BEMVINDO10', 
    discountType: 'percentage', 
    value: 10, 
    description: '10% de desconto para novos clientes!', 
    minPurchase: 50,
    isActive: true,
    usageCount: 0,
    expiryDate: '2024-12-31'
  },
  { 
    code: 'PROMO50', 
    discountType: 'fixed', 
    value: 50, 
    description: 'R$50 de desconto em compras acima de R$500!', 
    minPurchase: 500,
    isActive: true,
    usageCount: 0,
    expiryDate: '2024-10-31'
  },
  { 
    code: 'FRETEGRATIS', 
    discountType: 'fixed', 
    value: 0, // Placeholder, not actual shipping cost
    description: 'Cupom de teste (sem valor real).',
    isActive: false,
    usageCount: 10,
    expiryDate: '2023-12-31'
  } 
];


// Support Hub Constants
export const SUPPORT_HUB_CARDS_DATA: SupportCardItem[] = [
  {
    id: 'personalizacao',
    title: 'Solicitar Personalização',
    description: 'Precisa de ajustes finos, adaptações ou um template gráfico totalmente novo? Nossa equipe de design está pronta para criar a solução ideal para suas necessidades específicas.',
    icon: 'fas fa-palette', 
    iconBgColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600',
    actionType: 'link',
    actionValue: '#custom-project-request', 
  },
  {
    id: 'instalacao',
    title: 'Instalação e Integração',
    description: 'Obtenha ajuda especializada para instalar e configurar seus templates em Mago GC, VizRT, CasparCG, OBS, vMix e outras plataformas de broadcast ou streaming.',
    icon: 'fas fa-cogs', 
    iconBgColor: 'bg-teal-100',
    iconTextColor: 'text-teal-600',
    actionType: 'modal',
    actionValue: 'openTicketModal_instalação', 
  },
  {
    id: 'upload_projeto',
    title: 'Envio de Projetos (Criadores)',
    description: 'Você é um criador de motion graphics ou cenários virtuais? Envie seus templates para análise e tenha a chance de publicá-los em nossa plataforma e monetizar seu talento.',
    icon: 'fas fa-cloud-upload-alt', 
    iconBgColor: 'bg-orange-100',
    iconTextColor: 'text-orange-600',
    actionType: 'view',
    actionValue: 'creatorDashboard', 
    requiresAuth: true,
    authAction: 'creatorSignup', 
  },
  {
    id: 'fale_especialista',
    title: 'Fale com um Especialista',
    description: 'Nossa equipe está disponível para atendimento direto via e-mail, WhatsApp ou agendamento de consultoria para discutir suas demandas e projetos em detalhes.',
    icon: 'fas fa-headset', 
    iconBgColor: 'bg-sky-100',
    iconTextColor: 'text-sky-600',
    actionType: 'modal', 
    actionValue: 'openTicketModal_consultoria', 
  },
  {
    id: 'tutoriais_ajuda',
    title: 'Tutoriais, Guias e FAQ',
    description: 'Acesse nossa central de ajuda com vídeos tutoriais, guias em PDF, artigos técnicos e respostas para as perguntas mais frequentes sobre nossos templates e serviços.',
    icon: 'fas fa-book-open', 
    iconBgColor: 'bg-lime-100',
    iconTextColor: 'text-lime-600',
    actionType: 'link', 
    actionValue: '#support-hub-faq', 
  },
  {
    id: 'problema_tecnico',
    title: 'Reportar Problema Técnico',
    description: 'Encontrou algum problema com um template adquirido ou com a plataforma? Abra um chamado detalhando o ocorrido para nossa equipe técnica investigar e solucionar.',
    icon: 'fas fa-bug', 
    iconBgColor: 'bg-red-100',
    iconTextColor: 'text-red-600',
    actionType: 'modal',
    actionValue: 'openTicketModal_problema', 
  },
];

export const SUPPORT_SEARCH_SUGGESTIONS: string[] = [
  "Erro de template", "Como instalar Mago GC", "Integração com vMix", "Criar projeto do zero",
  "Personalizar template", "Problema no download", "Licenciamento de uso", "Como enviar meu template",
  "Falar com suporte", "Atualizar dados cadastrais", "Pagamento recusado", "Não consigo fazer login",
];

export const SUPPORT_FAQ_DATA: FAQItem[] = [
  { id: 'faq1', question: 'Como faço para importar um template no meu software GC?', answer: 'Geralmente, o processo envolve descompactar o arquivo .zip fornecido e usar a função de importação específica do seu software (ex: Mago GC, VizRT Artist, vMix GT Designer). Cada template acompanha um guia básico de importação. Para instruções detalhadas, consulte a documentação do seu software ou nossos tutoriais na seção "Tutoriais e Ajuda".' },
  { id: 'faq2', question: 'Os templates são compatíveis com qual versão de software?', answer: 'A compatibilidade de versão é especificada na página de detalhes de cada template. Nos esforçamos para manter a compatibilidade com as versões mais recentes e populares dos softwares listados. Se tiver dúvidas sobre uma versão específica, entre em contato antes da compra.' },
  { id: 'faq3', question: 'Posso solicitar modificações em um template comprado?', answer: 'Sim! Oferecemos serviços de personalização. Você pode solicitar ajustes de cores, textos, logotipos ou até mesmo funcionalidades adicionais. Utilize a opção "Solicitar Personalização" ou abra um chamado detalhando suas necessidades para receber um orçamento.' },
  { id: 'faq4', question: 'Qual é a política de reembolso?', answer: 'Devido à natureza digital dos nossos produtos, geralmente não oferecemos reembolso após o download do template. No entanto, se você encontrar problemas técnicos que impeçam o uso do template conforme descrito e nossa equipe não conseguir resolvê-los, analisaremos o caso individualmente. Consulte nossos <a href="/termos-servico" class="text-blue-600 hover:underline">Termos de Serviço</a> para mais detalhes.' },
  { id: 'faq5', question: 'Como funciona o licenciamento dos templates?', answer: 'Ao comprar um template, você adquire uma licença para usá-lo em seus projetos (pessoais ou comerciais), conforme os termos especificados. A licença padrão geralmente não permite a revenda ou redistribuição do template original. Para licenças estendidas ou corporativas, entre em contato conosco.' },
  { id: 'faq6', question: 'Como entro em contato com o suporte?', answer: 'Você pode nos contatar via WhatsApp, e-mail, ou abrindo um chamado diretamente pela Central de Suporte. Os links e opções de contato estão disponíveis nesta página. Para problemas urgentes, o WhatsApp costuma ser mais rápido.' },
  { id: 'faq7', question: 'Como me torno um criador e vendo meus templates na plataforma?', answer: 'Clique no link "Seja um Criador" no menu principal e preencha o formulário de cadastro. Após a aprovação, você terá acesso ao Painel do Criador para enviar seus templates. Você também pode acessar a opção "Envio de Projetos (Criadores)" aqui na Central de Suporte.' },
];

export const WHATSAPP_SUPPORT_NUMBER = "5511912345678"; 
export const SUPPORT_EMAIL_ADDRESS = "suporte@broadcastmotion.com.br";

// MOGRT Page Constants
export const MOGRT_CATEGORIES_DATA: MogrtCategory[] = [
  { id: 'all', name: 'Todos os Mockups', filterValue: 'all', icon: 'fas fa-layer-group' },
  { id: 'lower-thirds', name: 'Lower Thirds', filterValue: 'lower-thirds', icon: 'fas fa-window-minimize' },
  { id: 'titles', name: 'Títulos Animados', filterValue: 'titles', icon: 'fas fa-heading' },
  { id: 'social', name: 'Redes Sociais / CTA', filterValue: 'social', icon: 'fas fa-share-alt' },
  { id: 'openers', name: 'Aberturas / Vinhetas', filterValue: 'openers', icon: 'fas fa-film' },
  { id: 'transitions', name: 'Transições', filterValue: 'transitions', icon: 'fas fa-random' },
  { id: 'info', name: 'Informativos / Avisos', filterValue: 'info', icon: 'fas fa-info-circle' },
  { id: 'packs-youtube', name: 'Pacotes YouTube', filterValue: 'packs-youtube', icon: 'fab fa-youtube' },
  { id: 'packs-podcast', name: 'Pacotes Podcast', filterValue: 'packs-podcast', icon: 'fas fa-podcast' },
  { id: 'packs-tv', name: 'Pacotes TV', filterValue: 'packs-tv', icon: 'fas fa-tv-alt' }, // Corrected icon from fas fa-tv-alt
  { id: 'packs-corp', name: 'Pacotes Corporativos', filterValue: 'packs-corp', icon: 'fas fa-building' },
];

const MOGRT_SPEC_DEFAULT: MogrtTemplateSpecification = {
  premiereVersion: "CC 2020+",
  resolution: "Full HD / 4K",
  customizable: ["Texto", "Cor", "Logo"],
  background: "Transparente",
};

export const MOGRT_TEMPLATES_DATA: MogrtTemplate[] = [
  { id: 'm1', name: 'Lower Third Tech Azul', staticThumbnailUrl: 'https://i.imgur.com/Lz4Nq9Y.png', price: 79, category: 'lower-thirds', categoryDisplayName: 'Lower Third', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm2', name: 'Título Dinâmico Neon', staticThumbnailUrl: 'https://i.imgur.com/A6qZuG1.png', price: 99, category: 'titles', categoryDisplayName: 'Título Animado', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm3', name: 'CTA Instagram Moderno', staticThumbnailUrl: 'https://i.imgur.com/tV5xKSR.png', price: 59, category: 'social', categoryDisplayName: 'Rede Social', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm4', name: 'Abertura Explosiva Podcast', staticThumbnailUrl: 'https://i.imgur.com/rO3yP7c.png', price: 129, category: 'openers', categoryDisplayName: 'Abertura', specifications: MOGRT_SPEC_DEFAULT, isNichePackage: true, nichePackageDetails: { icon: 'fas fa-podcast', titleHighlight: 'Kit Podcast Pro' } },
  { id: 'm5', name: 'Transição Glitch Rápida', staticThumbnailUrl: 'https://i.imgur.com/uJkF2wP.png', price: 49, category: 'transitions', categoryDisplayName: 'Transição', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm6', name: 'Aviso Importante Animado', staticThumbnailUrl: 'https://i.imgur.com/wPzX9vM.png', price: 69, category: 'info', categoryDisplayName: 'Informativo', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm7', name: 'Lower Third Corporativo Elegante', staticThumbnailUrl: 'https://i.imgur.com/sFqk1qS.png', price: 89, category: 'lower-thirds', categoryDisplayName: 'Lower Third', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm8', name: 'Pacote Completo YouTube Gamer', staticThumbnailUrl: 'https://i.imgur.com/gOqcc6E.png', price: 249, category: 'packs-youtube', categoryDisplayName: 'Pacote YouTube', specifications: MOGRT_SPEC_DEFAULT, isNichePackage: true, nichePackageDetails: { icon: 'fab fa-youtube', titleHighlight: 'Kit YouTube Clean' } },
  { id: 'm9', name: 'GC Jornalístico Avançado', staticThumbnailUrl: 'https://i.imgur.com/yN3z8qL.png', price: 299, category: 'packs-tv', categoryDisplayName: 'Pacote TV', specifications: MOGRT_SPEC_DEFAULT, isNichePackage: true, nichePackageDetails: { icon: 'fas fa-tv-alt', titleHighlight: 'Pacote Jornalístico TV' } }, // Corrected icon
  { id: 'm10', name: 'Lower Third Minimalista Branco', staticThumbnailUrl: 'https://i.imgur.com/k2wXvR8.png', price: 79, category: 'lower-thirds', categoryDisplayName: 'Lower Third', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm11', name: 'Título Impactante para Vlogs', staticThumbnailUrl: 'https://i.imgur.com/j6kZ4wT.png', price: 99, category: 'titles', categoryDisplayName: 'Título Animado', specifications: MOGRT_SPEC_DEFAULT },
  { id: 'm12', name: 'CTA TikTok Dinâmico', staticThumbnailUrl: 'https://i.imgur.com/iBv9L4M.png', price: 59, category: 'social', categoryDisplayName: 'Rede Social', specifications: MOGRT_SPEC_DEFAULT },
];

export const MOGRT_USAGE_INSTRUCTIONS_DATA: MogrtUsageStep[] = [
  { id: 1, instruction: 'Baixe o arquivo .mogrt para o seu computador.' },
  { id: 2, instruction: 'Abra o Adobe Premiere Pro em um projeto existente ou novo.' },
  { id: 3, instruction: 'Acesse o painel "Gráficos Essenciais" (Essential Graphics). Se não estiver visível, vá em Janela > Gráficos Essenciais.' },
  { id: 4, instruction: 'No painel Gráficos Essenciais, clique no botão "Importar Modelo de Animação" (ícone de pasta com seta para baixo) no canto inferior direito do painel.' },
  { id: 5, instruction: 'Navegue até o arquivo .mogrt que você baixou e selecione-o.' },
  { id: 6, instruction: 'O template aparecerá na aba "Procurar" (Browse) do painel Gráficos Essenciais.' },
  { id: 7, instruction: 'Arraste o template da aba "Procurar" diretamente para a sua timeline de vídeo.' },
  { id: 8, instruction: 'Selecione o clipe .mogrt na timeline e personalize os parâmetros (textos, cores, logos, etc.) na aba "Editar" do painel Gráficos Essenciais.' },
];

export const MOGRT_SEARCH_SUGGESTIONS: string[] = [
  "Lower third moderno", "Vinheta para YouTube", "CTA redes sociais", "Pacote podcast", "Título animado 4K",
  "Transição para Premiere", "Aviso de live", "Template corporativo", "Como instalar MOGRT", "Erro MOGRT",
];

// Admin Panel Constants
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
    { id: 'overview', label: 'Visão Geral', icon: 'fas fa-tachometer-alt' },
    { id: 'manageTemplates', label: 'Templates Broadcast', icon: 'fas fa-tv' },
    { id: 'manageMogrts', label: 'Mockups .MOGRT', icon: 'fas fa-film' },
    { id: 'manageChromaKey', label: 'Cenários Chroma Key', icon: 'fas fa-video' },
    { id: 'manageOrders', label: 'Pedidos', icon: 'fas fa-receipt' },
    { id: 'manageUsers', label: 'Usuários', icon: 'fas fa-users' },
    { id: 'manageCreators', label: 'Criadores', icon: 'fas fa-paint-brush' },
    { id: 'manageCoupons', label: 'Cupons', icon: 'fas fa-tags' },
    { id: 'manageSupportTickets', label: 'Chamados de Suporte', icon: 'fas fa-life-ring' },
    { id: 'reportsAnalytics', label: 'Relatórios', icon: 'fas fa-chart-line' },
    { id: 'siteSettings', label: 'Configurações', icon: 'fas fa-cog' },
];

// Simulated Support Tickets for Admin Panel
export const SIMULATED_SUPPORT_TICKETS_DATA: SimulatedTicket[] = [
  {
    id: 'TICKET001',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    subject: 'template_issue' as TicketSubject,
    description: 'O template de indicadores econômicos não está atualizando os dados corretamente no Mago GC. Já verifiquei a conexão e o formato do XML.',
    submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'open' as TicketStatus,
  },
  {
    id: 'TICKET002',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    subject: 'customization_request' as TicketSubject,
    description: 'Gostaria de um orçamento para personalizar o cenário virtual de talk show com as cores e logo da minha marca.',
    submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'pending_reply' as TicketStatus,
  },
  {
    id: 'TICKET003',
    name: 'Carlos Pereira',
    email: 'carlos.p@example.com',
    subject: 'billing' as TicketSubject,
    description: 'Fui cobrado duas vezes pelo mesmo template .MOGRT. Podem verificar, por favor?',
    submittedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    status: 'open' as TicketStatus,
  },
  {
    id: 'TICKET004',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    subject: 'doubt' as TicketSubject,
    description: 'Os templates de chroma key são compatíveis com OBS Studio diretamente ou preciso de algum plugin?',
    submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'resolved' as TicketStatus,
  }
];