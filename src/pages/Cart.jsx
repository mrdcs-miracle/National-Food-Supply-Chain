import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  
  // State for Payment Simulation
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Calculate Total Price
  const total = cartItems.reduce((acc, item) => {
    // Convert "Rs. 450" string to number 450
    const price = parseInt(item.price.replace(/[^0-9]/g, '')); 
    return acc + price;
  }, 0);

  // Handle Payment
  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 2-second bank processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart(); // Clear the cart in App.jsx
    }, 2000);
  };

  // --- VIEW 1: EMPTY CART ---
  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="flex items-center justify-center w-24 h-24 mb-6 text-4xl text-green-600 bg-green-100 rounded-full">
          🛒
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="max-w-md mb-8 text-center text-gray-500">Looks like you haven't added any seeds or supplies yet.</p>
        <Link to="/marketplace">
          <button className="px-8 py-3 font-bold text-white transition-all bg-green-600 shadow-lg rounded-xl hover:bg-green-700 shadow-green-600/30">
            Browse Marketplace
          </button>
        </Link>
      </div>
    );
  }

  // --- VIEW 2: SUCCESS MESSAGE ---
  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-green-50">
        <div className="flex items-center justify-center w-24 h-24 mb-6 text-5xl text-green-600 bg-white rounded-full shadow-xl">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="mb-2 text-3xl font-black text-gray-800">Payment Successful!</h2>
        <p className="mb-8 text-center text-green-700 font-medium">Your order has been confirmed. Tracking ID: <span className="font-bold">LK-9231-R</span></p>
        
        <div className="flex gap-4">
            <button 
            onClick={() => navigate('/')}
            className="px-8 py-3.5 font-bold text-green-700 transition-all bg-green-100 rounded-xl hover:bg-green-200"
            >
            Return Home
            </button>
            <button 
            onClick={() => navigate('/tracking?id=LK-9231-R')}
            className="flex items-center gap-2 px-8 py-3.5 font-bold text-white transition-all bg-gradient-to-r from-teal-500 to-green-500 shadow-xl rounded-xl hover:shadow-teal-500/40 hover:-translate-y-1"
            >
            Track My Order
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
        </div>
      </div>
    );
  }

  // --- VIEW 3: CART & CHECKOUT ---
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Shopping Cart ({cartItems.length} items)</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* LEFT SIDE: ITEM LIST */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                {/* Image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-100 rounded-lg">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </div>
                
                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                  <p className="mt-1 font-bold text-green-600">{item.price}</p>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(index)}
                  className="p-2 text-gray-400 transition-colors rounded-full hover:text-red-500 hover:bg-red-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: CHECKOUT BOX */}
            <div className="lg:w-[450px]">
            <div className="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-24">
              
              {!isCheckingOut ? (
                // --- STEP A: ORDER SUMMARY ---
                <>
                  <h2 className="mb-8 text-2xl font-black text-gray-900 border-b pb-4">Order Summary</h2>
                  <div className="mb-8 space-y-4">
                    <div className="flex justify-between text-gray-600 font-medium tracking-wide">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-800">Rs. {total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium tracking-wide">
                      <span>Shipping</span>
                      <span className="font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">Free</span>
                    </div>
                    <div className="flex justify-between pt-6 text-xl font-black text-gray-900 border-t border-dashed">
                      <span>Total</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">Rs. {total}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 font-bold tracking-wider text-white uppercase transition-all duration-300 bg-gray-900 shadow-2xl rounded-2xl hover:bg-gray-800 hover:-translate-y-1 hover:shadow-gray-900/30"
                  >
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                // --- STEP B: MODERN PAYMENT FORM ---
                <form onSubmit={handlePayment} className="animate-fade-in-up">
                  <h2 className="mb-6 text-2xl font-black text-gray-900">Secure Checkout</h2>
                  
                  {/* Payment Method Selector */}
                  <div className="mb-8">
                    <label className="block mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button type="button" onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md scale-105' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>
                            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Card</span>
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('paypal')} className={`flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-105' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>
                            <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H5.07a.544.544 0 01-.548-.608L7.842 2.872A.544.544 0 018.39 2.44h7.026c2.404 0 4.14 1.054 4.54 3.738.318 2.115-.558 4.604-2.222 5.922-1.396 1.106-3.21 1.258-5.064 1.258H9.864c-.382 0-.623.328-.688.665L7.076 21.337z" /></svg>
                            <span className="text-[10px] font-bold uppercase tracking-wider">PayPal</span>
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('applepay')} className={`flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${paymentMethod === 'applepay' ? 'border-gray-900 bg-gray-50 text-gray-900 shadow-md scale-105' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}>
                            <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.253 3.51 7.59 9.05 7.31c1.35.07 2.46.82 3.15.82.72 0 2.05-.9 3.55-.78 1.48.09 2.8.69 3.56 1.83-3.1 1.83-2.6 5.86.37 7.07-.74 1.77-1.57 3.01-2.63 4.03zM12.03 7.25C11.83 4.3 14.54 1.88 17.15 2c.28 2.9-2.67 5.4-5.12 5.25z"/></svg>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Apple Pay</span>
                        </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  <div className="mb-8 space-y-5 transition-all">
                    {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-fade-in-up">
                            <div>
                                <label className="block mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3.5 text-sm font-medium border border-gray-200 rounded-xl outline-none bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-inner" required />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3.5 text-sm font-medium border border-gray-200 rounded-xl outline-none bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-inner" required />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">CVC</label>
                                    <input type="text" placeholder="123" className="w-full px-4 py-3.5 text-sm font-medium border border-gray-200 rounded-xl outline-none bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-inner" required />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                        <div className="px-4 py-8 text-center border-2 border-blue-100 border-dashed rounded-2xl bg-blue-50 animate-fade-in-up">
                            <p className="text-sm font-bold text-blue-800">You will be redirected to PayPal securely.</p>
                        </div>
                    )}

                    {paymentMethod === 'applepay' && (
                        <div className="px-4 py-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 animate-fade-in-up">
                            <p className="text-sm font-bold text-gray-800">Double-click side button to pay securely.</p>
                        </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setIsCheckingOut(false)}
                      className="px-6 py-4 font-bold text-gray-700 transition-colors bg-gray-100 text-sm hover:bg-gray-200 rounded-2xl"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl font-black uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-1 flex justify-center items-center"
                    >
                      {isProcessing ? (
                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (
                          `Pay Rs. ${total}`
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;