import React from 'react';
import { MogrtTemplate } from '../types';

interface MogrtCardProps {
  template: MogrtTemplate;
  onAttemptPurchase: (template: MogrtTemplate) => void;
}

export const MogrtCard: React.FC<MogrtCardProps> = ({ template, onAttemptPurchase }) => {
  
  const handleVisualizeClick = () => {
    // In a real app, this might open a modal with a larger preview or video player
    alert(`Visualizando detalhes de: ${template.name}. (Simulação)`);
    // For actual video:
    // if (template.animatedThumbnailUrl) window.open(template.animatedThumbnailUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl group flex flex-col">
      <button 
        onClick={handleVisualizeClick}
        className="relative block w-full aspect-video overflow-hidden cursor-pointer group/thumbnail"
        aria-label={`Visualizar ${template.name}`}
      >
        <img 
          src={template.staticThumbnailUrl} 
          alt={`Preview de ${template.name}`} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/thumbnail:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/thumbnail:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <i className="fas fa-play-circle text-white text-4xl opacity-0 group-hover/thumbnail:opacity-80 transition-opacity duration-300 transform scale-75 group-hover/thumbnail:scale-100"></i>
        </div>
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2.5 py-1 text-xs font-semibold rounded-full shadow">
          .MOGRT
        </div>
      </button>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors truncate" title={template.name}>
            {template.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{template.categoryDisplayName}</p>
        
        <div className="mb-4 text-xs text-gray-600 space-y-1">
            <p><i className="fab fa-adobe text-red-500 fa-fw mr-1.5"></i>Premiere: {template.specifications.premiereVersion}</p>
            <p><i className="fas fa-expand-arrows-alt fa-fw mr-1.5"></i>Resolução: {template.specifications.resolution}</p>
            <p><i className="fas fa-palette fa-fw mr-1.5"></i>Personalizável: {template.specifications.customizable.join(', ')}</p>
            <p><i className="fas fa-layer-group fa-fw mr-1.5"></i>Fundo: {template.specifications.background}</p>
        </div>

        <div className="mt-auto pt-3 space-y-2">
          <p className="text-xl font-bold text-blue-700 text-center mb-2">R$ {template.price.toFixed(2)}</p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onAttemptPurchase(template)}
              aria-label={`Adicionar ${template.name} ao carrinho`}
              className="flex-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              <i className="fas fa-cart-plus mr-2"></i> Adicionar ao Carrinho
            </button>
            <button 
              onClick={handleVisualizeClick}
              aria-label={`Visualizar detalhes de ${template.name}`}
              className="flex-1 text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              <i className="fas fa-eye mr-2"></i> Visualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};