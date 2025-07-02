export interface NavItem {
  label: string;
  href: string; // Can be a #hash, a view name like 'cart', or a special trigger like '#support-hub-trigger'
  activeId?: string;
  submenuItems?: NavItem[]; // Added for dropdown submenus
}

export interface Template {
  id: string;
  name:string;
  imageUrl: string;
  price: number;
  category: string; 
  categoryDisplayName: string; 
  categoryColorClass: string; 
  detailedDescription: string;
  features: string[];
  softwareCompatibility: string[];
  resolution: string;
  duration?: string; // e.g., "15 segundos", "Loopable"
  fileFormat?: string; // e.g., ".gtzip", ".aep"
}

export interface Category {
  id: string;
  name: string; 
  filterValue: string; 
}

export interface ChromaKeyTemplate {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string; // e.g., "news", "talkshow"
  categoryDisplayName: string; // e.g., "Jornal", "Talk Show"
  categoryColorClass: string; // e.g., "text-red-600"
}

export interface ChromaKeyCategory {
  id: string;
  name: string;
  filterValue: string;
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
}

export interface Advantage {
  id: number;
  iconClass: string;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
}

export interface DifferentialItem {
  id: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
}

export type AuthMode = 'login' | 'register';

// For Creator Signup
export interface Software {
  id: string;
  label: string;
}

export interface Specialization {
  id: string;
  label: string;
}

export interface CreatorSignupData {
  fullName: string;
  email: string;
  password: string; 
  confirmPassword: string; 
  portfolioLink: string;
  softwares: { [key: string]: boolean };
  specialization: string;
  otherSpecialization?: string;
  termsAccepted: boolean;
}

// For Template Upload
export interface TemplateUploadData {
  zipFile: File | null;
  projectName: string;
  category: string; // Corresponds to TemplateUploadCategory id
  price: string; // Keep as string for input, convert to number on submission
  description: string;
  coverImage: File | null;
  previewImage: File | null;
  youtubeLink?: string;
  authorDeclaration: boolean;
}

export interface TemplateUploadCategory {
  id: string;
  label: string;
}


export interface InspirationalQuote {
  id: string;
  text: string;
}

// E-commerce Types
export interface CartItem {
  id: string; // Corresponds to Template['id'] or MogrtTemplate['id']
  name: string;
  imageUrl: string; // For MOGRTs, this could be staticThumbnailUrl
  price: number;
  quantity: number;
  type?: 'template' | 'chromaKey' | 'mogrt'; // Optional: to differentiate item types in cart
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description?: string;
  minPurchase?: number; // Optional: minimum purchase amount for coupon to be valid
  isActive?: boolean; // For admin management
  usageCount?: number; // For admin tracking
  expiryDate?: string; // For admin management
}

export interface Order {
  id: string;
  userId: string; // ID of the logged-in user
  items: CartItem[];
  subtotal: number;
  discountApplied: number; // Amount of discount from coupon
  couponCode?: string; // Code of the applied coupon
  total: number;
  orderDate: string; // ISO date string
  status: 'pending_payment' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: string;
  // Simulated download links based on items
  downloadLinks?: { templateId: string; link: string; name: string }[]; 
  buyerDetails: {
    name: string;
    email: string;
    cpf: string;
  };
}

export interface PaymentDetails {
  method: 'credit_card' | 'pix' | 'boleto';
  buyerInfo: {
    name: string;
    email: string;
    cpf: string;
  };
  cardDetails?: { // Only if method is 'credit_card'
    number: string;
    expiry: string;
    cvv: string;
    nameOnCard: string;
  };
}

// User interface used in App.tsx and Admin Panel
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Simulated
  isCreator?: boolean; // For distinguishing creators
  isAdmin?: boolean;   // For distinguishing admins
  registrationDate?: string; // ISO Date string
}


export type AppView = 
  | 'main' 
  | 'creatorSignup' 
  | 'creatorDashboard'
  | 'cart'
  | 'checkout'
  | 'orderSuccess'
  | 'paymentError'
  | 'userOrders'
  | 'userProfile'
  | 'supportHub'
  | 'mogrtPage' 
  | 'chromaKeyPage'
  | 'adminDashboard'; // Added for Admin Panel

// Support Hub Types
export interface SupportCardItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Font Awesome class, e.g., "fas fa-palette"
  iconBgColor: string; // Tailwind CSS class, e.g., "bg-purple-500"
  iconTextColor: string; // Tailwind CSS class, e.g., "text-white"
  actionType: 'link' | 'modal' | 'view'; // 'link' for anchors, 'modal' for opening ticket modal, 'view' for changing AppView
  actionValue: string; // URL (e.g. #anchor), modalId (e.g. openTicketModal_subject), or AppView name
  requiresAuth?: boolean; // If true, user must be logged in
  authAction?: 'creatorSignup' | 'login'; // View to navigate to if auth is required and user is not logged in, or specific action for creator
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string; // Can include HTML for rich text (use dangerouslySetInnerHTML)
}

export type TicketStatus = 'open' | 'pending_reply' | 'closed' | 'resolved';

export interface TicketData {
  id?: string; // Optional: can be added when stored/retrieved
  name: string;
  email: string;
  subject: TicketSubject; // Use the specific TicketSubject type
  description: string;
  attachment?: File | null;
  submittedDate?: string; // ISO Date string
  status?: TicketStatus; 
}

export type TicketSubject = 
  | "doubt" 
  | "template_issue" 
  | "customization_request"
  | "system_integration"
  | "suggestion"
  | "billing"
  | "other"
  // Added from SupportCardItem actions
  | "instalação" 
  | "consultoria"
  | "problema"
  // Added for MOGRT page
  | "mogrt_support";


export const TICKET_SUBJECTS_PT: Record<TicketSubject, string> = {
  doubt: "Dúvida Técnica Geral",
  template_issue: "Problema com Template Adquirido",
  customization_request: "Solicitação de Personalização",
  system_integration: "Ajuda com Integração de Sistema",
  suggestion: "Sugestão ou Feedback",
  billing: "Questões sobre Pagamento/Cobrança",
  other: "Outro Assunto",
  instalação: "Instalação e Integração", 
  consultoria: "Falar com um Especialista",
  problema: "Reportar Problema Técnico",
  mogrt_support: "Suporte para .MOGRT",
};

export const TICKET_STATUS_PT: Record<TicketStatus, string> = {
  open: "Aberto",
  pending_reply: "Aguardando Resposta",
  closed: "Fechado",
  resolved: "Resolvido",
};


// MOGRT Page Types
export interface MogrtCategory {
  id: string;
  name: string;
  filterValue: string;
  icon?: string; // e.g., "fas fa-film"
}

export interface MogrtTemplateSpecification {
  premiereVersion: string; // e.g., "CC 2020+"
  resolution: string; // e.g., "Full HD / 4K"
  customizable: string[]; // e.g., ["Texto", "Cor", "Logo"]
  background: string; // e.g., "Transparente"
}

export interface MogrtTemplate {
  id: string;
  name: string;
  staticThumbnailUrl: string; // URL for static image
  animatedThumbnailUrl?: string; // Optional: URL for GIF or short video loop
  price: number;
  category: string; // Corresponds to MogrtCategory filterValue
  categoryDisplayName: string;
  specifications: MogrtTemplateSpecification;
  isNichePackage?: boolean; // To identify items for the "Pacotes Prontos por Nicho" section
  nichePackageDetails?: { // Details if it's a niche package
    icon: string; // e.g. "fas fa-podcast"
    titleHighlight: string; // e.g. "Kit Podcast Pro"
  };
}

export interface MogrtUsageStep {
  id: number;
  instruction: string;
}

// Admin Panel Types
export type AdminSectionType = 
  | 'overview'
  | 'manageTemplates' // For Broadcast TV Templates
  | 'manageMogrts'
  | 'manageChromaKey'
  | 'manageOrders'
  | 'manageUsers'
  | 'manageCoupons'
  | 'manageCreators' 
  | 'manageSupportTickets' // New section for support tickets
  | 'siteSettings'
  | 'reportsAnalytics';

export interface AdminNavItem {
    id: AdminSectionType;
    label: string;
    icon: string; // Font Awesome class
}

export interface SimulatedTicket extends TicketData {
  id: string; // Make ID mandatory for simulated data
  status: TicketStatus; // Make status mandatory
  submittedDate: string; // Make submittedDate mandatory
}