
import React from 'react';
import { FOOTER_LINKS_TEMPLATES, FOOTER_LINKS_INTEGRATION, FOOTER_SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-tv text-blue-500 text-2xl mr-2"></i>
              <span className="text-lg md:text-xl font-bold leading-tight">
                BroadcastTV<br className="hidden md:block" />MotionGraphics
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Templates profissionais para produção de vídeo, TV e internet. Soluções gráficas e cenários virtuais.</p>
            <div className="flex space-x-4">
              {FOOTER_SOCIAL_LINKS.map(link => (
                <a key={link.label} href={link.href} aria-label={link.label} className={`text-gray-400 ${link.hoverClass} transition-colors duration-300`}>
                  <i className={link.iconClass}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Nossos Produtos</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS_TEMPLATES.map(link => (
                <li key={link.label}><a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Soluções</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS_INTEGRATION.map(link => (
                <li key={link.label}><a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-gray-400 mt-1 mr-2 text-sm"></i>
                <span className="text-gray-400 text-sm">Av. Broadcast, 123, Sala 500<br />São Paulo, SP</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-gray-400 mr-2 text-sm"></i>
                <a href="tel:+551112345678" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">+55 (11) 1234-5678</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-gray-400 mr-2 text-sm"></i>
                <a href="mailto:contato@broadcastmotion.com.br" className="text-gray-400 hover:text-white text-sm break-all transition-colors duration-300">contato@broadcasttvmotiongraphics.com.br</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} BroadcastTVMotionGraphics. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Termos de Serviço</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};