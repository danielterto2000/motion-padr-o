import React from 'react';
import { Template } from '../types';

interface TemplateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onAttemptPurchase: (template: Template, type: 'template') => void;
  onCustomizeRedirect: (templateId: string) => void;
}

export const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  isOpen,
  onClose,
  template,
  onAttemptPurchase,
  onCustomizeRedirect,
}) => {
  if (!isOpen || !template) return null;

  const handleAddToCart = () => {
    onAttemptPurchase(template, 'template');
    onClose(); // Optionally close modal after adding to cart
  };

  const handleCustomize = () => {
    onCustomizeRedirect(template.id);
    onClose(); // Optionally close modal after redirecting
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-detail-modal-title"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 bg-gray-50">
          <h2 id="template-detail-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800 truncate pr-4">
            {template.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
            aria-label="Fechar modal de detalhes"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-grow overflow-y-auto">
          <div className="md:flex md:space-x-6">
            {/* Left Column: Image & Price */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-md mb-4">
                <img 
                  src={template.imageUrl} 
                  alt={`Preview de ${template.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                R$ {template.price.toFixed(2)}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Categoria:</span>
                <span className={`ml-1 ${template.categoryColorClass} font-medium`}>{template.categoryDisplayName}</span>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:w-1/2 space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-md">Descrição Detalhada:</h3>
                <p className="leading-relaxed">{template.detailedDescription}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-md">Principais Recursos:</h3>
                <ul className="list-disc list-inside pl-1 space-y-0.5">
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-md">Compatibilidade de Software:</h3>
                <div className="flex flex-wrap gap-1.5">
                    {template.softwareCompatibility.map((software, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{software}</span>
                    ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-0.5 text-md">Resolução:</h3>
                  <p>{template.resolution}</p>
                </div>
                {template.duration && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5 text-md">Duração:</h3>
                    <p>{template.duration}</p>
                  </div>
                )}
                {template.fileFormat && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5 text-md">Formato do Arquivo:</h3>
                    <p>{template.fileFormat}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Actions */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center"
          >
            <i className="fas fa-shopping-cart mr-2"></i> Adicionar ao Carrinho
          </button>
          <button
            onClick={handleCustomize}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center"
          >
            <i className="fas fa-user-cog mr-2"></i> Customizar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
};
