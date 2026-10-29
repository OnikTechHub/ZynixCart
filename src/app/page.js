"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { fetchProducts } from "@/lib/api";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Gem,
  Shirt,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrendingProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load trending products", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrendingProducts();
  }, []);

  // Curate top-rated trending products (up to 8 items)
  const trendingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 8);
  }, [products]);

  const categoryHighlights = [
    {
      id: "electronics",
      title: "Electronics & Tech",
      desc: "Storage, displays & smart gadgets",
      color: "bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-400",
      href: "/products?category=electronics",
      badge: "Tech Essentials",
    },
    {
      id: "jewelery",
      title: "Fine Jewelry",
      desc: "Gold, silver & gemstone luxury",
      color: "bg-amber-50 text-amber-600 border-amber-200 group-hover:border-amber-400",
      href: "/products?category=jewelery",
      badge: "Precious Metals",
    },
    {
      id: "men",
      title: "Men's Apparel",
      desc: "Jackets, casual tees & backpacks",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:border-indigo-400",
      href: "/products?category=men's clothing",
      badge: "Urban Wear",
    },
    {
      id: "women",
      title: "Women's Fashion",
      desc: "Comfortable outerwear & casual tees",
      color: "bg-rose-50 text-rose-600 border-rose-200 group-hover:border-rose-400",
      href: "/products?category=women's clothing",
      badge: "Trending Styles",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header with ZynixCart branding and multi-page nav */}
      <Navbar />

      {/* Hero section with "Explore Collection" CTA */}
      <HeroBanner />

      {/* Categories Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Popular Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 group"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryHighlights.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-400 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${cat.color} transition-colors`}>
                    {cat.id === "electronics" && <Cpu className="w-6 h-6" />}
                    {cat.id === "jewelery" && <Gem className="w-6 h-6" />}
                    {cat.id === "men" && <Shirt className="w-6 h-6" />}
                    {cat.id === "women" && <ShoppingBag className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Explore items</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full border-t border-slate-200/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold mb-2 border border-amber-200/60">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked top-rated products with authentic ratings and instant checkout.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 group shrink-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trending Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4 overflow-hidden"
              >
                <div className="w-full pt-[85%] rounded-xl skeleton-shimmer relative" />
                <div className="space-y-2">
                  <div className="h-4 w-1/3 rounded-md skeleton-shimmer" />
                  <div className="h-4 w-full rounded-md skeleton-shimmer" />
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <div className="h-6 w-1/4 rounded-md skeleton-shimmer" />
                  <div className="h-8 w-20 rounded-xl skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Products Bottom CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              Over 20+ Products Available
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Looking for something specific?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm">
              Discover our complete collection with real-time keyword search, granular category filtering, and sorting options.
            </p>
          </div>

          <Link
            href="/products"
            className="z-10 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 group shrink-0"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Decorative glow circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* Value Proposition Highlights */}
      <section className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Free Shipping On Orders $50+
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Enjoy complimentary express delivery when your cart reaches $50 or use code FREESHIP.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  100% Genuine Guaranteed
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Every product is sourced directly with verified quality ratings and authentic specs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  30-Day Money Back Returns
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Not completely satisfied? Initiate a fast return with hassle-free simulated refunds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
