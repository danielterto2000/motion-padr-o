
import React from 'react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onAttemptPurchase: (template: Template) => void;
  onOpenDetailModal: (template: Template) => void; // New prop for opening detail modal
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onAttemptPurchase, onOpenDetailModal }) => {
  
  const handleCustomizeRedirect = (templateId: string) => {
    // This could also become a prop if customization flow needs app-level state
    // For now, simple redirect or scroll to section.
    // Assuming CustomProjectFormSection is on the main page:
     const customProjectForm = document.getElementById('custom-project-request');
      if (customProjectForm) {
        const navbarHeight = 80; // Approximate height of your sticky navbar
        const elementPosition = customProjectForm.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    // Or if there's a specific query param for customization:
    // window.location.href = `/customizar?template=${templateId}`;
  };

  const handleDetailsClick = () => {
    onOpenDetailModal(template);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl group flex flex-col">
      <div className="relative">
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleDetailsClick(); }} 
            aria-label={`Ver detalhes de ${template.name}`}
        >
          <img 
            src={template.imageUrl} 
            alt={template.name} 
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </a>
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-white/90 text-blue-600 font-bold text-sm">
          R$ {template.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <a href="#" className="block" onClick={(e) => {e.preventDefault(); handleDetailsClick();}} aria-label={`Detalhes de ${template.name}`}>
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">{template.name}</h3>
        </a>
        <button onClick={(e) => e.preventDefault()} className="block text-left" aria-label={`Categoria ${template.categoryDisplayName}`}>
          <span className={`${template.categoryColorClass} text-sm font-medium hover:underline`}>
            {template.categoryDisplayName}
          </span>
        </button>
        
        <div className="mt-auto pt-3 space-y-2">
          <div className="flex justify-between items-center space-x-2">
            <button 
              onClick={() => onAttemptPurchase(template)}
              aria-label={`Comprar ${template.name}`}
              className="flex-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
            >
              <i className="fas fa-shopping-cart mr-1.5"></i> Comprar
            </button>
            <button 
              onClick={handleDetailsClick}
              aria-label={`Mais detalhes sobre ${template.name}`}
              className="flex-1 text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
            >
              <i className="fas fa-info-circle mr-1.5"></i> Detalhes
            </button>
          </div>
          <button
            onClick={() => handleCustomizeRedirect(template.id)}
            aria-label={`Customizar ${template.name} com especialista`}
            className="w-full text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <i className="fas fa-user-cog mr-1.5"></i> Customizar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
};