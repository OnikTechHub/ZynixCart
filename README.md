# 🛍️ ZynixCart — Modern E-Commerce Catalog & Interactive Shopping Cart

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**ZynixCart** is a modern, responsive, and production-ready E-Commerce Product Catalog and Interactive Shopping Cart web application built with **Next.js (App Router)**, **Tailwind CSS**, and modern **ES6+ JavaScript**. It consumes product data from [FakeStoreAPI](https://fakestoreapi.com/) and provides real-time cart calculations, slide-out drawer management, and simulated end-to-end checkout.

---

## ✨ Features & Highlights

### 🎨 Brand Identity & Custom Vector Logo
- **Official Brand Name**: Prominently featured across the announcement bar, navbar, headers, and footer.
- **Custom Vector SVG Logo**: A hand-crafted geometric vector emblem integrating a high-speed shopping cart with a modern gradient "Z" monogram and dual-tone typography.

### 🌐 FakeStoreAPI Integration & Resilience
- Asynchronous fetching from `https://fakestoreapi.com/products` and categories endpoint.
- Shimmer skeleton loaders during initial content fetching.
- Built-in abort timeouts and curated offline fallback dataset to ensure 100% uptime and resilience against API throttling.

### 🔍 Category Filtering & Real-Time Search
- **Instant Search**: Search by title, category, or description with automatic query highlighting and one-click clear button.
- **Category Navigation**: Dynamically computed counts across All, Electronics, Jewelry, Men's Clothing, and Women's Clothing.
- **Sorting Options**: Sort by Featured, Price (Low to High), Price (High to Low), or Customer Ratings.

### 🛒 Persistent Slide-Out Shopping Cart Drawer
- **Persistent State**: Cart items and applied promo codes automatically persist in `localStorage`.
- **Dynamic Badge Counter**: Live item count on the navbar with bump micro-animation when items are added.
- **Interactive Free Shipping Bar**: Visual progress bar showing exact remaining amount needed to unlock free shipping ($50 threshold).
- **Smooth Animations**: Right slide-out drawer with backdrop blur, click-to-dismiss, and keyboard `Esc` listener.

### 🧮 Real-Time Cart Math Actions
- `addToCart(product, quantity)`: Appends new item or increments existing quantity.
- `removeFromCart(productId)`: Deletes item from cart with toast feedback.
- `updateQuantity(productId, newQuantity)`: Increment or decrement quantity, with auto-removal if quantity reaches zero.
- `clearCart()`: Flushes all cart items.
- **Automatic Calculations**:
  - **Subtotal**: Accurate sum of item prices and quantities.
  - **Promo Codes**: Includes `ZYNIX10` (10% off), `SAVE20` (20% off), and `FREESHIP` (Free shipping).
  - **Shipping**: Free over $50, else $7.99 flat rate.
  - **Estimated Tax**: 8% calculated on discounted subtotal.
  - **Grand Total**: Dynamic sum reflecting all discounts and fees.

### 👁️ Product Quick View Modal
- Click any product card to preview full high-resolution image, complete description, star rating review counts, quantity incrementor, and add-to-cart button.

### 💳 Simulated Checkout & Order Confirmation
- 2-step simulated checkout with customer address form and payment selector (Card / PayPal / Cash on Delivery).
- Realistic authorization spinner and instant **Order Confirmation Receipt** complete with Order ID, customer details, itemized breakdown, and estimated delivery schedule.

### 🚀 Multi-Page Architecture & Seamless Navigation
- **Home Page (`/`)**: Curated selection of trending products, category spotlights, hero value propositions, and an "Explore Collection" button routing to the full catalog.
- **Dedicated Products Page (`/products` & `/catalog`)**: Dedicated catalog route featuring category filtering, real-time title/description search, sorting controls, breadcrumbs, and a functional "Back to Home" navigation button.
- **Synchronized Search & Filter State**: Deep URL search parameter integration (`/products?category=electronics&search=drive`) linking directly from home and navigation shortcuts.

### 📱 100% Mobile & Multi-Device Responsive
- Fully responsive across mobile screens (360px+), tablets, laptops, and ultra-wide desktops.
- Tailwind CSS grid breakpoints (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
- Touch-friendly tap targets, horizontal scrollable filter pills, and zero viewport overflow.

---

## 📁 Project Structure

```text
ZynixCart/
├── src/
│   ├── app/
│   │   ├── catalog/page.js     # /catalog alias route to /products
│   │   ├── products/page.js    # Dedicated Products Page with breadcrumb & filters
│   │   ├── globals.css         # Tailwind directives, animations & custom scrollbar
│   │   ├── layout.js           # Root layout with Toast & Cart providers and metadata
│   │   └── page.js             # Home page featuring curated trending items & spotlights
│   ├── components/
│   │   ├── CartDrawer.js       # Persistent slide-out shopping cart drawer
│   │   ├── CartItem.js         # Cart line-item with quantity incrementor
│   │   ├── CheckoutModal.js    # Multi-step simulated checkout & receipt screen
│   │   ├── FilterBar.js        # Category pills, search bar, and sort selector
│   │   ├── Footer.js           # Responsive footer with vector logo & newsletter
│   │   ├── HeroBanner.js       # Store hero banner with trust badges
│   │   ├── Logo.js             # Custom vector SVG brand logo component
│   │   ├── Navbar.js           # Sticky header with search, links & cart trigger
│   │   ├── ProductCard.js      # Product card with price, rating & quick action
│   │   ├── ProductGrid.js      # Responsive grid with skeleton loading state
│   │   ├── ProductQuickView.js # Interactive product detail modal
│   │   └── Toast.js            # Floating notification alerts
│   ├── context/
│   │   ├── CartContext.js      # Cart state, localStorage persistence & calculations
│   │   └── ToastContext.js     # Toast notifications provider
│   └── lib/
│       ├── api.js              # FakeStoreAPI fetcher with error & fallback handling
│       └── constants.js        # Promo codes, tax rates, shipping rules & fallback data
├── public/                     # Static assets
├── jsconfig.json               # Path alias mapping (@/* -> ./src/*)
├── next.config.js              # Next.js image domain configuration
├── package.json                # Project dependencies and run scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS theme customization
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 Getting Started (Local Setup)

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

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to explore the store.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🌐 Deployment to Vercel

ZynixCart is optimized for seamless zero-configuration deployment on **Vercel**.

### Method 1: Deploy with Vercel Web Dashboard (Recommended)
1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete ZynixCart e-commerce catalog and cart"
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
3. Click **Add New...** -> **Project**.
4. Select the `ZynixCart` repository from your list.
5. In the configuration window:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click **Deploy**. Vercel will automatically build and publish your site with a live HTTPS URL.

### Method 2: Deploy using Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy directly from project folder
vercel --prod
```

---

## 🎟️ Active Demo Promo Codes
You can test the cart promo code input with any of the following:
- `ZYNIX10` — 10% discount on order subtotal
- `SAVE20` — 20% discount on order subtotal
- `FREESHIP` — Waives the shipping fee on any order amount

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).