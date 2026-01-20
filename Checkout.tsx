
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, ArrowLeft, Lock, Smartphone, Globe } from 'lucide-react';
import { useStore } from '../components/StoreContext';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const { cart, currentUser, placeOrder } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
      placeOrder({
        id: orderId,
        items: cart,
        total: total,
        status: 'pending',
        date: new Date().toISOString(),
        customerName: currentUser?.name || 'Guest',
        customerEmail: currentUser?.email || 'guest@example.com',
        paymentMethod: 'stripe'
      });
      setIsProcessing(false);
      alert(`Payment Successful! Order #${orderId} has been placed.`);
      onNavigate('home');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
        <button onClick={() => onNavigate('shop')} className="text-blue-600 font-bold hover:underline">Return to shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => onNavigate('cart')} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-4xl font-bold text-zinc-900 font-serif">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Shipping Information */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-zinc-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="text-xl font-bold text-zinc-900">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">First Name</label>
                <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="John" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">Last Name</label>
                <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">Shipping Address</label>
                <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="House number and street name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">City</label>
                <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">Postal Code</label>
                <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="Postal Code" />
              </div>
            </div>
          </div>

          {/* 2. Payment Details */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-zinc-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-xl font-bold text-zinc-900">Payment Details</h2>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-[#4F46E5] bg-[#EEF2FF]' : 'border-zinc-100 bg-[#F8FAFB]'}`}
              >
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-[#4F46E5]' : 'text-zinc-400'} />
                <span className={`text-xs font-bold mt-2 ${paymentMethod === 'card' ? 'text-zinc-900' : 'text-zinc-400'}`}>Credit Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'paypal' ? 'border-[#4F46E5] bg-[#EEF2FF]' : 'border-zinc-100 bg-[#F8FAFB]'}`}
              >
                <Globe size={24} className={paymentMethod === 'paypal' ? 'text-blue-600' : 'text-zinc-400'} />
                <span className={`text-xs font-bold mt-2 ${paymentMethod === 'paypal' ? 'text-zinc-900' : 'text-zinc-400'}`}>PayPal</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('apple')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'apple' ? 'border-[#4F46E5] bg-[#EEF2FF]' : 'border-zinc-100 bg-[#F8FAFB]'}`}
              >
                <Smartphone size={24} className={paymentMethod === 'apple' ? 'text-black' : 'text-zinc-400'} />
                <span className={`text-xs font-bold mt-2 ${paymentMethod === 'apple' ? 'text-zinc-900' : 'text-zinc-400'}`}>Apple Pay</span>
              </button>
            </div>

            {/* Card Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">Card Number</label>
                <div className="relative">
                  <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="0000 0000 0000 0000" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                    <div className="w-8 h-5 bg-zinc-200 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">Expiry Date</label>
                  <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-3 ml-1">CVV</label>
                  <input type="text" className="w-full bg-[#F1F4F5] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4F46E5]/10" placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (Dark Theme) */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="bg-[#0D121F] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl">
            <h2 className="text-xl font-bold mb-10">Order Summary</h2>
            
            {/* Item List */}
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold leading-tight line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-[#6366F1] mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-4 border-t border-white/5 pt-10 mb-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="font-bold">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Shipping</span>
                <span className="text-[#10B981] font-bold uppercase tracking-wider text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Estimated Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-[#6366F1]">${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#4F46E5]/20 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock size={18} />
                  Pay ${total.toFixed(2)} Now
                </>
              )}
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-500">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Guaranteed safe and secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
