import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ShoppingBag,
  X,
  Star,
  ChevronDown,
  ChevronRight,
  Check,
  Lock,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

const PRODUCTS = [
  {
    id: 1,
    name: "Performance Leggings",
    price: 39,
    original: 59,
    image: BASE_URL + "images/velour-leggings.png",
    rating: 4.9,
    reviews: 248,
    badge: "Best Seller",
    badgeColor: "#ff4d4d",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    description:
      "High-waist, four-way stretch performance fabric. Moisture-wicking, squat-proof, and built for every workout.",
    tag: "new",
  },
  {
    id: 2,
    name: "Sports Bra",
    price: 29,
    original: 45,
    image: BASE_URL + "images/velour-bra.png",
    rating: 4.8,
    reviews: 184,
    badge: "Sale",
    badgeColor: "#ff4d4d",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "White"],
    description:
      "Medium-support sports bra with adjustable straps and removable pads. Perfect for yoga, pilates, and gym sessions.",
    tag: "sale",
  },
  {
    id: 3,
    name: "Training Shorts",
    price: 32,
    original: 48,
    image: BASE_URL + "images/velour-leggings.png",
    rating: 4.7,
    reviews: 120,
    badge: "Sale",
    badgeColor: "#ff4d4d",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    description:
      "Lightweight training shorts with built-in liner and side pockets. Ideal for high-intensity workouts.",
    tag: "sale",
  },
  {
    id: 4,
    name: "Seamless Crop Top",
    price: 34,
    original: 52,
    image: BASE_URL + "images/velour-bra.png",
    rating: 4.8,
    reviews: 97,
    badge: "New",
    badgeColor: "#1a1a1a",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Charcoal", "White"],
    description:
      "Buttery-soft seamless crop top with minimal seams for ultimate comfort and style in and out of the gym.",
    tag: "new",
  },
];

type View =
  | "shop"
  | "cart"
  | "checkout-shipping"
  | "checkout-payment"
  | "confirmation";

function formatCardNumber(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

export default function ShopPage() {
  const [view, setView] = useState<View>("shop");
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[0] | null
  >(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "sale" | "new">("all");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard",
  );
  const [orderNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000),
  );

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const filteredProducts =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === filter);
  const subtotal = cart.reduce(
    (s, id) => s + (PRODUCTS.find((p) => p.id === id)?.price ?? 0),
    0,
  );
  const shippingCost =
    subtotal >= 60 ? 0 : shippingMethod === "express" ? 14.99 : 5.99;
  const total = subtotal + shippingCost;

  function addToCart(id: number) {
    setCart((p) => [...p, id]);
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 2000);
    setSelectedProduct(null);
    setSelectedSize("");
  }

  function removeFromCart(i: number) {
    setCart((p) => p.filter((_, idx) => idx !== i));
  }

  const shippingValid = !!(
    shipping.firstName &&
    shipping.lastName &&
    shipping.email &&
    shipping.address &&
    shipping.city &&
    shipping.state &&
    shipping.zip
  );

  const paymentValid = !!(
    payment.cardNumber.replace(/\s/g, "").length === 16 &&
    payment.expiry.length === 5 &&
    payment.cvv.length >= 3 &&
    payment.nameOnCard
  );

  function placeOrder() {
    setCart([]);
    setView("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── CHECKOUT PAGES (full-screen, no modal) ───────────────────────────────

  if (view === "cart") {
    return (
      <div className="min-h-screen bg-white font-sans">
        <div className="bg-black">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setView("shop")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Back to Shop
              </span>
            </button>
            <h1 className="text-white font-black tracking-[0.2em] uppercase text-lg">
              VELOUR ACTIVE
            </h1>
            <div className="w-20" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Your Cart
            </h2>
            <span className="text-gray-400 text-sm">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-semibold mb-6">
                Your cart is empty
              </p>
              <button
                onClick={() => setView("shop")}
                className="bg-black text-white font-black uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#ff4d4d] transition-all cursor-pointer border-0"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="divide-y divide-gray-100">
                {cart.map((id, i) => {
                  const p = PRODUCTS.find((pr) => pr.id === id)!;
                  return (
                    <div key={i} className="flex gap-4 py-5 items-center">
                      <div className="bg-zinc-50 border border-gray-100 w-20 h-20 flex items-center justify-center flex-shrink-0 p-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black uppercase tracking-wider">
                          {p.name}
                        </p>
                        <p className="text-[#ff4d4d] font-black mt-0.5">
                          ${p.price}
                        </p>
                        <p className="text-gray-400 text-xs line-through">
                          ${p.original}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(i)}
                        className="text-gray-300 hover:text-black cursor-pointer bg-transparent border-0 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-zinc-50 border border-gray-100 p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-gray-400">
                    Calculated at checkout
                  </span>
                </div>
                {subtotal >= 60 ? (
                  <p className="text-xs text-green-600 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> You qualify for free
                    shipping!
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">
                    Add{" "}
                    <span className="font-black text-black">
                      ${(60 - subtotal).toFixed(2)}
                    </span>{" "}
                    more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-black uppercase tracking-wider text-sm">
                    Total
                  </span>
                  <span className="font-black text-xl text-[#ff4d4d]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setView("checkout-shipping");
                  window.scrollTo({ top: 0 });
                }}
                className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-5 hover:bg-[#ff4d4d] transition-all cursor-pointer border-0 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Proceed to Checkout{" "}
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setView("shop")}
                className="w-full text-gray-500 hover:text-black text-sm font-semibold underline cursor-pointer bg-transparent border-0"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "checkout-shipping") {
    return (
      <div className="min-h-screen bg-[#f8f8f8] font-sans">
        <div className="bg-black">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setView("cart")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Back to Cart
              </span>
            </button>
            <h1 className="text-white font-black tracking-[0.2em] uppercase text-lg">
              VELOUR ACTIVE
            </h1>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ff4d4d] flex items-center justify-center">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-black">
                Shipping
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <CreditCard className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                Payment
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <Check className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                Confirm
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <div className="flex-1 space-y-8">
            {/* Contact */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest mb-5">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                      First Name *
                    </label>
                    <input
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping({ ...shipping, firstName: e.target.value })
                      }
                      placeholder="Jane"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                      Last Name *
                    </label>
                    <input
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping({ ...shipping, lastName: e.target.value })
                      }
                      placeholder="Smith"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest mb-5">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                    Street Address *
                  </label>
                  <input
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    placeholder="123 Main St, Apt 4B"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                      City *
                    </label>
                    <input
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                      placeholder="New York"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                      State *
                    </label>
                    <input
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          state: e.target.value.slice(0, 2).toUpperCase(),
                        })
                      }
                      placeholder="NY"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                      ZIP *
                    </label>
                    <input
                      value={shipping.zip}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          zip: e.target.value.replace(/\D/g, "").slice(0, 5),
                        })
                      }
                      placeholder="10001"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping method */}
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest mb-5">
                Shipping Method
              </h2>
              <div className="space-y-3">
                {[
                  {
                    key: "standard",
                    label: "Standard Shipping",
                    sub: "5–7 business days",
                    price: subtotal >= 60 ? "Free" : "$5.99",
                    icon: Truck,
                  },
                  {
                    key: "express",
                    label: "Express Shipping",
                    sub: "2–3 business days",
                    price: "$14.99",
                    icon: Package,
                  },
                ].map(({ key, label, sub, price, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() =>
                      setShippingMethod(key as "standard" | "express")
                    }
                    className={`w-full flex items-center gap-4 px-5 py-4 border-2 text-left transition-all cursor-pointer ${
                      shippingMethod === key
                        ? "border-black bg-black/[0.02]"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${shippingMethod === key ? "bg-black" : "bg-gray-100"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${shippingMethod === key ? "text-white" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                    </div>
                    <span
                      className={`text-base font-black ${price === "Free" ? "text-green-600" : "text-black"}`}
                    >
                      {price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setView("checkout-payment");
                window.scrollTo({ top: 0 });
              }}
              className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-5 hover:bg-[#ff4d4d] transition-all flex items-center justify-center gap-2 border-0 cursor-pointer"
            >
              Continue to Payment <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-100 p-6 sticky top-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-5">
                Order Summary
              </h3>
              <div className="space-y-4 mb-5">
                {cart.map((id, i) => {
                  const p = PRODUCTS.find((pr) => pr.id === id)!;
                  return (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-zinc-50 border border-gray-100 flex items-center justify-center p-1">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-wider truncate">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-gray-400 line-through">
                          ${p.original}
                        </p>
                        <p className="text-sm font-black text-[#ff4d4d]">
                          ${p.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={`font-black ${shippingCost === 0 ? "text-green-600" : ""}`}
                  >
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-100 pt-3 mt-1">
                  <span className="font-black uppercase tracking-wider">
                    Total
                  </span>
                  <span className="font-black text-[#ff4d4d] text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "checkout-payment") {
    return (
      <div className="min-h-screen bg-[#f8f8f8] font-sans">
        <div className="bg-black">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setView("checkout-shipping")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Back
              </span>
            </button>
            <h1 className="text-white font-black tracking-[0.2em] uppercase text-lg">
              VELOUR ACTIVE
            </h1>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                Shipping
              </span>
            </div>
            <div className="flex-1 h-px bg-black" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ff4d4d] flex items-center justify-center">
                <CreditCard className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-black">
                Payment
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <Check className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                Confirm
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {/* Card preview */}
            <div
              className="w-full max-w-sm rounded-xl p-6 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 50%, #ff4d4d 120%)",
                minHeight: "160px",
              }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, #fff 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">
                VELOUR ACTIVE
              </div>
              <div className="font-mono text-xl tracking-[0.2em] mb-6 opacity-90">
                {payment.cardNumber || "•••• •••• •••• ••••"}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] uppercase tracking-wider opacity-50 mb-0.5">
                    Card Holder
                  </p>
                  <p className="text-sm font-bold uppercase tracking-wide">
                    {payment.nameOnCard || "Your Name"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] uppercase tracking-wider opacity-50 mb-0.5">
                    Expires
                  </p>
                  <p className="text-sm font-bold">
                    {payment.expiry || "MM/YY"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest">
                Card Details
              </h2>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                  Card Number *
                </label>
                <input
                  inputMode="numeric"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      cardNumber: formatCardNumber(e.target.value),
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-200 px-4 py-3 text-sm font-mono focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                  Name on Card *
                </label>
                <input
                  value={payment.nameOnCard}
                  onChange={(e) =>
                    setPayment({ ...payment, nameOnCard: e.target.value })
                  }
                  placeholder="Jane Smith"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                    Expiry Date *
                  </label>
                  <input
                    inputMode="numeric"
                    value={payment.expiry}
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    placeholder="MM/YY"
                    className="w-full border border-gray-200 px-4 py-3 text-sm font-mono focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1.5">
                    CVV *
                  </label>
                  <input
                    inputMode="numeric"
                    value={payment.cvv}
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    placeholder="123"
                    className="w-full border border-gray-200 px-4 py-3 text-sm font-mono focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 flex items-center gap-1.5 pt-1">
                <Lock className="w-3 h-3" /> 256-bit SSL encryption. Demo only —
                no real charges made.
              </p>
            </div>

            <button
              onClick={() => paymentValid && placeOrder()}
              className={`w-full font-black uppercase tracking-widest text-sm py-5 transition-all flex items-center justify-center gap-2 border-0 ${
                paymentValid
                  ? "bg-black text-white hover:bg-[#ff4d4d] cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Lock className="w-4 h-4" /> Place Order — ${total.toFixed(2)}
            </button>
            {!paymentValid && (
              <p className="text-center text-xs text-gray-400">
                Fill in all payment details to place your order.
              </p>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-100 p-6 sticky top-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                Order Summary
              </h3>
              <div className="bg-zinc-50 border border-gray-100 p-4 mb-4 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">
                    Shipping to
                  </span>
                  <span className="font-black text-right">
                    {shipping.city}, {shipping.state} {shipping.zip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Method</span>
                  <span className="font-black capitalize">
                    {shippingMethod}
                  </span>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {cart.map((id, i) => {
                  const p = PRODUCTS.find((pr) => pr.id === id)!;
                  return (
                    <div key={i} className="flex gap-3 items-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-contain bg-zinc-50 p-1 mix-blend-multiply border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider truncate">
                          {p.name}
                        </p>
                        <p className="text-xs font-black text-[#ff4d4d]">
                          ${p.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={`font-black ${shippingCost === 0 ? "text-green-600" : ""}`}
                  >
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
                  <span className="font-black uppercase tracking-wider">
                    Total
                  </span>
                  <span className="font-black text-[#ff4d4d] text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "confirmation") {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-start">
        <div className="w-full bg-black">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-center">
            <h1 className="text-white font-black tracking-[0.2em] uppercase text-lg">
              VELOUR ACTIVE
            </h1>
          </div>
        </div>

        <div className="max-w-xl w-full mx-auto px-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 mb-10">
            Thanks,{" "}
            <span className="font-black text-black">{shipping.firstName}</span>!
            Your order is being prepared and will ship soon.
          </p>

          <div className="bg-zinc-50 border border-gray-100 p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                Order Number
              </span>
              <span className="font-black text-[#ff4d4d] text-base">
                #{orderNumber}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-semibold">Email</span>
              <span className="font-black">{shipping.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-semibold">Ship to</span>
              <span className="font-black text-right">
                {shipping.address}, {shipping.city}, {shipping.state}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-semibold">Method</span>
              <span className="font-black capitalize">
                {shippingMethod} Shipping
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-semibold">
                Estimated Delivery
              </span>
              <span className="font-black">
                {shippingMethod === "express"
                  ? "2–3 business days"
                  : "5–7 business days"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-zinc-50 border border-gray-100 p-5 text-left mb-10">
            <Package className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              A shipping confirmation with tracking info will be sent to{" "}
              <span className="font-black text-black">{shipping.email}</span>.
              Check your inbox!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setView("shop");
                setShipping({
                  firstName: "",
                  lastName: "",
                  email: "",
                  address: "",
                  city: "",
                  state: "",
                  zip: "",
                });
                setPayment({
                  cardNumber: "",
                  expiry: "",
                  cvv: "",
                  nameOnCard: "",
                });
                setShippingMethod("standard");
                window.scrollTo({ top: 0 });
              }}
              className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-5 hover:bg-[#ff4d4d] transition-all cursor-pointer border-0"
            >
              Continue Shopping
            </button>
            <Link
              href="/"
              className="w-full block text-center text-gray-500 hover:text-black text-sm font-semibold underline"
              style={{ textDecoration: "underline" }}
            >
              Back to Email
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── DEFAULT: SHOP VIEW ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans">
      {/* TOP NAV */}
      <div className="bg-black sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            style={{ textDecoration: "none" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-xs uppercase tracking-wider font-semibold">
              Back to Email
            </span>
          </Link>
          <h1 className="text-white font-black tracking-[0.2em] uppercase text-lg">
            VELOUR ACTIVE
          </h1>
          <button
            onClick={() => setView("cart")}
            className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff4d4d] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div
        className="py-14 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <span className="inline-block bg-[#ff4d4d] text-white text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 mb-4">
          Summer Sale — Up to 30% Off
        </span>
        <h2 className="text-white text-4xl font-black uppercase tracking-tight mb-2">
          Shop the Sale
        </h2>
        <p className="text-zinc-400 text-sm">
          Limited stock. Grab your size before it's gone.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-gray-100 sticky top-[57px] z-30">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500">
            Filter:
          </span>
          {(["all", "sale", "new"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 transition-all cursor-pointer border-0 ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "All Products" : f}
            </button>
          ))}
          <div className="ml-auto text-xs text-gray-400 font-semibold">
            {filteredProducts.length} items
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer bg-white"
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize("");
              }}
            >
              <div className="relative bg-zinc-50 aspect-[3/4] overflow-hidden flex items-center justify-center p-4 border border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-2 left-2 text-white text-[9px] font-black uppercase px-2 py-1 tracking-wider"
                  style={{ background: product.badgeColor }}
                >
                  {product.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2">
                    Quick View
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-black uppercase tracking-wider mb-1 group-hover:text-[#ff4d4d] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-[9px]">
                    ({product.reviews})
                  </span>
                </div>
                <p className="text-sm">
                  <span className="text-gray-400 line-through mr-1.5 text-xs">
                    ${product.original}
                  </span>
                  <span className="text-[#ff4d4d] font-black">
                    ${product.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setView("cart")}
              className="bg-black text-white font-black uppercase tracking-widest text-sm px-10 py-4 hover:bg-[#ff4d4d] transition-all cursor-pointer border-0 flex items-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              View Cart ({cart.length}) — ${subtotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>

      {/* QUICK-VIEW MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className="bg-white w-full sm:max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                Quick View
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-black transition-colors cursor-pointer bg-transparent border-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="bg-zinc-50 sm:w-52 aspect-square sm:aspect-auto flex items-center justify-center p-6 flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="p-6 flex-1">
                <span
                  className="text-white text-[9px] font-black uppercase px-2 py-1 tracking-wider mb-3 inline-block"
                  style={{ background: selectedProduct.badgeColor }}
                >
                  {selectedProduct.badge}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">
                    {selectedProduct.reviews} reviews
                  </span>
                </div>
                <p className="mb-4">
                  <span className="text-gray-400 line-through mr-2 text-sm">
                    ${selectedProduct.original}
                  </span>
                  <span className="text-[#ff4d4d] font-black text-2xl">
                    ${selectedProduct.price}
                  </span>
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mb-5">
                  {selectedProduct.description}
                </p>
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Select Size
                    </span>
                    <button className="text-[10px] text-gray-400 underline flex items-center gap-1 cursor-pointer bg-transparent border-0">
                      Size Guide <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs font-black border transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!selectedSize)
                      setSelectedSize(selectedProduct.sizes[0]);
                    addToCart(selectedProduct.id);
                  }}
                  className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-4 hover:bg-[#ff4d4d] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {addedToCart && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm font-bold px-6 py-3 z-50 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#ff4d4d]" />
          Added to cart!
        </div>
      )}
    </div>
  );
}
