import React from 'react';
import { AppView } from '../types';

interface CtaSectionProps {
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onChangeView }) => {
  const handleTalkToSpecialist = () => {
     onChangeView('main', '#custom-project-request');
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto para Modernizar sua Produção Visual?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">Experimente nossos templates gráficos e cenários virtuais. Eleve o padrão da sua comunicação.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onChangeView('main', '#templates-graficos')} 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
          >
            Ver Templates Broadcast
          </button>
          <button 
            onClick={() => onChangeView('chromaKeyPage', 'pagina-chroma')} 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
          >
            Ver Cenários Virtuais
          </button>
          <button 
            onClick={handleTalkToSpecialist}
            className="bg-transparent hover:bg-blue-700 border-2 border-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
          >
            Projeto Sob Medida
          </button>
        </div>
      </div>
    </section>
  );
};