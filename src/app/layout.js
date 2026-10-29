import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Toast from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import CheckoutModal from "@/components/CheckoutModal";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "ZynixCart — Modern E-Commerce Catalog & Interactive Shopping Cart",
  description:
    "Discover electronics, fine jewelry, and fashion essentials at ZynixCart. Experience lightning-fast shopping with real-time reactive cart calculations and instant simulated checkout.",
  keywords: [
    "ZynixCart",
    "E-Commerce",
    "Shopping Cart",
    "Next.js Store",
    "FakeStoreAPI",
    "Tailwind CSS",
  ],
  authors: [{ name: "ZynixCart Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <ToastProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <ProductQuickView />
            <CheckoutModal />
            <Toast />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
