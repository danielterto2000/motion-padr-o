
import React, { useState, useEffect } from 'react';
import { TEMPLATES_DATA } from '../constants'; // Assuming TEMPLATES_DATA is here
import { AppView } from '../types';

interface HeroSectionProps {
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onChangeView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const imagesForCarousel = TEMPLATES_DATA.slice(0, 8);

  useEffect(() => {
    if (imagesForCarousel.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesForCarousel.length);
    }, 3000); 

    return () => clearInterval(intervalId); 
  }, [imagesForCarousel.length]);

  return (
    <section id="hero" className="bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="https://via.placeholder.com/150x50?text=Pro+Graphics" alt="Pro Graphics Solutions" className="h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Templates gráficos profissionais para qualquer sistema de TV, vídeo ou internet.</h1>
            <p className="text-xl mb-8 opacity-90">Soluções adaptáveis e prontas para automação gráfica em emissoras, canais de YouTube, podcasts e produções digitais. Flexibilidade total para TV, streaming e plataformas online.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#templates-graficos" 
                onClick={(e) => {
                  e.preventDefault();
                  onChangeView('main', '#templates-graficos');
                }}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold text-center transition-colors duration-300"
              >
                Ver Templates Broadcast
              </a>
              <a 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onChangeView('chromaKeyPage', 'pagina-chroma'); 
                }}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold text-center transition-colors duration-300 sm:hidden"
              >
                Ver Cenários Virtuais
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => {
                  e.preventDefault();
                  onChangeView('main', '#how-it-works');
                }}
                className="bg-transparent hover:bg-blue-800 border-2 border-white px-6 py-3 rounded-md text-lg font-semibold text-center transition-colors duration-300"
              >
                Como Funciona
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-10 md:mt-0">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 bg-gray-800 text-white flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm">Visualização do Template</span>
              </div>
              <div className="p-2 bg-gray-100"> 
                <div className="relative h-60 md:h-72 w-full overflow-hidden rounded-lg bg-gray-200"> 
                  {imagesForCarousel.map((template, index) => (
                    <img
                      key={template.id}
                      src={template.imageUrl}
                      alt={`Visualização do Template: ${template.name}`}
                      className={`absolute inset-0 w-full h-full object-contain p-1 transition-opacity duration-1000 ease-in-out ${
                        index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    />
                  ))}
                   {imagesForCarousel.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Nenhuma imagem para exibir.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
