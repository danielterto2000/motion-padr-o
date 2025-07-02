
import React from 'react';
import { ChromaKeyTemplate, AppView, Category as GenericCategory, Template } from '../types';
import { CategoryTabs } from './CategoryTabs';
import { ChromaKeyCard } from './ChromaKeyCard';

interface ChromaKeyPageProps {
  categories: GenericCategory[]; 
  activeCategory: string;
  onCategoryChange: (categoryFilterValue: string) => void;
  templates: ChromaKeyTemplate[];
  onLoadMore: () => void;
  canLoadMore: boolean;
  onAttemptPurchase: (template: ChromaKeyTemplate | Template) => void;
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void; 
}

const CHROMA_KEY_ADVANTAGES_LIST = [
    { id: 1, text: "Redução de custo de produção", icon: "fas fa-dollar-sign" },
    { id: 2, text: "Efeitos visuais modernos e imersivos", icon: "fas fa-magic" },
    { id: 3, text: "Ideal para vídeos educativos, entrevistas, podcasts e telejornais", icon: "fas fa-video" },
    { id: 4, text: "Compatível com qualquer editor com suporte a chroma (CapCut, Premiere, DaVinci Resolve)", icon: "fas fa-cogs" },
    { id: 5, text: "Disponível em .mp4 ou .mov com fundo verde ou alpha", icon: "fas fa-file-video" }
];

export const ChromaKeyPage: React.FC<ChromaKeyPageProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  templates,
  onLoadMore,
  canLoadMore,
  onAttemptPurchase,
  onChangeView
}) => {
  return (
    <div id="pagina-chroma" className="bg-gray-50 text-gray-800"> {/* Main content background to light gray */}
      {/* New Blue Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white min-h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="md:flex items-center gap-8 lg:gap-12">
            {/* Left Column: Text */}
            <div className="md:w-1/2 lg:w-3/5 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Cenários Virtuais e Elementos em <span className="text-green-400">Chroma Key</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                Produções com chroma key oferecem liberdade criativa, redução de custos e visual moderno. Use cenários virtuais para criar estúdios profissionais com baixo investimento. Ideal para emissoras, podcasts, aulas e vídeos institucionais.
              </p>
              <button
                onClick={() => onChangeView('chromaKeyPage', '#galeria-cenarios')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span role="img" aria-label="Film Slate" className="mr-2">🎬</span> Explorar Cenários
              </button>
            </div>
            {/* Right Column: Image */}
            <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="bg-white/10 p-1.5 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 max-w-md w-full">
                <img 
                  src="https://i.imgur.com/5gQkP1h.jpg" 
                  alt="Estúdio de gravação com Chroma Key" 
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
          {/* Advantages Section */}
          <section className="mb-12 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Vantagens do Chroma Key</h2>
              <ul className="space-y-4">
                  {CHROMA_KEY_ADVANTAGES_LIST.map(adv => (
                      <li key={adv.id} className="flex items-center p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition-colors">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                              <i className={`${adv.icon} text-sm`}></i>
                          </div>
                          <span className="text-sm text-blue-800">{adv.text}</span>
                      </li>
                  ))}
              </ul>
          </section>

          {/* Gallery section with ID for scrolling */}
          <div id="galeria-cenarios">
            <section id="chroma-key-page-categories-filter" className="mb-8 sticky top-20 bg-gray-50 py-3 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Nossos Cenários Virtuais</h2>
              <CategoryTabs 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={onCategoryChange} 
              />
            </section>

            <section id="chroma-key-page-gallery-items">
              {templates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {templates.map(template => (
                    <ChromaKeyCard key={template.id} template={template} onAttemptPurchase={onAttemptPurchase} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <i className="fas fa-mountain fa-4x text-gray-400 mb-6"></i>
                    <p className="text-2xl text-gray-600 mb-2">Nenhum cenário virtual encontrado.</p>
                    <p className="text-gray-500">Tente selecionar outra categoria ou verifique mais tarde.</p>
                </div>
              )}
              {canLoadMore && (
                <div className="text-center mt-12">
                  <button 
                    onClick={onLoadMore}
                    className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300 shadow-sm hover:shadow-md"
                  >
                    Carregar Mais Cenários
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
