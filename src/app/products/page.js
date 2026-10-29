"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { CATEGORY_LABELS } from "@/lib/constants";
import { ArrowLeft, Home, ChevronRight, Layers, Sparkles } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state if URL query parameters change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);

    const q = searchParams.get("search");
    if (typeof q === "string") setSearchQuery(q);
  }, [searchParams]);

  // Load products and categories
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Unable to connect to product catalog. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach((p) => {
      const cat = p.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Real-time Search Query Filter based on product titles and descriptions
    if (searchQuery && searchQuery.trim()) {
      const cleanQuery = searchQuery.trim().toLowerCase();
      const queryWords = cleanQuery.split(/\s+/).filter(Boolean);

      result = result.filter((product) => {
        const title = (product.title || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        const category = (product.category || "").toLowerCase();

        // Check if full search query matches title or description
        if (title.includes(cleanQuery) || description.includes(cleanQuery)) {
          return true;
        }

        // Check if all individual words exist within title, description, or category
        const combined = `${title} ${description} ${category}`;
        return queryWords.every((word) => combined.includes(word));
      });
    }

    // 3. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("default");
  };

  const currentCategoryName =
    selectedCategory === "all"
      ? "All Products"
      : CATEGORY_LABELS[selectedCategory] || selectedCategory;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header with ZynixCart branding and multi-page nav */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Breadcrumb and Back Navigation Header */}
      <div className="bg-white border-b border-slate-200/80 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Functional Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium"
            >
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href="/products"
                onClick={handleResetFilters}
                className={`hover:text-blue-600 transition-colors ${
                  selectedCategory === "all" ? "text-slate-900 font-bold" : ""
                }`}
              >
                Products
              </Link>
              {selectedCategory !== "all" && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-blue-600 font-bold capitalize">
                    {currentCategoryName}
                  </span>
                </>
              )}
            </nav>

            {/* Functional "Back to Home" Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Catalog Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Title & Stats */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Store Collection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentCategoryName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse authentic items with real-time reactive cart actions and instant checkout.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">
              {filteredProducts.length}
            </span>{" "}
            products available
          </div>
        </div>

        {/* Filter, Search, and Sort Toolbar */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          totalProducts={filteredProducts.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onResetFilters={handleResetFilters}
        />

        {/* Product Grid with Skeleton Loader & Empty States */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onClearSearch={(newTerm = "") => setSearchQuery(newTerm)}
          onResetFilters={handleResetFilters}
          onRetry={loadData}
        />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />
    </div>
  );
}

// Fallback skeleton while Suspense hydrates
function CatalogLoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="h-20 bg-white border-b border-slate-100" />
      <div className="max-w-7xl mx-auto w-full px-4 py-10 space-y-6">
        <div className="h-10 w-48 rounded-xl skeleton-shimmer" />
        <div className="h-16 w-full rounded-2xl skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<CatalogLoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
