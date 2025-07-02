import React, { useState } from 'react';
import { User } from '../../types';

interface AdminManageUsersProps {
  users: User[];
}

export const AdminManageUsers: React.FC<AdminManageUsersProps> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.id.toLowerCase().includes(searchTerm)
  );

  const handleAddNewUser = () => {
    console.log('Admin: Add new User clicked (Simulated)');
    alert('Funcionalidade "Adicionar Novo Usuário" (Simulada)');
  };

  const handleEditUserRole = (user: User) => {
    console.log(`Admin: Edit User Role ${user.id} clicked (Simulated)`);
    alert(`Editar permissões do usuário: ${user.name} (Simulado)`);
    // Example: prompt for new role or open a role selection modal
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Admin: Delete User ${userId} clicked (Simulated)`);
     if (window.confirm(`Tem certeza que deseja excluir o usuário ID ${userId}? (Simulação)`)) {
        alert(`Usuário ${userId} excluído (Simulado). A lista não será atualizada sem backend.`);
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
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Usuários</h2>
        <button
          onClick={handleAddNewUser}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 flex items-center"
        >
          <i className="fas fa-user-plus mr-2"></i> Adicionar Novo
        </button>
      </div>

       <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, email, ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredUsers.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum usuário encontrado para "{searchTerm}".</p>
      ) : paginatedUsers.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há usuários cadastrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papéis</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Cadastro</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {user.isAdmin && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mr-1">Admin</span>}
                            {user.isCreator && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Criador</span>}
                            {(!user.isAdmin && !user.isCreator) && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Usuário</span>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(user.registrationDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEditUserRole(user)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors">
                            <i className="fas fa-user-shield mr-1"></i> Permissões
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 transition-colors">
                            <i className="fas fa-user-times mr-1"></i> Excluir
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