import { FALLBACK_PRODUCTS } from "./constants";

const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${API_BASE_URL}/products`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;
  } catch (error) {
    console.warn("Using fallback products due to fetch error:", error?.message || error);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    return ["electronics", "jewelery", "men's clothing", "women's clothing"];
  }
}

export function formatCurrency(amount) {
  const numeric = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}
