
import React from 'react';
import { Template } from '../types';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  onLoadMore: () => void;
  canLoadMore: boolean;
  onAttemptPurchase: (template: Template) => void;
  onOpenDetailModal: (template: Template) => void; // Add prop for opening detail modal
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({ templates, onLoadMore, canLoadMore, onAttemptPurchase, onOpenDetailModal }) => {
  return (
    <div className="mt-8"> {/* Changed from section to div, removed py-16 bg-white and id */}
      {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 was here, now handled by parent in App.tsx */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template: Template) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onAttemptPurchase={onAttemptPurchase}
              onOpenDetailModal={onOpenDetailModal} // Pass down the handler
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">Nenhum template encontrado para esta categoria.</p>
        </div>
      )}
      {canLoadMore && (
        <div className="text-center mt-12">
          <button 
            onClick={onLoadMore}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
          >
            Carregar Mais Templates
          </button>
        </div>
      )}
    </div>
  );
};