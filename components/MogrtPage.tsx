
import React from 'react';
import { MogrtTemplate, AppView, Category as GenericCategory } from '../types';
import { CategoryTabs } from './CategoryTabs';
import { MogrtCard } from './MogrtCard';
import { MOGRT_USAGE_INSTRUCTIONS_DATA, MOGRT_SEARCH_SUGGESTIONS } from '../constants';

interface MogrtPageProps {
  categories: GenericCategory[]; 
  activeCategory: string;
  onCategoryChange: (categoryFilterValue: string) => void;
  templates: MogrtTemplate[];
  onLoadMore: () => void;
  canLoadMore: boolean;
  onAttemptPurchase: (template: MogrtTemplate) => void;
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void; 
}

const MOGRT_USAGE_INSTRUCTIONS = MOGRT_USAGE_INSTRUCTIONS_DATA;

const TOC_ITEMS = [
  { href: "#compreendendo", label: "Compreendendo Arquivos MOGRT" },
  { href: "#por-que-usar", label: "Por Que Usar MOGRTs" },
  { href: "#criacao-exportacao", label: "Criar e Exportar Arquivos MOGRT" },
  { href: "#premiere", label: "Trabalhar com Arquivos MOGRT no Premiere Pro" },
  { href: "#melhores-templates", label: "Melhores Templates MOGRT para Seus Projetos" },
  { href: "#fora-adobe", label: "Usar Arquivos MOGRT Fora do Ecossistema Adobe" },
];

export const MogrtPage: React.FC<MogrtPageProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  templates,
  onLoadMore,
  canLoadMore,
  onAttemptPurchase,
  onChangeView
}) => {
  const [sidebarSearchTerm, setSidebarSearchTerm] = React.useState('');
  const nichePackages = templates.filter(t => t.isNichePackage); 

  const handleSidebarSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Busca na página MOGRT por: "${sidebarSearchTerm}" (Simulação)`);
  };

  const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId.substring(1)); // Remove #
    if (targetElement) {
      const navbarHeight = 80; // Approximate height of your sticky navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // Extra 20px margin

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="pagina-mogrt" className="bg-gray-100"> {/* Main page background */}
      {/* New Blue Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white min-h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="md:flex items-center gap-8 lg:gap-12">
            {/* Left Column: Text */}
            <div className="md:w-1/2 lg:w-3/5 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Templates <span className="text-red-400">.MOGRT</span> para Edição Ágil no Premiere Pro
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                Templates editáveis em .mogrt otimizam sua edição no Premiere Pro, permitindo alterar textos, cores e logos sem abrir o After Effects. São ideais para vídeos recorrentes, como programas de TV, episódios de podcast e canais de internet. Agilidade, consistência visual e economia de tempo para quem precisa de produtividade e qualidade.
              </p>
              <button
                onClick={() => onChangeView('mogrtPage', '#galeria-mogrt')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span role="img" aria-label="Film Slate" className="mr-2">🎬</span> Explorar Templates .MOGRT
              </button>
            </div>
            {/* Right Column: Image */}
            <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="bg-white/10 p-1.5 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 max-w-md w-full">
                <img 
                  src="https://i.imgur.com/A6qZuG1.png" 
                  alt="Mockup de template .MOGRT no Premiere Pro" 
                  className="w-full h-auto object-cover rounded-lg aspect-video" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content below hero */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content with Sidebar */}
          <div className="lg:flex lg:gap-10">
              {/* Main Content Area (Categories, Gallery, Niche Packages, Instructions) */}
              <div className="lg:w-2/3">
                  {/* MOGRT Guide Section (Replaces old Advantages) */}
                  <section id="mogrt-detailed-guide" className="mb-12 py-10 bg-gray-50 rounded-xl shadow-xl border border-gray-200">
                    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted max-width for internal content */}
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left text-blue-800">O que é um MOGRT? Guia Completo</h2>
                      <p className="text-sm text-gray-600 mb-8 text-center md:text-left">Atualizado em 02 de Março, 2025 • Leitura de 5 Minutos • After Effects • Premiere Pro</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Table of Contents */}
                        <aside className="md:col-span-1 bg-white text-gray-800 p-6 rounded-lg shadow-md border border-gray-200 md:sticky md:top-28 self-start">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Índice</h3>
                          <ul className="space-y-2 text-sm leading-6">
                            {TOC_ITEMS.map(item => (
                              <li key={item.href}>
                                <a 
                                  href={item.href} 
                                  onClick={(e) => handleTocLinkClick(e, item.href)}
                                  className="block py-1 text-gray-700 hover:text-blue-700 hover:underline transition-colors"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </aside>

                        {/* Explanatory Content */}
                        <article className="md:col-span-3 space-y-6">
                          <section id="compreendendo" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Compreendendo Arquivos MOGRT</h3>
                            <p className="text-gray-700 text-base leading-relaxed">MOGRT é a sigla para "Motion Graphics Template", um formato criado pela Adobe que permite adicionar gráficos animados editáveis diretamente no Premiere Pro. Ao invés de criar animações complexas do zero, os editores podem simplesmente importar um MOGRT, personalizar textos, cores, logotipos e muito mais de forma prática.</p>
                          </section>

                          <section id="por-que-usar" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Por Que Usar MOGRTs</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700 text-base leading-relaxed">
                              <li><strong>Economia de Tempo:</strong> Use gráficos animados prontos para tarefas repetitivas como títulos, vinhetas ou legendas.</li>
                              <li><strong>Consistência Visual:</strong> Perfeito para manter identidade visual em vídeos corporativos, redes sociais ou canais no YouTube.</li>
                              <li><strong>Fácil de Usar:</strong> Mesmo sem saber animar, é possível editar elementos direto no Premiere Pro com um clique.</li>
                            </ul>
                          </section>

                          <section id="criacao-exportacao" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Criar e Exportar Arquivos MOGRT</h3>
                            <p className="text-gray-700 text-base leading-relaxed">Você pode criar seu próprio template no After Effects. Após configurar a composição, é só adicionar os controles desejados (texto, cor, posição) ao painel de Gráficos Essenciais e exportar para Premiere Pro. É possível salvar localmente ou direto na sua biblioteca da Creative Cloud.</p>
                          </section>

                          <section id="premiere" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Trabalhar com Arquivos MOGRT no Premiere Pro</h3>
                            <p className="text-gray-700 text-base leading-relaxed">Abra o painel de Gráficos Essenciais, importe seu MOGRT e arraste para a timeline. A partir daí, edite textos, cores e tempos de animação diretamente dentro do Premiere. Personalize como quiser.</p>
                          </section>

                          <section id="melhores-templates" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Melhores Templates MOGRT para Seus Projetos</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700 text-base leading-relaxed">
                              <li><strong>Lower Thirds:</strong> Ideais para entrevistas, legendas e identificação de personagens.</li>
                              <li><strong>Split-Screen Verticais:</strong> Ótimos para vídeos de comparação ou TikTok.</li>
                              <li><strong>Animações de Texto e Logotipo:</strong> Para intros e endings com estilo profissional.</li>
                              <li><strong>Transições Animadas:</strong> Faça cortes mais suaves e dinâmicos entre cenas.</li>
                              <li><strong>Templates para Redes Sociais:</strong> Adapte para stories e posts de Instagram, YouTube e Facebook.</li>
                            </ul>
                          </section>

                          <section id="fora-adobe" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Usar Arquivos MOGRT Fora do Ecossistema Adobe</h3>
                            <p className="text-gray-700 text-base leading-relaxed">Por padrão, MOGRTs não são compatíveis com outros editores como DaVinci Resolve. Contudo, você pode exportar como vídeo .mp4 e utilizar sobreposto. Alternativamente, o Resolve possui o <strong>Fusion</strong>, sua própria ferramenta de gráficos animados.</p>
                          </section>
                        </article>
                      </div>
                    </div>
                  </section>
                  
                  {/* Gallery section with ID for scrolling */}
                  <div id="galeria-mogrt">
                    <section id="mogrt-page-categories-filter" className="mb-8 sticky top-20 bg-gray-100 py-3 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 sr-only">Filtrar Mockups .MOGRT</h2>
                      <CategoryTabs 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onCategoryChange={onCategoryChange} 
                      />
                    </section>

                    {/* Niche Packages Highlight - Conditionally render if any exist */}
                    {nichePackages.length > 0 && (
                        <section id="mogrt-niche-packages" className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Pacotes Especiais por Nicho</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {nichePackages.slice(0,3).map(template => (
                                    <div key={template.id} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                                        {template.nichePackageDetails?.icon && <i className={`${template.nichePackageDetails.icon} fa-2x mb-3`}></i>}
                                        <h3 className="text-xl font-semibold mb-2">{template.nichePackageDetails?.titleHighlight || template.name}</h3>
                                        <p className="text-sm opacity-90 mb-4 flex-grow">{template.categoryDisplayName}</p>
                                        <img src={template.staticThumbnailUrl} alt={template.name} className="w-full h-32 object-cover rounded-md mb-4 shadow-md" />
                                        <button 
                                            onClick={() => onAttemptPurchase(template)}
                                            className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-5 rounded-md transition-colors text-sm"
                                        >
                                            Ver Pacote (R$ {template.price.toFixed(2)})
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Template Gallery */}
                    <section id="mogrt-page-gallery-items" className="mb-12">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Galeria de Templates .MOGRT</h2>
                      {templates.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
                          {templates.map(template => (
                            <MogrtCard key={template.id} template={template} onAttemptPurchase={onAttemptPurchase} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <i className="fas fa-film fa-4x text-gray-400 mb-6"></i>
                            <p className="text-2xl text-gray-600 mb-2">Nenhum mockup .MOGRT encontrado.</p>
                            <p className="text-gray-500">Tente selecionar outra categoria ou verifique mais tarde.</p>
                        </div>
                      )}
                      {canLoadMore && (
                        <div className="text-center mt-12">
                          <button 
                            onClick={onLoadMore}
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300 shadow-sm hover:shadow-md"
                          >
                            Carregar Mais Mockups
                          </button>
                        </div>
                      )}
                    </section>
                  </div>

                  {/* Usage Instructions */}
                  <section id="mogrt-usage-instructions" className="p-6 md:p-8 bg-white rounded-xl shadow-xl border border-gray-200">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                          <i className="fas fa-question-circle text-blue-500 mr-2"></i> Como usar um .MOGRT no Premiere Pro?
                      </h2>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm md:text-base">
                          {MOGRT_USAGE_INSTRUCTIONS.map(step => (
                              <li key={step.id} className="leading-relaxed p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                  <span className="font-medium text-gray-800">Passo {step.id}:</span> {step.instruction}
                              </li>
                          ))}
                      </ol>
                  </section>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start mt-10 lg:mt-0">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <i className="fas fa-search text-blue-500 mr-2"></i> Busca Rápida
                      </h3>
                      <form onSubmit={handleSidebarSearch} className="relative">
                          <input 
                              type="search" 
                              value={sidebarSearchTerm}
                              onChange={(e) => setSidebarSearchTerm(e.target.value)}
                              placeholder="Ex: vinheta YouTube, redes sociais..." 
                              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                              aria-label="Buscar MOGRTs específicos"
                          />
                          <button type="submit" className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-blue-600">
                              <i className="fas fa-arrow-right"></i>
                          </button>
                      </form>
                       <div className="mt-3 text-xs text-gray-500">
                          {MOGRT_SEARCH_SUGGESTIONS.slice(0,3).map(s => <span key={s} className="inline-block bg-gray-200 rounded-full px-2 py-0.5 mr-1 mb-1">{s}</span>)}...
                      </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <i className="fas fa-link text-green-500 mr-2"></i> Links Úteis
                      </h3>
                      <ul className="space-y-2 text-sm">
                          <li>
                              <a href="#" onClick={(e) => {e.preventDefault(); alert("Tutorial de instalação de .MOGRT (Simulação)");}} className="text-blue-600 hover:underline hover:text-blue-800 flex items-center transition-colors">
                                  <i className="fas fa-tools fa-fw mr-2 text-gray-400"></i> Tutorial de Instalação
                              </a>
                          </li>
                          <li>
                             <a href="#" onClick={(e) => {e.preventDefault(); onChangeView('supportHub', '#support-hub-faq');}} className="text-blue-600 hover:underline hover:text-blue-800 flex items-center transition-colors">
                                  <i className="fas fa-question-circle fa-fw mr-2 text-gray-400"></i> FAQ sobre Compatibilidade
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <i className="fas fa-headset text-purple-500 mr-2"></i> Precisa de Ajuda?
                      </h3>
                      <button
                          onClick={() => onChangeView('supportHub', 'openTicketModal_mogrt_support')}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md text-sm flex items-center justify-center transition-colors shadow hover:shadow-md"
                      >
                          <i className="fas fa-ticket-alt mr-2"></i> Abrir Chamado de Suporte
                      </button>
                  </div>
              </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
