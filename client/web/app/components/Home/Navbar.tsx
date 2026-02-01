import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-qlugq798q6";
import { useCategoryStore } from "@/lib/store/categoryStore";

/* -------------------------------------------------------------------------- */
/*                                  NAVBAR                                     */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeCat = params.get("cat") ?? null;

  const isShop = location.pathname === "/shop";
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  const closeMenu = () => setIsOpen(false);

  // Fetch categories from store
  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // compute top 4 categories (use slug if provided, fallback to slugified name)
  const topCategories = useMemo(() => {
    return categories.slice(0, 4).map((c) => {
      const slug = c.slug ?? c.name?.toLowerCase().replace(/\s+/g, "-");
      return { label: c.name, slug };
    });
  }, [categories]);

  const base = "text-sm font-medium border-b-2 pb-1 transition";
  const underline = "border-[#0f00ff] text-black";
  const activeText = "text-black border-transparent";
  const inactive = "text-gray-500 hover:text-[#0f00ff] border-transparent";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0 flex items-center gap-3"
          >
            <div className="bg-[#0f00ff] text-white px-2 py-1 rounded font-bold text-sm tracking-widest">
              KTM
            </div>
            <span className="font-bold text-xl tracking-wide uppercase">
              Wears
            </span>
          </Link>

          {/* ======================= DESKTOP ======================= */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${base} ${isHome ? underline : inactive}`}>
              Home
            </Link>

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

            {topCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?cat=${cat.slug}`}
                className={`${base} ${
                  isShop
                    ? activeCat === cat.slug
                      ? underline
                      : activeText
                    : inactive
                }`}
              >
                {cat.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className={`${base} ${isContact ? underline : inactive}`}
            >
              Contact
            </Link>
          </div>

          {/* DESKTOP RIGHT */}
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

          {/* ======================= MOBILE TOGGLE ======================= */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================= MOBILE MENU ======================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <Link
                to="/"
                onClick={closeMenu}
                className={`font-medium ${isHome ? "text-[#0f00ff]" : "text-gray-700"}`}
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={closeMenu}
                className={`font-medium ${isShop && !activeCat ? "text-[#0f00ff]" : "text-gray-700"}`}
              >
                Shop All
              </Link>

              <div className="flex flex-col gap-3 pl-2">
                {topCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/shop?cat=${cat.slug}`}
                    onClick={closeMenu}
                    className={`text-sm ${
                      activeCat === cat.slug
                        ? "text-[#0f00ff] font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/contact"
                onClick={closeMenu}
                className={`font-medium ${isContact ? "text-[#0f00ff]" : "text-gray-700"}`}
              >
                Contact
              </Link>

              <button
                onClick={() => {
                  closeMenu();
                  navigate("/shop");
                }}
                className="mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-[#0f00ff] text-white rounded-lg"
              >
                <ShoppingBag size={16} />
                <span className="text-sm font-medium">Shop Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
