
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CategoryTabs } from './components/CategoryTabs';
import { TemplateGrid } from './components/TemplateGrid';
import { ChromaKeyCard } from './components/ChromaKeyCard'; 
import { MogrtCard } from './components/MogrtCard'; 
import { AdvantagesSection } from './components/AdvantagesSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { AuthenticationModal } from './components/AuthenticationModal';
import { CustomProjectFormSection } from './components/CustomProjectFormSection';
import { AboutSection } from './components/AboutSection';
import { CreatorSignupPage } from './components/CreatorSignupPage';
import { CreatorDashboardPage } from './components/CreatorDashboardPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { PaymentErrorPage } from './components/PaymentErrorPage';
import { UserOrdersPage } from './components/UserOrdersPage';
import { SupportHubPage } from './components/SupportHubPage'; 
import { OpenTicketModal } from './components/OpenTicketModal'; 
import { MogrtPage } from './components/MogrtPage'; 
import { ChromaKeyPage } from './components/ChromaKeyPage';
import { TemplateDetailModal } from './components/TemplateDetailModal';
import { AdminDashboardPage } from './components/AdminDashboardPage';


import { 
    Template, Category, ChromaKeyTemplate, ChromaKeyCategory, AppView, 
    CreatorSignupData, CartItem, Order, PaymentDetails, Coupon, 
    TicketData, TicketSubject, MogrtTemplate, MogrtCategory, TICKET_SUBJECTS_PT, User
} from './types';
import { 
    TEMPLATES_DATA, CATEGORIES_DATA, CHROMA_KEY_TEMPLATES_DATA, CHROMA_KEY_CATEGORIES_DATA, 
    NAV_LINKS, COUPONS_DATA, MOGRT_TEMPLATES_DATA, MOGRT_CATEGORIES_DATA, ADMIN_EMAIL
} from './constants';


const INITIAL_VISIBLE_TEMPLATES = 8;
const INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_IN_MAIN = 4; 
const INITIAL_VISIBLE_MOGRT_TEMPLATES_IN_MAIN = 4;

// For dedicated pages
const INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_PAGE = CHROMA_KEY_TEMPLATES_DATA.length; 
const INITIAL_VISIBLE_MOGRT_TEMPLATES_PAGE = MOGRT_TEMPLATES_DATA.length; 

const App: React.FC = () => {
  // State for "Broadcast TV" templates (main templates section)
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [visibleTemplates, setVisibleTemplates] = useState<number>(INITIAL_VISIBLE_TEMPLATES);

  // State for Chroma Key (both main section and dedicated page)
  const [activeChromaKeyCategory, setActiveChromaKeyCategory] = useState<string>('all');
  const [filteredChromaKeyTemplates, setFilteredChromaKeyTemplates] = useState<ChromaKeyTemplate[]>([]);
  const [visibleChromaKeyTemplatesMain, setVisibleChromaKeyTemplatesMain] = useState<number>(INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_IN_MAIN);
  const [visibleChromaKeyTemplatesPage, setVisibleChromaKeyTemplatesPage] = useState<number>(INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_PAGE);


  // State for MOGRT (both main section and dedicated page)
  const [activeMogrtCategory, setActiveMogrtCategory] = useState<string>('all');
  const [filteredMogrtTemplates, setFilteredMogrtTemplates] = useState<MogrtTemplate[]>([]);
  const [visibleMogrtTemplatesMain, setVisibleMogrtTemplatesMain] = useState<number>(INITIAL_VISIBLE_MOGRT_TEMPLATES_IN_MAIN);
  const [visibleMogrtTemplatesPage, setVisibleMogrtTemplatesPage] = useState<number>(INITIAL_VISIBLE_MOGRT_TEMPLATES_PAGE);


  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // General login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false); // SESSION admin status (trueAdminStatus && token)
  const [userName, setUserName] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); 
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  
  const [trueAdminStatus, setTrueAdminStatus] = useState<boolean>(false); // Inherent admin flag (from auth source)
  const [trueCreatorStatus, setTrueCreatorStatus] = useState<boolean>(false); // Inherent creator flag (from auth source)

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState<boolean>(false); // SESSION creator status
  const [creatorName, setCreatorName] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false); 
  const [initialTicketSubject, setInitialTicketSubject] = useState<TicketSubject | undefined>(undefined); 

  const [isTemplateDetailModalOpen, setIsTemplateDetailModalOpen] = useState<boolean>(false);
  const [selectedTemplateForDetail, setSelectedTemplateForDetail] = useState<Template | null>(null);

  const isAdminAuthenticated = useCallback((): boolean => {
    const token = localStorage.getItem('broadcastMotionToken');
    const loggedInUserRaw = localStorage.getItem('broadcastMotionLoggedInUser');

    if (token && loggedInUserRaw) { 
      try {
        const loggedInUserParsed: User = JSON.parse(loggedInUserRaw);
        return !!loggedInUserParsed.isAdmin; 
      } catch (e) {
        console.error("Failed to parse user data for auth check:", e);
        return false;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    let storedUsers: User[] = [];
    const storedUsersRaw = localStorage.getItem('broadcastMotionUsers');
    if (storedUsersRaw) {
      try {
        const parsed = JSON.parse(storedUsersRaw);
        if (Array.isArray(parsed)) {
          storedUsers = parsed;
        }
      } catch (e) {
        console.error("Failed to parse users from localStorage", e);
        storedUsers = [];
      }
    }

    let adminUser = storedUsers.find(u => u.email === ADMIN_EMAIL);
    if (!adminUser) {
      adminUser = {
        id: 'admin_user_frontend_001', 
        name: 'Admin BroadcastMotion (Local)',
        email: ADMIN_EMAIL,
        passwordHash: 'admin123', 
        isAdmin: true, 
        isCreator: false,
        registrationDate: new Date().toISOString(),
      };
      storedUsers = [...storedUsers, adminUser];
    } else {
       if (adminUser.isAdmin !== true || adminUser.isCreator !== false || adminUser.passwordHash !== 'admin123') {
         storedUsers = storedUsers.map(u => u.email === ADMIN_EMAIL ? {...u, isAdmin: true, isCreator: false, passwordHash: 'admin123'} : u);
       }
    }
    setUsers(storedUsers);

    const storedCart = localStorage.getItem('broadcastMotionCart');
    if (storedCart) setCart(JSON.parse(storedCart));
    
    const storedOrders = localStorage.getItem('broadcastMotionOrders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));

    const loggedInUserRaw = localStorage.getItem('broadcastMotionLoggedInUser');
    const token = localStorage.getItem('broadcastMotionToken');

    if (loggedInUserRaw) {
        try {
            const loggedInUserParsed: User = JSON.parse(loggedInUserRaw);
            setIsLoggedIn(true);
            setUserName(loggedInUserParsed.name);
            setCurrentUserEmail(loggedInUserParsed.email);
            setCurrentUserId(loggedInUserParsed.id);
            
            setTrueAdminStatus(!!loggedInUserParsed.isAdmin); 
            setTrueCreatorStatus(!!loggedInUserParsed.isCreator); 

            setIsAdminLoggedIn(!!loggedInUserParsed.isAdmin && !!token); 
            
            setIsCreatorLoggedIn(!!loggedInUserParsed.isCreator); 
            if (loggedInUserParsed.isCreator) setCreatorName(loggedInUserParsed.name); else setCreatorName(null);

        } catch(e) {
            console.error("Failed to parse loggedInUser from localStorage", e);
            localStorage.removeItem('broadcastMotionLoggedInUser');
            localStorage.removeItem('broadcastMotionToken');
            setIsLoggedIn(false);
            setIsAdminLoggedIn(false);
            setTrueAdminStatus(false);
            setTrueCreatorStatus(false);
        }
    } else {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      setTrueAdminStatus(false);
      setTrueCreatorStatus(false);
    }
  }, []); 

  useEffect(() => { localStorage.setItem('broadcastMotionUsers', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('broadcastMotionCart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('broadcastMotionOrders', JSON.stringify(orders)); }, [orders]);
  
  useEffect(() => {
    if (isLoggedIn && userName && currentUserEmail && currentUserId) {
        const userToStore: User = { 
            id: currentUserId,
            name: userName, 
            email: currentUserEmail, 
            isAdmin: trueAdminStatus, 
            isCreator: trueCreatorStatus, 
            passwordHash: users.find(u => u.id === currentUserId)?.passwordHash || '', // Preserve existing hash if user exists
            registrationDate: users.find(u => u.id === currentUserId)?.registrationDate || new Date().toISOString()
        };
        localStorage.setItem('broadcastMotionLoggedInUser', JSON.stringify(userToStore));
    } else {
        localStorage.removeItem('broadcastMotionLoggedInUser');
    }
  }, [isLoggedIn, userName, currentUserEmail, currentUserId, trueAdminStatus, trueCreatorStatus, users]);


  useEffect(() => {
    let sectionSelectors: string[] = [];
    const navbarHeight = 80; 

    if (currentView === 'main') {
        sectionSelectors = NAV_LINKS
            .filter(link => link.href.startsWith('#')) 
            .map(link => link.href);
        sectionSelectors.push('#hero', '#how-it-works', '#templates-graficos', 
                              '#templates-graficos-broadcast', 
                              '#templates-graficos-mogrt',    
                              '#templates-graficos-chroma',   
                              '#advantages', '#about', '#custom-project-request');
    } else if (currentView === 'supportHub') {
        sectionSelectors.push('#support-hub', '#support-hub-faq'); 
    } else if (currentView === 'mogrtPage') {
        sectionSelectors.push('#pagina-mogrt'); 
    } else if (currentView === 'chromaKeyPage') {
        sectionSelectors.push('#pagina-chroma'); 
    } else if (currentView === 'adminDashboard') {
        sectionSelectors.push('#admin-dashboard-page'); 
    }


    if (sectionSelectors.length === 0 && !['creatorSignup', 'creatorDashboard', 'cart', 'checkout', 'orderSuccess', 'paymentError', 'userOrders', 'userProfile'].includes(currentView)) {
         return;
    }

    const observerOptions = { root: null, rootMargin: `-${navbarHeight}px 0px -${window.innerHeight - navbarHeight -100}px 0px`, threshold: 0.01 };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => { 
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); 
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elementsToObserve: Element[] = [];
    [...new Set(sectionSelectors)].forEach(selectorString => {
        const selector = selectorString.startsWith('#') ? selectorString : `#${selectorString}`;
        const element = document.querySelector(selector);
        if(element) {
            elementsToObserve.push(element);
            (element as HTMLElement).style.scrollMarginTop = `${navbarHeight}px`;
        }
    });
    
    elementsToObserve.forEach(section => observer.observe(section));
    return () => elementsToObserve.forEach(section => observer.unobserve(section));
  }, [currentView]); 

  const filterItems = useCallback(<T extends { category: string }>(data: T[], activeCat: string, visibleCount: number): T[] => {
    if (activeCat === 'all') return data.slice(0, visibleCount);
    return data.filter(item => item.category === activeCat).slice(0, visibleCount);
  }, []);

  useEffect(() => { 
      setFilteredTemplates(filterItems(TEMPLATES_DATA, activeCategory, visibleTemplates)); 
  }, [activeCategory, visibleTemplates, filterItems]);
  
  useEffect(() => { 
      const currentVisibleCount = currentView === 'chromaKeyPage' ? visibleChromaKeyTemplatesPage : visibleChromaKeyTemplatesMain;
      setFilteredChromaKeyTemplates(filterItems(CHROMA_KEY_TEMPLATES_DATA, activeChromaKeyCategory, currentVisibleCount)); 
  }, [activeChromaKeyCategory, visibleChromaKeyTemplatesMain, visibleChromaKeyTemplatesPage, currentView, filterItems]);

  useEffect(() => { 
      const currentVisibleCount = currentView === 'mogrtPage' ? visibleMogrtTemplatesPage : visibleMogrtTemplatesMain;
      setFilteredMogrtTemplates(filterItems(MOGRT_TEMPLATES_DATA, activeMogrtCategory, currentVisibleCount)); 
  }, [activeMogrtCategory, visibleMogrtTemplatesMain, visibleMogrtTemplatesPage, currentView, filterItems]);



  const handleChangeView = (view: AppView, eOrTargetId?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | string) => {
    let targetIdForScroll: string | null = null;

    if (typeof eOrTargetId === 'string') {
        if (eOrTargetId.startsWith('#')) {
            targetIdForScroll = eOrTargetId.substring(1);
        } else {
            targetIdForScroll = eOrTargetId;
        }
    } else if (eOrTargetId && eOrTargetId.currentTarget) {
      const currentTarget = eOrTargetId.currentTarget as HTMLAnchorElement | HTMLButtonElement;
      const hrefFromEvent = currentTarget.getAttribute('href');
      if (hrefFromEvent?.startsWith('#')) {
        targetIdForScroll = hrefFromEvent.substring(1);
      }
      if (eOrTargetId.metaKey || eOrTargetId.ctrlKey) return; 
      eOrTargetId.preventDefault();
    }
  
    setCurrentView(view); 
  
    setTimeout(() => {
      let elementToScrollTo: HTMLElement | null = null;
      if (targetIdForScroll) {
        elementToScrollTo = document.getElementById(targetIdForScroll);
      }
      
      if (elementToScrollTo) {
        const navbarHeight = 80; 
        const elementPosition = elementToScrollTo.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setActiveSection(targetIdForScroll); 
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (view === 'main') setActiveSection('hero');
        else if (view === 'supportHub') setActiveSection('support-hub');
        else if (view === 'mogrtPage') setActiveSection('pagina-mogrt');
        else if (view === 'chromaKeyPage') setActiveSection('pagina-chroma');
        else if (view === 'adminDashboard') setActiveSection('admin-dashboard-page');
      }
    }, 0);
  };


  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);
  
  const handleLoginSuccess = (email: string, name: string, userId?: string, userIsAdminFromAuth?: boolean, userIsCreatorFromAuth?: boolean, token?: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentUserEmail(email);
    const newUserId = userId || `user_${Date.now()}`;
    setCurrentUserId(newUserId);

    if (token) {
      localStorage.setItem('broadcastMotionToken', token);
    } else {
      localStorage.removeItem('broadcastMotionToken');
    }
    
    const inherentAdminStatus = !!userIsAdminFromAuth;
    const inherentCreatorStatus = !!userIsCreatorFromAuth;

    setTrueAdminStatus(inherentAdminStatus);
    setTrueCreatorStatus(inherentCreatorStatus);
    
    const sessionIsAdmin = inherentAdminStatus && !!token;
    setIsAdminLoggedIn(sessionIsAdmin);

    const sessionIsCreator = (email === ADMIN_EMAIL && inherentAdminStatus) ? false : inherentCreatorStatus;
    setIsCreatorLoggedIn(sessionIsCreator);

    if (sessionIsCreator && !(sessionIsAdmin && email === ADMIN_EMAIL)) {
        setCreatorName(name);
    } else {
        setCreatorName(null); 
    }

    setIsAuthModalOpen(false);
    alert(`Login bem-sucedido! Bem-vindo(a), ${name}!`);

    if (postLoginAction) {
      postLoginAction();
      setPostLoginAction(null);
    } else if (sessionIsAdmin) { 
        handleChangeView('adminDashboard');
    }
  };
  
  const handleRegisterSuccess = (name: string, email: string) => {
    const newUserId = `user_${Date.now()}`;
    const newUser: User = { 
        id: newUserId, name, email, 
        passwordHash: 'simulated_hash_' + Date.now().toString(), 
        isAdmin: false,
        isCreator: false, 
        registrationDate: new Date().toISOString(),
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    
    handleLoginSuccess(email, name, newUserId, false, false, undefined); 

    if (postLoginAction) {
      postLoginAction();
      setPostLoginAction(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUserName(null); setCurrentUserEmail(null); setCurrentUserId(null);
    setIsCreatorLoggedIn(false); setCreatorName(null); 
    setIsAdminLoggedIn(false); 
    setTrueAdminStatus(false); 
    setTrueCreatorStatus(false);
    setAppliedCoupon(null); 
    localStorage.removeItem('broadcastMotionLoggedInUser'); 
    localStorage.removeItem('broadcastMotionToken'); 
    alert('Você foi desconectado.');
    handleChangeView('main'); 
  };

  const handleCreatorSignupSuccess = (data: CreatorSignupData) => {
    let targetUser = users.find(u => u.email === data.email);
    let updatedUserId = targetUser?.id;

    if (!targetUser) {
        updatedUserId = `creator_${Date.now()}`;
        const newCreatorUser: User = {
            id: updatedUserId,
            name: data.fullName,
            email: data.email,
            passwordHash: data.password, 
            isCreator: true,
            isAdmin: false, 
            registrationDate: new Date().toISOString(),
        };
        setUsers(prev => [...prev, newCreatorUser]);
    } else {
        updatedUserId = targetUser.id; // Ensure ID is set if user exists
        setUsers(prevUsers => prevUsers.map(u => 
            u.id === targetUser!.id 
            ? { ...u, isCreator: true, name: data.fullName, passwordHash: data.password } 
            : u
        ));
    }
    
    handleLoginSuccess(data.email, data.fullName, updatedUserId, false, true, undefined); 
    alert(`Cadastro de criador bem-sucedido, ${data.fullName}! Você será redirecionado para o seu painel.`);
    setCurrentView('creatorDashboard');
  };
  
  const createLoadMoreHandler = <T extends { category: string }>(
    data: T[], activeCat: string, setVisibleCount: React.Dispatch<React.SetStateAction<number>>, increment: number
  ) => () => {
    setVisibleCount(prev => {
      const totalAvailable = activeCat === 'all' ? data.length : data.filter(t => t.category === activeCat).length;
      return Math.min(prev + increment, totalAvailable);
    });
  };
  
  const handleLoadMoreTemplates = createLoadMoreHandler(TEMPLATES_DATA, activeCategory, setVisibleTemplates, 8);
  
  const handleLoadMoreChromaKeyTemplatesMain = createLoadMoreHandler(CHROMA_KEY_TEMPLATES_DATA, activeChromaKeyCategory, setVisibleChromaKeyTemplatesMain, 4);
  const handleLoadMoreChromaKeyTemplatesPage = createLoadMoreHandler(CHROMA_KEY_TEMPLATES_DATA, activeChromaKeyCategory, setVisibleChromaKeyTemplatesPage, 8);

  const handleLoadMoreMogrtTemplatesMain = createLoadMoreHandler(MOGRT_TEMPLATES_DATA, activeMogrtCategory, setVisibleMogrtTemplatesMain, 4);
  const handleLoadMoreMogrtTemplatesPage = createLoadMoreHandler(MOGRT_TEMPLATES_DATA, activeMogrtCategory, setVisibleMogrtTemplatesPage, 8);


  const canLoadMore = <T extends { category: string }>(data: T[], activeCat: string, visibleCount: number): boolean => {
    const totalAvailable = activeCat === 'all' ? data.length : data.filter(t => t.category === activeCat).length;
    return visibleCount < totalAvailable;
  };

  const handleCategoryChange = (categoryFilterValue: string) => { setActiveCategory(categoryFilterValue); setVisibleTemplates(INITIAL_VISIBLE_TEMPLATES); };
  
  const handleChromaKeyCategoryChange = (categoryFilterValue: string) => { 
    setActiveChromaKeyCategory(categoryFilterValue); 
    setVisibleChromaKeyTemplatesMain(INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_IN_MAIN); 
    setVisibleChromaKeyTemplatesPage(INITIAL_VISIBLE_CHROMA_KEY_TEMPLATES_PAGE);
  };
  const handleMogrtCategoryChange = (categoryFilterValue: string) => { 
    setActiveMogrtCategory(categoryFilterValue); 
    setVisibleMogrtTemplatesMain(INITIAL_VISIBLE_MOGRT_TEMPLATES_IN_MAIN);
    setVisibleMogrtTemplatesPage(INITIAL_VISIBLE_MOGRT_TEMPLATES_PAGE);
  };


  const addToCart = (itemToAdd: Template | ChromaKeyTemplate | MogrtTemplate, type?: 'template' | 'chromaKey' | 'mogrt') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        alert(`${itemToAdd.name} já está no carrinho.`);
        return prevCart;
      }
      const imageUrl = 'staticThumbnailUrl' in itemToAdd ? itemToAdd.staticThumbnailUrl : itemToAdd.imageUrl;
      return [...prevCart, { 
        id: itemToAdd.id, 
        name: itemToAdd.name, 
        imageUrl: imageUrl, 
        price: itemToAdd.price, 
        quantity: 1,
        type: type 
      }];
    });
  };

  const removeFromCart = (templateId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== templateId));
    if (appliedCoupon) {
        const subtotal = cart.filter(item => item.id !== templateId).reduce((sum, item) => sum + item.price * item.quantity, 0);
        if(appliedCoupon.minPurchase && subtotal < appliedCoupon.minPurchase){
            setAppliedCoupon(null);
            alert(`Cupom ${appliedCoupon.code} removido pois o valor mínimo da compra não foi atingido.`);
        }
    }
  };

  const calculateCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.minPurchase && subtotal < appliedCoupon.minPurchase) {
        // Coupon is technically invalid 
      } else {
        if (appliedCoupon.discountType === 'percentage') {
          discount = subtotal * (appliedCoupon.value / 100);
        } else {
          discount = appliedCoupon.value;
        }
        discount = Math.min(discount, subtotal);
      }
    }
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };
  
  const handleApplyCouponCode = (code: string): string => {
    const coupon = COUPONS_DATA.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    const currentSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!coupon) {
      setAppliedCoupon(null);
      return "Cupom inválido ou inativo.";
    }
    if (coupon.minPurchase && currentSubtotal < coupon.minPurchase) {
      setAppliedCoupon(null); 
      return `Este cupom requer uma compra mínima de R$${coupon.minPurchase.toFixed(2)}. Subtotal atual: R$${currentSubtotal.toFixed(2)}`;
    }
    setAppliedCoupon(coupon);
    return `Cupom "${coupon.code}" aplicado! ${coupon.description || ''}`;
  };

  const handleAttemptPurchase = (itemToPurchase: Template | ChromaKeyTemplate | MogrtTemplate, type?: 'template' | 'chromaKey' | 'mogrt') => {
    const action = () => {
      addToCart(itemToPurchase, type);
      handleChangeView('cart');
    };
    if (!isLoggedIn) {
      setPostLoginAction(() => action); 
      handleOpenAuthModal();
    } else {
      action();
    }
  };
  
  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      alert("Por favor, faça login para finalizar a compra.");
      setPostLoginAction(() => () => handleChangeView('checkout'));
      handleOpenAuthModal();
      return;
    }
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      handleChangeView('main', '#templates-graficos'); 
      return;
    }
    handleChangeView('checkout');
  };

  const handlePlaceOrder = async (paymentDetails: PaymentDetails) => {
    if (!isLoggedIn || !currentUserId || !currentUserEmail || !userName) { 
      alert("Erro: Usuário não está logado ou dados incompletos. Por favor, tente novamente.");
      handleChangeView('cart');
      return;
    }
    
    console.log("Processando pagamento...", paymentDetails);
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    const paymentSuccessful = !(paymentDetails.method === 'credit_card' && paymentDetails.cardDetails?.number.endsWith('0000'));

    const { subtotal, discount, total } = calculateCartTotals(); 
    const orderBase = {
        userId: currentUserId,
        items: [...cart],
        subtotal,
        discountApplied: discount,
        couponCode: appliedCoupon?.code,
        total,
        orderDate: new Date().toISOString(),
        paymentMethod: paymentDetails.method,
        buyerDetails: { 
            name: paymentDetails.buyerInfo.name || userName,
            email: paymentDetails.buyerInfo.email || currentUserEmail,
            cpf: paymentDetails.buyerInfo.cpf,
        },
    };

    if (paymentSuccessful) {
      const newOrder: Order = {
        ...orderBase,
        id: `ORD-${Date.now()}`,
        status: 'completed',
        downloadLinks: cart.map(item => ({ 
            templateId: item.id, 
            name: item.name,
            link: `/download/simulated/${item.id}/${Date.now()}` 
        })),
      };
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setLastOrder(newOrder);
      setCart([]);
      setAppliedCoupon(null);
      console.log(`Email de confirmação simulado enviado para ${newOrder.buyerDetails.email} com detalhes do pedido ${newOrder.id} e links para download.`);
      handleChangeView('orderSuccess');
    } else {
       const failedOrderAttempt: Order = { 
        ...orderBase,
        id: `FAIL-${Date.now()}`,
        status: 'failed',
      };
      setLastOrder(failedOrderAttempt); 
      console.warn("Pagamento falhou. Detalhes:", paymentDetails);
      handleChangeView('paymentError');
    }
  };

  const handleOpenTicketModal = (subject?: TicketSubject) => {
    setInitialTicketSubject(subject);
    setIsTicketModalOpen(true);
  };
  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
    setInitialTicketSubject(undefined); 
  };
  const handleSubmitTicket = (ticketData: TicketData) => {
    console.log("Novo chamado de suporte:", ticketData);
    alert(`Chamado sobre "${TICKET_SUBJECTS_PT[ticketData.subject] || ticketData.subject}" enviado com sucesso! Entraremos em contato em breve no e-mail ${ticketData.email}. (Simulação)`);
    handleCloseTicketModal();
  };

  const handleOpenTemplateDetailModal = (template: Template) => {
    setSelectedTemplateForDetail(template);
    setIsTemplateDetailModalOpen(true);
  };
  const handleCloseTemplateDetailModal = () => {
    setIsTemplateDetailModalOpen(false);
    setSelectedTemplateForDetail(null);
  };
  const handleCustomizeRedirectFromModal = (templateId: string) => {
    handleChangeView('main', '#custom-project-request'); 
  };


  const renderMainContent = () => (
    <>
      <HeroSection onChangeView={handleChangeView} />
      <HowItWorksSection />
      
      <section id="templates-graficos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Nossos Templates Gráficos</h2>
            <p className="text-xl text-gray-600 mt-2">Explore nossa coleção completa de templates para TV, Premiere Pro e Chroma Key.</p>
          </div>

          {/* Subsection: Broadcast TV */}
          <section id="templates-graficos-broadcast" className="mb-16">
            <div className="text-left mb-8">
              <h3 className="text-3xl font-semibold text-gray-800">Broadcast TV</h3>
              <p className="text-lg text-gray-500 mt-1">Soluções gráficas para TV, streaming, vídeos institucionais e conteúdos digitais.</p>
            </div>
            <CategoryTabs categories={CATEGORIES_DATA} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
            <TemplateGrid 
              templates={filteredTemplates} 
              onLoadMore={handleLoadMoreTemplates} 
              canLoadMore={canLoadMore(TEMPLATES_DATA, activeCategory, visibleTemplates)}
              onAttemptPurchase={(template) => handleAttemptPurchase(template, 'template')}
              onOpenDetailModal={handleOpenTemplateDetailModal}
            />
          </section>

          {/* Subsection: Mockups .MOGRT */}
          <section id="templates-graficos-mogrt" className="my-16 pt-10 border-t border-gray-200">
            <div className="text-left mb-8">
              <h3 className="text-3xl font-semibold text-gray-800">Mockups .MOGRT para Premiere</h3>
              <p className="text-lg text-gray-500 mt-1">Templates editáveis direto no Adobe Premiere Pro.</p>
            </div>
            <CategoryTabs 
                categories={MOGRT_CATEGORIES_DATA.map(c => ({ id: c.id, name: c.name, filterValue: c.filterValue }))} 
                activeCategory={activeMogrtCategory} 
                onCategoryChange={handleMogrtCategoryChange} 
            />
            {filteredMogrtTemplates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 mt-8">
                {filteredMogrtTemplates.map(template => (
                    <MogrtCard key={template.id} template={template} onAttemptPurchase={(t) => handleAttemptPurchase(t, 'mogrt')} />
                ))}
                </div>
            ) : (
                <div className="text-center py-10 mt-8">
                    <p className="text-xl text-gray-500">Nenhum mockup .MOGRT encontrado para esta categoria.</p>
                </div>
            )}
            {canLoadMore(MOGRT_TEMPLATES_DATA, activeMogrtCategory, visibleMogrtTemplatesMain) && (
                <div className="text-center mt-12">
                <button 
                    onClick={handleLoadMoreMogrtTemplatesMain}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-md text-lg font-semibold"
                >
                    Carregar Mais .MOGRTs
                </button>
                </div>
            )}
          </section>

          {/* Subsection: Chroma Key */}
          <section id="templates-graficos-chroma" className="my-16 pt-10 border-t border-gray-200">
            <div className="text-left mb-8">
                <h3 className="text-3xl font-semibold text-gray-800">Chroma Key & Cenários Virtuais</h3>
                <p className="text-lg text-gray-500 mt-1">Fundos e elementos para produções com chroma key.</p>
            </div>
            <CategoryTabs 
                categories={CHROMA_KEY_CATEGORIES_DATA.map(c => ({ id: c.id, name: c.name, filterValue: c.filterValue }))} 
                activeCategory={activeChromaKeyCategory} 
                onCategoryChange={handleChromaKeyCategoryChange} 
            />
            {filteredChromaKeyTemplates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {filteredChromaKeyTemplates.map(template => (
                    <ChromaKeyCard key={template.id} template={template} onAttemptPurchase={(t) => handleAttemptPurchase(t, 'chromaKey')} />
                ))}
                </div>
            ) : (
                <div className="text-center py-10 mt-8">
                    <p className="text-xl text-gray-500">Nenhum template de chroma key encontrado para esta categoria.</p>
                </div>
            )}
            {canLoadMore(CHROMA_KEY_TEMPLATES_DATA, activeChromaKeyCategory, visibleChromaKeyTemplatesMain) && (
                <div className="text-center mt-12">
                <button 
                    onClick={handleLoadMoreChromaKeyTemplatesMain}
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-md text-lg font-semibold"
                >
                    Carregar Mais Chroma Key
                </button>
                </div>
            )}
          </section>
        </div>
      </section>
      
      <AdvantagesSection />
      <AboutSection />
      <CustomProjectFormSection /> 
      <CtaSection 
        onChangeView={handleChangeView}
      />
    </>
  );

  const cartTotals = calculateCartTotals();

  return (
    <>
      <Navbar 
        navLinks={NAV_LINKS} activeSection={activeSection}
        onOpenAuthModal={handleOpenAuthModal} 
        isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout}
        onChangeView={handleChangeView}
        cartItemCount={cart.length}
        isAdminAuthenticated={isAdminAuthenticated()}
      />
      <main className="pt-0"> 
        {currentView === 'main' && renderMainContent()}
        {currentView === 'mogrtPage' && 
            <MogrtPage
                categories={MOGRT_CATEGORIES_DATA.map(c => ({ id: c.id, name: c.name, filterValue: c.filterValue }))}
                activeCategory={activeMogrtCategory}
                onCategoryChange={handleMogrtCategoryChange}
                templates={filteredMogrtTemplates} 
                onLoadMore={handleLoadMoreMogrtTemplatesPage}
                canLoadMore={canLoadMore(MOGRT_TEMPLATES_DATA, activeMogrtCategory, visibleMogrtTemplatesPage)}
                onAttemptPurchase={(template) => handleAttemptPurchase(template, 'mogrt')}
                onChangeView={handleChangeView}
            />
        }
        {currentView === 'chromaKeyPage' &&
            <ChromaKeyPage
                categories={CHROMA_KEY_CATEGORIES_DATA.map(c => ({ id: c.id, name: c.name, filterValue: c.filterValue }))}
                activeCategory={activeChromaKeyCategory}
                onCategoryChange={handleChromaKeyCategoryChange}
                templates={filteredChromaKeyTemplates} 
                onLoadMore={handleLoadMoreChromaKeyTemplatesPage}
                canLoadMore={canLoadMore(CHROMA_KEY_TEMPLATES_DATA, activeChromaKeyCategory, visibleChromaKeyTemplatesPage)}
                onAttemptPurchase={(template) => handleAttemptPurchase(template, 'chromaKey')}
                onChangeView={handleChangeView}
            />
        }
        {currentView === 'supportHub' && 
            <SupportHubPage 
                onChangeView={handleChangeView}
                onOpenTicketModal={handleOpenTicketModal}
                isLoggedIn={isLoggedIn}
                isCreatorLoggedIn={isCreatorLoggedIn}
                onOpenAuthModal={handleOpenAuthModal}
            />
        }
        {currentView === 'creatorSignup' && <CreatorSignupPage onSignupSuccess={handleCreatorSignupSuccess} />}
        {currentView === 'creatorDashboard' && isCreatorLoggedIn && <CreatorDashboardPage creatorName={creatorName || "Criador"} onNavigateHome={() => handleChangeView('main')} />}
        {currentView === 'creatorDashboard' && !isCreatorLoggedIn && (
            <div className="py-20 text-center">
                <p className="text-2xl text-red-600 mb-4">Acesso Negado</p>
                <p className="text-lg text-gray-700 mb-6">Você precisa estar logado como criador para acessar esta página.</p>
                <button onClick={() => {
                    if (isLoggedIn) handleChangeView('creatorSignup'); 
                    else { 
                        setPostLoginAction(() => () => handleChangeView('creatorSignup'));
                        handleOpenAuthModal();
                    }
                }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
                    {isLoggedIn ? 'Tornar-se Criador' : 'Login para Criadores'}
                </button>
            </div>
        )}
        {currentView === 'adminDashboard' && isAdminAuthenticated() && (
          <AdminDashboardPage 
            adminName={userName || "Admin"} 
            users={users}
            orders={orders}
            templates={TEMPLATES_DATA}
            mogrtTemplates={MOGRT_TEMPLATES_DATA}
            chromaKeyTemplates={CHROMA_KEY_TEMPLATES_DATA}
            coupons={COUPONS_DATA} 
          />
        )}
        {currentView === 'adminDashboard' && !isAdminAuthenticated() && (
           <div className="py-20 text-center">
                <p className="text-2xl text-red-600 mb-4">Acesso Negado ao Painel Administrativo</p>
                <p className="text-lg text-gray-700 mb-6">Você não tem permissão para acessar esta área ou sua sessão expirou.</p>
                <button onClick={() => {
                    if (!isLoggedIn) {
                        setPostLoginAction(() => () => {
                            if (isAdminAuthenticated()) { 
                                handleChangeView('adminDashboard');
                            } else {
                                handleChangeView('main'); 
                            }
                        });
                        handleOpenAuthModal();
                    } else { 
                        handleChangeView('main');
                    }
                }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
                    {isLoggedIn ? 'Voltar à Loja' : 'Fazer Login'}
                </button>
            </div>
        )}
        {currentView === 'cart' && 
            <CartPage 
                cartItems={cart}
                removeFromCart={removeFromCart}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={handleApplyCouponCode}
                subtotal={cartTotals.subtotal}
                discount={cartTotals.discount}
                total={cartTotals.total}
                onProceedToCheckout={handleProceedToCheckout}
                isLoggedIn={isLoggedIn}
                onLoginRequest={() => {
                    setPostLoginAction(() => () => handleChangeView('cart')); 
                    handleOpenAuthModal();
                }}
                onChangeView={handleChangeView}
            />
        }
        {currentView === 'checkout' && isLoggedIn &&
            <CheckoutPage 
                cartItems={cart}
                total={cartTotals.total}
                onSubmitOrder={handlePlaceOrder}
                currentUserEmail={currentUserEmail}
                currentUserName={userName}
            />
        }
        {currentView === 'checkout' && !isLoggedIn && 
             <div className="py-20 text-center">
                <p className="text-2xl text-red-600 mb-4">Acesso Negado</p>
                <p className="text-lg text-gray-700 mb-6">Você precisa estar logado para acessar o checkout.</p>
                <button onClick={() => handleChangeView('cart')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
                    Voltar ao Carrinho
                </button>
            </div>
        }
        {currentView === 'orderSuccess' && lastOrder &&
            <OrderSuccessPage order={lastOrder} onContinueShopping={() => handleChangeView('main')} onViewOrders={() => handleChangeView('userOrders')}/>
        }
         {currentView === 'paymentError' && 
            <PaymentErrorPage onRetry={() => handleChangeView('checkout')} onGoToShop={() => handleChangeView('main')} orderAttempt={lastOrder} />
        }
        {currentView === 'userOrders' && isLoggedIn && currentUserId &&
            <UserOrdersPage orders={orders.filter(o => o.userId === currentUserId)} onNavigateToShop={() => handleChangeView('main')} />
        }
         {currentView === 'userOrders' && !isLoggedIn && 
             <div className="py-20 text-center">
                <p className="text-2xl text-red-600 mb-4">Acesso Negado</p>
                <p className="text-lg text-gray-700 mb-6">Você precisa estar logado para ver seus pedidos.</p>
                <button onClick={() => {
                    setPostLoginAction(() => () => handleChangeView('userOrders'));
                    handleOpenAuthModal();
                }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
                    Fazer Login
                </button>
            </div>
        }
        {currentView === 'userProfile' && isLoggedIn && (
            <div className="container mx-auto py-20 px-4 text-center bg-white shadow-lg rounded-lg my-8 max-w-md">
                <i className="fas fa-user-circle text-5xl text-blue-500 mb-4"></i>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Meu Perfil</h2>
                <p className="text-gray-600 mb-6">Aqui estão suas informações de usuário.</p>
                <div className="text-left space-y-3">
                    <p><strong className="text-gray-700">Nome:</strong> <span className="text-gray-600">{userName}</span></p>
                    <p><strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{currentUserEmail}</span></p>
                    <p><strong className="text-gray-700">ID de Usuário:</strong> <span className="text-gray-500 text-sm">{currentUserId}</span></p>
                    {isCreatorLoggedIn && <p><strong className="text-gray-700">Status:</strong> <span className="text-green-600 font-semibold">Criador Verificado</span></p>}
                     {isAdminAuthenticated() && <p><strong className="text-gray-700">Status:</strong> <span className="text-purple-600 font-semibold">Administrador</span></p>}
                </div>
                <p className="mt-8 text-sm text-gray-500 italic">(Esta é uma página de perfil básica. Funcionalidades adicionais podem ser implementadas aqui.)</p>
                 <button 
                    onClick={() => handleChangeView('main')} 
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
                  >
                   Voltar à Loja
                  </button>
            </div>
        )}
        {currentView === 'userProfile' && !isLoggedIn && (
            <div className="py-20 text-center">
                <p className="text-2xl text-red-600 mb-4">Acesso Negado</p>
                <p className="text-lg text-gray-700 mb-6">Você precisa estar logado para acessar seu perfil.</p>
                 <button onClick={() => {
                    setPostLoginAction(() => () => handleChangeView('userProfile'));
                    handleOpenAuthModal();
                }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
                    Fazer Login
                </button>
            </div>
        )}

      </main>
      <Footer />
      {isAuthModalOpen && (
        <AuthenticationModal
          isOpen={isAuthModalOpen}
          onClose={handleCloseAuthModal}
          onLoginSuccess={(email, name, userId, isAdmin, isCreator, token) => {
             handleLoginSuccess(email, name, userId, isAdmin, isCreator, token);
          }}
          onRegisterSuccess={handleRegisterSuccess}
          isEmailTaken={(email: string) => users.some(user => user.email === email)}
          findUserByEmail={(email: string) => users.find(user => user.email === email)}
        />
      )}
      {isTicketModalOpen && ( 
        <OpenTicketModal
            isOpen={isTicketModalOpen}
            onClose={handleCloseTicketModal}
            onSubmit={handleSubmitTicket}
            userName={userName || undefined}
            userEmail={currentUserEmail || undefined}
            initialSubject={initialTicketSubject}
        />
      )}
      {isTemplateDetailModalOpen && selectedTemplateForDetail && (
        <TemplateDetailModal
          isOpen={isTemplateDetailModalOpen}
          onClose={handleCloseTemplateDetailModal}
          template={selectedTemplateForDetail}
          onAttemptPurchase={handleAttemptPurchase}
          onCustomizeRedirect={handleCustomizeRedirectFromModal}
        />
      )}
    </>
  );
};

export default App;
