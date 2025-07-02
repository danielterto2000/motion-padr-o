
import React, { useState } from 'react';
import { CartItem, Coupon, AppView } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  removeFromCart: (templateId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => string; // Returns a message
  subtotal: number;
  discount: number;
  total: number;
  onProceedToCheckout: () => void;
  isLoggedIn: boolean;
  onLoginRequest: () => void;
  onChangeView: (view: AppView, targetOrEvent?: string | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  removeFromCart,
  appliedCoupon,
  onApplyCoupon,
  subtotal,
  discount,
  total,
  onProceedToCheckout,
  isLoggedIn,
  onLoginRequest,
  onChangeView,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const handleApplyCouponClick = () => {
    if (!couponCode.trim()) {
      setCouponMessage("Por favor, insira um código de cupom.");
      return;
    }
    const message = onApplyCoupon(couponCode);
    setCouponMessage(message);
    // If coupon applied successfully, or if it was invalid and got removed,
    // recalculation of totals should happen in App.tsx and props will update.
  };

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para finalizar a compra.");
      onLoginRequest(); // This will set a postLoginAction to return to cart or proceed to checkout
    } else {
      onProceedToCheckout();
    }
  };

  return (
    <section id="cart-page" className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white shadow-md rounded-lg">
            <i className="fas fa-shopping-cart fa-3x text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-600 mb-2">Seu carrinho está vazio.</p>
            <p className="text-gray-500 mb-6">Adicione templates para vê-los aqui.</p>
            <button
              onClick={(e) => {
                // e.preventDefault(); // Not needed if it's a button, not an anchor
                onChangeView('main', '#templates-grid');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Ver Templates
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
            {/* Cart Items List */}
            <div className="space-y-6 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center mb-4 sm:mb-0 flex-grow">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <p className="text-lg font-semibold text-blue-600 mr-4 sm:mr-6">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      aria-label={`Remover ${item.name} do carrinho`}
                    >
                      <i className="fas fa-trash-alt fa-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="mb-8 p-4 border border-dashed border-gray-300 rounded-md">
              <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">Cupom de Desconto</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value); setCouponMessage(null); }}
                  placeholder="Insira seu cupom"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleApplyCouponClick}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <p className={`mt-2 text-sm ${couponMessage.includes("aplicado") || couponMessage.includes("válido") ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon.code}):</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2 mt-2">
                  <span>Total Final:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-8 text-right">
              <button
                onClick={handleCheckoutClick}
                disabled={cartItems.length === 0 || (appliedCoupon && appliedCoupon.minPurchase && subtotal < appliedCoupon.minPurchase && discount === 0)} // Disable if invalid coupon makes total effectively unconfirmed
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-lock mr-2"></i> Finalizar Compra
              </button>
              {!isLoggedIn && cartItems.length > 0 && (
                <p className="text-sm text-red-500 mt-2 text-right">Você precisa fazer login para finalizar a compra.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};