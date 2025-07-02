
import React, { useState, useEffect } from 'react';
// ADMIN_EMAIL from constants is for frontend-specific logic (e.g. initial user creation),
// the actual login credential check is done by the backend.
// import { ADMIN_EMAIL } from '../constants'; 
import { User } from '../types'; 

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, name: string, userId?: string, isAdmin?: boolean, isCreator?: boolean, token?: string) => void;
  onRegisterSuccess: (name: string, email: string) => void;
  initialView?: 'login' | 'register';
  isEmailTaken: (email: string) => boolean; 
  findUserByEmail: (email: string) => User | undefined; 
}

const BACKEND_API_URL = "https://broadcastmotion-backend.onrender.com"; 

export const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  initialView = 'login',
  isEmailTaken,
  findUserByEmail, 
}) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(initialView);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentView(initialView);
      setError(null); 
      setName('');
      setEmail('');
      setPassword('');
      setTermsAccepted(false);
    }
  }, [isOpen, initialView]);

  const switchToRegister = () => {
    setCurrentView('register');
    setError(null);
  };

  const switchToLogin = () => {
    setCurrentView('login');
    setError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Por favor, preencha e-mail e senha.');
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Token is now stored by the caller (App.tsx -> handleLoginSuccess)
        // or can be stored here if preferred, but App.tsx needs it too.
        // For now, pass it to onLoginSuccess as requested.
        if (data.token) {
             localStorage.setItem('broadcastMotionToken', data.token); // Store token here
        }
        onLoginSuccess(
          data.user.email,
          data.user.name,
          data.user.id,
          data.user.isAdmin,
          false, // isCreator defaults to false from this endpoint
          data.token 
        );
      } else {
        setError(data.message || 'Falha no login. Verifique suas credenciais.');
      }
    } catch (networkError) {
      console.error("Network error during login:", networkError);
      setError('Erro de conexão. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (!termsAccepted) {
      setError('Você deve aceitar os termos de uso.');
      return;
    }
    if (isEmailTaken(email)) { 
      setError('Este e-mail já está cadastrado. Tente fazer login.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    onRegisterSuccess(name, email); 
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const advantages = [
    { id: 1, text: "Salve seus projetos favoritos" },
    { id: 2, text: "Receba novidades exclusivas" },
    { id: 3, text: "Negocie com segurança e suporte" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex overflow-hidden relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Fechar modal"
        >
          <i className="fas fa-times fa-lg"></i>
        </button>

        <div className="hidden md:flex md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex-col justify-center">
          <div className="mb-8 text-center">
            <i className="fas fa-tv text-5xl mb-4 opacity-80"></i>
            <span className="text-2xl md:text-3xl font-bold text-white leading-tight">
              BroadcastTV<br className="hidden md:block" />
              <span className="text-xl md:text-2xl opacity-90">MotionGraphics</span>
            </span>
            <p className="text-blue-200 mt-1">Sua plataforma de templates</p>
          </div>
          <ul className="space-y-4">
            {advantages.map(adv => (
              <li key={adv.id} className="flex items-center">
                <i className="fas fa-check-circle text-green-400 mr-3 fa-lg"></i>
                <span className="text-blue-100">{adv.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-2/3 p-8 sm:p-12 overflow-y-auto max-h-[90vh]">
          {currentView === 'login' ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo(a) de volta!</h2>
              <p className="text-gray-600 mb-8">Faça login para continuar.</p>
              
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{error}</div>}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    id="login-email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    aria-label="Seu endereço de e-mail"
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    aria-label="Sua senha"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-envelope mr-2"></i>}
                  {isLoading ? 'Entrando...' : 'Entrar com E-mail'}
                </button>
              </form>

              <div className="my-6 text-center">
                <span className="text-xs text-gray-400">OU</span>
              </div>

              <div className="space-y-3">
                 <button type="button" disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm opacity-50 cursor-not-allowed" aria-label="Fazer login com Google (desabilitado)">
                  <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-4 h-4"/> Fazer login com Google
                </button>
                 <button type="button" disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm opacity-50 cursor-not-allowed" aria-label="Conectar com Facebook (desabilitado)">
                  <i className="fab fa-facebook text-blue-700 text-lg"></i> Conectar com Facebook
                </button>
              </div>

              <div className="mt-8 text-center text-sm">
                <button type="button" disabled className="text-blue-600 hover:underline opacity-50 cursor-not-allowed" aria-label="Esqueci minha senha (desabilitado)">Esqueci minha senha</button>
                <span className="mx-2 text-gray-300">|</span>
                <button onClick={switchToRegister} className="text-blue-600 hover:underline font-medium">
                  Criar uma nova conta
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Crie sua Conta</h2>
              <p className="text-gray-600 mb-8">É rápido e fácil!</p>

              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{error}</div>}
              
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    id="register-name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    aria-label="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    id="register-email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    aria-label="Seu endereço de e-mail para cadastro"
                  />
                </div>
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Criar Senha (mín. 8 caracteres)</label>
                  <input 
                    type="password" 
                    id="register-password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    minLength={8}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    aria-label="Crie uma senha com no mínimo 8 caracteres"
                  />
                </div>
                <div className="flex items-start">
                  <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    aria-describedby="terms-description"
                  />
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">Aceitar Termos de Uso</label>
                    <p id="terms-description" className="text-gray-500 text-xs">Ao criar uma conta, você concorda com nossos <a href="/termos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Termos de Serviço</a> e <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Política de Privacidade</a>.</p>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-user-plus mr-2"></i>}
                  {isLoading ? 'Cadastrando...' : 'Cadastrar e Acessar Plataforma'}
                </button>
              </form>
              <div className="mt-8 text-center text-sm">
                <p className="text-gray-600">
                  Já tem uma conta?{' '}
                  <button onClick={switchToLogin} className="text-blue-600 hover:underline font-medium">
                    Fazer login
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
