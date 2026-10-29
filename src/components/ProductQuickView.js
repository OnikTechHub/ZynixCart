"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants";
import { X, Star, ShoppingBag, Plus, Minus, ShieldCheck, Truck, Check } from "lucide-react";

export default function ProductQuickView() {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset quantity when modal opens with a new product
  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
    setImageError(false);
  }, [quickViewProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const categoryStyle =
    CATEGORY_COLORS[quickViewProduct.category] || CATEGORY_COLORS.default;
  const categoryLabel =
    CATEGORY_LABELS[quickViewProduct.category] || quickViewProduct.category;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-fade-in my-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative bg-slate-50 p-8 flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
            <Image
              src={
                imageError
                  ? "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80"
                  : quickViewProduct.image
              }
              alt={quickViewProduct.title}
              width={350}
              height={350}
              className="max-h-72 w-auto object-contain drop-shadow-md"
              onError={() => setImageError(true)}
              priority
            />
          </div>

          {/* Product Info Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category Badge & Rating */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${categoryStyle.bg}`}
                >
                  {categoryLabel}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{quickViewProduct.rating?.rate?.toFixed(1) || "4.5"}</span>
                  <span className="text-slate-400 font-normal">
                    ({quickViewProduct.rating?.count || 0})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {quickViewProduct.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatCurrency(quickViewProduct.price)}
                </span>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  In Stock
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-4 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Actions Section */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-slate-600 hover:bg-slate-200/80 disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 hover:bg-slate-200/80 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add To Cart Button */}
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-98 ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce-short" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      Add {quantity > 1 ? `${quantity} Items` : ""} to Cart •{" "}
                      {formatCurrency(quickViewProduct.price * quantity)}
                    </span>
                  </>
                )}
              </button>

              {/* Value proposition badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-500" /> Free returns
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
