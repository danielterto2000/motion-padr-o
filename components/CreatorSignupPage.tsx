
import React, { useState, useEffect } from 'react';
import { CreatorSignupData, Software, Specialization, InspirationalQuote } from '../types';
import { SOFTWARE_CHOICES, SPECIALIZATION_AREAS, INSPIRATIONAL_QUOTES } from '../constants';

interface CreatorSignupPageProps {
  onSignupSuccess: (data: CreatorSignupData) => void;
}

export const CreatorSignupPage: React.FC<CreatorSignupPageProps> = ({ onSignupSuccess }) => {
  const initialFormData: CreatorSignupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    portfolioLink: '',
    softwares: SOFTWARE_CHOICES.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {}),
    specialization: '',
    otherSpecialization: '',
    termsAccepted: false,
  };
  const [formData, setFormData] = useState<CreatorSignupData>(initialFormData);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof CreatorSignupData, string>>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % INSPIRATIONAL_QUOTES.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, termsAccepted: checked }));
      } else { // Software checkboxes
        setFormData(prev => ({
          ...prev,
          softwares: { ...prev.softwares, [name]: checked },
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for this field
    if (errors[name as keyof CreatorSignupData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreatorSignupData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório.';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (formData.password.length < 8) newErrors.password = 'Senha deve ter no mínimo 8 caracteres.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    if (!formData.portfolioLink.trim()) newErrors.portfolioLink = 'Link do portfólio é obrigatório.';
    else {
        try {
            new URL(formData.portfolioLink);
        } catch (_) {
            newErrors.portfolioLink = 'Link do portfólio inválido.';
        }
    }
    if (Object.values(formData.softwares).every(s => !s)) newErrors.softwares = 'Selecione ao menos um software.';
    if (!formData.specialization) newErrors.specialization = 'Área de especialidade é obrigatória.';
    if (formData.specialization === 'other' && !formData.otherSpecialization?.trim()) newErrors.otherSpecialization = 'Especifique sua outra área de especialidade.';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Você deve aceitar os termos.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Creator Signup Data:', formData);
      // Simulate API call
      onSignupSuccess(formData);
    } else {
      alert("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inspirational Header */}
        <div className="text-center mb-10 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-xl">
          <i className="fas fa-lightbulb fa-3x mb-4 text-yellow-300"></i>
          <h1 className="text-4xl font-bold mb-3">Transforme sua Criatividade em Renda!</h1>
          <p className="text-xl h-12 transition-opacity duration-500 ease-in-out">
            {INSPIRATIONAL_QUOTES[currentQuoteIndex].text}
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">Cadastre-se como Criador</h2>
          
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full input-style ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail Profissional</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className={`w-full input-style ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha (mín. 8 caracteres)</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className={`w-full input-style ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
              <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`w-full input-style ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">Link do Portfólio (Behance, YouTube, Drive, etc.)</label>
            <input type="url" name="portfolioLink" id="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} placeholder="https://" className={`w-full input-style ${errors.portfolioLink ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.portfolioLink && <p className="text-red-500 text-xs mt-1">{errors.portfolioLink}</p>}
          </div>

          {/* Skills & Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Softwares que Utiliza</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SOFTWARE_CHOICES.map(software => (
                <label key={software.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <input type="checkbox" name={software.id} checked={formData.softwares[software.id]} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">{software.label}</span>
                </label>
              ))}
            </div>
            {errors.softwares && <p className="text-red-500 text-xs mt-1">{errors.softwares}</p>}
          </div>
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Principal Área de Especialidade</label>
            <select name="specialization" id="specialization" value={formData.specialization} onChange={handleInputChange} className={`w-full input-style ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="" disabled>Selecione sua especialidade...</option>
              {SPECIALIZATION_AREAS.map(area => (
                <option key={area.id} value={area.id}>{area.label}</option>
              ))}
            </select>
            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
            {formData.specialization === 'other' && (
              <div className="mt-2">
                <label htmlFor="otherSpecialization" className="block text-sm font-medium text-gray-700 mb-1">Especifique sua área</label>
                <input type="text" name="otherSpecialization" id="otherSpecialization" value={formData.otherSpecialization} onChange={handleInputChange} className={`w-full input-style ${errors.otherSpecialization ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.otherSpecialization && <p className="text-red-500 text-xs mt-1">{errors.otherSpecialization}</p>}
              </div>
            )}
          </div>

          {/* Terms & Submission */}
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="text-sm text-gray-700">
                Eu li e aceito os <a href="/termos-criador" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Termos e Condições para Criadores</a>.
              </span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
          </div>
          <div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
              <i className="fas fa-user-plus mr-2"></i> Cadastrar como Criador
            </button>
          </div>
        </form>
        <style>{`
            .input-style {
                display: block;
                width: 100%;
                padding: 0.5rem 0.75rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                border-radius: 0.375rem;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                border: 1px solid #D1D5DB; /* Default border for input-style if not overridden by error/focus */

            }
            .input-style:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                border-color: #2563eb; /* Tailwind blue-600 */
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Tailwind blue-500 with opacity */
            }
            /* .border-red-500 is a Tailwind class, already applied conditionally */
        `}</style>
      </div>
    </div>
  );
};
