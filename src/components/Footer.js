"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useToast } from "@/context/ToastContext";
import { Mail, ArrowRight, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Footer({ onSelectCategory }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast("Thanks for subscribing to ZynixCart Insider! Check your inbox for exclusive perks.", "success");
    setNewsletterEmail("");
  };

  const footerCategories = [
    { id: "all", label: "All Catalog", href: "/products" },
    { id: "electronics", label: "Electronics & Tech", href: "/products?category=electronics" },
    { id: "jewelery", label: "Fine Jewelry", href: "/products?category=jewelery" },
    { id: "men's clothing", label: "Men's Apparel", href: "/products?category=men's clothing" },
    { id: "women's clothing", label: "Women's Fashion", href: "/products?category=women's clothing" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info & Vector Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" isLight={true} showTagline={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ZynixCart is a modern next-generation e-commerce shopping platform providing top-quality electronics, fine jewelry, and everyday apparel powered by real-time reactive cart technology.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified SSL Safe & Simulated Payments</span>
              </div>
            </div>
          </div>

          {/* Quick Category Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerCategories.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(item.id);
                      }
                    }}
                    className="text-slate-400 hover:text-white transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                Order Tracking
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Shipping & Delivery
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                30-Day Returns Policy
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Privacy Protection
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stay In The Loop</span>
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get secret promo codes and early access to clearance drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2.5 bg-slate-800 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ZynixCart Inc. All rights reserved. Designed with modern Next.js & Tailwind CSS.</p>

          {/* Navigation Links and Simulated Payment Method Pills */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/products" className="hover:text-white transition-colors">
                Catalog
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 font-mono">
                VISA
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 font-mono">
                MC
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 font-mono">
                AMEX
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 font-mono">
                PAYPAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
