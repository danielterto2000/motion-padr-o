import React, { useState } from 'react';
import { User } from '../../types'; // Assuming Creator is a type of User

interface AdminManageCreatorsProps {
  users: User[]; // Pass all users, will filter for creators
}

export const AdminManageCreators: React.FC<AdminManageCreatorsProps> = ({ users: allUsers }) => {
  const initialCreators = allUsers.filter(user => user.isCreator);
  const [creators, setCreators] = useState<User[]>(initialCreators);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm) ||
    creator.email.toLowerCase().includes(searchTerm) ||
    creator.id.toLowerCase().includes(searchTerm)
  );

  const handleApproveCreator = (creator: User) => {
    console.log(`Admin: Approve Creator ${creator.id} clicked (Simulated)`);
    alert(`Aprovar criador: ${creator.name} (Simulado)`);
    // This would typically involve setting a flag like `isVerifiedCreator` true via API
  };

  const handleViewPortfolio = (creator: User) => {
    // CreatorSignupData includes portfolioLink, but User type doesn't.
    // This needs portfolioLink to be part of User or fetched separately.
    // For now, simulate based on what might be available.
    const portfolioLink = (creator as any).portfolioLink || 'Não informado';
    console.log(`Admin: View Portfolio for ${creator.id} (Link: ${portfolioLink}) (Simulated)`);
    alert(`Ver portfólio de ${creator.name}: ${portfolioLink} (Simulado)`);
    // if (portfolioLink && portfolioLink !== 'Não informado') window.open(portfolioLink, '_blank');
  };
  
  const handleRemoveCreatorStatus = (creatorId: string) => {
    console.log(`Admin: Remove Creator Status for ${creatorId} (Simulated)`);
    if (window.confirm(`Tem certeza que deseja remover o status de criador do usuário ID ${creatorId}? (Simulação)`)) {
        alert(`Status de criador removido para ${creatorId} (Simulado). A lista não será atualizada sem backend.`);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const paginatedCreators = filteredCreators.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Criadores</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar criador por nome, email, ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredCreators.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum criador encontrado para "{searchTerm}".</p>
      ) : paginatedCreators.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há criadores cadastrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Cadastro</th>
                        {/* Add more relevant columns like "Portfolio", "Status (Pending/Approved)" if data model supports */}
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedCreators.map(creator => (
                        <tr key={creator.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{creator.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{creator.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{creator.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(creator.registrationDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleApproveCreator(creator)} className="text-green-600 hover:text-green-900 mr-3 transition-colors">
                            <i className="fas fa-check-circle mr-1"></i> Aprovar
                            </button>
                            <button onClick={() => handleViewPortfolio(creator)} className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                            <i className="fas fa-link mr-1"></i> Portfólio
                            </button>
                            <button onClick={() => handleRemoveCreatorStatus(creator.id)} className="text-red-600 hover:text-red-900 transition-colors">
                            <i className="fas fa-user-slash mr-1"></i> Revogar
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