
import React, { useState }
from 'react';

export const CustomProjectFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '',
    style: '',
    description: '',
    files: null as FileList | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, files: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form data submitted:', formData);
    
    // Simulate delay and success
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmissionMessage(`Obrigado, ${formData.name}! Recebemos seu pedido de projeto "${formData.style}". Nossa equipe vai entrar em contato através do email ${formData.email} com uma proposta personalizada em breve.`);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', platform: '', style: '', description: '', files: null }); // Reset form
  };

  if (isSubmitted) {
    return (
      <section id="custom-project-request" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Solicitação Enviada com Sucesso!</h2>
            <p className="text-lg">{submissionMessage}</p>
            <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
            >
                Enviar Nova Solicitação
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="custom-project-request" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Solicitação de Projeto Sob Medida</h2>
          <p className="text-xl text-gray-600">Tem uma ideia específica? Descreva seu projeto e nossa equipe criará uma solução exclusiva para você.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email de Contato</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">Plataforma de Uso</label>
            <select name="platform" id="platform" value={formData.platform} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="" disabled>Selecione a plataforma...</option>
              <option value="obs">OBS Studio</option>
              <option value="vmix">vMix</option>
              <option value="tricaster">Tricaster</option>
              <option value="aftereffects">Adobe After Effects</option>
              <option value="premiere">Adobe Premiere Pro</option>
              <option value="youtube">Canal do YouTube</option>
              <option value="tv_broadcast">Emissora de TV (Broadcast)</option>
              <option value="streaming_platform">Plataforma de Streaming (Twitch, etc.)</option>
              <option value="other">Outra (descrever abaixo)</option>
            </select>
             {formData.platform === 'other' && (
                <input type="text" name="platform_other_detail" placeholder="Especifique a plataforma" onChange={handleChange} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            )}
          </div>
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">Estilo Desejado</label>
            <input type="text" name="style" id="style" value={formData.style} onChange={handleChange} required placeholder="Ex: moderno, esportivo, jornalístico, corporativo, clean" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada do Projeto</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={5} required placeholder="Inclua cores, elementos, funcionalidades e qualquer detalhe importante." className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div>
            <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">Upload de Referências (Opcional)</label>
            <input type="file" name="files" id="files" onChange={handleFileChange} multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            <p className="mt-1 text-xs text-gray-500">Formatos aceitos: JPG, PNG, PDF, GIF. Máx 5MB por arquivo.</p>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <i className="fas fa-paper-plane mr-2"></i> Enviar Briefing
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
