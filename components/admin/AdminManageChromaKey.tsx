import React, { useState } from 'react';
import { ChromaKeyTemplate } from '../../types';

interface AdminManageChromaKeyProps {
  chromaKeyItems: ChromaKeyTemplate[];
}

export const AdminManageChromaKey: React.FC<AdminManageChromaKeyProps> = ({ chromaKeyItems: initialItems }) => {
  const [items, setItems] = useState<ChromaKeyTemplate[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.categoryDisplayName.toLowerCase().includes(searchTerm) ||
    item.id.toLowerCase().includes(searchTerm)
  );
  
  const handleAddNew = () => {
    console.log('Admin: Add new Chroma Key item clicked (Simulated)');
    alert('Funcionalidade "Adicionar Novo Cenário Chroma Key" (Simulada)');
  };

  const handleEdit = (item: ChromaKeyTemplate) => {
    console.log(`Admin: Edit Chroma Key item ${item.id} clicked (Simulated)`);
    alert(`Editar item Chroma Key: ${item.name} (Simulado)`);
  };

  const handleDelete = (itemId: string) => {
    console.log(`Admin: Delete Chroma Key item ${itemId} clicked (Simulated)`);
    if (window.confirm(`Tem certeza que deseja excluir o item Chroma Key ID ${itemId}? (Simulação)`)) {
        alert(`Item Chroma Key ${itemId} excluído (Simulado). A lista não será atualizada sem backend.`);
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Cenários Chroma Key</h2>
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

      {filteredItems.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum cenário Chroma Key encontrado para "{searchTerm}".</p>
      ) : paginatedItems.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há cenários Chroma Key cadastrados.</p>
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
                    {paginatedItems.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-10 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.categoryDisplayName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">R$ {item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors">
                            <i className="fas fa-pencil-alt mr-1"></i> Editar
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 transition-colors">
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
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50">Anterior</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 border rounded-md text-sm ${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}>{page}</button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50">Próxima</button>
                </div>
            )}
        </>
      )}
    </div>
  );
};