import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import svgPaths from "../../../imports/svg-qlugq798q6";

const SHOP_CATEGORIES = ["Clothing", "Eyewear", "Shoes", "Accessories"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeCat = params.get("cat");

  const isShop = location.pathname === "/shop";
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  const base =
    "text-sm font-medium border-b-2 pb-1 transition";
  const underline = "border-[#0f00ff] text-black";
  const activeText = "text-black border-transparent";
  const inactive =
    "text-gray-500 hover:text-[#0f00ff] border-transparent";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-3">
            <div className="bg-[#0f00ff] text-white px-2 py-1 rounded font-bold text-sm tracking-widest">
              KTM
            </div>
            <span className="font-bold text-xl tracking-wide uppercase">
              Wears
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${base} ${isHome ? underline : inactive}`}>
              Home
            </Link>

            {/* SHOP ALL */}
            <Link
              to="/shop"
              className={`${base} ${
                isShop && !activeCat
                  ? underline
                  : isShop
                  ? activeText
                  : inactive
              }`}
            >
              Shop All
            </Link>

            {/* CATEGORY LINKS */}
            {SHOP_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/shop?cat=${cat}`}
                className={`${base} ${
                  isShop
                    ? activeCat === cat
                      ? underline
                      : activeText
                    : inactive
                }`}
              >
                {cat}
              </Link>
            ))}

            <Link
              to="/contact"
              className={`${base} ${isContact ? underline : inactive}`}
            >
              Contact
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/9779741739698"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d={svgPaths.pb543c00}
                  stroke="currentColor"
                  strokeWidth="1.33"
                />
              </svg>
              <span className="text-sm font-medium">Inquire</span>
            </a>

            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 px-5 py-2 bg-[#0f00ff] text-white rounded-lg"
            >
              <ShoppingBag size={16} />
              <span className="text-sm font-medium">Shop Now</span>
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
