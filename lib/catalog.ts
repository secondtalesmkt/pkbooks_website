export type Product = {
  id: string;
  name: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  category: string;
  subCategory?: string;
  className?: string;
  subject?: string;
  language: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  sku: string;
  gst: number;
  rating: number;
  reviewsCount?: number;
  imageTone: string;
  coverBg?: string;
  badge?: string;
  featured?: boolean;
};

export type Order = {
  id: string;
  customer: string;
  type: "Book" | "Print" | "Custom";
  total: number;
  status: string;
  payment: string;
  delivery: string;
};

export type PrintJob = {
  id: string;
  customer: string;
  file: string;
  pages: number;
  options: string;
  status: string;
  assignedTo: string;
};

export const products: Product[] = [
  // --- BIOGRAPHIES & MEMOIRS ---
  {
    id: "bio-wings-of-fire",
    name: "Wings of Fire: An Autobiography",
    author: "Dr. A.P.J. Abdul Kalam",
    publisher: "Universities Press",
    isbn: "978-81-737114-6-6",
    category: "Biographies & Memoirs",
    subCategory: "Leaders & Notable",
    subject: "Inspirational",
    language: "English / Malayalam",
    description: "The inspiring story of former Indian President Dr. Kalam, from Rameswaram to ISRO.",
    price: 395,
    discountPrice: 315,
    stock: 65,
    sku: "PKB-BIO-WOF",
    gst: 5,
    rating: 5.0,
    reviewsCount: 124,
    imageTone: "from-amber-600 via-yellow-700 to-stone-900",
    coverBg: "#FEF3C7",
    badge: "National Bestseller",
    featured: true
  },
  {
    id: "bio-steve-jobs",
    name: "Steve Jobs: The Exclusive Biography",
    author: "Walter Isaacson",
    publisher: "Simon & Schuster",
    isbn: "978-14-516485-3-9",
    category: "Biographies & Memoirs",
    subCategory: "Modern Biographies",
    subject: "Technology",
    language: "English",
    description: "Based on more than forty interviews with Jobs conducted over two years.",
    price: 899,
    discountPrice: 699,
    stock: 38,
    sku: "PKB-BIO-SJOB",
    gst: 5,
    rating: 4.9,
    reviewsCount: 88,
    imageTone: "from-slate-800 via-zinc-900 to-black",
    badge: "Global Classic"
  },
  {
    id: "bio-ente-katha",
    name: "Ente Katha (My Story)",
    author: "Kamala Surayya (Madhavikutty)",
    publisher: "DC Books",
    isbn: "978-81-713009-4-1",
    category: "Biographies & Memoirs",
    subCategory: "Historical Biographies",
    subject: "Malayalam Memoir",
    language: "Malayalam",
    description: "One of the most celebrated and courageous autobiographies in modern Indian literature.",
    price: 280,
    discountPrice: 235,
    stock: 52,
    sku: "PKB-BIO-ENTE",
    gst: 5,
    rating: 4.8,
    reviewsCount: 64,
    imageTone: "from-rose-800 via-red-900 to-neutral-950",
    badge: "Malayalam Masterpiece"
  },
  {
    id: "bio-surrounded-by-idiots",
    name: "Surrounded by Idiots",
    author: "Thomas Erikson",
    publisher: "St. Martin's Essentials",
    isbn: "978-12-502551-7-4",
    category: "Biographies & Memoirs",
    subCategory: "Sports & Modern",
    subject: "Human Psychology",
    language: "English",
    description: "The four types of human behavior and how to effectively communicate with each.",
    price: 599,
    discountPrice: 475,
    stock: 45,
    sku: "PKB-BIO-SBI",
    gst: 5,
    rating: 4.7,
    reviewsCount: 92,
    imageTone: "from-red-600 via-orange-700 to-slate-900",
    badge: "Trending #1"
  },
  {
    id: "bio-david-chang",
    name: "Eat a Peach: A Memoir",
    author: "David Chang & Gabe Ulla",
    publisher: "Crown Publishing",
    isbn: "978-15-247592-1-6",
    category: "Biographies & Memoirs",
    subCategory: "Modern Biographies",
    subject: "Culinary & Life",
    language: "English",
    description: "An unflinching, candid memoir about culinary genius, mental health, and relentless grit.",
    price: 750,
    discountPrice: 589,
    stock: 26,
    sku: "PKB-BIO-EAP",
    gst: 5,
    rating: 4.8,
    reviewsCount: 47,
    imageTone: "from-amber-500 via-orange-600 to-stone-900"
  },

  // --- CHILDREN'S BOOKS ---
  {
    id: "ch-crazy-plant-lady",
    name: "Crazy Plant Lady & Nature Tales",
    author: "Isabel Serna",
    publisher: "Workman Publishing",
    isbn: "978-15-235053-7-1",
    category: "Children's Books",
    subCategory: "Children's Animal Books",
    subject: "Nature & Fun",
    language: "English",
    description: "Charming illustrated storybook celebrating plants, green habitats, and curiosity for young readers.",
    price: 380,
    discountPrice: 295,
    stock: 60,
    sku: "PKB-CH-CPL",
    gst: 5,
    rating: 4.9,
    reviewsCount: 73,
    imageTone: "from-emerald-600 via-teal-700 to-cyan-950",
    badge: "Staff Pick",
    featured: true
  },
  {
    id: "ch-over-woodward",
    name: "Over the Woodward Wall",
    author: "A. Deborah Baker",
    publisher: "Tor Books",
    isbn: "978-12-506189-1-7",
    category: "Children's Books",
    subCategory: "Action & Adventure",
    subject: "Fantasy Fiction",
    language: "English",
    description: "An enchanted fairy-tale quest of two young travelers venturing into a mystical forest world.",
    price: 499,
    discountPrice: 399,
    stock: 42,
    sku: "PKB-CH-OWW",
    gst: 5,
    rating: 4.8,
    reviewsCount: 51,
    imageTone: "from-purple-700 via-pink-800 to-slate-900",
    badge: "Fantasy Tale"
  },
  {
    id: "ch-panchatantra",
    name: "Illustrated Panchatantra Treasury",
    author: "Vishnu Sharma / Amar Chitra Katha",
    publisher: "ACK Media",
    isbn: "978-81-848201-2-6",
    category: "Children's Books",
    subCategory: "Classic Children's Books",
    subject: "Moral Tales",
    language: "English / Malayalam",
    description: "Timeless moral fables of wit, wisdom, friendship, and animal adventures in full color.",
    price: 350,
    discountPrice: 260,
    stock: 95,
    sku: "PKB-CH-PAN",
    gst: 5,
    rating: 5.0,
    reviewsCount: 110,
    imageTone: "from-amber-600 via-orange-600 to-rose-900",
    badge: "All-Time Best"
  },
  {
    id: "ch-little-prince",
    name: "The Little Prince (Illustrated Edition)",
    author: "Antoine de Saint-Exupéry",
    publisher: "Wordsworth Collector's",
    isbn: "978-18-532615-8-9",
    category: "Children's Books",
    subCategory: "Sci-Fi & Fantasy Books",
    subject: "Philosophical Tale",
    language: "English",
    description: "A poetic tale of a young prince who visits various planets in space, addressing themes of loneliness and love.",
    price: 320,
    discountPrice: 245,
    stock: 70,
    sku: "PKB-CH-TLP",
    gst: 5,
    rating: 4.9,
    reviewsCount: 140,
    imageTone: "from-sky-600 via-indigo-700 to-slate-950"
  },
  {
    id: "ch-malgudi-days",
    name: "Malgudi Adventures for Young Readers",
    author: "R.K. Narayan",
    publisher: "Puffin Books India",
    isbn: "978-01-433309-8-1",
    category: "Children's Books",
    subCategory: "Children's Humor",
    subject: "Indian Classics",
    language: "English",
    description: "Swami and friends on unforgettable sunny escapades across the quiet South Indian town of Malgudi.",
    price: 299,
    discountPrice: 239,
    stock: 58,
    sku: "PKB-CH-MALG",
    gst: 5,
    rating: 4.8,
    reviewsCount: 68,
    imageTone: "from-teal-600 via-emerald-800 to-slate-900"
  },

  // --- LITERATURE & FICTION ---
  {
    id: "lit-aadu-jeevitham",
    name: "Aadujeevitham (Goat Days)",
    author: "Benyamin",
    publisher: "DC Books",
    isbn: "978-81-264198-8-2",
    category: "Literature & Fiction",
    subCategory: "Classic Books",
    subject: "Malayalam Fiction",
    language: "Malayalam",
    description: "Acclaimed Kerala Sahitya Akademi award-winning novel of Najeeb's desert survival.",
    price: 320,
    discountPrice: 275,
    stock: 75,
    sku: "PKB-NOV-AADU",
    gst: 5,
    rating: 5.0,
    reviewsCount: 198,
    imageTone: "from-amber-700 via-stone-800 to-slate-950",
    badge: "Award Winner",
    featured: true
  },
  {
    id: "lit-carrie-soto",
    name: "Carrie Soto Is Back",
    author: "Taylor Jenkins Reid",
    publisher: "Ballantine Books",
    isbn: "978-05-931586-8-5",
    category: "Literature & Fiction",
    subCategory: "Contemporary Literature",
    subject: "Modern Fiction",
    language: "English",
    description: "An exhilarating novel about the cost of greatness and a legendary tennis star's comeback.",
    price: 599,
    discountPrice: 480,
    stock: 35,
    sku: "PKB-LIT-CSB",
    gst: 5,
    rating: 4.8,
    reviewsCount: 86,
    imageTone: "from-yellow-600 via-amber-700 to-stone-900",
    badge: "#1 NYT Bestseller"
  },
  {
    id: "lit-house-sky-breath",
    name: "House of Sky and Breath",
    author: "Sarah J. Maas",
    publisher: "Bloomsbury Publishing",
    isbn: "978-16-355740-7-4",
    category: "Literature & Fiction",
    subCategory: "Genre Fiction",
    subject: "Crescent City Saga",
    language: "English",
    description: "The thrilling second installment in the Crescent City series packed with romance and intrigue.",
    price: 799,
    discountPrice: 620,
    stock: 40,
    sku: "PKB-LIT-HOSB",
    gst: 5,
    rating: 4.9,
    reviewsCount: 95,
    imageTone: "from-slate-700 via-cyan-900 to-black"
  },
  {
    id: "lit-each-of-us-desert",
    name: "Each of Us a Desert",
    author: "Mark Oshiro",
    publisher: "Tor Teen",
    isbn: "978-12-501692-1-1",
    category: "Literature & Fiction",
    subCategory: "Foreign Language Fiction",
    subject: "Mythic Fantasy",
    language: "English",
    description: "A gorgeous fantasy about finding your truth, enduring grief, and surviving against odds.",
    price: 650,
    discountPrice: 510,
    stock: 32,
    sku: "PKB-LIT-EOUD",
    gst: 5,
    rating: 4.7,
    reviewsCount: 54,
    imageTone: "from-rose-600 via-amber-700 to-slate-900"
  },
  {
    id: "lit-ring-shout",
    name: "Ring Shout: Dark Historical Fantasy",
    author: "P. Djèlí Clark",
    publisher: "Tordotcom",
    isbn: "978-12-507670-2-8",
    category: "Literature & Fiction",
    subCategory: "History & Criticism",
    subject: "Dark Fantasy",
    language: "English",
    description: "Nebula, Locus, and British Fantasy Award-winning dark historical fantasy.",
    price: 499,
    discountPrice: 395,
    stock: 29,
    sku: "PKB-LIT-RSH",
    gst: 5,
    rating: 4.8,
    reviewsCount: 62,
    imageTone: "from-red-700 via-stone-900 to-black"
  },

  // --- ACADEMIC, PSC & COMPETITIVE EXAMS ---
  {
    id: "psc-rank",
    name: "Kerala PSC Rank File 2027",
    author: "PK Editorial Board",
    publisher: "PK Books",
    isbn: "978-81-880041-8-3",
    category: "Competitive & Academic",
    subCategory: "Kerala PSC Rank Files",
    subject: "General Knowledge",
    language: "Malayalam",
    description: "Latest current affairs, solved previous papers, practice tests & district facts.",
    price: 640,
    discountPrice: 525,
    stock: 92,
    sku: "PKB-PSC-2027",
    gst: 5,
    rating: 4.9,
    reviewsCount: 230,
    imageTone: "from-red-600 via-rose-700 to-amber-900",
    badge: "#1 Rank Maker",
    featured: true
  },
  {
    id: "med-anatomy",
    name: "Essentials of Human Anatomy",
    author: "Dr. K. Menon",
    publisher: "Medline Academic",
    isbn: "978-81-930221-4-7",
    category: "Competitive & Academic",
    subCategory: "NEET / MBBS Texts",
    subject: "Anatomy",
    language: "English",
    description: "Illustrated MBBS foundation text with exam notes and clinical dissection boxes.",
    price: 1299,
    discountPrice: 1099,
    stock: 34,
    sku: "PKB-MED-001",
    gst: 5,
    rating: 4.8,
    reviewsCount: 84,
    imageTone: "from-blue-700 via-indigo-800 to-slate-900",
    badge: "MBBS Bestseller"
  },
  {
    id: "sslc-science",
    name: "Class 10 SSLC Master Companion",
    author: "SCERT Board Experts",
    publisher: "Bright School Series",
    isbn: "978-81-990032-1-7",
    category: "Competitive & Academic",
    subCategory: "SSLC / Plus Two Guides",
    className: "Class 10",
    subject: "Science & Maths",
    language: "English / Mal",
    description: "Complete A+ revision guide with solved model papers and chapter summary maps.",
    price: 480,
    discountPrice: 399,
    stock: 140,
    sku: "PKB-SCH-10MST",
    gst: 5,
    rating: 4.8,
    reviewsCount: 156,
    imageTone: "from-emerald-700 via-teal-800 to-slate-900",
    badge: "SSLC A+ Pack"
  },
  {
    id: "eng-mechanics",
    name: "Engineering Mechanics Workbook",
    author: "A. Rahman",
    publisher: "South Tech Press",
    isbn: "978-81-771188-6-9",
    category: "Competitive & Academic",
    subCategory: "KTU Engineering Handbooks",
    subject: "Mechanics",
    language: "English",
    description: "Problem-led workbook and formula handbook for KTU/B.Tech engineering students.",
    price: 780,
    discountPrice: 699,
    stock: 45,
    sku: "PKB-ENG-103",
    gst: 5,
    rating: 4.6,
    reviewsCount: 42,
    imageTone: "from-slate-700 via-blue-900 to-slate-950",
    badge: "KTU Syllabus"
  },

  // --- STATIONERY ---
  {
    id: "camlin-geo",
    name: "Camlin Exam Geometry Box Kit",
    publisher: "Kokuyo Camlin",
    category: "Stationery Products",
    language: "Universal",
    description: "Self-centering compass, precision divider, transparent scales & set squares.",
    price: 240,
    discountPrice: 195,
    stock: 180,
    sku: "PKS-CAM-GEO",
    gst: 12,
    rating: 4.7,
    reviewsCount: 98,
    imageTone: "from-cyan-700 via-blue-800 to-indigo-950",
    badge: "Exam Precision"
  },
  {
    id: "faber-art",
    name: "Faber-Castell Artist Colour Set",
    publisher: "Faber-Castell",
    category: "Stationery Products",
    language: "Universal",
    description: "24 vibrant oil pastels, sketch pens, shading pencils, eraser & sharpener kit.",
    price: 350,
    discountPrice: 289,
    stock: 85,
    sku: "PKS-FAB-ART",
    gst: 12,
    rating: 4.8,
    reviewsCount: 65,
    imageTone: "from-purple-700 via-pink-700 to-rose-900",
    badge: "Creative Kit"
  },
  {
    id: "classmate-pack",
    name: "Classmate Spiral Notebooks (Set of 6)",
    publisher: "ITC Classmate",
    category: "Stationery Products",
    language: "Universal",
    description: "240-page ruled spiral notebooks with ultra-white smooth writing paper.",
    price: 490,
    discountPrice: 420,
    stock: 110,
    sku: "PKS-CLS-6NB",
    gst: 12,
    rating: 4.9,
    reviewsCount: 172,
    imageTone: "from-red-600 via-orange-600 to-amber-800",
    badge: "Value Bundle"
  }
];

export const schoolPackages = [
  {
    school: "PK Public School",
    className: "Class 8",
    academicYear: "2026-27",
    books: ["Class 8 Science Companion", "Mathematics Practice Book", "English Reader", "Social Science Map Book"],
    price: 2380,
    stock: 48
  },
  {
    school: "Green Valley HSS",
    className: "Class 10",
    academicYear: "2026-27",
    books: ["SSLC Science Guide", "Maths Question Bank", "English Grammar", "Malayalam Reader"],
    price: 2960,
    stock: 27
  }
];

export const orders: Order[] = [
  { id: "ORD-24091", customer: "Amina K", type: "Print", total: 486, status: "Printing", payment: "Razorpay paid", delivery: "Today 6:30 PM" },
  { id: "ORD-24090", customer: "Rohit P", type: "Book", total: 1624, status: "Packed", payment: "UPI paid", delivery: "Tomorrow" },
  { id: "ORD-24089", customer: "Nisha V", type: "Custom", total: 920, status: "Quality Check", payment: "Card paid", delivery: "Pickup ready soon" }
];

export const printJobs: PrintJob[] = [
  { id: "PRN-5108", customer: "Amina K", file: "lab-record.pdf", pages: 64, options: "A4 color, spiral, 2 copies", status: "Printing", assignedTo: "Printing Staff" },
  { id: "PRN-5107", customer: "Nisha V", file: "notebook-cover.png", pages: 1, options: "Matte cover, 200 pages", status: "Quality Check", assignedTo: "Manager" },
  { id: "PRN-5106", customer: "College Union", file: "event-flyer.pdf", pages: 2, options: "A3 color, 100 copies", status: "Ready", assignedTo: "Delivery Staff" }
];

export const categories = [
  "All",
  "Biographies & Memoirs",
  "Children's Books",
  "Literature & Fiction",
  "Competitive & Academic",
  "Stationery Products"
];

