
import React, { useState, useEffect } from 'react';
import { CartItem, PaymentDetails } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  total: number;
  onSubmitOrder: (paymentDetails: PaymentDetails) => void;
  currentUserEmail?: string | null;
  currentUserName?: string | null;
}

type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  total,
  onSubmitOrder,
  currentUserEmail,
  currentUserName,
}) => {
  const [buyerInfo, setBuyerInfo] = useState({
    name: currentUserName || '',
    email: currentUserEmail || '',
    cpf: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    nameOnCard: currentUserName || '',
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Pre-fill if user info changes (e.g. logs in on another tab and comes back)
    if (currentUserName) setBuyerInfo(prev => ({...prev, name: currentUserName}));
    if (currentUserEmail) setBuyerInfo(prev => ({...prev, email: currentUserEmail}));
  }, [currentUserName, currentUserEmail])

  const handleBuyerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    if (!buyerInfo.name.trim()) errors.name = "Nome é obrigatório.";
    if (!buyerInfo.email.trim()) errors.email = "E-mail é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(buyerInfo.email)) errors.email = "E-mail inválido.";
    if (!buyerInfo.cpf.trim()) errors.cpf = "CPF é obrigatório.";
    // Basic CPF format validation (11 digits) - can be improved with actual validation logic
    else if (!/^\d{11}$/.test(buyerInfo.cpf.replace(/\D/g, ''))) errors.cpf = "CPF inválido (deve ter 11 dígitos).";


    if (paymentMethod === 'credit_card') {
      if (!cardDetails.number.trim()) errors.cardNumber = "Número do cartão é obrigatório.";
      // Basic card number validation (e.g., Luhn algorithm for real app)
      else if (!/^\d{13,19}$/.test(cardDetails.number.replace(/\s/g, ''))) errors.cardNumber = "Número do cartão inválido.";
      if (!cardDetails.expiry.trim()) errors.cardExpiry = "Validade é obrigatória.";
      // Basic expiry format MM/YY or MM/YYYY
      else if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(cardDetails.expiry)) errors.cardExpiry = "Validade inválida (MM/AA ou MM/AAAA).";
      if (!cardDetails.cvv.trim()) errors.cardCvv = "CVV é obrigatório.";
      else if (!/^\d{3,4}$/.test(cardDetails.cvv)) errors.cardCvv = "CVV inválido.";
      if (!cardDetails.nameOnCard.trim()) errors.cardName = "Nome no cartão é obrigatório.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }
    setIsProcessing(true);
    const paymentPayload: PaymentDetails = {
      method: paymentMethod,
      buyerInfo: {
        ...buyerInfo,
        cpf: buyerInfo.cpf.replace(/\D/g, ''), // Store only digits for CPF
      },
      ...(paymentMethod === 'credit_card' && { cardDetails: {
        ...cardDetails,
        number: cardDetails.number.replace(/\s/g, ''), // Store only digits
      } }),
    };
    await onSubmitOrder(paymentPayload);
    setIsProcessing(false); // Reset on error or if user navigates back
  };

  const renderPaymentMethodForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <div className="space-y-4 mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">Detalhes do Cartão de Crédito</h3>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input type="text" name="number" id="cardNumber" value={cardDetails.number} onChange={handleCardDetailsChange} className={`input-field ${formErrors.cardNumber ? 'border-red-500' : ''}`} placeholder="0000 0000 0000 0000" />
              {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Validade (MM/AA)</label>
                <input type="text" name="expiry" id="cardExpiry" value={cardDetails.expiry} onChange={handleCardDetailsChange} className={`input-field ${formErrors.cardExpiry ? 'border-red-500' : ''}`} placeholder="MM/AA" />
                {formErrors.cardExpiry && <p className="text-red-500 text-xs mt-1">{formErrors.cardExpiry}</p>}
              </div>
              <div>
                <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input type="text" name="cvv" id="cardCvv" value={cardDetails.cvv} onChange={handleCardDetailsChange} className={`input-field ${formErrors.cardCvv ? 'border-red-500' : ''}`} placeholder="123" />
                {formErrors.cardCvv && <p className="text-red-500 text-xs mt-1">{formErrors.cardCvv}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Nome no Cartão</label>
              <input type="text" name="nameOnCard" id="cardName" value={cardDetails.nameOnCard} onChange={handleCardDetailsChange} className={`input-field ${formErrors.cardName ? 'border-red-500' : ''}`} />
              {formErrors.cardName && <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>}
            </div>
          </div>
        );
      case 'pix':
        return (
          <div className="mt-6 p-6 border border-gray-200 rounded-md bg-gray-50 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Pagar com PIX</h3>
            <div className="flex justify-center mb-3">
                <i className="fab fa-pix fa-4x text-green-500"></i> {/* Requires Font Awesome 6 */}
                {/* Fallback or actual QR image */}
            </div>
            <p className="text-gray-600 mb-2">Escaneie o QR Code abaixo ou copie o código para pagar.</p>
            <div className="bg-gray-200 p-3 rounded my-2 text-sm font-mono break-all">
                {/* Simulated PIX QR Code Text */}
                00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-1234-567890abcdef5204000053039865802BR5925Nome Sobrenome Fantasia6009SAO PAULO62070503***6304ABCD
            </div>
            <button className="mt-2 text-sm text-blue-600 hover:underline">Copiar Código PIX</button>
            <p className="text-xs text-gray-500 mt-3">O pagamento via PIX é confirmado em poucos segundos.</p>
          </div>
        );
      case 'boleto':
        return (
          <div className="mt-6 p-6 border border-gray-200 rounded-md bg-gray-50 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Pagar com Boleto Bancário</h3>
            <i className="fas fa-barcode fa-4x text-gray-600 mb-3"></i>
            <p className="text-gray-600 mb-4">O boleto será gerado com vencimento em 2 dias úteis. A confirmação pode levar até 3 dias úteis.</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
              Gerar Boleto (Simulado)
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (cartItems.length === 0 && !isProcessing) { // Allow to complete if processing started with items
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Seu carrinho está vazio.</h2>
        <p className="text-gray-600 mt-2 mb-6">Não é possível prosseguir para o checkout sem itens no carrinho.</p>
        <a href="#templates-grid" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors">
            Ver Templates
        </a>
      </div>
    );
  }


  return (
    <section id="checkout-page" className="py-12 bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalizar Compra</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-6">
          {/* Buyer Information */}
          <fieldset>
            <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Seus Dados</legend>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" name="name" id="name" value={buyerInfo.name} onChange={handleBuyerInfoChange} className={`input-field ${formErrors.name ? 'border-red-500' : ''}`} required />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                <input type="email" name="email" id="email" value={buyerInfo.email} onChange={handleBuyerInfoChange} className={`input-field ${formErrors.email ? 'border-red-500' : ''}`} required />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF (somente números)</label>
                <input type="text" name="cpf" id="cpf" value={buyerInfo.cpf} onChange={handleBuyerInfoChange} className={`input-field ${formErrors.cpf ? 'border-red-500' : ''}`} placeholder="00000000000" required />
                {formErrors.cpf && <p className="text-red-500 text-xs mt-1">{formErrors.cpf}</p>}
              </div>
            </div>
          </fieldset>

          {/* Payment Method */}
          <fieldset className="mt-6">
            <legend className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Forma de Pagamento</legend>
            <div className="flex space-x-4 mb-4">
              {(['credit_card', 'pix', 'boleto'] as PaymentMethod[]).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-all
                    ${paymentMethod === method ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                >
                  {method === 'credit_card' && <><i className="fas fa-credit-card mr-2"></i>Cartão</>}
                  {method === 'pix' && <><i className="fab fa-pix mr-2"></i>PIX</>} {/* Ensure FontAwesome 6 for PIX icon */}
                  {method === 'boleto' && <><i className="fas fa-barcode mr-2"></i>Boleto</>}
                </button>
              ))}
            </div>
            {renderPaymentMethodForm()}
          </fieldset>

          {/* Order Summary (Compact) */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Resumo do Pedido</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 py-1">
                <span>{item.name} (x{item.quantity})</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-2 pt-2 border-t">
              <span>Total a Pagar:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-60"
            >
              {isProcessing ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-shield-alt mr-2"></i>}
              {isProcessing ? 'Processando Pagamento...' : `Confirmar Pagamento (R$ ${total.toFixed(2)})`}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .input-field {
          display: block;
          width: 100%;
          padding: 0.65rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .input-field:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
          outline: none;
        }
        .border-red-500 {
            border-color: #EF4444 !important;
        }
      `}</style>
    </section>
  );
};
