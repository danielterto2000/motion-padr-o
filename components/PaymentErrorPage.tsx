
import React from 'react';
import { Order } from '../types'; // Optional: To show details of failed attempt

interface PaymentErrorPageProps {
  onRetry: () => void;
  onGoToShop: () => void;
  orderAttempt?: Order | null; // Optional: to display info about the failed attempt
}

export const PaymentErrorPage: React.FC<PaymentErrorPageProps> = ({ onRetry, onGoToShop, orderAttempt }) => {
  return (
    <section id="payment-error-page" className="py-16 bg-red-50 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white shadow-2xl rounded-xl p-8 md:p-12">
        <div className="mb-6">
          <i className="fas fa-times-circle fa-5x text-red-500"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ops! Falha no Pagamento</h1>
        <p className="text-lg text-gray-600 mb-6">
          Não foi possível processar seu pagamento no momento. Por favor, verifique os dados informados ou tente novamente com outra forma de pagamento.
        </p>

        {orderAttempt && (
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-6 text-left text-sm">
            <h2 className="font-semibold text-gray-700 mb-2">Detalhes da Tentativa:</h2>
            <p>Pedido (tentativa): <span className="font-mono">{orderAttempt.id}</span></p>
            <p>Valor: R$ {orderAttempt.total.toFixed(2)}</p>
            <p>Método: {orderAttempt.paymentMethod.replace('_', ' ')}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            <i className="fas fa-redo-alt mr-2"></i> Tentar Novamente
          </button>
          <button
            onClick={onGoToShop}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            <i className="fas fa-store mr-2"></i> Voltar para Loja
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-8">
          Se o problema persistir, entre em contato com nosso suporte.
        </p>
      </div>
    </section>
  );
};
