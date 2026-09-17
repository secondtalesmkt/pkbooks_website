export interface PrintProductItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  sku: string;
  image: string;
}

export const DEFAULT_PRINT_PRODUCTS: PrintProductItem[] = [
  {
    id: "print-a4-bordered-100",
    name: "Premium A4 Bordered Paper (Pack of 100 Sheets)",
    category: "Bordered Paper Sets",
    desc: "Single sheets with elegant border design. Perfect for assignment notes, college presentations, project submissions & creative calligraphy.",
    price: 149,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Meesho Best Seller",
    sku: "PK-MEESHO-1045270921",
    image: "/images/print-store/bordered-paper.png"
  },
  {
    id: "print-thank-you-cards-50",
    name: "Botanical 'Thank You For Your Support' Cards (Pack of 50)",
    category: "Customer Note Cards",
    desc: "300 GSM premium matte art cardstock mini parcel insert cards with delicate botanical green leaves & gold heart cursive lettering.",
    price: 129,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Top Rated",
    sku: "PK-MEESHO-1054069720",
    image: "/images/print-store/thank-you-cards.jpg"
  },
  {
    id: "print-project-assignment-sheets-50",
    name: "Student Project Work Border Sheets (Pack of 50 Sheets)",
    category: "Bordered Paper Sets",
    desc: "Pre-printed stylish border sheets for school, CBSE & university degree project submissions. Clean index & margin guides on 80 GSM smooth bond paper.",
    price: 99,
    originalPrice: 160,
    rating: 4.8,
    reviewsCount: 65,
    badge: "Student Pack",
    sku: "PK-PRN-BORDER-50",
    image: "/images/print-store/bordered-paper.png"
  },
  {
    id: "print-thank-you-cards-100",
    name: "Boutique Thank You Parcel Inserts (Pack of 100 Cards)",
    category: "Customer Note Cards",
    desc: "Bulk pack of customer appreciation cards for small businesses, online sellers, and gift hampers. Velvet touch finish with gold highlights.",
    price: 219,
    originalPrice: 349,
    rating: 5.0,
    reviewsCount: 110,
    badge: "Value Combo",
    sku: "PK-PRN-TY-100",
    image: "/images/print-store/thank-you-cards.jpg"
  },
  {
    id: "print-certificate-gold-25",
    name: "Gold Foil Border Certificate Parchment Sheets (Pack of 25)",
    category: "Certificates & Awards",
    desc: "220 GSM thick textured parchment certificate paper with royal gold metallic hot-stamped borders. Laser & inkjet printer compatible.",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 47,
    badge: "Institutional",
    sku: "PK-PRN-CERT-25",
    image: "/images/category-print.jpg"
  },
  {
    id: "print-invoice-books-2",
    name: "Duplicate Order Invoice & Bill Book (Pack of 2 Books)",
    category: "Business Stationery",
    desc: "Pre-printed carbonless duplicate order & cash memo booklets with serial numbering, perforated customer copy, and durable binding.",
    price: 160,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 39,
    badge: "PK Prints Original",
    sku: "PK-PRN-INV-2",
    image: "/images/stationery-notebooks.jpg"
  },
  {
    id: "print-thesis-gold",
    name: "Hardcover Thesis Binding with Golden Emboss",
    category: "Thesis & Binding",
    desc: "Calicut University / KTU standard leatherette hardcover with gold/silver foil spine and front cover embossing. Fast 15-minute counter delivery.",
    price: 450,
    originalPrice: 600,
    rating: 5.0,
    reviewsCount: 84,
    badge: "15-Min Counter",
    sku: "PK-PRN-THESIS",
    image: "/images/category-print.jpg"
  },
  {
    id: "print-spiral-report",
    name: "Wire-O Spiral Project Report (A4 Color)",
    category: "Thesis & Binding",
    desc: "Heavy duty transparent frosted covers with black twin-loop wire binding and high-contrast digital color output. Up to 250 pages.",
    price: 180,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 65,
    badge: "Popular",
    sku: "PK-PRN-SPIRAL",
    image: "/images/category-print.jpg"
  }
];
