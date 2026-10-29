"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { PROMO_CODES, TAX_RATE, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/constants";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

const STORAGE_KEY = "zynixcart_cart_v1";
const COUPON_KEY = "zynixcart_coupon_v1";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { addToast } = useToast();

  // Load from localStorage on mount safely
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem(COUPON_KEY);
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever cart or coupon updates
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (err) {
      console.error("Failed to persist cart to localStorage", err);
    }
  }, [cart, appliedCoupon, isInitialized]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            image: product.image,
            category: product.category,
            rating: product.rating,
            quantity: qty,
          },
        ];
      }
    });

    addToast(`Added "${product.title.slice(0, 24)}..." to cart`, "success");
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const target = prev.find((item) => item.id === productId);
      if (target) {
        addToast(`Removed "${target.title.slice(0, 24)}..." from cart`, "info");
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    addToast("Cart cleared", "info");
  };

  const applyCoupon = (rawCode) => {
    if (!rawCode || typeof rawCode !== "string") return false;
    const code = rawCode.trim().toUpperCase();
    const coupon = PROMO_CODES[code];

    if (coupon) {
      setAppliedCoupon(coupon);
      addToast(`Promo code "${code}" applied: ${coupon.label}`, "success");
      return true;
    } else {
      addToast(`Invalid promo code "${code}". Try ZYNIX10 or FREESHIP`, "error");
      return false;
    }
  };

  const removeCoupon = () => {
    if (appliedCoupon) {
      addToast(`Promo code "${appliedCoupon.code}" removed`, "info");
      setAppliedCoupon(null);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openCheckout = () => {
    if (cart.length === 0) {
      addToast("Your cart is empty. Add items before checking out.", "error");
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Cart Math Computations
  const calculations = useMemo(() => {
    const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountPercent) {
        discount = (subtotal * appliedCoupon.discountPercent) / 100;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);

    let shipping = 0;
    if (cart.length > 0) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.freeShipping) {
        shipping = 0;
      } else {
        shipping = STANDARD_SHIPPING_FEE;
      }
    }

    const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    const tax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + shipping + tax;

    return {
      itemCount,
      subtotal,
      discount,
      discountedSubtotal,
      shipping,
      freeShippingRemaining,
      freeShippingProgress,
      tax,
      total,
    };
  }, [cart, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        ...calculations,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
