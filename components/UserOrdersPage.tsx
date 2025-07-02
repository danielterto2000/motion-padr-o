
import React from 'react';
import { Order } from '../types';

interface UserOrdersPageProps {
  orders: Order[];
  onNavigateToShop: () => void;
}

export const UserOrdersPage: React.FC<UserOrdersPageProps> = ({ orders, onNavigateToShop }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="user-orders-page" className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Meus Pedidos</h1>
          <p className="text-gray-600 mt-2">Acompanhe o histórico de suas compras e acesse seus downloads.</p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-md rounded-lg">
            <i className="fas fa-receipt fa-3x text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-600 mb-2">Você ainda não fez nenhum pedido.</p>
            <p className="text-gray-500 mb-6">Explore nossa loja e encontre templates incríveis!</p>
            <button
              onClick={onNavigateToShop}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Ir para Loja
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).map(order => ( // Sort by newest first
              <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-700">Pedido #{order.id.replace('ORD-', '')}</h2>
                    <p className="text-sm text-gray-500">Data: {formatDate(order.orderDate)}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                     <p className={`text-sm font-medium px-3 py-1 rounded-full inline-block
                        ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                       {order.status === 'completed' ? 'Completo' : 
                        order.status === 'pending_payment' ? 'Pendente' :
                        order.status === 'failed' ? 'Falhou' :
                        order.status === 'processing' ? 'Processando' :
                        order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-1">Total: R$ {order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Itens Comprados:</h3>
                  <ul className="space-y-2">
                    {order.items.map(item => (
                      <li key={item.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {order.status === 'completed' && order.downloadLinks && order.downloadLinks.length > 0 && (
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Downloads:</h3>
                        <ul className="space-y-1">
                        {order.downloadLinks.map(dl => (
                            <li key={dl.templateId}>
                                <a 
                                    href={dl.link}
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        alert(`Simulando download de ${dl.name}... Verifique o console para o link (simulado).`);
                                        console.log(`Simulated download link for ${dl.name}: ${dl.link}`);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center"
                                >
                                   <i className="fas fa-download mr-1.5"></i> Baixar {dl.name}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
                 {order.status === 'completed' && (!order.downloadLinks || order.downloadLinks.length === 0) && (
                    <p className="text-sm text-gray-500">Links de download indisponíveis para este pedido.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
