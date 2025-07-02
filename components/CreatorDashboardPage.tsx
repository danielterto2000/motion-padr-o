
import React, { useState } from 'react';
import { TemplateUploadData, TemplateUploadCategory } from '../types';
import { TEMPLATE_UPLOAD_CATEGORIES } from '../constants';

interface CreatorDashboardPageProps {
  creatorName: string;
  onNavigateHome: () => void;
}

export const CreatorDashboardPage: React.FC<CreatorDashboardPageProps> = ({ creatorName, onNavigateHome }) => {
  const initialUploadData: TemplateUploadData = {
    zipFile: null,
    projectName: '',
    category: '',
    price: '',
    description: '',
    coverImage: null,
    previewImage: null,
    youtubeLink: '',
    authorDeclaration: false,
  };
  const [uploadFormData, setUploadFormData] = useState<TemplateUploadData>(initialUploadData);
  const [uploadErrors, setUploadErrors] = useState<Partial<Record<keyof TemplateUploadData, string>>>({});
  const [showUploadForm, setShowUploadForm] = useState(true); // Or false by default, shown on button click
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  const handleUploadInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setUploadFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === 'file') {
      setUploadFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files![0] : null }));
    } else {
      setUploadFormData(prev => ({ ...prev, [name]: value }));
    }
    if (uploadErrors[name as keyof TemplateUploadData]) {
        setUploadErrors(prev => ({...prev, [name]: undefined}));
    }
  };
  
  const validateUploadForm = (): boolean => {
    const newErrors: Partial<Record<keyof TemplateUploadData, string>> = {};
    if (!uploadFormData.zipFile) newErrors.zipFile = 'Arquivo .zip do projeto é obrigatório.';
    else if (uploadFormData.zipFile.size > 500 * 1024 * 1024) newErrors.zipFile = 'Arquivo .zip excede 500MB.';
    if (!uploadFormData.projectName.trim()) newErrors.projectName = 'Nome do projeto é obrigatório.';
    if (!uploadFormData.category) newErrors.category = 'Categoria é obrigatória.';
    if (!uploadFormData.price.trim()) newErrors.price = 'Preço é obrigatório.';
    else if (isNaN(parseFloat(uploadFormData.price)) || parseFloat(uploadFormData.price) <= 0) newErrors.price = 'Preço deve ser um número positivo.';
    if (!uploadFormData.description.trim()) newErrors.description = 'Descrição é obrigatória.';
    if (!uploadFormData.coverImage) newErrors.coverImage = 'Imagem de capa é obrigatória.';
    if (!uploadFormData.authorDeclaration) newErrors.authorDeclaration = 'Você deve declarar a autoria.';

    setUploadErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateUploadForm()) {
      console.log('Template Upload Data:', uploadFormData);
      // Simulate API call for upload
      setUploadSuccessMessage(`Template "${uploadFormData.projectName}" enviado para aprovação!`);
      setUploadFormData(initialUploadData); // Reset form
      setShowUploadForm(false); // Hide form after successful upload, or keep it and just show message
      setTimeout(() => setUploadSuccessMessage(''), 5000); // Clear message after 5s
    } else {
        alert("Por favor, corrija os erros no formulário de upload.");
    }
  };

  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 p-6 bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Painel do Criador</h1>
            <p className="text-gray-600">Bem-vindo(a) de volta, <span className="font-semibold text-blue-600">{creatorName}</span>!</p>
          </div>
          <button 
            onClick={onNavigateHome}
            className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            <i className="fas fa-home mr-2"></i> Voltar à Loja
          </button>
        </header>

        {uploadSuccessMessage && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md shadow">
                <p>{uploadSuccessMessage}</p>
            </div>
        )}

        {/* Placeholder for Dashboard Stats - To be implemented with backend */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <i className="fas fa-rocket text-3xl text-blue-500 mb-2"></i>
            <h3 className="text-lg font-semibold text-gray-700">Projetos Enviados</h3>
            <p className="text-3xl font-bold text-gray-900">0</p> {/* Placeholder */}
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <i className="fas fa-check-circle text-3xl text-green-500 mb-2"></i>
            <h3 className="text-lg font-semibold text-gray-700">Aprovados</h3>
            <p className="text-3xl font-bold text-gray-900">0</p> {/* Placeholder */}
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <i className="fas fa-chart-line text-3xl text-yellow-500 mb-2"></i>
            <h3 className="text-lg font-semibold text-gray-700">Vendas Realizadas</h3>
            <p className="text-3xl font-bold text-gray-900">0</p> {/* Placeholder */}
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <i className="fas fa-dollar-sign text-3xl text-teal-500 mb-2"></i>
            <h3 className="text-lg font-semibold text-gray-700">Ganhos (R$)</h3>
            <p className="text-3xl font-bold text-gray-900">0,00</p> {/* Placeholder */}
            <button className="mt-2 text-sm text-blue-600 hover:underline">Solicitar Saque</button>
          </div>
        </div>
        
        {/* Toggle Upload Form Button */}
        {!showUploadForm && (
            <div className="text-center mb-8">
                <button
                    onClick={() => setShowUploadForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-300 text-lg"
                >
                    <i className="fas fa-plus-circle mr-2"></i> Enviar Novo Template
                </button>
            </div>
        )}


        {/* Upload Form Section */}
        {showUploadForm && (
            <section id="upload-project" className="mb-10">
            <form onSubmit={handleUploadSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">Enviar Novo Template</h2>
                
                <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Nome do Projeto</label>
                <input type="text" name="projectName" id="projectName" value={uploadFormData.projectName} onChange={handleUploadInputChange} className={`w-full input-style ${uploadErrors.projectName ? 'border-red-500' : 'border-gray-300'}`} />
                {uploadErrors.projectName && <p className="text-red-500 text-xs mt-1">{uploadErrors.projectName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria do Template</label>
                    <select name="category" id="category" value={uploadFormData.category} onChange={handleUploadInputChange} className={`w-full input-style ${uploadErrors.category ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="" disabled>Selecione a categoria...</option>
                    {TEMPLATE_UPLOAD_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                    </select>
                    {uploadErrors.category && <p className="text-red-500 text-xs mt-1">{uploadErrors.category}</p>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preço Sugerido (R$)</label>
                    <input type="number" name="price" id="price" value={uploadFormData.price} onChange={handleUploadInputChange} placeholder="Ex: 199.00" min="0" step="0.01" className={`w-full input-style ${uploadErrors.price ? 'border-red-500' : 'border-gray-300'}`} />
                    {uploadErrors.price && <p className="text-red-500 text-xs mt-1">{uploadErrors.price}</p>}
                </div>
                </div>

                <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição do Template</label>
                <textarea name="description" id="description" value={uploadFormData.description} onChange={handleUploadInputChange} rows={4} className={`w-full input-style ${uploadErrors.description ? 'border-red-500' : 'border-gray-300'}`} placeholder="Detalhes sobre o template, funcionalidades, softwares compatíveis..."></textarea>
                {uploadErrors.description && <p className="text-red-500 text-xs mt-1">{uploadErrors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="zipFile" className="block text-sm font-medium text-gray-700 mb-1">Arquivo .zip do Projeto (Máx. 500MB)</label>
                    <input type="file" name="zipFile" id="zipFile" accept=".zip" onChange={handleUploadInputChange} className={`file-input-style ${uploadErrors.zipFile ? 'file-input-error' : ''}`} />
                    {uploadErrors.zipFile && <p className="text-red-500 text-xs mt-1">{uploadErrors.zipFile}</p>}
                </div>
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa (Thumbnail)</label>
                    <input type="file" name="coverImage" id="coverImage" accept="image/jpeg, image/png" onChange={handleUploadInputChange} className={`file-input-style ${uploadErrors.coverImage ? 'file-input-error' : ''}`} />
                    {uploadErrors.coverImage && <p className="text-red-500 text-xs mt-1">{uploadErrors.coverImage}</p>}
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="previewImage" className="block text-sm font-medium text-gray-700 mb-1">Imagem de Preview (Opcional)</label>
                    <input type="file" name="previewImage" id="previewImage" accept="image/jpeg, image/png, image/gif" onChange={handleUploadInputChange} className="file-input-style" />
                </div>
                <div>
                    <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700 mb-1">Link do YouTube (Preview em vídeo, Opcional)</label>
                    <input type="url" name="youtubeLink" id="youtubeLink" value={uploadFormData.youtubeLink} onChange={handleUploadInputChange} placeholder="https://youtube.com/watch?v=" className="w-full input-style border-gray-300" />
                </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="authorDeclaration" checked={uploadFormData.authorDeclaration} onChange={handleUploadInputChange} className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Declaro que este projeto é de minha autoria e segue as normas de licenciamento.</span>
                </label>
                {uploadErrors.authorDeclaration && <p className="text-red-500 text-xs mt-1">{uploadErrors.authorDeclaration}</p>}
                </div>

                <div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                    <i className="fas fa-cloud-upload-alt mr-2"></i> Enviar Template para Aprovação
                </button>
                </div>
            </form>
            </section>
        )}

        {/* Placeholder for "My Templates List" */}
        <section id="my-templates-list" className="mt-10">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">Meus Templates Enviados</h2>
                <div className="text-center text-gray-500 py-10">
                    <i className="fas fa-folder-open fa-3x mb-4"></i>
                    <p>Você ainda não enviou nenhum template.</p>
                    <p>Use o formulário acima para começar a vender sua arte!</p>
                </div>
                {/* Placeholder for actual list:
                <div className="space-y-4">
                    // Template Item Card (map through submitted templates)
                    <div className="p-4 border rounded-md flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">Nome do Template</h4>
                            <p className="text-sm text-gray-500">Categoria | Preço</p>
                        </div>
                        <span className="text-sm font-medium text-yellow-500 bg-yellow-100 px-2 py-0.5 rounded-full">Pendente</span>
                    </div>
                </div>
                */}
            </div>
        </section>
        <style>{`
            .input-style {
                display: block;
                width: 100%;
                padding: 0.5rem 0.75rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                border: 1px solid #D1D5DB; /* Tailwind gray-300 */
                border-radius: 0.375rem;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            }
            .input-style:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                border-color: #2563eb; /* Tailwind blue-600 */
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
            }
            /* .border-red-500 is a Tailwind class, already applied conditionally */
            
            .file-input-style {
                display: block;
                width: 100%;
                font-size: 0.875rem; /* text-sm */
                color: #6B7280; /* text-gray-500 */
            }
            .file-input-style::file-selector-button {
                margin-right: 1rem; /* file:mr-4 */
                padding: 0.5rem 1rem; /* file:py-2 file:px-4 */
                border-radius: 0.375rem; /* file:rounded-md */
                border-width: 0px; /* file:border-0 */
                font-size: 0.875rem; /* file:text-sm */
                font-weight: 600; /* file:font-semibold */
                background-color: #EFF6FF; /* file:bg-blue-50 */
                color: #2563EB; /* file:text-blue-700 */
            }
            .file-input-style::file-selector-button:hover {
                background-color: #DBEAFE; /* hover:file:bg-blue-100 */
            }
            .file-input-error { /* Custom class to indicate error on file input */
                border: 1px solid #ef4444 !important; /* Tailwind red-500 */
                border-radius: 0.375rem;
                padding: 0.25rem; /* Add some padding to show the border */
            }
        `}</style>
      </div>
    </div>
  );
};