"use client";

import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import {
  X,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Trash2,
  CheckCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCheckout,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  // Close drawer on Escape key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };

    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput("");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Shopping Cart
                </h2>
                <p className="text-xs text-slate-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors"
                  title="Empty Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="px-5 py-3 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  {freeShippingRemaining > 0 ? (
                    <>
                      Add{" "}
                      <strong className="text-blue-700">
                        {formatCurrency(freeShippingRemaining)}
                      </strong>{" "}
                      more for FREE shipping!
                    </>
                  ) : (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Congratulations! You've unlocked FREE shipping!
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Looks like you haven't added anything yet. Discover our latest tech, jewelry, and fashion items!
                </p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50/80 p-5 sm:p-6 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. ZYNIX10)"
                        className="w-full px-3 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 uppercase tracking-wider font-mono placeholder:normal-case placeholder:font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Cart Math Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(tax)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-2.5 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-xl font-black text-blue-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated Secure 256-bit SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
