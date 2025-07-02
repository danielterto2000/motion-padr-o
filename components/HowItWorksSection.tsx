
import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
import { HowItWorksStep } from '../types';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Integração Flexível com Seu Sistema</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Adquira, personalize e utilize em poucos minutos, de forma compatível com sua plataforma.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step: HowItWorksStep) => (
            <div key={step.id} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">{step.id}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
