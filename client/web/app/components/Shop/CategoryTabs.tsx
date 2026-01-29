import React from "react";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, active, onSelect }) => {
  return (
    <div className="relative">
      {/* Gradient overflow indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide scroll-smooth">
        {["All", ...categories].map((cat, idx) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`
                relative px-6 py-3 rounded-xl text-sm font-bold tracking-wide whitespace-nowrap
                transition-all duration-300 ease-out group
                ${isActive 
                  ? "text-slate-950 shadow-lg shadow-emerald-500/50 scale-105" 
                  : "text-slate-300 hover:text-emerald-400 hover:scale-105"
                }
              `}
              style={{
                animationDelay: `${idx * 50}ms`,
              }}
            >
              {/* Active state background */}
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur-md opacity-50"></div>
                </>
              )}
              
              {/* Inactive state background */}
              {!isActive && (
                <>
                  <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 group-hover:border-emerald-500/50 transition-colors"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700/0 via-slate-700/0 to-emerald-500/0 group-hover:to-emerald-500/10 rounded-xl transition-all"></div>
                </>
              )}
              
              {/* Text */}
              <span className="relative z-10 uppercase text-xs font-black tracking-widest">
                {cat}
              </span>
              
              {/* Hover glow effect */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-emerald-400/5 rounded-xl"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryTabs;