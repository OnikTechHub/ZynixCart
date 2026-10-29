"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants";
import { Star, ShoppingBag, Eye, Check } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, openQuickView } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryStyle =
    CATEGORY_COLORS[product.category] || CATEGORY_COLORS.default;
  const categoryLabel =
    CATEGORY_LABELS[product.category] || product.category;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full pt-[90%] bg-slate-50/80 p-6 flex items-center justify-center overflow-hidden">
        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 z-10 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border shadow-2xs capitalize ${categoryStyle.bg}`}
        >
          {categoryLabel}
        </span>

        {/* Quick View Button (hover reveal on desktop, visible on tap) */}
        <button
          onClick={handleQuickView}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-blue-600 shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          title="Quick View"
          aria-label={`Quick view ${product.title}`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <Image
            src={imageError ? "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80" : product.image}
            alt={product.title}
            width={240}
            height={240}
            className="w-full h-full object-contain max-h-48 group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Rating and review count */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-800 ml-1">
              {product.rating?.rate?.toFixed(1) || "4.0"}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>

        {/* Product Title */}
        <h3
          className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 min-h-[40px] leading-snug"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price and Add to Cart Section */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 block font-normal">Price</span>
            <span className="text-lg sm:text-xl font-black text-slate-900">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isAdded
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 animate-bounce-short" />
                <span className="hidden xs:inline">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
