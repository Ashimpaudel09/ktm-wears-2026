import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onSearch: (term: string) => void;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, debounceMs = 500 }) => {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(term);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [term, onSearch, debounceMs]);

  return (
    <div className="relative group">
      {/* Glow effect on focus */}
      <div className={`
        absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-lg opacity-0 
        transition-all duration-500 group-hover:opacity-20
        ${isFocused ? 'opacity-30' : ''}
      `}></div>
      
      {/* Main search container */}
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
          <svg 
            className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-emerald-400' : 'text-slate-500'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search for products..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-16 pl-16 pr-6 
            bg-slate-900/50 backdrop-blur-xl
            border-2 rounded-2xl
            text-slate-200 placeholder-slate-500
            font-medium tracking-wide
            transition-all duration-300
            focus:outline-none
            ${isFocused 
              ? 'border-emerald-500/50 bg-slate-900/70 shadow-xl shadow-emerald-500/10' 
              : 'border-slate-700/50 hover:border-slate-600/50'
            }
          `}
        />

        {/* Clear button */}
        {term && (
          <button
            onClick={() => setTerm("")}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 flex items-center justify-center
                       rounded-full bg-slate-800/80 hover:bg-slate-700
                       text-slate-400 hover:text-slate-200
                       transition-all duration-200
                       group/clear"
          >
            <svg 
              className="w-4 h-4 transition-transform group-hover/clear:rotate-90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Typing indicator */}
        {term && (
          <div className="absolute -bottom-7 left-6 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-xs text-slate-500 font-medium">Searching...</span>
          </div>
        )}
      </div>

      {/* Decorative corner accents */}
      <div className={`
        absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-2xl
        transition-all duration-300
        ${isFocused ? 'border-emerald-500/50' : 'border-transparent'}
      `}></div>
      <div className={`
        absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-2xl
        transition-all duration-300
        ${isFocused ? 'border-emerald-500/50' : 'border-transparent'}
      `}></div>
    </div>
  );
};

export default SearchInput;