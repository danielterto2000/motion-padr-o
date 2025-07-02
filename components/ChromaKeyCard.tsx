
import React from 'react';
import { ChromaKeyTemplate, Template } from '../types'; // Added Template for onAttemptPurchase

interface ChromaKeyCardProps {
  template: ChromaKeyTemplate;
  onAttemptPurchase?: (template: Template | ChromaKeyTemplate) => void; // Optional, but recommended for consistency
}

export const ChromaKeyCard: React.FC<ChromaKeyCardProps> = ({ template, onAttemptPurchase }) => {
  const handleBuyClick = () => {
    if (onAttemptPurchase) {
      onAttemptPurchase(template);
    } else {
      // Fallback if onAttemptPurchase is not provided, though it should be for consistency
      alert(`Cenário "${template.name}" adicionado ao seu carrinho! (Simulação - prop não conectada)`);
    }
  };

  const handlePreviewClick = () => {
    // In a real app, this might open a larger preview modal or navigate to a detail page
    // For now, let's just open the image in a new tab or show an alert
    // window.open(template.imageUrl, '_blank');
     alert(`Visualizando detalhes de ${template.name}. Imagem: ${template.imageUrl} (Simulação)`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl group flex flex-col">
      <div className="relative">
        <button onClick={handlePreviewClick} className="w-full block" aria-label={`Visualizar ${template.name}`}>
          <img 
            src={template.imageUrl} 
            alt={template.name} 
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </button>
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-white/90 text-blue-600 font-bold text-sm">
          R$ {template.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <button onClick={handlePreviewClick} className="block text-left w-full" aria-label={`Detalhes de ${template.name}`}>
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">{template.name}</h3>
        </button>
        <button onClick={(e) => e.preventDefault()} className="block text-left w-full" aria-label={`Categoria ${template.categoryDisplayName}`}>
          <span className={`${template.categoryColorClass} text-sm font-medium hover:underline`}>
            {template.categoryDisplayName}
          </span>
        </button>
        <div className="mt-auto pt-3 flex justify-between items-center space-x-2">
          <button 
            onClick={handleBuyClick}
            aria-label={`Comprar ${template.name}`}
            className="flex-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <i className="fas fa-shopping-cart mr-1.5"></i> Comprar
          </button>
          <button 
            onClick={handlePreviewClick}
            aria-label={`Mais detalhes sobre ${template.name}`}
            className="flex-1 text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <i className="fas fa-info-circle mr-1.5"></i> Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};
