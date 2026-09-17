import React from "react";
import Link from "next/link";
import PKLogo from "@/components/PKLogo";

export default function Footer() {
  return (
    <footer id="about" className="mt-auto border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <PKLogo colorMode="white" size="md" />
            <p className="mt-4 text-xs leading-6 text-slate-400">
              A leading bookstore, academic textbook supplier, school stationery provider, and high-speed digital printing center in Valanchery.
            </p>
            <div className="mt-4 inline-block rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 font-mono">
              GSTIN: 32CUEPP5402M1ZL
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Store Location</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>PK Books</strong><br />
              Neetukkatil Complex<br />
              Near Bus Stand, Valanchery<br />
              Malappuram, Kerala - 676552
            </p>
            <p className="text-xs text-slate-400 mt-2">
              ⏰ Daily: 8:30 AM – 9:00 PM
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Contact & Orders</h5>
            <p className="text-xs text-slate-300 leading-relaxed space-y-1.5">
              <span>Phone: <a href="tel:+919746700123" className="hover:text-blue-300 underline font-semibold">9746 700 123</a></span><br />
              <span>Phone: <a href="tel:+919995037373" className="hover:text-blue-300 underline font-semibold">9995 037 373</a></span><br />
              <span>WhatsApp: <a href="https://wa.me/919746700123" target="_blank" rel="noreferrer" className="text-emerald-400 font-semibold hover:underline">9746 700 123 (Quick Print)</a></span>
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Quick Navigation</h5>
            <ul className="text-xs space-y-2 text-slate-300">
              <li>
                <Link href="/printing" className="hover:text-white transition-colors">• Instant Printing Counter</Link>
              </li>
              <li>
                <Link href="/custom-products" className="hover:text-white transition-colors">• Custom Notebooks & Gifts</Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-white transition-colors">• School & Office Stationery</Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-white transition-colors">• Academic & Literature Books</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PK Books, Valanchery. All rights reserved.</p>
          <p className="text-slate-400">Books · Stationery · Digital Printing</p>
        </div>
      </div>
    </footer>
  );
}
