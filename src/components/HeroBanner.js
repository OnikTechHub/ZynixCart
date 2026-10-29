"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw, Zap } from "lucide-react";

export default function HeroBanner({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-100">
      {/* Decorative gradient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-medium shadow-xs">
            <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span>Elevate Your Daily Lifestyle with ZynixCart</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Curated Quality. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Instant Delivery.
            </span>{" "}
            Unbeatable Prices.
          </h1>

          {/* Subheading */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore authentic electronics, fine jewelery, and premium fashion directly from top-tier makers. Real-time shopping cart with seamless 1-click checkout simulation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/products"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/products?category=electronics"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Use Promo: ZYNIX10</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Fast Global Delivery</p>
                <p className="text-[11px] text-slate-500">Free shipping on orders $50+</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Verified Authentic</p>
                <p className="text-[11px] text-slate-500">Official FakeStoreAPI items</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">30-Day Easy Returns</p>
                <p className="text-[11px] text-slate-500">Hassle-free guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
