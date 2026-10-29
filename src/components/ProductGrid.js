"use client";

import ProductCard from "./ProductCard";
import { SearchX, RefreshCcw, RotateCcw } from "lucide-react";

export default function ProductGrid({
  products = [],
  isLoading = false,
  error = null,
  searchQuery = "",
  selectedCategory = "all",
  onClearSearch,
  onResetFilters,
  onRetry,
}) {
  // Skeleton loader for loading state
  if (isLoading) {
    return (
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
              <div className="h-4 w-4/5 rounded-md skeleton-shimmer" />
            </div>
            <div className="pt-2 flex items-center justify-between">
              <div className="h-6 w-1/4 rounded-md skeleton-shimmer" />
              <div className="h-8 w-20 rounded-xl skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Network error state
  if (error) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
        <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCcw className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Unable to Load Products
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // Empty state when search or filter returns no results
  if (!products.length) {
    const isSearching = Boolean(searchQuery && searchQuery.trim());

    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-8 sm:p-14 text-center max-w-2xl mx-auto my-6 animate-fade-in">
        {/* Modern Icon with Subtle Glow */}
        <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-60" />
          <div className="relative w-16 h-16 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-xs">
            <SearchX className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Dynamic Heading based on Search or Filter */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {isSearching
            ? "No products found matching your search"
            : "No products found in this category"}
        </h3>

        {/* Clear feedback text */}
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          {isSearching ? (
            <>
              We couldn't find any products matching{" "}
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                "{searchQuery}"
              </span>
              . Try checking for typos, using broader keywords, or clearing your search.
            </>
          ) : (
            "There are currently no items available under this category selection. Try selecting another category or view all products."
          )}
        </p>

        {/* Helpful Keyword Suggestion Pills when Searching */}
        {isSearching && (
          <div className="mb-6 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs text-slate-600">
            <span className="font-semibold text-slate-700 block mb-2.5">
              Popular searches you might like:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Backpack", "Jacket", "T-Shirt", "SSD", "Gold", "Drive"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onClearSearch && onClearSearch(term)}
                  className="px-3 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg transition-colors font-medium shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action / Reset Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {isSearching && onClearSearch && (
            <button
              onClick={() => onClearSearch("")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-xs transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear Search</span>
            </button>
          )}

          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-xs transition-all duration-200"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Responsive Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
