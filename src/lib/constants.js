export const APP_NAME = "ZynixCart";

export const PROMO_CODES = {
  ZYNIX10: { code: "ZYNIX10", discountPercent: 10, label: "10% Off Entire Order" },
  SAVE20: { code: "SAVE20", discountPercent: 20, label: "20% Off Super Saver" },
  FREESHIP: { code: "FREESHIP", freeShipping: true, label: "Free Shipping" },
};

export const TAX_RATE = 0.08; // 8%
export const FREE_SHIPPING_THRESHOLD = 50.0;
export const STANDARD_SHIPPING_FEE = 7.99;

export const CATEGORY_LABELS = {
  all: "All Products",
  electronics: "Electronics",
  jewelery: "Jewelry",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

export const CATEGORY_COLORS = {
  electronics: {
    bg: "bg-blue-50 text-blue-700 border-blue-200",
    pill: "from-blue-600 to-cyan-500",
  },
  jewelery: {
    bg: "bg-amber-50 text-amber-700 border-amber-200",
    pill: "from-amber-500 to-yellow-500",
  },
  "men's clothing": {
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    pill: "from-indigo-600 to-blue-500",
  },
  "women's clothing": {
    bg: "bg-rose-50 text-rose-700 border-rose-200",
    pill: "from-rose-500 to-pink-500",
  },
  default: {
    bg: "bg-slate-50 text-slate-700 border-slate-200",
    pill: "from-slate-600 to-slate-800",
  },
};

export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for working, hiking, camping, and traveling.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695.0,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168.0,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64.0,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109.0,
    description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description: "Adjustable and detachable hood and adjustable cuff to prevent the wind and water, for a comfortable fit.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V Neck T-Shirt",
    price: 9.85,
    description: "Lightweight fabric with great stretch for comfort, ribbed on sleeves and neckline / Double stitching on bottom hem.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYUL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 },
  },
];
