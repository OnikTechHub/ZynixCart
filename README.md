<div align="center">

# 🛍️ ZynixCart — Modern E-Commerce Storefront

**A sleek, responsive, and production-ready E-Commerce Web Application built with Next.js (App Router), Tailwind CSS, and modern JavaScript (ES6+).**

[![Live Demo](https://img.shields.io/badge/Live_Demo-zynix--cart--nine.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://zynix-cart-nine.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OnikTechHub/ZynixCart)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FakeStoreAPI](https://img.shields.io/badge/API-FakeStoreAPI-orange?style=for-the-badge)](https://fakestoreapi.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

[**Explore Live Demo ↗**](https://zynix-cart-nine.vercel.app/) • [**View GitHub Repository ↗**](https://github.com/OnikTechHub/ZynixCart) • [**Report Bug ↗**](https://github.com/OnikTechHub/ZynixCart/issues)

</div>

---

## 📖 Overview

**ZynixCart** is a modern e-commerce storefront engineered with a multi-page architecture, resilient API integration, and a reactive shopping cart experience. Built from the ground up using **Next.js (App Router)** and **Tailwind CSS**, it delivers instant client-side performance, mobile-first responsiveness, and realistic checkout simulations.

### 🔗 Live Links
- **🚀 Live Deployment**: [https://zynix-cart-nine.vercel.app/](https://zynix-cart-nine.vercel.app/)
- **💻 GitHub Source Code**: [https://github.com/OnikTechHub/ZynixCart](https://github.com/OnikTechHub/ZynixCart)

---

## ✨ Key Features

### 🌐 FakeStoreAPI Integration & Resilience
- **Dynamic Fetching**: Asynchronously fetches products and categories directly from the official [FakeStoreAPI](https://fakestoreapi.com/) endpoint.
- **Fault-Tolerant Architecture**: Integrated `AbortController` timeout handling and a curated offline dataset ensuring zero downtime during API throttling or network hiccups.
- **Shimmer Skeleton Loaders**: Elegant visual placeholders while data streams into the catalog.

### 🔍 Category Filtering & Real-Time Search
- **Tokenized Search**: Instant, case-insensitive keyword search matching across product titles, descriptions, and categories.
- **Dedicated Catalog Page (`/products`)**: Filter by *All Items*, *Electronics*, *Jewelry*, *Men's Apparel*, and *Women's Fashion* with dynamic count badges.
- **Multi-Criteria Sorting**: Sort products seamlessly by *Featured*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.
- **Search Empty State**: Informative fallback screen with query highlighting, popular search pills, and instant reset buttons.

### 🛒 Persistent Slide-Out Shopping Cart Drawer
- **LocalStorage Synchronization**: Cart items and applied promo vouchers persist safely across page refreshes.
- **Dynamic Badge Counter**: Live item count indicator on the navbar with bump micro-animations on cart additions.
- **Free Shipping Progress Tracker**: Visual progress bar calculating the remaining balance required for free shipping ($50 threshold).
- **Cart Actions**: Fast, fluid slide-out panel with backdrop blur, click-outside dismissal, and keyboard `Esc` listener.

### 🧮 Real-Time Cart Math & Promo Engine
- **Accurate Calculations**: Real-time evaluation of subtotal, progressive discounts, shipping fees, 8% estimated tax, and grand totals.
- **Quantity Controls**: Increment, decrement, or remove items with automatic zero-quantity safeguards.
- **Promo Code Discounts**: Interactive coupon voucher input with live validation (`ZYNIX10`, `SAVE20`, `FREESHIP`).

### 💳 Simulated Secure Checkout Modal
- **2-Step Checkout Flow**: Shipping details input with address validation and payment method selection (Card, PayPal, Cash on Delivery).
- **Realistic Payment Simulation**: Processing authorization spinner followed by an **Order Confirmation Receipt**.
- **Order Receipt**: Unique Order Reference ID, itemized purchase summary, delivery date estimate, and automatic cart reset.

### 👁️ Interactive Product Quick View Modal
- Click any product card across the store to inspect high-resolution imagery, full specifications, verified customer ratings, and direct quantity-adjustable cart additions.

### 🧭 Multi-Page Navigation & Breadcrumbs
- **Storefront Home (`/`)**: Curated showcase of top-rated trending products, category spotlight cards, and a prominent *Explore Collection* CTA.
- **Dedicated Catalog (`/products` & `/catalog`)**: Complete inventory browser with functional breadcrumbs (`Home / Products / Category`) and a dedicated *← Back to Home* button.

### 📱 100% Mobile & Multi-Device Responsive
- Impeccably structured Tailwind CSS breakpoints (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
- Optimized tap targets, zero horizontal overflow, and horizontally scrolling touch-friendly filter pills.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 15 (App Router)](https://nextjs.org/)** | Modern React Framework with Server Components & Client Boundaries |
| **[React 19](https://react.dev/)** | Declarative Component-Based User Interface Library |
| **[Tailwind CSS 3.4](https://tailwindcss.com/)** | Utility-First CSS Framework for Bespoke, Responsive Design |
| **[JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** | Modern Vanilla JavaScript with Async/Await, Destructuring & Modules |
| **[FakeStoreAPI](https://fakestoreapi.com/)** | RESTful E-Commerce Product Data Endpoint |
| **[Lucide React](https://lucide.dev/)** | Crisp, Modern Lightweight SVG Vector Icons |
| **[Vercel](https://vercel.com/)** | Edge Cloud Hosting & Continuous Deployment |

---

## 📁 Project Architecture

```text
ZynixCart/
├── src/
│   ├── app/
│   │   ├── products/page.js    # Dedicated Products Catalog route with breadcrumbs
│   │   ├── globals.css         # Tailwind directives, animations & custom scrollbar
│   │   ├── layout.js           # Root layout with Toast & Cart providers and SEO metadata
│   │   └── page.js             # Storefront Home with trending products & spotlights
│   ├── components/
│   │   ├── CartDrawer.js       # Persistent slide-out shopping cart drawer
│   │   ├── CartItem.js         # Cart line-item with quantity incrementor
│   │   ├── CheckoutModal.js    # Multi-step simulated checkout & receipt screen
│   │   ├── FilterBar.js        # Category pills, search bar, and sort selector
│   │   ├── Footer.js           # Responsive footer with vector logo & newsletter
│   │   ├── HeroBanner.js       # Store hero banner with trust badges & CTA
│   │   ├── Logo.js             # Custom vector SVG brand logo component
│   │   ├── Navbar.js           # Sticky header with search, links & live cart trigger
│   │   ├── ProductCard.js      # Product card with price, rating & quick action
│   │   ├── ProductGrid.js      # Responsive grid with skeleton loading & empty states
│   │   ├── ProductQuickView.js # Interactive product detail modal
│   │   └── Toast.js            # Floating notification alerts
│   ├── context/
│   │   ├── CartContext.js      # Cart state, localStorage persistence & calculations
│   │   └── ToastContext.js     # Toast notifications provider
│   └── lib/
│       ├── api.js              # FakeStoreAPI fetcher with error & fallback handling
│       └── constants.js        # Promo codes, tax rates, shipping rules & fallback data
├── public/                     # Static brand assets
├── jsconfig.json               # Path alias mapping (@/* -> ./src/*)
├── next.config.js              # Next.js image domain configuration & redirects
├── package.json                # Project dependencies and run scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS theme customization
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 Local Development Setup

Follow these steps to run the ZynixCart application locally on your machine.

### Prerequisites
- **Node.js**: v18.17.0 or newer (v20+ or v24 recommended)
- **npm**: v9+ (or pnpm / yarn)

### 1. Clone the repository
```bash
git clone https://github.com/OnikTechHub/ZynixCart.git
cd ZynixCart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to explore the store.

### 4. Build and run production bundle
```bash
npm run build
npm start
```

---

## 🌐 Vercel Deployment Guide

ZynixCart is pre-configured for automated continuous deployment on **Vercel**.

### Deploy via Vercel Dashboard
1. Push your latest commits to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete project features"
   git push origin main
   ```
2. Visit [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➔ **"Project"**.
3. Import the `OnikTechHub/ZynixCart` repository.
4. Verify the build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**. Vercel will build and assign your production URL ([zynix-cart-nine.vercel.app](https://zynix-cart-nine.vercel.app/)).

### Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from the project directory
vercel --prod
```

---

## 🎟️ Active Demo Promo Codes

Test the interactive coupon voucher engine in the shopping cart drawer with any of the following codes:

| Promo Code | Discount Benefit | Minimum Spend |
| :--- | :--- | :--- |
| `ZYNIX10` | **10% OFF** entire order subtotal | None |
| `SAVE20` | **20% OFF** super saver discount | None |
| `FREESHIP` | **FREE Shipping** (waives standard $7.99 fee) | Any amount |

---

## 📄 License

This project is open-source and distributed under the terms of the [MIT License](LICENSE).

---

<div align="center">
  <sub>Crafted with modern web standards by the <strong>ZynixCart Engineering Team</strong>.</sub>
</div>