"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Home,
  Grid,
  ChevronRight,
} from "lucide-react";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  selectedCategory,
}) {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const isControlledSearch = typeof searchQuery !== "undefined" && typeof setSearchQuery === "function";
  const currentSearchValue = isControlledSearch ? searchQuery : localSearch;

  // Detect scroll for enhanced glassmorphic shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bump cart icon when item count changes
  useEffect(() => {
    if (itemCount === 0) return;
    setIsCartBumping(true);
    const timer = setTimeout(() => setIsCartBumping(false), 300);
    return () => clearTimeout(timer);
  }, [itemCount]);

  const handleSearchChange = (value) => {
    if (isControlledSearch) {
      setSearchQuery(value);
    } else {
      setLocalSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = currentSearchValue.trim();
    if (!term) return;

    if (!pathname.startsWith("/products") && !pathname.startsWith("/catalog")) {
      router.push(`/products?search=${encodeURIComponent(term)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleClearSearch = () => {
    if (isControlledSearch) {
      setSearchQuery("");
    } else {
      setLocalSearch("");
    }
  };

  const navCategories = [
    { id: "all", label: "All Items", href: "/products" },
    { id: "electronics", label: "Electronics", href: "/products?category=electronics" },
    { id: "jewelery", label: "Jewelry", href: "/products?category=jewelery" },
    { id: "men's clothing", label: "Men's Apparel", href: "/products?category=men's clothing" },
    { id: "women's clothing", label: "Women's Fashion", href: "/products?category=women's clothing" },
  ];

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname.startsWith("/products") || pathname.startsWith("/catalog");

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              SPECIAL OFFER:
            </span>
            <span className="hidden sm:inline">Use code</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider text-[10px] sm:text-[11px]">
              ZYNIX10
            </span>
            <span>for 10% OFF your entire order!</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-blue-100 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Genuine Guarantee
            </span>
            <span>•</span>
            <span>Free Shipping Over $50</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isHomeActive
                  ? "bg-blue-50 text-blue-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/products"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isCatalogActive
                  ? "bg-blue-50 text-blue-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Catalog</span>
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={currentSearchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products, tech, apparel..."
                className="w-full pl-10 pr-10 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              {currentSearchValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Catalog Link on Mobile/Tablet */}
            <Link
              href="/products"
              className="hidden sm:inline-flex md:hidden items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 rounded-xl"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </Link>

            {/* Slide-Out Shopping Cart Drawer Trigger Button */}
            <button
              onClick={openCart}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isCartBumping ? "scale-105" : ""
              }`}
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-blue-600 shadow-sm animate-fade-in">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Visible on small devices */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={currentSearchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products, electronics, fashion..."
              className="w-full pl-10 pr-9 py-2 bg-slate-100 text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            {currentSearchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear mobile search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 animate-fade-in space-y-4">
            {/* Primary Page Navigation */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Pages
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                    isHomeActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" /> Home
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                    isCatalogActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Grid className="w-4 h-4" /> Catalog
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </div>
            </div>

            {/* Category Shortcuts */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Browse by Category
              </p>
              <div className="flex flex-col gap-1">
                {navCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
