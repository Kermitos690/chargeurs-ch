
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShippingForm from '@/components/shop/checkout/ShippingForm';
import OrderSummary from '@/components/shop/checkout/OrderSummary';
import LoadingState from '@/components/shop/checkout/LoadingState';
import { useCheckout } from '@/hooks/useCheckout';

const Checkout: React.FC = () => {
  const {
    cartItems,
    loading,
    processingPayment,
    shippingDetails,
    subtotal,
    shipping,
    total,
    handleInputChange,
    handleSubmit
  } = useCheckout();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Finaliser votre commande</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de livraison */}
            <div className="lg:col-span-2">
              <form id="checkout-form" onSubmit={handleSubmit}>
                <ShippingForm 
                  shippingDetails={shippingDetails}
                  handleInputChange={handleInputChange}
                />
                
                {/* Résumé de la commande pour mobile */}
                <div className="lg:hidden mt-6">
                  <OrderSummary
                    cartItems={cartItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                    processingPayment={processingPayment}
                    handleSubmit={handleSubmit}
                    isMobile={true}
                  />
                </div>
              </form>
            </div>
            
            {/* Résumé de la commande desktop */}
            <div className="hidden lg:block">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                processingPayment={processingPayment}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
