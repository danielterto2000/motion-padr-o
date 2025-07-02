import React from 'react';
import { ABOUT_DIFFERENTIALS_DATA } from '../constants';
import { DifferentialItem } from '../types';

export const AboutSection: React.FC = () => {
  
  const handleTalkToSpecialist = () => {
    document.getElementById('custom-project-request')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quem Somos</h2>
          <p className="text-xl text-blue-600 font-semibold max-w-3xl mx-auto">
            Inovação em gráficos, tecnologia e automação para televisão e internet.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A BroadcastMotion é especializada na criação de templates gráficos profissionais adaptáveis para qualquer sistema de automação televisiva, digital ou online. Oferecemos soluções completas para emissoras de TV, canais de YouTube, plataformas de streaming e produtoras independentes.
          </p>
        </div>

        {/* Diferenciais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 mb-16">
          {ABOUT_DIFFERENTIALS_DATA.map((item: DifferentialItem) => (
            <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${item.iconBgColor}`}>
                <i className={`${item.icon} ${item.iconTextColor} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="my-16 py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-xl shadow-2xl px-6">
          <i className="fas fa-rocket text-4xl mb-4 opacity-80"></i>
          <h3 className="text-3xl font-bold">
            Tecnologia de ponta para elevar o padrão da sua produção audiovisual.
          </h3>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Pronto para transformar a forma como sua emissora ou canal apresenta informações? <br className="hidden sm:block" /> Fale com nossos especialistas e descubra como a BroadcastMotion pode automatizar sua produção.
          </p>
          <button
            onClick={handleTalkToSpecialist}
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-3 rounded-md text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <i className="fas fa-comments mr-2"></i> Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  );
};
