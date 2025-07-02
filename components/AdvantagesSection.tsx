
import React from 'react';
import { ADVANTAGES_DATA } from '../constants';
import { Advantage } from '../types';

export const AdvantagesSection: React.FC = () => {
  return (
    <section id="advantages" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher nossos templates?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Soluções profissionais desenvolvidas para criadores de conteúdo, emissoras de TV e produtoras de vídeo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ADVANTAGES_DATA.map((advantage: Advantage) => (
            <div key={advantage.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className={`${advantage.iconBgClass} w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <i className={`${advantage.iconClass} ${advantage.iconColorClass} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{advantage.title}</h3>
              <p className="text-gray-600 text-center">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
