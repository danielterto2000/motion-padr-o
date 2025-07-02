
import React from 'react';
import { Order } from '../types';

interface OrderSuccessPageProps {
  order: Order;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onContinueShopping, onViewOrders }) => {
  return (
    <section id="order-success-page" className="py-16 bg-green-50 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white shadow-2xl rounded-xl p-8 md:p-12">
        <div className="mb-6">
          <i className="fas fa-check-circle fa-5x text-green-500"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pagamento Confirmado!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Obrigado pela sua compra, <span className="font-semibold">{order.buyerDetails.name}</span>!
        </p>
        <p className="text-gray-600 mb-6">
          Seu pedido <span className="font-semibold text-blue-600">#{order.id}</span> foi processado com sucesso.
          Um e-mail de confirmação com os detalhes e links para download foi enviado para <span className="font-semibold">{order.buyerDetails.email}</span>. (Simulação)
        </p>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-8 text-left">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumo do Pedido</h2>
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-800">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          {order.discountApplied > 0 && (
            <div className="flex justify-between py-2 mt-2 border-t border-gray-200 text-green-600">
                <p className="font-medium">Desconto ({order.couponCode}):</p>
                <p className="font-semibold">- R$ {order.discountApplied.toFixed(2)}</p>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold py-2 mt-2 border-t-2 border-gray-300">
            <p>Total Pago:</p>
            <p>R$ {order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="my-8 text-left">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Seus Downloads:</h3>
            <ul className="space-y-2">
                {order.downloadLinks?.map(link => (
                    <li key={link.templateId} className="bg-blue-50 p-3 rounded-md hover:bg-blue-100 transition-colors">
                        <a 
                            href={link.link} // This is a simulated link
                            onClick={(e) => {
                                e.preventDefault(); 
                                alert(`Simulando download de ${link.name}... Verifique o console para o link real (se houver). Link: ${link.link}`);
                                console.log(`Simulated download link for ${link.name}: ${link.link}`);
                            }}
                            className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                            target="_blank" 
                            rel="noopener noreferrer" // Good practice, though not a real download
                        >
                           <i className="fas fa-download mr-2"></i> Baixar {link.name}
                        </a>
                    </li>
                ))}
                 {!order.downloadLinks?.length && <p className="text-gray-500 text-sm">Links de download aparecerão aqui.</p>}
            </ul>
        </div>


        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onViewOrders}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            <i className="fas fa-receipt mr-2"></i> Ver Meus Pedidos
          </button>
          <button
            onClick={onContinueShopping}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            <i className="fas fa-store mr-2"></i> Continuar Comprando
          </button>
        </div>
      </div>
    </section>
  );
};
