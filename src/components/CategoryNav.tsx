import React from 'react';
import { Search, X, Star, Coins } from 'lucide-react';
import { CATEGORIES } from '../data/initialMenu';
import { CategoryId } from '../types/menu';
import { useCart } from '../context/CartContext';

interface CategoryNavProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onlyChefSelection: boolean;
  onToggleChefSelection: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onlyChefSelection,
  onToggleChefSelection,
}) => {
  const { showCurrencyDual, setShowCurrencyDual } = useCart();

  return (
    <div className="sticky top-20 z-30 bg-[#0d121c]/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Top bar with Search & Secondary Utility Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por marmita, pão, brownie, bolo..."
              className="w-full pl-10 pr-9 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons (Chef selection & Dual Currency) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onToggleChefSelection}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                onlyChefSelection
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                  : 'bg-[#141b27] text-slate-400 border border-slate-700/80 hover:text-slate-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyChefSelection ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <span>Seleção do Chef</span>
            </button>

            <button
              onClick={() => setShowCurrencyDual(!showCurrencyDual)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                showCurrencyDual
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                  : 'bg-[#141b27] text-slate-400 border border-slate-700/80 hover:text-slate-200'
              }`}
              title="Mostrar valor aproximado em Reais (R$)"
            >
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showCurrencyDual ? 'Moeda: ₲ + R$' : 'Ver em R$'}</span>
            </button>
          </div>

        </div>

        {/* Scrollable Category Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'bg-[#141b27] text-slate-300 hover:bg-[#1a2333] hover:text-white border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
