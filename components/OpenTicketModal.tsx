import React, { useState, useEffect } from 'react';
import { TicketData, TicketSubject, TICKET_SUBJECTS_PT } from '../types';

interface OpenTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: TicketData) => void;
  userName?: string;
  userEmail?: string;
  initialSubject?: TicketSubject;
}

export const OpenTicketModal: React.FC<OpenTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
  userEmail,
  initialSubject,
}) => {
  const [formData, setFormData] = useState<TicketData>({
    name: '',
    email: '',
    subject: 'doubt', // Default subject
    description: '',
    attachment: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TicketData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: userName || '',
        email: userEmail || '',
        subject: initialSubject || 'doubt',
        description: '',
        attachment: null,
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, userName, userEmail, initialSubject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as TicketSubject })); // Cast for subject
    if (errors[name as keyof TicketData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({...prev, attachment: "Arquivo excede 5MB."}));
        setFormData(prev => ({ ...prev, attachment: null }));
        e.target.value = ''; // Clear the input
      } else {
        setFormData(prev => ({ ...prev, attachment: file }));
        if (errors.attachment) {
            setErrors(prev => ({ ...prev, attachment: undefined }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, attachment: null }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TicketData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (!formData.subject) newErrors.subject = 'Assunto é obrigatório.'; // Should always have a default
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória.';
    else if (formData.description.trim().length < 10) newErrors.description = 'Descrição muito curta (mín. 10 caracteres).';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(formData);
    // App.tsx will handle closing on success via its own submit handler
    // setIsSubmitting(false); // Reset in useEffect when isOpen changes
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Abrir Novo Chamado de Suporte</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar modal">
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label htmlFor="ticket-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              name="name"
              id="ticket-name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-style ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="ticket-email" className="block text-sm font-medium text-gray-700 mb-1">Seu E-mail</label>
            <input
              type="email"
              name="email"
              id="ticket-email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-style ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="ticket-subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
            <select
              name="subject"
              id="ticket-subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`input-style ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
              required
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            >
              {Object.entries(TICKET_SUBJECTS_PT).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            {errors.subject && <p id="subject-error" className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="ticket-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
            <textarea
              name="description"
              id="ticket-description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`input-style ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Descreva o problema ou dúvida com o máximo de detalhes possível..."
              required
              aria-required="true"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
            ></textarea>
            {errors.description && <p id="description-error" className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="ticket-attachment" className="block text-sm font-medium text-gray-700 mb-1">Anexar Arquivo (Opcional, máx. 5MB)</label>
            <input
              type="file"
              name="attachment"
              id="ticket-attachment"
              onChange={handleFileChange}
              className={`file-input-style ${errors.attachment ? 'file-input-error' : ''}`}
              accept=".jpg,.jpeg,.png,.gif,.pdf,.zip,.txt,.rar,.doc,.docx,.xls,.xlsx"
              aria-invalid={!!errors.attachment}
              aria-describedby={errors.attachment ? "attachment-error" : undefined}
            />
             {formData.attachment && <p className="text-xs text-gray-500 mt-1">Arquivo selecionado: {formData.attachment.name} ({(formData.attachment.size / 1024 / 1024).toFixed(2)} MB)</p>}
            {errors.attachment && <p id="attachment-error" className="text-red-500 text-xs mt-1">{errors.attachment}</p>}
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors flex items-center justify-center disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i> Enviar Chamado
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .input-style {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem; /* text-sm */
            line-height: 1.25rem;
            border: 1px solid #D1D5DB; /* Tailwind gray-300 */
            border-radius: 0.375rem; /* rounded-md */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .input-style:focus {
            border-color: #2563EB; /* focus:border-blue-600 */
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); /* focus:ring-blue-500 focus:ring-opacity-50 */
        }
        .border-red-500 {
            border-color: #EF4444 !important; /* Tailwind red-500 */
        }
        .file-input-style {
            display: block;
            width: 100%;
            font-size: 0.875rem; 
            color: #6B7280; 
            padding: 0.25rem; 
        }
        .file-input-style::file-selector-button {
            margin-right: 1rem; 
            padding: 0.5rem 1rem; 
            border-radius: 0.375rem; 
            border-width: 0px; 
            font-size: 0.875rem; 
            font-weight: 600; 
            background-color: #EFF6FF; 
            color: #1D4ED8; 
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .file-input-style::file-selector-button:hover {
            background-color: #DBEAFE; 
        }
        .file-input-error { 
            border: 1px solid #ef4444; 
            border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};
