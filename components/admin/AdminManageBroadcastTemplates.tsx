import React, { useState } from 'react';
import { Template } from '../../types';

interface AdminManageBroadcastTemplatesProps {
  templates: Template[];
}

export const AdminManageBroadcastTemplates: React.FC<AdminManageBroadcastTemplatesProps> = ({ templates: initialTemplates }) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null); // For a future edit modal

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm) ||
    template.categoryDisplayName.toLowerCase().includes(searchTerm) ||
    template.id.toLowerCase().includes(searchTerm)
  );

  const handleAddNew = () => {
    console.log('Admin: Add new Broadcast Template clicked (Simulated)');
    alert('Funcionalidade "Adicionar Novo Template Broadcast" (Simulada)');
    // Here you would typically open a modal or navigate to a form page
    // For now, let's add a dummy template to see the list update (client-side only)
    // const newDummyTemplate: Template = {
    //   id: `new_${Date.now()}`,
    //   name: 'Novo Template de Teste',
    //   imageUrl: 'https://via.placeholder.com/300x150/cccccc/969696?text=Novo+Template',
    //   price: 99,
    //   category: 'tables',
    //   categoryDisplayName: 'Tabela Teste',
    //   categoryColorClass: 'text-gray-500',
    //   detailedDescription: 'Descrição detalhada do novo template de teste.',
    //   features: ['Recurso A', 'Recurso B'],
    //   softwareCompatibility: ['Mago GC Teste'],
    //   resolution: '1920x1080',
    // };
    // setTemplates(prev => [newDummyTemplate, ...prev]);
  };

  const handleEdit = (template: Template) => {
    console.log(`Admin: Edit Broadcast Template ${template.id} clicked (Simulated)`);
    alert(`Editar template: ${template.name} (Simulado)`);
    // setEditingTemplate(template); // This would open an edit modal/form
  };

  const handleDelete = (templateId: string) => {
    console.log(`Admin: Delete Broadcast Template ${templateId} clicked (Simulated)`);
    if (window.confirm(`Tem certeza que deseja excluir o template ID ${templateId}? (Simulação)`)) {
        // This would be an API call. For simulation, filter out from local state:
        // setTemplates(prevTemplates => prevTemplates.filter(t => t.id !== templateId));
        alert(`Template ${templateId} excluído (Simulado). A lista não será atualizada sem backend.`);
    }
  };
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Templates Broadcast</h2>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Adicionar Novo
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, categoria, ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredTemplates.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum template broadcast encontrado para "{searchTerm}".</p>
      ) : paginatedTemplates.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há templates broadcast cadastrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTemplates.map(template => (
                        <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                            <img src={template.imageUrl} alt={template.name} className="w-16 h-10 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{template.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{template.categoryDisplayName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">R$ {template.price.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEdit(template)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors">
                            <i className="fas fa-pencil-alt mr-1"></i> Editar
                            </button>
                            <button onClick={() => handleDelete(template.id)} className="text-red-600 hover:text-red-900 transition-colors">
                            <i className="fas fa-trash-alt mr-1"></i> Excluir
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
             {totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-1 border rounded-md text-sm ${currentPage === pageNumber ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            )}
        </>
      )}
    </div>
  );
};