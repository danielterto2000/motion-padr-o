import React, { useState } from 'react';
import { Order, User } from '../../types';

interface AdminManageOrdersProps {
  orders: Order[];
  users: User[]; // To map userId to user name/email
}

export const AdminManageOrders: React.FC<AdminManageOrdersProps> = ({ orders: initialOrders, users }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders.sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as Order['status'] | 'all');
  };
  
  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuário Desconhecido';
  };

  const filteredOrders = orders
    .filter(order => {
        const user = users.find(u => u.id === order.userId);
        const buyerName = (order.buyerDetails?.name || user?.name || '').toLowerCase();
        const buyerEmail = (order.buyerDetails?.email || user?.email || '').toLowerCase();
        const orderId = order.id.toLowerCase();
        
        return (
            orderId.includes(searchTerm) ||
            buyerName.includes(searchTerm) ||
            buyerEmail.includes(searchTerm)
        );
    })
    .filter(order => filterStatus === 'all' || order.status === filterStatus);

  const handleViewOrderDetails = (order: Order) => {
    console.log(`Admin: View Order Details ${order.id} clicked (Simulated)`);
    alert(`Visualizar detalhes do pedido: ${order.id} (Simulado)`);
    // This would typically open a modal with full order details
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    console.log(`Admin: Update Order Status for ${orderId} to ${newStatus} (Simulated)`);
    alert(`Atualizar status do pedido ${orderId} para ${newStatus} (Simulado). A lista não será atualizada sem backend.`);
    // This would be an API call. For simulation:
    // setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? {...o, status: newStatus } : o));
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statusOptions: (Order['status'] | 'all')[] = ['all', 'pending_payment', 'processing', 'completed', 'failed', 'cancelled'];
  const statusDisplay: Record<Order['status'], string> = {
    pending_payment: 'Pag. Pendente',
    processing: 'Processando',
    completed: 'Completo',
    failed: 'Falhou',
    cancelled: 'Cancelado'
  };
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Pedidos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por ID do pedido, nome ou email do cliente..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'Todos os Status' : statusDisplay[status as Order['status']] || status}
            </option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 && (searchTerm || filterStatus !== 'all') ? (
         <p className="text-gray-600 text-center py-4">Nenhum pedido encontrado para os filtros aplicados.</p>
      ) : paginatedOrders.length === 0 && !searchTerm && filterStatus === 'all' ? (
         <p className="text-gray-600 text-center py-4">Não há pedidos registrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pedido</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.buyerDetails?.name || getUserName(order.userId)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">R$ {order.total.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'failed' ? 'bg-red-100 text-red-800' :
                                order.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}`}>
                            {statusDisplay[order.status] || order.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleViewOrderDetails(order)} className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                            <i className="fas fa-eye mr-1"></i> Detalhes
                            </button>
                            <select 
                                value={order.status} 
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                                className="text-xs p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                {Object.keys(statusDisplay).map(s => (
                                    <option key={s} value={s}>{statusDisplay[s as Order['status']]}</option>
                                ))}
                            </select>
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