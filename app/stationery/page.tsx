"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileText,
  Filter,
  Flame,
  GraduationCap,
  Heart,
  Minus,
  Package,
  PackageCheck,
  Palette,
  PenTool,
  Percent,
  Plus,
  RotateCcw,
  Scissors,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Truck,
  X,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShopProducts, placeSystemOrder } from "@/lib/storeSync";

import {
  STATIONERY_PRODUCTS,
  type StationeryItem
} from "@/lib/stationeryCatalog";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

// Category definition with icons & slugs
const STATIONERY_CATEGORIES = [
  { id: "all", label: "All Items", icon: Boxes, count: 24 },
  { id: "books", label: "Books & Notebooks", icon: BookOpen, count: 5 },
  { id: "pens", label: "Pens & Writing", icon: PenTool, count: 5 },
  { id: "sharpeners", label: "Sharpeners & Erasers", icon: Scissors, count: 4 },
  { id: "colourbooks", label: "Colour Books & Art", icon: Palette, count: 5 },
  { id: "geometry", label: "Geometry & Math", icon: Zap, count: 3 },
  { id: "kits", label: "School Kits & Bundles", icon: GraduationCap, count: 2 }
];

export default function StationeryPage() {
  // Category & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "discount">("featured");
  const [priceRange, setPriceRange] = useState<"all" | "under100" | "100to300" | "300to700" | "above700">("all");

  // Cart State (stored item list)
  const [cart, setCart] = useState<{ item: StationeryItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<StationeryItem | null>(null);

  // Checkout Modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    deliveryOption: "pickup" as "pickup" | "delivery",
    address: "Valanchery",
    paymentMethod: "upi" as "upi" | "cash"
  });

  const adminStationery = useShopProducts("stationery");

  const allStationeryProducts = useMemo(() => {
    const normalizeCategory = (cat?: string): StationeryItem["category"] => {
      const c = (cat || "").toLowerCase();
      if (c.includes("pen") || c.includes("writing")) return "pens";
      if (c.includes("sharpener") || c.includes("eraser")) return "sharpeners";
      if (c.includes("colour") || c.includes("color") || c.includes("art") || c.includes("paint")) return "colourbooks";
      if (c.includes("geometry") || c.includes("math")) return "geometry";
      if (c.includes("kit") || c.includes("combo")) return "kits";
      return "books";
    };

    const customMap = new Map<string, StationeryItem>();
    adminStationery.forEach((item) => {
      const sItem: StationeryItem = {
        id: item.id,
        name: item.name,
        brand: item.publisher || "PK Stationery",
        category: normalizeCategory(item.subCategory || item.category),
        categoryLabel: item.category || "Stationery Products",
        desc: item.description || "High quality school and office stationery from PK Books.",
        details: ["Available for counter pickup at Valanchery", "100% Genuine brand guarantee"],
        price: Number(item.salePrice || item.price || 99),
        originalPrice: Number(item.price || 120),
        rating: 4.9,
        reviewsCount: 16,
        stock: Number(item.quantity || item.stock || 50),
        badge: "Verified Item",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        sku: item.sku || item.id,
        inBox: "1 Pack",
        colorTone: "from-emerald-600 via-teal-700 to-slate-900",
        image: item.image || "/images/category-stationery.jpg"
      };
      customMap.set(item.id, sItem);
      if (item.sku) customMap.set(item.sku, sItem);
    });

    const combined: StationeryItem[] = [];
    const seen = new Set<string>();

    // First add admin items
    adminStationery.forEach((item) => {
      const found = customMap.get(item.id);
      if (found && !seen.has(found.id)) {
        combined.push(found);
        seen.add(found.id);
        if (found.sku) seen.add(found.sku);
      }
    });

    // Then add default products not already in admin
    STATIONERY_PRODUCTS.forEach((item) => {
      if (!seen.has(item.id) && (!item.sku || !seen.has(item.sku))) {
        combined.push(item);
        seen.add(item.id);
        if (item.sku) seen.add(item.sku);
      }
    });

    return combined;
  }, [adminStationery]);

  // Extract all unique brands for filter
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    allStationeryProducts.forEach((p) => set.add(p.brand));
    return ["All", ...Array.from(set)];
  }, [allStationeryProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allStationeryProducts.filter((item) => {
      // Category match
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      // Search match
      const matchSearch =
        searchQuery === "" ||
        `${item.name} ${item.brand} ${item.desc} ${item.categoryLabel} ${item.sku}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      // Brand match
      const matchBrand = selectedBrand === "All" || item.brand === selectedBrand;
      // Price range match
      let matchPrice = true;
      if (priceRange === "under100") matchPrice = item.price < 100;
      else if (priceRange === "100to300") matchPrice = item.price >= 100 && item.price <= 300;
      else if (priceRange === "300to700") matchPrice = item.price > 300 && item.price <= 700;
      else if (priceRange === "above700") matchPrice = item.price > 700;

      return matchCategory && matchSearch && matchBrand && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") {
        const discA = (a.originalPrice - a.price) / a.originalPrice;
        const discB = (b.originalPrice - b.price) / b.originalPrice;
        return discB - discA;
      }
      return 0; // Featured default
    });
  }, [selectedCategory, searchQuery, selectedBrand, sortBy, priceRange]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart helper functions
  const addToCart = (product: StationeryItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === product.id);
      if (existing) {
        return prev.map((i) => (i.item.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { item: product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const nextQ = i.quantity + delta;
            return nextQ > 0 ? { ...i, quantity: nextQ } : null;
          }
          return i;
        })
        .filter(Boolean) as { item: StationeryItem; quantity: number }[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
    showToast("Item removed from cart");
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  const cartOriginalTotal = cart.reduce((sum, i) => sum + i.item.originalPrice * i.quantity, 0);
  const totalSavings = cartOriginalTotal - cartSubtotal;
  const deliveryCharge = checkoutData.deliveryOption === "delivery" ? 45 : 0;
  const finalCartTotal = cartSubtotal + deliveryCharge;

  // Generate WhatsApp Direct Order Link
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsList = cart
      .map((i, idx) => `${idx + 1}. *${i.item.name}* (x${i.quantity}) - ${money.format(i.item.price * i.quantity)}`)
      .join("\n");

    const message = encodeURIComponent(
      `🛍️ *NEW STATIONERY ORDER - PK BOOKS VALANCHERY*\n` +
      `─────────────────────────\n` +
      `👤 *Customer:* ${checkoutData.name || "Walk-in Customer"}\n` +
      `📞 *Phone:* ${checkoutData.phone || "Not provided"}\n` +
      `🚚 *Fulfillment:* ${checkoutData.deliveryOption === "pickup" ? "Store Pickup (Valanchery Bus Stand)" : `Local Delivery to: ${checkoutData.address}`}\n` +
      `💳 *Payment:* ${checkoutData.paymentMethod === "upi" ? "UPI (GPay / PhonePe)" : "Cash on Pickup / Delivery"}\n\n` +
      `📦 *ORDER ITEMS:*\n${itemsList}\n\n` +
      `─────────────────────────\n` +
      `💰 *Subtotal:* ${money.format(cartSubtotal)}\n` +
      `🚚 *Delivery:* ${deliveryCharge === 0 ? "FREE (Store Pickup)" : money.format(deliveryCharge)}\n` +
      `🎉 *Total Savings:* ${money.format(totalSavings)}\n` +
      `⭐ *FINAL PAYABLE:* ${money.format(finalCartTotal)}\n\n` +
      `_Please confirm availability and prepare my order!_`
    );

    const orderId = `PKB-ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    // Save to unified system orders for Admin Product Orders view
    placeSystemOrder({
      id: orderId,
      orderType: "product",
      customerName: checkoutData.name || "Walk-in Customer",
      phone: checkoutData.phone || "Not provided",
      items: cart.map((i) => `${i.item.name} (x${i.quantity})`).join(", "),
      itemCount: totalCartCount,
      totalAmount: finalCartTotal,
      fulfillment: checkoutData.deliveryOption === "pickup" ? "Store Pickup (Valanchery Bus Stand)" : `Home Delivery (${checkoutData.address})`,
      address: checkoutData.deliveryOption === "delivery" ? checkoutData.address : "Store Pickup - Valanchery Bus Stand",
      paymentMode: checkoutData.paymentMethod === "upi" ? "UPI (GPay / PhonePe)" : "Cash on Delivery",
      paymentStatus: checkoutData.paymentMethod === "upi" ? "Paid" : "Unpaid",
      orderStatus: "Received",
      date: new Date().toISOString().slice(0, 16).replace("T", " ")
    });

    window.open(`https://wa.me/919746700123?text=${message}`, "_blank");
    setShowCheckoutModal(false);
    showToast("Order transmitted & recorded in PK Books system!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar cartCount={totalCartCount} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-3.5 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP PROMO BANNER */}
      {/* ========================================================================= */}
      <div className="bg-[#003E94] text-white py-2 px-4 text-xs font-semibold text-center flex items-center justify-center gap-2 border-b border-blue-900/30">
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <span>Valanchery Student Special: Up to 35% OFF on Camlin, Classmate &amp; Faber-Castell Supplies!</span>
        <button
          onClick={() => {
            setSelectedCategory("all");
            setSortBy("discount");
          }}
          className="underline decoration-amber-300 text-amber-300 font-bold hover:text-white transition-colors ml-1 hidden sm:inline"
        >
          View Top Offers &rarr;
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODERN EDITORIAL HERO BANNER */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0c2356] via-[#08183c] to-[#040e24] p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-blue-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs w-fit">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Bus Stand, Valanchery · 100% Genuine Brands</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                School Stationery, Books &amp;<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200">
                  Creative Art Supplies
                </span>
              </h1>

              <p className="text-sm text-blue-100/85 leading-relaxed font-normal max-w-xl">
                Classmate notebooks, fine German pens, SCERT prescribed books, and Faber-Castell art essentials. Order online and collect in 15 minutes at our Valanchery counter.
              </p>

              {/* Inline Perks */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-blue-100/90">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>15-Min Express Pickup</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  <Percent className="h-3.5 w-3.5 text-amber-300" />
                  <span>Direct School Rates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
                  <span>100% Original Stock</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/15 shadow-2xl group">
                <img
                  src="/images/category-stationery.jpg"
                  alt="Stationery Supplies Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-[#ED1C24] font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-sm">
                    Up to 35% OFF
                  </span>
                  <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-white/20">
                    Classmate · Hauser · Faber
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CATEGORY SWITCHER & SEARCH TOOLBAR */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-slate-200 shadow-2xs sticky top-0 z-20 mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* Category Tabs */}
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-1">
            <div className="flex items-center gap-1.5 flex-nowrap">
              {STATIONERY_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#0056B3] text-white shadow-md shadow-blue-500/20 scale-102"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-[#0056B3]"}`} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs font-bold text-[#ED1C24] hover:bg-red-100 transition-all flex-shrink-0 shadow-2xs"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({totalCartCount})</span>
              <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-red-200">
                {money.format(cartSubtotal)}
              </span>
            </button>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notebooks, gel pens, drawing books, pastels..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-9 text-xs font-medium text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                aria-label="Filter by brand"
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#0056B3] focus:bg-white"
              >
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b === "All" ? "All Brands" : b}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                aria-label="Filter by price range"
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#0056B3] focus:bg-white"
              >
                <option value="all">All Prices</option>
                <option value="under100">Under ₹100</option>
                <option value="100to300">₹100 – ₹300</option>
                <option value="300to700">₹300 – ₹700</option>
                <option value="above700">₹700+</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#0056B3] focus:bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MAIN PRODUCT CATALOG GRID */}
      {/* ========================================================================= */}
      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0056B3] block">
              Official Products
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Showing {filteredProducts.length} Items
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Need immediate bulk school order?
            </span>
            <a
              href="https://wa.me/919746700123?text=Hi%20PK%20Books,%20I%20need%20bulk%20stationery%20quotation%20for%20school/tuition"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <Send className="h-3.5 w-3.5" /> WhatsApp B2B Desk
            </a>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-[#0056B3] mx-auto mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-base font-black text-slate-900">No matching stationery found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search terms, choosing a different category, or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("All");
                setPriceRange("all");
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0056B3] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#00438F]"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid with Real Product Photos */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((item) => {
            const inCartItem = cart.find((i) => i.item.id === item.id);
            const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

            // Determine appropriate product photography based on category
            let productImage = "/images/category-stationery.jpg";
            if (item.category === "pens") productImage = "/images/stationery-pens.jpg";
            else if (item.category === "books") productImage = "/images/stationery-notebooks.jpg";
            else if (item.category === "colourbooks") productImage = "/images/stationery-art.jpg";
            else if (item.category === "geometry") productImage = "/images/stationery-geometry.jpg";

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-white p-4 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Product Photo Showcase with Discount Badge */}
                  <div className="relative aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden mb-3.5 border border-slate-100 flex items-center justify-center">
                    <img
                      src={productImage}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Top Discount Tag */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-white bg-[#ED1C24] px-2.5 py-0.5 rounded-full shadow-xs">
                        {discountPercent}% OFF
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-slate-800 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xs border border-slate-200/60 hidden sm:inline-block">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setQuickViewProduct(item)}
                      title="Quick View Details"
                      className="absolute top-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-xl bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs border border-slate-200/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Brand & Star Rating */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                      {item.brand}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-black text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0056B3] transition-colors line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Pricing & Cart Action */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xl font-black text-slate-900">
                        {money.format(item.price)}
                      </span>
                      <span className="ml-2 text-xs text-slate-400 line-through">
                        {money.format(item.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      ● In Stock
                    </span>
                  </div>

                  {/* Cart Action Buttons */}
                  {inCartItem ? (
                    <div className="flex items-center justify-between rounded-xl bg-blue-50 border border-blue-200 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-100 shadow-2xs"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-xs font-black text-[#0056B3]">
                        {inCartItem.quantity} in Cart
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-[#0056B3] text-white font-bold hover:bg-[#00438F] shadow-2xs"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full h-10 rounded-xl bg-slate-900 hover:bg-[#0056B3] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. SLIDING SHOPPING CART DRAWER */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="font-black text-sm text-white">Your Shopping Cart</h3>
                  <p className="text-[11px] text-slate-400">{totalCartCount} stationery items selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 mx-auto mb-3">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <h4 className="font-black text-slate-800 text-sm">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Add notebooks, pens, sharpeners, and colouring books to get instant counter pickup in Valanchery.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 rounded-xl bg-[#0056B3] px-4 py-2 text-xs font-bold text-white"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((c) => (
                  <div key={c.item.id} className="pt-3 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{c.item.brand}</span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{c.item.name}</h4>
                      <p className="text-xs font-black text-[#0056B3]">
                        {money.format(c.item.price)} × {c.quantity} = {money.format(c.item.price * c.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(c.item.id, -1)}
                          className="h-6 w-6 grid place-items-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono px-1">{c.quantity}</span>
                        <button
                          onClick={() => updateQuantity(c.item.id, 1)}
                          className="h-6 w-6 grid place-items-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(c.item.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>MRP Subtotal:</span>
                    <span className="line-through text-slate-400">{money.format(cartOriginalTotal)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-600">
                    <span>Total Discount Saved:</span>
                    <span>-{money.format(totalSavings)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-black text-slate-900">
                    <span>Final Payable Total:</span>
                    <span className="text-xl text-[#0056B3]">{money.format(cartSubtotal)}</span>
                  </div>
                </div>

                <div className="grid gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckoutModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0056B3] py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-[#00438F] active:scale-98 transition-all"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-md transition-all"
                  >
                    <Send className="h-3.5 w-3.5" /> 1-Click WhatsApp Quick Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PRODUCT QUICK VIEW MODAL */}
      {/* ========================================================================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0056B3] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {quickViewProduct.brand} · {quickViewProduct.categoryLabel}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{quickViewProduct.name}</h3>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Offer Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      {money.format(quickViewProduct.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {money.format(quickViewProduct.originalPrice)}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold">
                  ● In Stock ({quickViewProduct.stock} units)
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Product Description</h4>
                <p className="text-slate-600 leading-relaxed">{quickViewProduct.desc}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Key Specifications</h4>
                <div className="space-y-1.5">
                  {quickViewProduct.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0056B3] flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-mono">
                <span className="font-bold block">In-The-Box Contents:</span>
                <span>{quickViewProduct.inBox}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0056B3] py-3 text-xs font-bold text-white shadow-md hover:bg-[#00438F]"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Order Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. COMPLETE CHECKOUT MODAL */}
      {/* ========================================================================= */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-[#0056B3]" />
                <h3 className="text-base font-black text-slate-900">Complete Valanchery Order</h3>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Menon"
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0056B3]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98460 12345"
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0056B3]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fulfillment Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutData({ ...checkoutData, deliveryOption: "pickup" })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      checkoutData.deliveryOption === "pickup"
                        ? "bg-blue-50 border-[#0056B3] text-[#0056B3]"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span className="font-bold block text-xs">Pickup at Store</span>
                    <span className="text-[10px] text-slate-500">Valanchery Bus Stand (FREE)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutData({ ...checkoutData, deliveryOption: "delivery" })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      checkoutData.deliveryOption === "delivery"
                        ? "bg-blue-50 border-[#0056B3] text-[#0056B3]"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span className="font-bold block text-xs">Valanchery Local Delivery</span>
                    <span className="text-[10px] text-slate-500">Delivered today (+₹45)</span>
                  </button>
                </div>
              </div>

              {checkoutData.deliveryOption === "delivery" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Address & Landmark</label>
                  <input
                    type="text"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    placeholder="Near MES College / Town Valanchery..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0056B3]"
                  />
                </div>
              )}

              {/* Summary Box */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Items Total ({totalCartCount} pcs):</span>
                  <span>{money.format(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fulfillment Fee:</span>
                  <span>{deliveryCharge === 0 ? "FREE" : money.format(deliveryCharge)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                  <span>Payable Amount:</span>
                  <span className="text-[#0056B3] text-base">{money.format(finalCartTotal)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 font-bold text-slate-600 hover:bg-slate-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="flex-1 rounded-xl bg-emerald-600 py-2.5 font-bold text-white hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Place Order via WhatsApp Counter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
