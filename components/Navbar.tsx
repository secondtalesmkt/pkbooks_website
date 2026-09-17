"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  Clock,
  ExternalLink,
  Headphones,
  Heart,
  LayoutGrid,
  LogOut,
  MapPin,
  Menu,
  Phone,
  Printer,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
  X,
  Zap
} from "lucide-react";
import PKLogo from "@/components/PKLogo";

const megaMenuCategories = [
  {
    title: "Printing & Xerox Counter",
    tagline: "Instant 15-min digital print",
    href: "/printing",
    icon: Printer,
    color: "text-[#ED1C24] bg-red-50",
    badge: "15-Min Ready",
    items: [
      { name: "Online Document Printing", desc: "PDF, Word, PPTX upload", href: "/printing" },
      { name: "Project & Thesis Binding", desc: "Spiral & golden foil hardcover", href: "/printing" },
      { name: "High-Speed Xerox & Copies", desc: "B/W & vibrant color duplex", href: "/printing" },
      { name: "Thermal Lamination", desc: "Waterproof protective coating", href: "/printing" }
    ]
  },
  {
    title: "Custom Products Studio",
    tagline: "Personalized gifts & merchandise",
    href: "/custom-products",
    icon: Sparkles,
    color: "text-[#0056B3] bg-blue-50",
    badge: "Live 3D Preview",
    items: [
      { name: "Personalized Spiral Notebooks", desc: "Name, quote & school theme", href: "/custom-products" },
      { name: "Custom Ceramic Photo Mugs", desc: "Glossy sublimation print", href: "/custom-products" },
      { name: "School Badges & ID Pins", desc: "Emblem & house colors", href: "/custom-products" },
      { name: "Executive Visiting Cards", desc: "350 GSM premium matte/gloss", href: "/custom-products" }
    ]
  },
  {
    title: "Stationery World",
    tagline: "School & office supplies",
    href: "/stationery",
    icon: Boxes,
    color: "text-[#0056B3] bg-blue-50",
    badge: "All Top Brands",
    items: [
      { name: "Books & Long Notebooks", desc: "Classmate spiral & prescribed SCERT", href: "/stationery" },
      { name: "Pens & Writing Instruments", desc: "Hauser, Pentel & Trimax pens", href: "/stationery" },
      { name: "Sharpeners & Erasers", desc: "Rotary & dust-free erasers", href: "/stationery" },
      { name: "Colour Books & Art Sets", desc: "Kids colouring & Faber pastels", href: "/stationery" }
    ]
  },
  {
    title: "Academic Books & Literature",
    tagline: "10,000+ Titles in stock",
    href: "/books",
    icon: BookOpen,
    color: "text-[#ED1C24] bg-red-50",
    badge: "Syllabus Guides",
    items: [
      { name: "Kerala PSC Rank Files 2027", desc: "Latest GK & solved papers", href: "/books" },
      { name: "SCERT / CBSE Textbooks", desc: "Class 1 to 12 companions", href: "/books" },
      { name: "MBBS & Medical Texts", desc: "Anatomy, Pharma & clinical", href: "/books" },
      { name: "Malayalam Literature & Novels", desc: "Award-winning bestsellers", href: "/books" }
    ]
  }
];

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Sync auth state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pk_user");
      if (saved) {
        try {
          setCurrentUser(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
        setPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setMegaOpen(false);
    setPagesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement & Store Info Bar */}
      <div className="bg-[#003E94] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 border-b border-blue-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span>Bus Stand, Valanchery - 676552</span>
            </span>
            <span className="hidden md:inline-block text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-white/90">
              <Clock className="h-3.5 w-3.5 text-blue-200" />
              Open Daily: 8:30 AM - 9:00 PM
            </span>
            <span className="hidden lg:inline-block text-white/40">|</span>
            <span className="hidden lg:inline-block text-white/80">
              GSTIN: <strong className="text-white font-mono">32CUEPP5402M1ZL</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="tel:+919746700123"
              className="flex items-center gap-1.5 hover:text-blue-200 font-semibold text-white/95 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>9746 700 123 / 9995 037 373</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs" ref={navRef}>
      {/* Tier 1: Top Bar (Logo, Search, User Actions) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-slate-50 md:hidden hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>

            <Link href="/" className="flex items-center shrink-0">
              <PKLogo size="sm" className="hover:opacity-95 transition-opacity" />
            </Link>
          </div>

          {/* Centered Search Bar (Pill with Black Search Button) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl relative items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product"
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-2.5 text-xs text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-[#1a1a1a] text-white hover:bg-black transition-colors"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Right Action Icons: Login, Compare, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all border border-slate-200"
                >
                  <User className="h-3.5 w-3.5 text-[#0057B8]" />
                  <span className="truncate max-w-[90px]">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown className="h-3 w-3 text-slate-500" />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                    </div>
                    <Link
                      href="/login"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <Printer className="h-3.5 w-3.5 text-[#0057B8]" /> My Print Jobs &amp; Orders
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Staff Admin Panel
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("pk_user");
                        setCurrentUser(null);
                        setAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold text-left"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0057B8] transition-colors"
              >
                <User className="h-4 w-4 text-slate-700" />
                <span className="hidden lg:inline">Login</span>
              </Link>
            )}

            <Link
              href="/books"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0057B8] transition-colors"
            >
              <div className="relative">
                <ArrowLeftRight className="h-4 w-4 text-slate-700" />
                <span className="absolute -top-1.5 -right-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#0057B8] text-[9px] font-bold text-white">
                  0
                </span>
              </div>
              <span className="hidden lg:inline">Compare</span>
            </Link>

            <Link
              href="/books"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0057B8] transition-colors"
            >
              <div className="relative">
                <Heart className="h-4 w-4 text-slate-700" />
                <span className="absolute -top-1.5 -right-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#0057B8] text-[9px] font-bold text-white">
                  0
                </span>
              </div>
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("popular-genre-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0057B8] transition-colors"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 text-slate-800" />
                <span className="absolute -top-1.5 -right-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#1a1a1a] text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (only below md) */}
        <form onSubmit={handleSearch} className="mt-3 flex md:hidden relative items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product"
            className="w-full rounded-full border border-slate-200 bg-slate-50/50 pl-4 pr-11 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-[#1a1a1a] text-white"
          >
            <Search className="h-3 w-3" />
          </button>
        </form>
      </div>

      {/* Tier 2: Secondary Navigation Bar */}
      <div className="hidden md:block border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Browse All Categories Button */}
          <div className="relative py-2.5">
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#0057B8] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-[#004799] transition-all"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Browse All Categories</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {megaOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-[900px] rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="grid grid-cols-4 gap-6">
                  {megaMenuCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.title} className="flex flex-col justify-between rounded-xl p-3 hover:bg-slate-50 transition-colors">
                        <div>
                          <Link href={cat.href} className="group flex items-start gap-2.5 mb-3">
                            <div className={`grid h-8 w-8 place-items-center rounded-lg ${cat.color} shrink-0`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#0057B8] leading-tight">
                                {cat.title}
                              </h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">{cat.tagline}</p>
                            </div>
                          </Link>

                          <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                            {cat.items.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  href={item.href}
                                  className="block text-[11px] font-medium text-slate-600 hover:text-[#0057B8] py-0.5 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          href={cat.href}
                          className="mt-3 flex items-center justify-between text-[10px] font-bold text-[#0057B8] pt-2 border-t border-slate-100 hover:underline"
                        >
                          <span>Explore Category</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Banner inside Mega Menu */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Zap className="h-4 w-4 text-[#ED1C24]" />
                    <span>Quick Printout? WhatsApp file to 9746 700 123 — pickup in 15 mins at Valanchery Bus Stand.</span>
                  </div>
                  <a
                    href="https://wa.me/919746700123"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#0057B8] hover:underline"
                  >
                    <span>Chat with Counter</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Center: Main Nav Links */}
          <nav className="flex items-center gap-6 lg:gap-8 text-xs font-semibold text-slate-800">
            <Link
              href="/"
              className={`py-3 flex items-center gap-1 hover:text-[#0057B8] transition-colors ${pathname === "/" ? "text-[#0057B8] font-bold" : ""}`}
            >
              <span>Home</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Link>

            <Link
              href="/books"
              className={`py-3 flex items-center gap-1 hover:text-[#0057B8] transition-colors ${pathname === "/books" ? "text-[#0057B8] font-bold" : ""}`}
            >
              <span>Shop</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Link>

            <Link
              href="/stationery"
              className={`py-3 flex items-center gap-1 hover:text-[#0057B8] transition-colors ${pathname === "/stationery" ? "text-[#0057B8] font-bold" : ""}`}
            >
              <span>Products</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Link>

            {/* Pages dropdown */}
            <div className="relative">
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="py-3 flex items-center gap-1 hover:text-[#0057B8] transition-colors"
              >
                <span>Pages</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {pagesOpen && (
                <div className="absolute left-0 top-full mt-1 w-48 rounded-xl bg-white p-2 shadow-lg border border-slate-100 z-50 text-xs">
                  <Link href="/about" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0057B8]">About Us</Link>
                  <Link href="/contact" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0057B8]">Contact Store</Link>
                  <Link href="/printing" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0057B8]">Printing & Binding</Link>
                  <Link href="/custom-products" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0057B8]">Custom Gifts & Studio</Link>
                  <Link href="/admin" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0057B8] font-bold">Admin Portal</Link>
                </div>
              )}
            </div>

            <Link
              href="/printing"
              className="py-3 flex items-center gap-1 hover:text-[#0057B8] transition-colors"
            >
              <span>Blog</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Link>

            <Link
              href="/books"
              className="py-3 text-slate-800 hover:text-[#0057B8] transition-colors"
            >
              Buy Now
            </Link>
          </nav>

          {/* Right: Support Center Phone (190010088 style) */}
          <a
            href="tel:+919746700123"
            className="flex items-center gap-3 py-2 text-right group"
          >
            <Headphones className="h-7 w-7 text-slate-800 group-hover:text-[#0057B8] transition-colors" />
            <div>
              <span className="block text-sm font-extrabold text-[#0057B8] leading-tight tracking-tight">
                +91 9746 700 123
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                Support Center
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="grid gap-1 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`p-2.5 rounded-lg ${pathname === "/" ? "bg-blue-50 text-[#0057B8]" : "text-slate-800"}`}
            >
              Home
            </Link>
            <Link
              href="/books"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Shop Books
            </Link>
            <Link
              href="/stationery"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Stationery & Products
            </Link>
            <Link
              href="/printing"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Online Printing Service
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg text-[#0057B8] font-bold bg-blue-50/60 hover:bg-blue-100/60 flex items-center justify-between"
            >
              <span>Customer &amp; Staff Login Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Store Support
            </span>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0057B8] block">Valanchery Counter: 9746 700 123</span>
                <span className="text-[11px] text-slate-500">8:30 AM - 9:00 PM Daily</span>
              </div>
              <a
                href="tel:+919746700123"
                className="rounded-lg bg-[#0057B8] p-2 text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
