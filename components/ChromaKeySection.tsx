// This file is no longer used and can be deleted.
// The functionality for displaying Chroma Key templates has been moved directly into App.tsx
// within the new "Templates Gráficos" section structure.
//
// The original content was:
/*
import React from 'react';
import { ChromaKeyTemplate, ChromaKeyCategory, Template } from '../types'; // Added Template for onAttemptPurchase
import { CategoryTabs } from './CategoryTabs';
import { ChromaKeyCard } from './ChromaKeyCard';

interface ChromaKeySectionProps {
  categories: ChromaKeyCategory[];
  activeCategory: string;
  onCategoryChange: (categoryFilterValue: string) => void;
  templates: ChromaKeyTemplate[];
  onLoadMore: () => void;
  canLoadMore: boolean;
  onAttemptPurchase?: (template: Template | ChromaKeyTemplate) => void; 
}

export const ChromaKeySection: React.FC<ChromaKeySectionProps> = ({ 
  categories, activeCategory, onCategoryChange, templates, onLoadMore, canLoadMore, onAttemptPurchase
}) => {
  
  const handleRequestCustomProject = () => {
    // This could also navigate to the support hub's customization card or open a ticket
    const customProjectRequestSection = document.getElementById('custom-project-request');
    if (customProjectRequestSection) {
        const yOffset = -80; // Navbar height
        const y = customProjectRequestSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
    // Alternatively, use onChangeView if SupportHub has a dedicated section for this
    // onChangeView('supportHub', '#support-hub-personalizacao'); 
  };

  return (
    <section id="chroma-key" className="py-16 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Fundos Virtuais para Chroma Key</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cenários virtuais profissionais para estúdios, podcasts, canais de YouTube e emissoras.
          </p>
        </div>
        
        <div className="mb-8">
             <CategoryTabs 
                categories={categories.map(c => ({...c, name: c.name }))} 
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
             />
        </div>

        {templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template: ChromaKeyTemplate) => (
              <ChromaKeyCard 
                key={template.id} 
                template={template} 
                onAttemptPurchase={onAttemptPurchase}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-400">Nenhum cenário virtual encontrado para esta categoria.</p>
          </div>
        )}

        {canLoadMore && (
          <div className="text-center mt-12">
            <button 
              onClick={onLoadMore}
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
            >
              Carregar Mais Cenários
            </button>
          </div>
        )}

        <div className="text-center mt-16">
            <button 
                onClick={handleRequestCustomProject}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
                <i className="fas fa-paint-brush mr-2"></i> Solicitar Projeto Personalizado
            </button>
        </div>

      </div>
    </section>
  );
};
*/
