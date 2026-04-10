import React from "react";
import { Instagram } from "lucide-react";

export function VelourActiveEmail() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8 px-4 font-sans text-gray-900">
      <div className="mx-auto max-w-[600px] bg-white overflow-hidden shadow-sm">
        
        {/* HEADER */}
        <div className="bg-black py-6 text-center">
          <h1 className="text-white text-2xl font-bold tracking-[0.2em] m-0">
            VELOUR ACTIVE
          </h1>
        </div>

        {/* HERO SECTION */}
        <div className="relative">
          <img 
            src="/__mockup/images/velour-hero.png" 
            alt="Woman in activewear" 
            className="w-full h-auto block object-cover aspect-video"
          />
          <div className="p-10 text-center bg-zinc-50 border-b border-gray-100">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-3 text-black">
              Up to 30% Off Activewear
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
              Limited time only. Upgrade your workout.
            </p>
            <a 
              href="#" 
              className="inline-block bg-black text-white font-bold tracking-wider uppercase py-4 px-10 transition-colors duration-300 hover:bg-[#ff4d4d]"
              style={{ textDecoration: 'none' }}
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="px-8 py-12">
          <div className="grid grid-cols-2 gap-6">
            
            {/* Product 1 */}
            <div className="text-center group">
              <div className="mb-4 bg-gray-50 aspect-[3/4] overflow-hidden relative border border-gray-100 p-4 flex items-center justify-center">
                <img 
                  src="/__mockup/images/velour-leggings.png" 
                  alt="Performance Leggings" 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Performance Leggings</h3>
              <p className="text-sm mb-4">
                <span className="text-gray-400 line-through mr-2">$59</span>
                <span className="text-[#ff4d4d] font-bold">$39</span>
              </p>
              <a 
                href="#" 
                className="inline-block border border-black text-black font-semibold uppercase text-xs py-2.5 px-6 transition-all duration-300 hover:bg-black hover:text-white"
                style={{ textDecoration: 'none' }}
              >
                Shop
              </a>
            </div>

            {/* Product 2 */}
            <div className="text-center group">
              <div className="mb-4 bg-gray-50 aspect-[3/4] overflow-hidden relative border border-gray-100 p-4 flex items-center justify-center">
                <img 
                  src="/__mockup/images/velour-bra.png" 
                  alt="Sports Bra" 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Sports Bra</h3>
              <p className="text-sm mb-4">
                <span className="text-gray-400 line-through mr-2">$45</span>
                <span className="text-[#ff4d4d] font-bold">$29</span>
              </p>
              <a 
                href="#" 
                className="inline-block border border-black text-black font-semibold uppercase text-xs py-2.5 px-6 transition-all duration-300 hover:bg-black hover:text-white"
                style={{ textDecoration: 'none' }}
              >
                Shop
              </a>
            </div>

          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="bg-zinc-100 py-12 px-8 text-center border-y border-zinc-200">
          <div className="flex justify-center gap-1 mb-4 text-[#FFD700]">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <h4 className="font-bold text-lg mb-4 tracking-wide uppercase text-black">Loved by 10,000+ customers</h4>
          <blockquote className="text-gray-600 italic text-base max-w-sm mx-auto leading-relaxed">
            "Best activewear I've ever owned. I live in these leggings."
            <footer className="not-italic font-semibold text-black text-sm mt-3 uppercase tracking-wider">— Sarah M.</footer>
          </blockquote>
        </div>

        {/* URGENCY SECTION */}
        <div className="py-16 px-8 text-center bg-white">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">Selling fast.</h2>
          <p className="text-gray-600 mb-8">Don't miss your size.</p>
          <a 
            href="#" 
            className="inline-block bg-[#ff4d4d] text-white font-bold tracking-wider uppercase py-4 px-10 transition-colors duration-300 hover:bg-black"
            style={{ textDecoration: 'none' }}
          >
            Shop The Sale
          </a>
        </div>

        {/* FOOTER */}
        <div className="bg-zinc-900 py-10 px-8 text-center text-zinc-400">
          <div className="flex justify-center mb-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-xs mb-4 max-w-xs mx-auto leading-relaxed">
            You're receiving this because you signed up for Velour Active updates.
          </p>
          <a 
            href="#" 
            className="text-xs text-zinc-500 underline hover:text-zinc-300 transition-colors"
          >
            Unsubscribe
          </a>
        </div>

      </div>
    </div>
  );
}

export default VelourActiveEmail;