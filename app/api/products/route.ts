import { NextResponse } from "next/server";
import { products as defaultBooks } from "@/lib/catalog";
import { STATIONERY_PRODUCTS } from "@/lib/stationeryCatalog";
import { DEFAULT_PRINT_PRODUCTS } from "@/lib/printCatalog";

export const dynamic = "force-static";

export async function GET() {


  // 1. Format Books
  const booksFormatted = defaultBooks.map((b, idx) => {
    let img = "/images/category-books.jpg";
    const cat = b.category.toLowerCase();
    if (cat.includes("biograph")) img = "/images/collection-biography.jpg";
    else if (cat.includes("child")) img = "/images/collection-children.jpg";
    else if (cat.includes("fiction") || cat.includes("literature")) img = "/images/collection-fiction.jpg";
    else if (cat.includes("academic") || cat.includes("competitive")) img = "/images/collection-academic.jpg";

    return {
      id: b.id,
      name: b.name,
      sku: b.sku || `PKB-BK-${b.id.toUpperCase().slice(0, 8)}`,
      price: b.price,
      salePrice: b.discountPrice || b.price,
      quantity: b.stock || 50,
      sale: (b.reviewsCount || 10) * 2 + 15,
      stock: (b.stock || 50) > 10 ? "In Stock" : "Low Stock",
      date: "2026-02-01",
      publisher: b.author || b.publisher || "PK Books",
      shopType: "books" as const,
      category: b.category,
      tags: `${b.category}, ${b.language || "Malayalam / English"}, ${b.subject || "Book"}`,
      description: b.description || "Real title available at PK Books & Printing.",
      image: img
    };
  });

  // 2. Format Stationery
  const stationeryFormatted = STATIONERY_PRODUCTS.map((s) => ({
    id: s.id,
    name: s.name,
    sku: s.sku,
    price: s.originalPrice || s.price,
    salePrice: s.price,
    quantity: s.stock || 100,
    sale: (s.reviewsCount || 15) * 2 + 30,
    stock: "In Stock",
    date: "2026-02-15",
    publisher: s.brand || "PK Stationery",
    shopType: "stationery" as const,
    category: s.categoryLabel,
    tags: `${s.categoryLabel}, ${s.brand}, ${s.details ? s.details.join(", ") : ""}`,
    description: s.desc,
    image: s.image || "/images/category-stationery.jpg"
  }));

  // 3. Format Print Store
  const printFormatted = DEFAULT_PRINT_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    price: p.originalPrice || p.price,
    salePrice: p.price,
    quantity: 120,
    sale: (p.reviewsCount || 20) * 3 + 45,
    stock: "In Stock",
    date: "2026-03-01",
    publisher: "PK Prints",
    shopType: "printing" as const,
    category: p.category,
    tags: `PK Prints, ${p.category}, Printed Sets, Meesho Best Seller`,
    description: p.desc,
    image: p.image || "/images/category-print.jpg"
  }));

  const all = [...booksFormatted, ...stationeryFormatted, ...printFormatted];



  return NextResponse.json({
    counts: {
      books: booksFormatted.length,
      stationery: stationeryFormatted.length,
      printing: printFormatted.length,
      total: all.length
    },
    products: all,
    books: booksFormatted,
    stationery: stationeryFormatted,
    printing: printFormatted
  });
}
