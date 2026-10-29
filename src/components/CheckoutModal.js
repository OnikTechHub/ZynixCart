"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Truck,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Package,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
    subtotal,
    discount,
    appliedCoupon,
    shipping,
    tax,
    total,
  } = useCart();

  const [step, setStep] = useState("form"); // 'form' | 'processing' | 'success'
  const [formData, setFormData] = useState({
    fullName: "Alex Mercer",
    email: "alex.mercer@example.com",
    phone: "+1 (555) 019-2834",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    postalCode: "97477",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
  });
  const [orderSummary, setOrderSummary] = useState(null);

  // Close on Escape when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && step !== "processing") closeCheckout();
    };

    if (isCheckoutOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCheckoutOpen, closeCheckout, step]);

  // Reset modal state when opened
  useEffect(() => {
    if (isCheckoutOpen) {
      setStep("form");
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setStep("processing");

    // Simulate payment and order creation
    setTimeout(() => {
      const orderId = "ZYX-" + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);

      setOrderSummary({
        orderId,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        estimatedDelivery: deliveryDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        customerName: formData.fullName,
        customerEmail: formData.email,
        address: `${formData.address}, ${formData.city}`,
        items: [...cart],
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        shipping,
        tax,
        total,
      });

      // Clear the cart
      clearCart();
      setStep("success");
    }, 1600);
  };

  const handleFinish = () => {
    closeCheckout();
    setStep("form");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={step === "processing" ? undefined : closeCheckout}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-fade-in my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {step === "success" ? "Order Confirmed!" : "Secure Checkout"}
              </h2>
              <p className="text-xs text-slate-500">
                {step === "success"
                  ? `Thank you for shopping with ZynixCart`
                  : `Simulated 256-Bit Encrypted Payment`}
              </p>
            </div>
          </div>

          {step !== "processing" && (
            <button
              onClick={closeCheckout}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* STEP 1: CHECKOUT FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>1. Shipping Address</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1 font-medium">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>2. Payment Simulation</span>
                </h3>

                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  {[
                    { id: "card", label: "Card", desc: "Visa/Mastercard" },
                    { id: "paypal", label: "PayPal", desc: "Instant" },
                    { id: "cod", label: "Cash on Delivery", desc: "At doorstep" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-500 text-blue-900"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold leading-tight">
                        {method.label}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {method.desc}
                      </span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        readOnly
                        value={formData.cardNumber}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono text-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          Expiration
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          readOnly
                          value={formData.cardExpiry}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          readOnly
                          value={formData.cardCvc}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Math Review */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.length} unique items)</span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo Discount ({appliedCoupon?.code})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-800">
                    {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(tax)}
                  </span>
                </div>
                <div className="border-t border-blue-200/80 pt-2 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-xl font-black text-blue-700">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Complete Order ({formatCurrency(total)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* STEP 2: PROCESSING SIMULATION */}
          {step === "processing" && (
            <div className="py-16 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Authorizing Simulated Payment...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please hold on while ZynixCart verifies your shipping details and generates your order confirmation receipt.
              </p>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {step === "success" && orderSummary && (
            <div className="text-center py-4 space-y-6">
              {/* Success Badge */}
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce-short">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Thank You, {orderSummary.customerName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  A simulated confirmation email has been dispatched to{" "}
                  <strong>{orderSummary.customerEmail}</strong>
                </p>
              </div>

              {/* Order Details Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {orderSummary.orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Date
                    </span>
                    <span className="font-semibold text-slate-700">
                      {orderSummary.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 text-slate-700">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Estimated Delivery:{" "}
                    <strong className="text-slate-900">
                      {orderSummary.estimatedDelivery}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 py-1 text-slate-700">
                  <Package className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Shipping To:{" "}
                    <strong className="text-slate-900">
                      {orderSummary.address}
                    </strong>
                  </span>
                </div>

                {/* Items Purchased mini thumbnail list */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                    Purchased Items ({orderSummary.items.length})
                  </span>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {orderSummary.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-md bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={28}
                              height={28}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <span className="truncate text-slate-800 font-medium">
                            {item.title}
                          </span>
                          <span className="text-slate-400">×{item.quantity}</span>
                        </div>
                        <span className="font-semibold text-slate-900 shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Total Paid */}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total Paid (Simulated)</span>
                  <span className="text-base font-black text-emerald-600">
                    {formatCurrency(orderSummary.total)}
                  </span>
                </div>
              </div>

              {/* Continue Shopping CTA */}
              <button
                onClick={handleFinish}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
              >
                Continue Shopping on ZynixCart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
