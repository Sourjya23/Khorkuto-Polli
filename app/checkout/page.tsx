'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import { DELIVERY_ZONES, FREE_DELIVERY_THRESHOLD } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'Pending Verification' | 'Verified'>('Pending Verification');
  
  useEffect(() => {
    // Initialize socket
    fetch('/api/socket/io').finally(() => {
      const socket = io({
        path: '/api/socket/io',
        addTrailingSlash: false,
      });

      if (orderId) {
        socket.emit('join_order', orderId);
      }

      socket.on('status_update', (data) => {
        if (data.status === 'Verified') {
          setPaymentStatus('Verified');
        }
      });

      return () => {
        socket.disconnect();
      };
    });
  }, [orderId]);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    zone: 'mirpur' as keyof typeof DELIVERY_ZONES,
  });

  const [paymentData, setPaymentData] = useState({
    method: 'bkash' as 'bkash' | 'nagad',
    senderNumber: '',
    transactionId: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = isMounted ? getCartTotal() : 0;
  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryCharge = isFreeDelivery ? 0 : DELIVERY_ZONES[formData.zone].charge;
  const grandTotal = cartTotal + deliveryCharge;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      // 1. Create Order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.product._id,
            name: i.product.title,
            price: i.variant?.priceOverride || i.product.price,
            quantity: i.quantity,
            image: i.product.images[0].url
          })),
          totalAmount: grandTotal,
          shippingAddress: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            phone: formData.phone
          },
          paymentMethod: paymentData.method
        })
      });

      if (!orderRes.ok) throw new Error('Failed to create order');
      const orderData = await orderRes.json();
      setOrderId(orderData.orderId);

      // 2. Submit Payment TrxID
      const payRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          trxId: paymentData.transactionId
        })
      });

      if (!payRes.ok) throw new Error('Payment verification failed');
      
      clearCart();
      setStep(3);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isMounted) return null;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="bg-paper min-h-screen py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
        <Link href="/shop-all" className="inline-block bg-terracotta text-white px-8 py-3 rounded-full hover:bg-terracotta-dark">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="bg-paper min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-card text-center max-w-md w-full mx-4">
          <CheckCircle size={64} className="text-success mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4 text-ink">Order Placed!</h1>
          <p className="text-ink-soft mb-8">
            Your order has been submitted. We are verifying your payment and will start processing shortly. 
            We'll send updates to {formData.phone}.
          </p>
          <div className="bg-paper-dark p-4 rounded-xl mb-8 text-sm text-left relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl ${paymentStatus === 'Verified' ? 'bg-success text-white' : 'bg-warning text-ink'}`}>
              {paymentStatus}
            </div>
            <p className="mb-2"><span className="font-medium text-ink">Order ID:</span> {orderId}</p>
            <p className="mb-2"><span className="font-medium text-ink">Amount:</span> ৳{grandTotal.toLocaleString('en-IN')}</p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-ink">Status:</span> 
              {paymentStatus === 'Pending Verification' ? (
                <span className="flex items-center gap-2 text-warning"><Loader2 size={14} className="animate-spin" /> Verifying (Live)</span>
              ) : (
                <span className="text-success font-semibold">Payment Verified!</span>
              )}
            </p>
          </div>
          <Link href="/" className="inline-block w-full bg-ink text-white px-8 py-4 rounded-full font-bold hover:bg-terracotta transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="mb-8">
          <button 
            onClick={() => step === 2 ? setStep(1) : window.history.back()}
            className="flex items-center gap-2 text-ink-soft hover:text-ink transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Form Area */}
          <div className="lg:w-7/12 xl:w-2/3 flex flex-col gap-8">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`flex-1 pb-4 border-b-2 ${step >= 1 ? 'border-terracotta text-ink font-semibold' : 'border-ink-muted/20 text-ink-muted'}`}>
                1. Shipping Details
              </div>
              <div className={`flex-1 pb-4 border-b-2 ${step >= 2 ? 'border-terracotta text-ink font-semibold' : 'border-ink-muted/20 text-ink-muted'}`}>
                2. Payment
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleDetailsSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-ink-muted/10">
                <h2 className="font-serif text-2xl text-ink mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-2">Full Name</label>
                    <input 
                      type="text" required
                      value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-2">Phone Number</label>
                    <input 
                      type="tel" required
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-ink-soft mb-2">Delivery Zone</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(Object.entries(DELIVERY_ZONES) as [keyof typeof DELIVERY_ZONES, {label:string, charge:number}][]).map(([key, zone]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({...formData, zone: key})}
                        className={`p-4 rounded-xl border-2 text-left transition-colors ${formData.zone === key ? 'border-terracotta bg-terracotta/5' : 'border-ink-muted/20 hover:border-ink-muted/50'}`}
                      >
                        <div className="font-medium text-ink">{zone.label}</div>
                        <div className="text-sm text-ink-soft mt-1">
                          {isFreeDelivery ? 'Free' : `৳${zone.charge}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-ink-soft mb-2">Detailed Address</label>
                  <textarea 
                    required rows={3}
                    placeholder="House/Flat No, Road, Area"
                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full md:w-auto bg-ink text-white px-10 py-4 rounded-xl font-bold hover:bg-terracotta transition-colors shadow-soft">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-ink-muted/10 animate-fade-in">
                <h2 className="font-serif text-2xl text-ink mb-6">Payment</h2>
                
                <div className="bg-warning/10 border border-warning/30 p-4 rounded-xl mb-8 flex gap-3 text-ink-soft text-sm leading-relaxed">
                  <ShieldCheck size={24} className="text-warning shrink-0" />
                  <div>
                    <p className="font-medium text-ink mb-1">Manual Payment Verification</p>
                    Please send the exact total amount to our merchant number below. We will verify your Transaction ID before processing the order.
                  </div>
                </div>

                {/* Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentData({...paymentData, method: 'bkash'})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors ${paymentData.method === 'bkash' ? 'border-[#E2136E] bg-[#E2136E]/5' : 'border-ink-muted/20 hover:border-ink-muted/50'}`}
                  >
                    <span className="font-bold text-[#E2136E] text-lg tracking-wider">bKash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({...paymentData, method: 'nagad'})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors ${paymentData.method === 'nagad' ? 'border-[#F47D31] bg-[#F47D31]/5' : 'border-ink-muted/20 hover:border-ink-muted/50'}`}
                  >
                    <span className="font-bold text-[#F47D31] text-lg tracking-wider">NAGAD</span>
                  </button>
                </div>

                {/* Instructions */}
                <div className="bg-paper-dark p-6 rounded-xl mb-8 text-center border border-ink-muted/10">
                  <p className="text-sm text-ink-soft uppercase tracking-widest font-semibold mb-2">Merchant Number</p>
                  <p className="text-3xl font-mono font-bold text-ink mb-4 tracking-wider">01712-345-678</p>
                  <p className="text-sm font-medium text-ink">Total to send: <span className="text-terracotta text-lg">৳{grandTotal.toLocaleString('en-IN')}</span></p>
                  <div className="mt-6 text-left text-sm text-ink-soft space-y-2">
                    <p>1. Open your {paymentData.method === 'bkash' ? 'bKash' : 'Nagad'} app.</p>
                    <p>2. Select <strong>Make Payment</strong> (Merchant).</p>
                    <p>3. Enter the number above and amount.</p>
                    <p>4. Use <strong>LUMINA</strong> as reference.</p>
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-2">Your {paymentData.method === 'bkash' ? 'bKash' : 'Nagad'} Number</label>
                    <input 
                      type="tel" required placeholder="01X..."
                      value={paymentData.senderNumber} onChange={e => setPaymentData({...paymentData, senderNumber: e.target.value})}
                      className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-2">Transaction ID (TrxID)</label>
                    <input 
                      type="text" required placeholder="e.g. 8K3MD59G"
                      value={paymentData.transactionId} onChange={e => setPaymentData({...paymentData, transactionId: e.target.value.toUpperCase()})}
                      className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none font-mono"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isProcessing} className="w-full bg-terracotta text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-terracotta-dark transition-all shadow-card hover:shadow-modal disabled:opacity-70 flex justify-center items-center gap-2">
                  {isProcessing ? <><Loader2 className="animate-spin" /> Processing...</> : 'Place Order'}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-5/12 xl:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink-muted/10 sticky top-28">
              <h3 className="font-serif text-2xl text-ink mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
                {items.map((item) => {
                  const id = item.variant ? item.variant.sku : item.product._id;
                  const price = item.variant?.priceOverride || item.product.price;
                  return (
                    <div key={id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-paper-dark rounded-md overflow-hidden shrink-0 border border-ink-muted/10">
                        <img src={item.product.images[0].url} alt={item.product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-ink line-clamp-1">{item.product.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-ink-soft">{item.variant?.label || 'Standard'} × {item.quantity}</p>
                          <p className="text-sm font-semibold">৳{(price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-ink-muted/10 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span>৳{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Delivery ({DELIVERY_ZONES[formData.zone].label})</span>
                  {isFreeDelivery ? (
                    <span className="text-success font-medium">Free</span>
                  ) : (
                    <span>৳{deliveryCharge}</span>
                  )}
                </div>
                <div className="border-t border-ink-muted/20 pt-4 mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-ink">Total</span>
                  <span className="text-xl font-bold text-ink">৳{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
