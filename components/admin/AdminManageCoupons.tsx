import React, { useState } from 'react';
import { Coupon } from '../../types';

interface AdminManageCouponsProps {
  coupons: Coupon[];
}

export const AdminManageCoupons: React.FC<AdminManageCouponsProps> = ({ coupons: initialCoupons }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  // Add state for a new coupon form modal if implementing "Add New"
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [newCouponData, setNewCouponData] = useState<Partial<Coupon>>({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm) ||
    coupon.description?.toLowerCase().includes(searchTerm)
  );

  const handleAddNewCoupon = () => {
    console.log('Admin: Add new Coupon clicked (Simulated)');
    alert('Funcionalidade "Adicionar Novo Cupom" (Simulada)');
    // setIsAddModalOpen(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    console.log(`Admin: Edit Coupon ${coupon.code} clicked (Simulated)`);
    alert(`Editar cupom: ${coupon.code} (Simulado)`);
    // Set data for an edit modal
  };

  const handleDeleteCoupon = (couponCode: string) => {
    console.log(`Admin: Delete Coupon ${couponCode} clicked (Simulated)`);
    if (window.confirm(`Tem certeza que deseja excluir o cupom ${couponCode}? (Simulação)`)) {
      alert(`Cupom ${couponCode} excluído (Simulado). A lista não será atualizada sem backend.`);
      // API call to delete, then update local state:
      // setCoupons(prevCoupons => prevCoupons.filter(c => c.code !== couponCode));
    }
  };
  
  const handleToggleActive = (couponCode: string) => {
    console.log(`Admin: Toggle active for Coupon ${couponCode} (Simulated)`);
     alert(`Alterar status do cupom ${couponCode} (Simulado). A lista não será atualizada sem backend.`);
    // API call, then update local state:
    // setCoupons(prevCoupons => prevCoupons.map(c => c.code === couponCode ? {...c, isActive: !c.isActive} : c));
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' }); // Ensure consistent date display
    } catch (e) {
        return 'Data inválida';
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const paginatedCoupons = filteredCoupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Cupons de Desconto</h2>
        <button
          onClick={handleAddNewCoupon}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Criar Novo Cupom
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por código ou descrição do cupom..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredCoupons.length === 0 && searchTerm ? (
         <p className="text-gray-600 text-center py-4">Nenhum cupom encontrado para "{searchTerm}".</p>
      ) : paginatedCoupons.length === 0 && !searchTerm ? (
         <p className="text-gray-600 text-center py-4">Não há cupons cadastrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mín. Compra</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usos</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expira em</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedCoupons.map(coupon => (
                        <tr key={coupon.code} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={coupon.description}>{coupon.description}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{coupon.discountType === 'percentage' ? 'Porcentagem' : 'Valor Fixo'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {coupon.discountType === 'percentage' ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{coupon.minPurchase ? `R$ ${coupon.minPurchase.toFixed(2)}` : 'N/A'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{coupon.usageCount ?? 0}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(coupon.expiryDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button onClick={() => handleToggleActive(coupon.code)}
                                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                                ${coupon.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                            >
                            {coupon.isActive ? 'Ativo' : 'Inativo'}
                            </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEditCoupon(coupon)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors">
                            <i className="fas fa-pencil-alt mr-1"></i> Editar
                            </button>
                            <button onClick={() => handleDeleteCoupon(coupon.code)} className="text-red-600 hover:text-red-900 transition-colors">
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