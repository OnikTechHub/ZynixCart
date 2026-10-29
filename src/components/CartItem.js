"use client";

import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/api";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-slate-100 last:border-b-0">
      {/* Product Image Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-200/60 flex items-center justify-center overflow-hidden">
        <Image
          src={
            imageError
              ? "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&q=80"
              : item.image
          }
          alt={item.title}
          width={80}
          height={80}
          className="max-h-full max-w-full object-contain"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1 leading-snug">
          {item.title}
        </h4>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs sm:text-sm font-bold text-slate-900">
            {formatCurrency(item.price)}
          </span>
          <span className="text-[10px] text-slate-400">each</span>
        </div>

        {/* Quantity Controls and Trash Button */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 sm:p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 text-xs font-bold text-slate-800 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 sm:p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label={`Increase quantity of ${item.title}`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
