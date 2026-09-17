"use client";

import { useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookStoreHero from "@/components/BookStoreHero";
import PromoBannerCards from "@/components/PromoBannerCards";
import SeasonCollection from "@/components/SeasonCollection";
import BestsellersFeature from "@/components/BestsellersFeature";
import SeasonalPromoStrip from "@/components/SeasonalPromoStrip";
import CustomerReviews from "@/components/CustomerReviews";
import VisitOurStore from "@/components/VisitOurStore";
import { Product } from "@/lib/catalog";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    showToast(`Added "${product.name}" to cart!`);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#1a1a1a] font-sans antialiased selection:bg-[#0057B8] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar cartCount={cartCount} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-3.5 shadow-2xl border border-slate-700">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 2. Hero with Online Print Form & Bestsellers */}
      <BookStoreHero />

      {/* 3. Three Promo Banner Cards (Slider on mobile) */}
      <PromoBannerCards />

      {/* 4. Season Collection — Category Circles */}
      <SeasonCollection />

      {/* 5. Bestsellers Feature Banner */}
      <BestsellersFeature />

      {/* 6. Seasonal Promo Strip */}
      <SeasonalPromoStrip />

      {/* 8. Customer Reviews */}
      <CustomerReviews />

      {/* 10. Visit Our Store */}
      <VisitOurStore />

      {/* 11. Product Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2 py-0.5 rounded-md">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-lg font-extrabold text-[#1a1a1a] mt-1">{quickViewProduct.name}</h3>
                <p className="text-xs text-gray-400 font-medium">By {quickViewProduct.author || quickViewProduct.publisher || "Official Publisher"}</p>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Offer Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#1a1a1a]">
                      {money.format(quickViewProduct.discountPrice)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {money.format(quickViewProduct.price)}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold">
                  ● In Stock ({quickViewProduct.stock} copies)
                </span>
              </div>

              <div>
                <h4 className="font-bold text-[#1a1a1a] mb-1">Book Summary</h4>
                <p className="text-gray-600 leading-relaxed">{quickViewProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl">
                <div>
                  <span className="font-bold block text-[#1a1a1a]">Language:</span>
                  <span>{quickViewProduct.language}</span>
                </div>
                <div>
                  <span className="font-bold block text-[#1a1a1a]">SKU Code:</span>
                  <span className="font-mono">{quickViewProduct.sku}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-2.5">
              <button
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#0057B8] shadow-md transition-all"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Order Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
