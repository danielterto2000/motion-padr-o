
import React, { useState, useEffect, useRef } from 'react';
import { NavItem, AppView } from '../types'; 

interface NavbarProps {
  navLinks: NavItem[];
  activeSection: string;
  onOpenAuthModal: () => void; 
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onChangeView: (view: AppView, eOrTarget?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | string) => void;
  cartItemCount: number; 
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
    navLinks, 
    activeSection, 
    onOpenAuthModal, 
    isLoggedIn, 
    userName, 
    onLogout,
    onChangeView,
    cartItemCount,
    isAdminAuthenticated
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const accountDropdownRef = useRef<HTMLDivElement>(null); 
  const desktopSubmenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const formatDisplayUserName = (fullName: string | null): string => {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0]; 
    if (parts.length > 1) return `${parts[0]} ${parts[parts.length - 1]}`; 
    return fullName; 
  };
  const displayUserName = formatDisplayUserName(userName);

  const closeAllDropdowns = () => {
    setIsAccountDropdownOpen(false);
    setOpenDesktopSubmenu(null);
  };
  
  const toggleMobileMenu = () => {
    const newMobileMenuState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newMobileMenuState);
    if (!newMobileMenuState) { 
      setOpenMobileSubmenus({}); 
    }
  };
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, navItemOrHref: NavItem | string | AppView, isPageViewClick: boolean = false) => {
    let targetView: AppView | null = null;
    let href: string | AppView;
    let activeIdForScroll: string | undefined;
    let isSpaNavigation = false;

    const isNavItemObject = typeof navItemOrHref === 'object' && 'href' in navItemOrHref;

    if (isNavItemObject) {
        href = navItemOrHref.href;
        activeIdForScroll = navItemOrHref.activeId;
    } else { // string or AppView
        href = navItemOrHref as (string | AppView); 
        if (href === 'cart') activeIdForScroll = 'cart-page';
        else if (href === 'userOrders') activeIdForScroll = 'user-orders-page';
        else if (href === 'userProfile') activeIdForScroll = 'user-profile-page';
        else if (href === 'adminDashboard') activeIdForScroll = 'admin-dashboard-page';
    }
    
    if (href === 'supportHub') { targetView = 'supportHub'; isSpaNavigation = true; }
    else if (href === 'mogrtPage') { targetView = 'mogrtPage'; isSpaNavigation = true; }
    else if (href === 'chromaKeyPage') { targetView = 'chromaKeyPage'; isSpaNavigation = true; }
    else if (href === 'cart' || (isPageViewClick && href === 'cart')) { targetView = 'cart'; isSpaNavigation = true; }
    else if (href === 'userOrders' || (isPageViewClick && href === 'userOrders')) { targetView = 'userOrders'; isSpaNavigation = true; }
    else if (href === 'userProfile' || (isPageViewClick && href === 'userProfile')) { targetView = 'userProfile'; isSpaNavigation = true; }
    else if (href === '/creator-signup' || (isPageViewClick && href === '/creator-signup')) { targetView = 'creatorSignup'; isSpaNavigation = true; }
    else if (href === 'adminDashboard' || (isPageViewClick && href === 'adminDashboard')) { targetView = 'adminDashboard'; isSpaNavigation = true;}
    else if (typeof href === 'string' && href.startsWith('#')) { 
        targetView = 'main'; 
        isSpaNavigation = true;
        if (!activeIdForScroll && isNavItemObject) activeIdForScroll = navItemOrHref.activeId; 
        else if (!activeIdForScroll && typeof href === 'string') activeIdForScroll = href; 
    } else if (isNavItemObject && navItemOrHref.submenuItems && typeof navItemOrHref.href === 'string' && navItemOrHref.href.startsWith('#')) {
       targetView = 'main';
       isSpaNavigation = true;
       activeIdForScroll = navItemOrHref.activeId;
    }
    
    if (isSpaNavigation) {
        if (!(e.metaKey || e.ctrlKey)) { 
            e.preventDefault();
        }
        if (targetView) {
            onChangeView(targetView, activeIdForScroll || e);
        }
    }
    
    setIsMobileMenuOpen(false); 
    closeAllDropdowns(); 
  };

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLoggedIn && accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      let clickedInsideADesktopSubmenu = false;
      Object.values(desktopSubmenuRefs.current).forEach(ref => {
        if (ref && ref.contains(event.target as Node)) {
            clickedInsideADesktopSubmenu = true;
        }
      });
       if (!clickedInsideADesktopSubmenu && openDesktopSubmenu) {
        const parentButton = Object.keys(desktopSubmenuRefs.current).find(
            (key) => key === openDesktopSubmenu
        );
        if (parentButton && desktopSubmenuRefs.current[parentButton]?.parentElement) {
           const parentButtonElement = desktopSubmenuRefs.current[parentButton]?.parentElement?.querySelector('button');
           if (parentButtonElement && !parentButtonElement.contains(event.target as Node)) {
           }
        } else if (!parentButton){
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDesktopSubmenu, isLoggedIn]);
  
  const renderNavLink = (item: NavItem, isMobile: boolean) => {
    const isCurrentPageAnchor = typeof item.href === 'string' && item.href.startsWith('#') && activeSection === item.href.substring(1);
    const isCurrentPageView = typeof item.href !== 'string' || (!item.href.startsWith('#') && activeSection === item.activeId);
    let isActive = isCurrentPageAnchor || isCurrentPageView;
    
    if (item.href === '#templates-graficos' && activeSection.startsWith('templates-graficos')) { 
        isActive = true;
    }


    const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;

    if (isMobile) {
      if (hasSubmenu) {
        return (
          <div key={item.label}>
            <button
              onClick={() => toggleMobileSubmenu(item.label)}
              className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive && !openMobileSubmenus[item.label] ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-expanded={openMobileSubmenus[item.label] || false}
              aria-haspopup="true"
            >
              {item.label}
              <i className={`fas fa-chevron-down ml-1 transition-transform duration-200 transform ${openMobileSubmenus[item.label] ? 'rotate-180' : ''}`}></i>
            </button>
            {openMobileSubmenus[item.label] && (
              <div className="pl-4 mt-1 space-y-1">
                {item.submenuItems?.map(subItem => (
                  <a
                    key={subItem.label}
                    href={subItem.href} 
                    onClick={(e) => handleNavLinkClick(e, subItem)} 
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      activeSection === (subItem.activeId || (typeof subItem.href === 'string' && subItem.href.startsWith('#') ? subItem.href.substring(1) : '')) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    aria-current={activeSection === (subItem.activeId || (typeof subItem.href === 'string' && subItem.href.startsWith('#') ? subItem.href.substring(1) : '')) ? 'page' : undefined}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }
      return (
        <a
          key={item.label}
          href={item.href} 
          onClick={(e) => handleNavLinkClick(e, item)} 
          className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          }`}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.label}
        </a>
      );
    }

    // Desktop Nav Link
    if (hasSubmenu) {
      return (
        <div 
          key={item.label}
          className="relative"
          onMouseEnter={() => setOpenDesktopSubmenu(item.label)}
          onMouseLeave={() => setOpenDesktopSubmenu(null)}
          ref={el => { desktopSubmenuRefs.current[item.label] = el; }}
        >
          <button 
            onClick={(e) => handleNavLinkClick(e, item)} 
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 h-20 ${ 
              isActive && openDesktopSubmenu !== item.label ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-blue-300'
            }`}
            aria-haspopup="true"
            aria-expanded={openDesktopSubmenu === item.label}
          >
            {item.label}
            <i className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-200 transform ${openDesktopSubmenu === item.label ? 'rotate-180' : ''}`}></i>
          </button>
          {openDesktopSubmenu === item.label && (
            <div 
              role="menu"
              className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50"
            >
              {item.submenuItems?.map(subItem => (
                <a
                  key={subItem.label}
                  href={subItem.href} 
                  onClick={(e) => handleNavLinkClick(e, subItem)} 
                  className={`block px-4 py-2 text-sm transition-colors duration-200 ${ activeSection === (subItem.activeId || (typeof subItem.href === 'string' && subItem.href.startsWith('#') ? subItem.href.substring(1) : '')) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                  role="menuitem"
                  aria-current={activeSection === (subItem.activeId || (typeof subItem.href === 'string' && subItem.href.startsWith('#') ? subItem.href.substring(1) : '')) ? 'page' : undefined}
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <a
        key={item.label}
        href={item.href} 
        onClick={(e) => handleNavLinkClick(e, item)} 
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 h-20 ${ 
          isActive ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-blue-300'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <a href="#hero" onClick={(e) => handleNavLinkClick(e, {label: 'Início', href: '#hero', activeId: 'hero'})} className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-tv text-blue-600 text-2xl mr-2"></i>
              <span className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                BroadcastTV<br className="hidden md:block" />MotionGraphics
              </span>
            </div>
          </a>
          <div className="hidden md:ml-6 md:flex md:items-stretch md:space-x-4 lg:space-x-8">
            {navLinks.map((item) => renderNavLink(item, false))}
            {isAdminAuthenticated && (
                <a
                  href="#"
                  onClick={(e) => handleNavLinkClick(e, 'adminDashboard', true)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 h-20 ${ 
                    activeSection === 'admin-dashboard-page' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-500 hover:text-purple-700 hover:border-b-2 hover:border-purple-300'
                  }`}
                  aria-current={activeSection === 'admin-dashboard-page' ? 'page' : undefined}
                >
                  <i className="fas fa-user-shield mr-1"></i> Admin Panel
                </a>
            )}
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="hidden md:block text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100" aria-label="Pesquisar">
              <i className="fas fa-search text-lg"></i>
            </button>
            
            <button 
                onClick={(e) => handleNavLinkClick(e, 'cart', true)} 
                className="hidden md:block relative text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100" 
                aria-label="Carrinho de compras"
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <a 
                href="/creator-signup" 
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-md transition"
                onClick={(e) => handleNavLinkClick(e, "/creator-signup", true)}
                aria-label="Seja um criador de templates"
              >
                <i className="fas fa-pen-nib text-blue-600"></i>
                Seja um Criador
              </a>

              {isLoggedIn ? (
                  <div className="relative" ref={accountDropdownRef}>
                    <button 
                      onClick={toggleAccountDropdown} 
                      className="flex items-center px-3 py-2 rounded-md text-sm font-light text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      aria-expanded={isAccountDropdownOpen}
                      aria-haspopup="true"
                      id="account-menu-button-loggedin"
                      aria-label={`Conta de ${displayUserName}`}
                    >
                       <i className={`fas ${isAdminAuthenticated ? 'fa-user-shield text-purple-600' : 'fa-user-circle text-blue-600'} mr-2 text-base`}></i>
                      Olá, {displayUserName}
                      <i className={`fas fa-chevron-down text-xs ml-2 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {isAccountDropdownOpen && (
                      <div 
                        className="origin-top-right absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="account-menu-button-loggedin"
                      >
                        <button
                          onClick={(e) => {handleNavLinkClick(e, 'userProfile', true); closeAllDropdowns();}}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                          role="menuitem"
                        >
                          <i className="fas fa-id-card w-4 mr-2 text-gray-500"></i> Meu Perfil
                        </button>
                        <button
                          onClick={(e) => {handleNavLinkClick(e, 'userOrders', true); closeAllDropdowns();}}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                          role="menuitem"
                        >
                          <i className="fas fa-receipt w-4 mr-2 text-gray-500"></i> Minhas Compras
                        </button>
                        {isAdminAuthenticated && (
                            <button
                                onClick={(e) => {handleNavLinkClick(e, 'adminDashboard', true); closeAllDropdowns();}}
                                className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-150"
                                role="menuitem"
                            >
                                <i className="fas fa-cog w-4 mr-2 text-purple-500"></i> Painel Admin
                            </button>
                        )}
                        <div className="my-1 border-t border-gray-100"></div>
                        <button
                          onClick={() => { onLogout(); closeAllDropdowns(); }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                          role="menuitem"
                        >
                          <i className="fas fa-sign-out-alt w-4 mr-2"></i> Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={onOpenAuthModal}
                    className="flex flex-col items-center justify-center p-2 rounded-md group transition-all duration-200 ease-in-out hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Entrar ou Criar Conta"
                    title="Entrar ou Criar Conta"
                  >
                    <i className="fas fa-user text-blue-600 text-lg group-hover:text-blue-700 transition-colors duration-150"></i>
                    <span className="text-gray-700 text-xs font-semibold uppercase tracking-wider mt-1 group-hover:text-gray-900 transition-colors duration-150">Entrar</span>
                  </button>
                )}
            </div>

            <button className="md:hidden text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100" onClick={toggleMobileMenu} aria-label="Abrir menu mobile" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-20 inset-x-0 bg-white shadow-lg z-40 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => renderNavLink(item, true))}
            {isAdminAuthenticated && (
                 <a
                  href="#"
                  onClick={(e) => handleNavLinkClick(e, 'adminDashboard', true)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      activeSection === 'admin-dashboard-page' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-current={activeSection === 'admin-dashboard-page' ? 'page' : undefined}
                >
                  <i className="fas fa-user-shield mr-2"></i>Admin Panel
                </a>
            )}
            <div className="border-t border-gray-200 mt-2 pt-2">
                 <a 
                    href="/creator-signup" 
                    onClick={(e) => handleNavLinkClick(e, "/creator-signup", true)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <i className="fas fa-pen-nib text-blue-600"></i> Seja um Criador
                </a>
            </div>
          </div>
           <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3 mb-3 space-x-2"> 
                <button className="flex-1 text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 flex items-center justify-center text-sm" aria-label="Pesquisar">
                    <i className="fas fa-search text-base mr-1.5"></i> Pesquisar
                </button>
                <button 
                    onClick={(e) => handleNavLinkClick(e, 'cart', true)}
                    className="flex-1 relative text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 flex items-center justify-center text-sm" 
                    aria-label="Carrinho de compras"
                >
                    <i className="fas fa-shopping-cart text-base mr-1.5"></i> Carrinho
                    {cartItemCount > 0 && (
                         <span className="absolute top-1 right-1 block h-3 w-3 transform translate-x-1/4 -translate-y-1/4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </button>
            </div>
            {isLoggedIn ? (
                <div className="px-2 space-y-1">
                     <div className="px-3 py-2">
                        <div className="font-medium text-gray-800">Olá, {displayUserName}</div>
                        {isAdminAuthenticated && <div className="text-xs text-purple-600">Administrador</div>}
                     </div>
                     <button
                        onClick={(e) => {handleNavLinkClick(e, 'userProfile', true);}}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                        Meu Perfil
                    </button>
                    <button
                        onClick={(e) => {handleNavLinkClick(e, 'userOrders', true);}}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                        Minhas Compras
                    </button>
                    <button
                        onClick={() => { onLogout(); closeAllDropdowns(); setIsMobileMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                        Sair
                    </button>
                </div>
            ) : (
                <div className="px-2 space-y-1">
                    <button 
                        onClick={() => { onOpenAuthModal(); setIsMobileMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                        Entrar ou Criar Conta
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
