
import React, { useState, useEffect, useRef } from 'react';
import { AppView, FAQItem, SupportCardItem, TicketSubject } from '../types';
import { SUPPORT_HUB_CARDS_DATA, SUPPORT_SEARCH_SUGGESTIONS, SUPPORT_FAQ_DATA, WHATSAPP_SUPPORT_NUMBER, SUPPORT_EMAIL_ADDRESS } from '../constants';

interface SupportHubPageProps {
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  onOpenTicketModal: (subject?: TicketSubject) => void;
  isLoggedIn: boolean;
  isCreatorLoggedIn: boolean;
  onOpenAuthModal: () => void;
}

export const SupportHubPage: React.FC<SupportHubPageProps> = ({
  onChangeView,
  onOpenTicketModal,
  isLoggedIn,
  isCreatorLoggedIn,
  onOpenAuthModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      setFilteredSuggestions(
        SUPPORT_SEARCH_SUGGESTIONS.filter(suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5) // Limit suggestions
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call or filter content
    alert(`Buscando por: "${searchTerm}" (Simulação)`);
    setShowSuggestions(false);
    setSearchTerm(''); // Clear search term after "search"
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); // Keep term for a moment
    setShowSuggestions(false);
    alert(`Buscando por: "${suggestion}" (Simulação)`);
    setSearchTerm(''); // Clear search term after "search"
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleCardAction = (card: SupportCardItem) => {
    if (card.requiresAuth && !isLoggedIn) {
        alert("Você precisa estar logado para esta ação.");
        // Consider passing a postLoginAction: setPostLoginAction(() => () => handleCardAction(card));
        onOpenAuthModal(); 
        return;
    }
    if (card.id === 'upload_projeto' && card.requiresAuth && isLoggedIn && !isCreatorLoggedIn) {
        alert("Você precisa ser um criador verificado para enviar projetos. Complete seu cadastro de criador.");
        onChangeView('creatorSignup'); 
        return;
    }

    switch (card.actionType) {
      case 'link':
        if (card.actionValue.startsWith('#')) {
            onChangeView('supportHub', card.actionValue); // Stays on supportHub, scrolls to anchor
        } else {
            // If it's not a hash, it might be an external link or needs different handling
            window.open(card.actionValue, '_blank'); // Example for external link
        }
        break;
      case 'modal':
        const subjectKey = card.actionValue.split('_')[1] as TicketSubject | undefined;
        onOpenTicketModal(subjectKey);
        break;
      case 'view':
        onChangeView(card.actionValue as AppView);
        break;
      default:
        console.warn('Ação desconhecida para o card:', card.title);
    }
  };


  return (
    <section id="support-hub" className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* General Description */}
        <div className="text-center mb-10 md:mb-16">
          <i className="fas fa-headset text-6xl text-blue-600 mb-6"></i>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Central de Suporte
            <span className="block text-blue-600 mt-1 font-semibold">
              <span className="text-3xl md:text-4xl">BroadcastTV</span>
              <span className="block md:inline text-2xl md:text-3xl opacity-90">MotionGraphics</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Bem-vindo à nossa central de ajuda! Aqui você encontra suporte técnico, acesso a serviços especializados,
            respostas para suas dúvidas e tudo que precisa para otimizar sua experiência com nossos templates.
          </p>
        </div>

        {/* Smart Search Bar */}
        <div className="mb-12 md:mb-16 max-w-2xl mx-auto" ref={searchWrapperRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
              placeholder="Como podemos ajudar? Ex: erro de template, instalar..."
              className="w-full py-3.5 px-5 pl-12 text-md border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              aria-label="Buscar na central de ajuda"
            />
            <button type="submit" className="absolute inset-y-0 right-0 px-6 py-3 bg-blue-600 text-white text-md font-semibold rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              Buscar
            </button>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to fire before blur
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        
        {/* Main Content Area (Cards and Sidebar) */}
        <div className="lg:flex lg:gap-10">
          {/* Service & Support Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12 lg:mb-0">
            {SUPPORT_HUB_CARDS_DATA.map(card => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col group hover:-translate-y-1.5"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.iconBgColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${card.icon} ${card.iconTextColor} text-2xl fa-fw`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-5 flex-grow leading-relaxed">{card.description}</p>
                <button
                  onClick={() => handleCardAction(card)}
                  className="mt-auto w-full text-sm font-medium rounded-md px-4 py-2.5 transition-colors duration-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Acessar ${card.title}`}
                >
                  Acessar <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Help Sidebar Content */}
          <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start"> {/* Sticky for navbar height (approx 80px + some margin) */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-life-ring mr-2.5 text-blue-500"></i> Ajuda Rápida
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" onClick={(e) => {e.preventDefault(); onChangeView('main', '#how-it-works')}} className="text-blue-600 hover:underline hover:text-blue-800 flex items-center transition-colors"><i className="fas fa-cogs fa-fw mr-2.5 text-gray-400"></i>Como Funciona</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); alert("Termos de Serviço (Simulação)");}} className="text-blue-600 hover:underline hover:text-blue-800 flex items-center transition-colors"><i className="fas fa-file-contract fa-fw mr-2.5 text-gray-400"></i>Termos de Serviço</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); alert("Política de Privacidade (Simulação)");}} className="text-blue-600 hover:underline hover:text-blue-800 flex items-center transition-colors"><i className="fas fa-user-shield fa-fw mr-2.5 text-gray-400"></i>Política de Privacidade</a></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-lightbulb mr-2.5 text-yellow-500"></i> Dicas Úteis
              </h3>
              <div className="bg-blue-50 p-3.5 rounded-md text-sm text-blue-800 mb-3 shadow-sm">
                <p><strong className="font-medium">Importação:</strong> Verifique o manual do seu GC para importar templates .zip ou .gtzip corretamente.</p>
              </div>
              <div className="bg-green-50 p-3.5 rounded-md text-sm text-green-800 shadow-sm">
                <p><strong className="font-medium">Compatibilidade:</strong> Sempre confira a versão do software indicada na descrição do template.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-3.5">
                 <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <i className="fas fa-headset mr-2.5 text-green-500"></i> Contato Direto
                </h3>
                <a 
                    href={`https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent("Olá! Preciso de ajuda com a plataforma BroadcastTVMotionGraphics.")}`} 
                    target="_blank" rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-md text-sm flex items-center justify-center transition-colors shadow hover:shadow-md"
                >
                    <i className="fab fa-whatsapp mr-2 fa-lg"></i> WhatsApp Suporte
                </a>
                 <a 
                    href={`mailto:${SUPPORT_EMAIL_ADDRESS}?subject=${encodeURIComponent("Suporte BroadcastTVMotionGraphics")}`}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 px-4 rounded-md text-sm flex items-center justify-center transition-colors shadow hover:shadow-md"
                >
                    <i className="fas fa-envelope mr-2 fa-lg"></i> Email Suporte
                </a>
                <button
                    onClick={() => onOpenTicketModal()}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-md text-sm flex items-center justify-center transition-colors shadow hover:shadow-md"
                >
                    <i className="fas fa-ticket-alt mr-2 fa-lg"></i> Abrir Chamado Detalhado
                </button>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <section id="support-hub-faq" className="mt-16 md:mt-24 pt-10 border-t border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-5 max-w-3xl mx-auto">
            {SUPPORT_FAQ_DATA.map(faq => (
              <details key={faq.id} className="group bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <summary className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer hover:text-blue-600 list-none">
                  <span>{faq.question}</span>
                  <i className="fas fa-chevron-down group-open:rotate-180 transition-transform duration-200"></i>
                </summary>
                <div className="text-gray-600 mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center" id="support-hub-contact">
            <button
                onClick={() => onOpenTicketModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <i className="fas fa-medkit mr-2"></i> Precisa de Ajuda Personalizada? Abrir Chamado
            </button>
        </div>
      </div>

      {/* Floating Action Button for Mobile to Open Ticket Modal */}
      <button
        onClick={() => onOpenTicketModal()}
        className="lg:hidden fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center z-50 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        aria-label="Abrir chamado de suporte"
        title="Abrir Chamado de Suporte"
      >
        <i className="fas fa-ticket-alt fa-lg"></i>
      </button>
    </section>
  );
};