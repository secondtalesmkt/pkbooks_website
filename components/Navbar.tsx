"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Clock,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
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

const navLinks = [
  { name: "Books", href: "/books", icon: BookOpen, badge: "10,000+ Titles" },
  { name: "Stationery", href: "/stationery", icon: Boxes, badge: "School & Office" },
  { name: "Print Counter", href: "/printing", icon: Printer, badge: "15-Min Express", highlight: true },
  { name: "Custom Gifts", href: "/custom-products", icon: Sparkles, badge: "Photo Mugs & Notes" },
  { name: "Our Store", href: "/about", icon: MapPin },
  { name: "Contact", href: "/contact", icon: Phone }
];

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Sync auth state
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

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setAccountMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* 1. Ultra-clean Luxury Utility Ribbon */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-white/10 tracking-wide">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          {/* Left Store Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
              <MapPin className="h-3 w-3 text-[#ED1C24] shrink-0" />
              <span>Bus Stand, Valanchery - 676552</span>
            </span>
            <span className="hidden sm:inline-block text-white/20">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="h-3 w-3 text-slate-400" />
              Open Daily: 8:30 AM – 9:00 PM
            </span>
            <span className="hidden md:inline-block text-white/20">|</span>
            <span className="hidden md:inline-block font-mono text-[10px] text-slate-400">
              GST: 32CUEPP5402M1ZL
            </span>
          </div>

          {/* Right Direct WhatsApp / Phone Assistance */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://wa.me/919746700123"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-slate-200 font-semibold transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]" />
              <span>WhatsApp: 9746 700 123</span>
            </a>
            <span className="text-white/20 hidden xs:inline">|</span>
            <a
              href="tel:+919995037373"
              className="hidden xs:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-[#0056B3]" />
              <span>9995 037 373</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Floating / Sticky Glassmorphism Header */}
      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all"
        ref={navRef}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Brand Logo & Mobile Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 lg:hidden text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <Link href="/" className="group flex items-center transition-transform hover:scale-[1.02]">
                <PKLogo size="md" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : link.highlight
                        ? "text-[#ED1C24] bg-red-50/80 hover:bg-red-100/80 border border-red-200/60"
                        : "text-slate-700 hover:text-[#0056B3] hover:bg-slate-100/70"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : link.highlight ? "text-[#ED1C24]" : "text-slate-500"}`} />
                    <span>{link.name}</span>
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24] animate-ping" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, pens, thesis..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/15 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-[#0056B3] text-white hover:bg-blue-800 transition-colors shadow-2xs"
                aria-label="Search catalog"
              >
                <Search className="h-3 w-3" />
              </button>
            </form>

            {/* Right Action CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* WhatsApp Quick Order Button in Brand Blue */}
              <a
                href="https://wa.me/919746700123?text=Hi%20PK%20Books%2C%20I%20would%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0056B3] hover:bg-blue-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Quick WhatsApp</span>
              </a>

              {/* User Account / Login */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-full border border-slate-200 transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-[#0056B3]" />
                    <span className="truncate max-w-[80px]">{currentUser.name.split(" ")[0]}</span>
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 z-50 text-xs">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                      </div>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Printer className="h-3.5 w-3.5 text-[#0056B3]" /> My Orders &amp; Print Jobs
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0056B3]" /> Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("pk_user");
                          setCurrentUser(null);
                          setAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-left"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>Login</span>
                </Link>
              )}

              {/* Shopping Bag Pill */}
              <Link
                href="/stationery"
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#ED1C24] text-[10px] font-extrabold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Input */}
          <form onSubmit={handleSearch} className="mt-2.5 flex md:hidden relative items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, stationery, printing..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056B3]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-[#0056B3] text-white"
              aria-label="Search"
            >
              <Search className="h-3 w-3" />
            </button>
          </form>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-xl animate-in slide-in-from-top-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="h-4 w-4 text-[#0056B3]" />
                    </div>
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      link.highlight ? "bg-red-50 text-red-600 border border-red-200" : "bg-slate-100 text-slate-600"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/919746700123"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#0056B3] hover:bg-blue-800 text-white text-xs font-bold shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Order (9746 700 123)</span>
              </a>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                <User className="h-4 w-4" />
                <span>My Account / Login</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
