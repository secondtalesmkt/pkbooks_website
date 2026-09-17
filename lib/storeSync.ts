"use client";

import { useEffect, useState } from "react";
import { products as defaultBooks, type Product } from "./catalog";

export type ShopType = "books" | "stationery" | "printing";

export interface AdminProductRaw {
  id: string;
  name: string;
  sku?: string;
  price: string | number;
  salePrice?: string | number;
  quantity?: string | number;
  stock?: string | number;
  sale?: string | number;
  date?: string;
  publisher?: string;
  tags?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  image?: string;
  shopType?: ShopType;
}

export { DEFAULT_PRINT_PRODUCTS } from "./printCatalog";

export type OrderSection = "product" | "print";

export interface SystemOrder {
  id: string;
  orderType: OrderSection; // "product" (Books/Stationery) or "print" (Print Store / Document uploads)
  customerName: string;
  phone: string;
  items: string;
  itemCount?: number;
  totalAmount: number;
  fulfillment: string;
  address?: string;
  gps?: string;
  paymentMode: string;
  paymentStatus: "Paid" | "Unpaid";
  orderStatus: "Received" | "Preparing" | "Ready for Pickup" | "Delivered";
  date: string;
  printSpecs?: {
    pages?: number;
    copies?: number;
    colorMode?: string;
    sides?: string;
    binding?: string;
    fileName?: string;
    fileSize?: string;
  };
}

export const INITIAL_ORDERS: SystemOrder[] = [
  {
    id: "PKB-ORD-2601",
    orderType: "product",
    customerName: "Rahul K. Nair",
    phone: "98461 23456",
    items: "Wings of Fire: An Autobiography (x1), Classmate Notebook 240p (x2)",
    itemCount: 3,
    totalAmount: 565,
    fulfillment: "Store Pickup (Valanchery Bus Stand)",
    paymentMode: "UPI (GPay)",
    paymentStatus: "Paid",
    orderStatus: "Ready for Pickup",
    date: "2026-09-08 14:15"
  },
  {
    id: "PKB-ORD-2602",
    orderType: "product",
    customerName: "Amina Fathima",
    phone: "97455 89012",
    items: "Hauser XO 0.7mm Ball Pen (x2), Camlin Geometry Box (x1)",
    itemCount: 3,
    totalAmount: 343,
    fulfillment: "Home Delivery (Valanchery Town)",
    address: "Fathima Manzil, Near Town Masjid, Valanchery",
    paymentMode: "UPI (PhonePe)",
    paymentStatus: "Paid",
    orderStatus: "Preparing",
    date: "2026-09-08 14:45"
  },
  {
    id: "PKP-PRN-3101",
    orderType: "print",
    customerName: "Muhammed Shafi",
    phone: "98950 44321",
    items: "KTU M.Tech Final Thesis (140 pgs, Color, Navy Gold Foil)",
    itemCount: 1,
    totalAmount: 680,
    fulfillment: "Store Pickup (Valanchery Bus Stand)",
    paymentMode: "UPI (GPay)",
    paymentStatus: "Paid",
    orderStatus: "Ready for Pickup",
    date: "2026-09-08 13:30",
    printSpecs: {
      pages: 140,
      copies: 1,
      colorMode: "Colour",
      sides: "Double-Sided",
      binding: "Hardcover Gold Emboss",
      fileName: "KTU_MTech_Final_Thesis_Shafi.pdf",
      fileSize: "14.2 MB"
    }
  },
  {
    id: "PKP-PRN-3102",
    orderType: "print",
    customerName: "Dr. Lakshmi Menon",
    phone: "94470 66543",
    items: "Medical Seminar Handouts (45 pgs × 3 copies, Wire-O Spiral)",
    itemCount: 3,
    totalAmount: 420,
    fulfillment: "Home Delivery (MES Medical College Area)",
    address: "Dept of Pediatrics, MES Medical College Campus, Perinthalmanna Rd",
    paymentMode: "Cash on Collection",
    paymentStatus: "Unpaid",
    orderStatus: "Preparing",
    date: "2026-09-08 14:50",
    printSpecs: {
      pages: 45,
      copies: 3,
      colorMode: "Black and White",
      sides: "Double-Sided",
      binding: "Wire-O Spiral",
      fileName: "Pediatric_Seminar_Handouts.pdf",
      fileSize: "3.8 MB"
    }
  }
];

export function readSystemOrders(): SystemOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem("pk_orders");
    if (!raw) {
      localStorage.setItem("pk_orders", JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch (e) {
    return INITIAL_ORDERS;
  }
}

export function placeSystemOrder(order: SystemOrder) {
  if (typeof window === "undefined") return;
  const current = readSystemOrders();
  const next = [order, ...current];
  localStorage.setItem("pk_orders", JSON.stringify(next));
  window.dispatchEvent(new Event("pk-orders-updated"));
}

export function readAdminProducts(): AdminProductRaw[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("pkBooksAdminProducts");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to read admin products:", e);
    return [];
  }
}

export function saveAdminProduct(product: AdminProductRaw) {
  if (typeof window === "undefined") return;
  const current = readAdminProducts();
  const next = current.filter((p) => p.id !== product.id && p.sku !== product.sku);
  next.unshift(product);
  localStorage.setItem("pkBooksAdminProducts", JSON.stringify(next));
  window.dispatchEvent(new Event("pk-catalog-updated"));
}

/**
 * React hook to get connected products for a specific shop:
 * "books" | "stationery" | "printing"
 */
export function useShopProducts(shop: ShopType) {
  const [adminItems, setAdminItems] = useState<AdminProductRaw[]>([]);

  useEffect(() => {
    const update = () => {
      const all = readAdminProducts();
      const filtered = all.filter((p) => {
        if (p.shopType) return p.shopType === shop;
        // Fallbacks for legacy untagged items:
        const t = `${p.tags || ""} ${p.category || ""} ${p.name || ""}`.toLowerCase();
        if (shop === "stationery") return t.includes("stationery") || t.includes("pen") || t.includes("notebook");
        if (shop === "printing") return t.includes("print") || t.includes("thesis") || t.includes("binding");
        if (shop === "books") return !p.shopType || p.shopType === "books";
        return false;
      });
      setAdminItems(filtered);
    };

    update();
    window.addEventListener("storage", update);
    window.addEventListener("pk-catalog-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("pk-catalog-updated", update);
    };
  }, [shop]);

  return adminItems;
}

