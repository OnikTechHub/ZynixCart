"use client";

import { CATEGORY_LABELS } from "@/lib/constants";
import { SlidersHorizontal, ArrowUpDown, X, Tag } from "lucide-react";

export default function FilterBar({
  categories = [],
  selectedCategory = "all",
  onSelectCategory,
  categoryCounts = {},
  totalProducts = 0,
  sortBy = "default",
  setSortBy,
  searchQuery = "",
  setSearchQuery,
  onResetFilters,
}) {
  const isFiltered = selectedCategory !== "all" || searchQuery !== "" || sortBy !== "default";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 mb-8">
      {/* Top row: Section title, Result counts, and Sort By */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Product Catalog
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              {totalProducts} {totalProducts === 1 ? "Item" : "Items"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter by category or sort by price & ratings
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Reset Filters button if any filter is active */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills - Smooth horizontal scrolling on mobile */}
      <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <span className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wider pr-2 shrink-0">
          <Tag className="w-3.5 h-3.5" /> Categories:
        </span>

        {/* All Products pill */}
        <button
          onClick={() => onSelectCategory("all")}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
            selectedCategory === "all"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
          }`}
        >
          <span>All</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedCategory === "all"
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {categoryCounts["all"] || 0}
          </span>
        </button>

        {/* Dynamic Category Pills */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;
          const label = CATEGORY_LABELS[cat] || cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active filter alert banner */}
      {searchQuery && (
        <div className="mt-3 flex items-center justify-between text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100">
          <span>
            Filtering by search: <strong>"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className="font-bold underline hover:text-blue-900"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
