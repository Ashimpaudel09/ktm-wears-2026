import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router";
import svgPaths from "../../../imports/svg-qlugq798q6";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/" className="text-black font-medium text-sm border-b-2 border-[#0f00ff]">
              Home
            </Link>
            <Link to="/shop" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Shop All
            </Link>
            <Link to="/clothing" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Clothing
            </Link>
            <Link to="/eyewear" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Eyewear
            </Link>
            <Link to="/shoes" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Shoes
            </Link>
            <Link to="/accessories" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Accessories
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-[#0f00ff] font-medium text-sm">
              Contact
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={svgPaths.pb543c00}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33"
                />
              </svg>
              <span className="text-sm font-medium">Inquire</span>
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 px-5 py-2 bg-[#0f00ff] text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              <ShoppingBag size={16} />
              <span className="text-sm font-medium">Shop Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#0f00ff]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-[#0f00ff] bg-blue-50 rounded-md">
              Home
            </Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Shop All
            </Link>
            <Link to="/clothing" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Clothing
            </Link>
            <Link to="/eyewear" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Eyewear
            </Link>
            <Link to="/shoes" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Shoes
            </Link>
            <Link to="/accessories" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Accessories
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-600 hover:text-[#0f00ff]">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
