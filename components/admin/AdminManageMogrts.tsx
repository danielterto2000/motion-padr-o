import React, { useState } from 'react';
import { MogrtTemplate } from '../../types';

interface AdminManageMogrtsProps {
  mogrts: MogrtTemplate[];
}

export const AdminManageMogrts: React.FC<AdminManageMogrtsProps> = ({ mogrts: initialMogrts }) => {
  const [mogrts, setMogrts] = useState<MogrtTemplate[]>(initialMogrts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredMogrts = mogrts.filter(mogrt =>
    mogrt.name.toLowerCase().includes(searchTerm) ||
    mogrt.categoryDisplayName.toLowerCase().includes(searchTerm) ||
    mogrt.id.toLowerCase().includes(searchTerm)
  );
  
  const handleAddNew = () => {
    console.log('Admin: Add new MOGRT clicked (Simulated)');
    alert('Funcionalidade "Adicionar Novo .MOGRT" (Simulada)');
  };

  const handleEdit = (mogrt: MogrtTemplate) => {
    console.log(`Admin: Edit MOGRT ${mogrt.id} clicked (Simulated)`);
    alert(`Editar MOGRT: ${mogrt.name} (Simulado)`);
  };

  const handleDelete = (mogrtId: string) => {
    console.log(`Admin: Delete MOGRT ${mogrtId} clicked (Simulated)`);
     if (window.confirm(`Tem certeza que deseja excluir o MOGRT ID ${mogrtId}? (Simulação)`)) {
        alert(`MOGRT ${mogrtId} excluído (Simulado). A lista não será atualizada sem backend.`);
    }
  };
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredMogrts.length / itemsPerPage);
  const paginatedMogrts = filteredMogrts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Mockups .MOGRT</h2>
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

      {filteredMogrts.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum .MOGRT encontrado para "{searchTerm}".</p>
      ) : paginatedMogrts.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há .MOGRTs cadastrados.</p>
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premiere Ver.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedMogrts.map(mogrt => (
                        <tr key={mogrt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                            <img src={mogrt.staticThumbnailUrl} alt={mogrt.name} className="w-16 h-10 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{mogrt.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{mogrt.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{mogrt.categoryDisplayName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">R$ {mogrt.price.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{mogrt.specifications.premiereVersion}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEdit(mogrt)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors">
                            <i className="fas fa-pencil-alt mr-1"></i> Editar
                            </button>
                            <button onClick={() => handleDelete(mogrt.id)} className="text-red-600 hover:text-red-900 transition-colors">
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