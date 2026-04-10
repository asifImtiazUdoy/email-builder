import { Link } from "wouter";
import { Instagram, Twitter, Facebook, ChevronRight, Zap } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

export default function VelourActiveEmail() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans text-gray-900">
      <div className="mx-auto max-w-[620px] bg-white overflow-hidden shadow-lg">
        {/* ANNOUNCEMENT BAR */}
        <div className="bg-[#ff4d4d] py-2.5 text-center">
          <p className="text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 fill-white" />
            Free shipping on orders over $60 — ends tonight
            <Zap className="w-3 h-3 fill-white" />
          </p>
        </div>

        {/* HEADER */}
        <div className="bg-black py-5 px-8 flex items-center justify-between">
          <h1 className="text-white text-xl font-black tracking-[0.25em] uppercase">
            VELOUR ACTIVE
          </h1>
          <nav className="hidden sm:flex gap-6">
            {["New", "Sale", "Collections"].map((item) => (
              <Link
                key={item}
                href="/shop"
                className="text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* HERO — image with overlaid text */}
        <div className="relative overflow-hidden">
          <img
            src={BASE_URL + "images/velour-hero.png"}
            alt="Athletic woman in Velour Active gear"
            className="w-full block object-cover"
            style={{ maxHeight: 420 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <span className="inline-block bg-[#ff4d4d] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-4">
              Limited Time
            </span>
            <h2 className="text-white text-4xl font-black uppercase leading-none tracking-tight mb-3 drop-shadow-lg">
              Up to 30% Off
              <br />
              Activewear
            </h2>
            <p className="text-zinc-300 text-base mb-6">
              Upgrade your workout. Don't wait.
            </p>
            <Link
              href="/shop"
              className="bg-white text-black font-black uppercase tracking-widest text-sm py-4 px-12 hover:bg-[#ff4d4d] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
              style={{ textDecoration: "none" }}
            >
              Shop Now
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* DIVIDER WITH LABEL */}
        <div className="flex items-center px-8 py-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Featured Products
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* PRODUCT GRID */}
        <div className="px-8 pb-10">
          <div className="grid grid-cols-2 gap-5">
            {/* Product 1 */}
            <Link
              href="/shop"
              className="group block"
              style={{ textDecoration: "none" }}
            >
              <div className="relative bg-zinc-50 aspect-[3/4] overflow-hidden border border-gray-100 mb-3 flex items-center justify-center p-4">
                <img
                  src={BASE_URL + "images/velour-leggings.png"}
                  alt="Performance Leggings"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#ff4d4d] text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                  Save 34%
                </span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-wider mb-1 text-black group-hover:text-[#ff4d4d] transition-colors">
                Performance Leggings
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[#FFD700] text-xs">★★★★★</span>
                <span className="text-gray-400 text-[10px]">(248)</span>
              </div>
              <p className="text-sm">
                <span className="text-gray-400 line-through mr-2 text-xs">
                  $59
                </span>
                <span className="text-[#ff4d4d] font-black">$39</span>
              </p>
            </Link>

            {/* Product 2 */}
            <Link
              href="/shop"
              className="group block"
              style={{ textDecoration: "none" }}
            >
              <div className="relative bg-zinc-50 aspect-[3/4] overflow-hidden border border-gray-100 mb-3 flex items-center justify-center p-4">
                <img
                  src={BASE_URL + "images/velour-bra.png"}
                  alt="Sports Bra"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#ff4d4d] text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                  Save 36%
                </span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-wider mb-1 text-black group-hover:text-[#ff4d4d] transition-colors">
                Sports Bra
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[#FFD700] text-xs">★★★★★</span>
                <span className="text-gray-400 text-[10px]">(184)</span>
              </div>
              <p className="text-sm">
                <span className="text-gray-400 line-through mr-2 text-xs">
                  $45
                </span>
                <span className="text-[#ff4d4d] font-black">$29</span>
              </p>
            </Link>
          </div>

          {/* View All CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="block w-full border-2 border-black text-black font-black uppercase tracking-widest text-sm py-4 hover:bg-black hover:text-white transition-all duration-300 text-center"
              style={{ textDecoration: "none" }}
            >
              View All Sale Items
            </Link>
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div
          className="py-12 px-8 text-center"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          <div className="text-[#FFD700] text-2xl mb-3 tracking-widest">
            ★★★★★
          </div>
          <h4 className="font-black text-lg mb-2 tracking-widest uppercase text-white">
            10,000+ Happy Customers
          </h4>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-6">
            Verified Reviews
          </p>
          <blockquote className="text-zinc-300 italic text-base max-w-xs mx-auto leading-relaxed border-l-2 border-[#ff4d4d] pl-4 text-left">
            "Best activewear I've ever owned. I live in these leggings — wear
            them to the gym, to brunch, everywhere."
            <footer className="not-italic font-black text-white text-xs mt-3 uppercase tracking-widest">
              — Sarah M. · Verified Buyer
            </footer>
          </blockquote>
        </div>

        {/* URGENCY SECTION */}
        <div
          className="py-14 px-8 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ff4d4d 0%, #cc2200 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "12px 12px",
            }}
          />
          <p className="text-white/80 text-xs font-black uppercase tracking-[0.3em] mb-2">
            ⚡ Almost gone
          </p>
          <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-2">
            Don't Miss
            <br />
            Your Size.
          </h2>
          <p className="text-white/80 text-sm mb-8">
            Stock is running out. Grab yours now.
          </p>
          <Link
            href="/shop"
            className="bg-white text-[#cc2200] font-black uppercase tracking-widest text-sm py-4 px-12 hover:bg-black hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            Shop The Sale
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* FOOTER */}
        <div className="bg-black py-10 px-8 text-center text-zinc-500">
          <div className="text-white font-black tracking-[0.25em] uppercase text-sm mb-6">
            VELOUR ACTIVE
          </div>
          <div className="flex justify-center gap-5 mb-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-6 mb-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-zinc-600 hover:text-zinc-300 text-[10px] uppercase tracking-wider transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[10px] max-w-xs mx-auto leading-relaxed mb-4">
            You're receiving this email because you signed up for Velour Active
            updates. 123 Fitness Ave, New York, NY 10001
          </p>
          <a
            href="#"
            className="text-[10px] text-zinc-600 underline hover:text-zinc-400 transition-colors"
          >
            Unsubscribe
          </a>
        </div>
      </div>
    </div>
  );
}
