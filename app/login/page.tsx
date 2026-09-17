"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "admin">("login");
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Admin login states
  const [adminUser, setAdminUser] = useState("admin@pkbooks.in");
  const [adminPass, setAdminPass] = useState("admin123");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: fullName || (phone ? `Customer (${phone.slice(-4)})` : email.split("@")[0]),
        phone: phone || "9746700123",
        email: email || "customer@pkbooks.in",
        role: "customer"
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("pk_user", JSON.stringify(user));
      }
      showToast(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 800);
  };

  const handleQuickDemoCustomer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = {
        name: "Saneen (Student)",
        phone: "9746700123",
        email: "saneen@pkbooks.in",
        role: "customer"
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("pk_user", JSON.stringify(demoUser));
      }
      showToast("Logged in as Demo Customer!");
      setTimeout(() => {
        router.push("/");
      }, 800);
    }, 500);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const adminData = {
        name: "PK Books Store Manager",
        email: adminUser,
        role: "admin"
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("pk_user", JSON.stringify(adminData));
      }
      showToast("Staff authentication verified! Opening Admin Dashboard...");
      setTimeout(() => {
        router.push("/admin");
      }, 900);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-3.5 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl rounded-[32px] overflow-hidden bg-white shadow-2xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Store Branding & Perks */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2356] via-[#08183c] to-[#040e24] p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background ambient decorative shapes */}
            <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs w-fit">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>PK Books &amp; Print Portal</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  One Account for<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200">
                    Print, Books &amp; Gifts
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-sm">
                  Track your 15-minute digital print orders, manage school stationery orders, and access exclusive Valanchery student discounts.
                </p>
              </div>

              {/* Portal Highlights */}
              <div className="space-y-3 pt-3 border-t border-white/15">
                <div className="flex items-center gap-3 text-xs text-blue-100/90 font-medium">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-cyan-300 grid place-items-center shrink-0 border border-blue-400/20">
                    <Printer className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">15-Min Express Print Queue</span>
                    <span className="text-[11px] text-blue-200/80">Track order progress &amp; counter pickup</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-blue-100/90 font-medium">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 grid place-items-center shrink-0 border border-emerald-400/20">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Instant WhatsApp Confirmations</span>
                    <span className="text-[11px] text-blue-200/80">Direct dispatch alerts &amp; receipts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-blue-100/90 font-medium">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 grid place-items-center shrink-0 border border-amber-400/20">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Verified Valanchery Counter</span>
                    <span className="text-[11px] text-blue-200/80">Neetukkatil Complex, Near Bus Stand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Support Badge */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-xs text-blue-200/70 flex items-center justify-between">
              <span>Need help? Call: <strong>9746 700 123</strong></span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                Live Support
              </span>
            </div>
          </div>

          {/* Right Column: Portal Forms & Switcher */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Portal Mode Switcher */}
              <div className="p-1 bg-slate-100 rounded-2xl flex items-center gap-1 mb-6 border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "login"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <User className="h-3.5 w-3.5 text-[#0056B3]" />
                  <span>Customer Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "register"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Register</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("admin")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "admin"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Staff / Admin</span>
                </button>
              </div>

              {/* 1. CUSTOMER SIGN IN TAB */}
              {activeTab === "login" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Customer Portal
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Access your print jobs, books orders, and invoices
                      </p>
                    </div>

                    {/* Quick Demo Login Pill */}
                    <button
                      type="button"
                      onClick={handleQuickDemoCustomer}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0056B3] hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors"
                      title="Click to automatically fill credentials & test login"
                    >
                      <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span>One-Click Demo</span>
                    </button>
                  </div>

                  {/* Phone vs Email Toggle */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={loginMethod === "phone"}
                        onChange={() => setLoginMethod("phone")}
                        className="text-[#0056B3]"
                      />
                      <span>WhatsApp Phone (Fast OTP)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={loginMethod === "email"}
                        onChange={() => setLoginMethod("email")}
                        className="text-[#0056B3]"
                      />
                      <span>Email &amp; Password</span>
                    </label>
                  </div>

                  <form onSubmit={handleCustomerLogin} className="space-y-3.5 pt-1">
                    {loginMethod === "phone" ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          WhatsApp Mobile Number
                        </label>
                        <div className="flex h-11">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-600">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            placeholder="Enter 10-digit number (e.g. 9746 700 123)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-11 w-full rounded-r-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-bold text-slate-700">
                              Password
                            </label>
                            <a href="#" className="text-[11px] font-bold text-[#0056B3] hover:underline">
                              Forgot?
                            </a>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#0056B3] hover:bg-[#00438F] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isLoading ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Customer Account</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* 2. REGISTRATION TAB */}
              {activeTab === "register" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Create PK Books Account
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Get student discounts, 15-minute printing queue &amp; order tracking
                    </p>
                  </div>

                  <form onSubmit={handleCustomerLogin} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Saneen PK"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Phone Number
                      </label>
                      <div className="flex h-11">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-600">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-11 w-full rounded-r-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0056B3]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 mt-2"
                    >
                      {isLoading ? (
                        <span>Creating Account...</span>
                      ) : (
                        <>
                          <span>Complete Registration</span>
                          <Check className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* 3. STAFF / ADMIN LOGIN TAB */}
              {activeTab === "admin" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 mb-1">
                        <Lock className="h-3 w-3 text-amber-600" />
                        <span>Store Operators Only</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Staff &amp; Admin Portal
                      </h2>
                    </div>

                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                      Valanchery Counter
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Sign in to access the PK Books live counter dashboard, digital printing queue, inventory manager, and WhatsApp receipts.
                  </p>

                  <form onSubmit={handleAdminLogin} className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Operator Email / Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={adminUser}
                          onChange={(e) => setAdminUser(e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Security Passcode
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={adminPass}
                          onChange={(e) => setAdminPass(e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isLoading ? (
                        <span>Authenticating Operator...</span>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-amber-400" />
                          <span>Open Staff Dashboard &rarr;</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Quick Switch Footer */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link href="/" className="font-semibold text-slate-700 hover:text-[#0056B3]">
                &larr; Back to PK Books Store
              </Link>
              <Link href="/books" className="font-semibold text-[#0056B3] hover:underline">
                Browse Books Catalog &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
