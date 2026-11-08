import React from 'react';
import { Plus, Minus, Check, Star, AlertCircle, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { formatGuarani, formatReal } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: MenuItem;
  onSelect: (product: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { cart, addToCart, updateQuantity, showCurrencyDual } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  // Find all items of this product in the cart
  const itemsInCart = cart.filter((item) => item.product.id === product.id);
  const totalQuantityInCart = itemsInCart.reduce((sum, item) => sum + item.quantity, 0);

  // Simple item with no options: can be incremented/decremented directly
  const hasOptions = product.optionGroups && product.optionGroups.length > 0;
  const singleCartItem = !hasOptions && itemsInCart.length > 0 ? itemsInCart[0] : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If product has options, always open customization modal
    if (hasOptions) {
      onSelect(product);
      return;
    }

    // Direct add
    addToCart(product, 1, []);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleCardClick = () => {
    onSelect(product);
  };

  const handleDirectIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (singleCartItem) {
      updateQuantity(singleCartItem.cartItemId, 1);
    } else {
      addToCart(product, 1, []);
    }
  };

  const handleDirectDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (singleCartItem) {
      updateQuantity(singleCartItem.cartItemId, -1);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group flex flex-col justify-between bg-[#0e1219] hover:bg-[#131923] border rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 cursor-pointer ${
        totalQuantityInCart > 0
          ? 'border-amber-400/60 ring-1 ring-amber-400/20'
          : 'border-slate-800/80 hover:border-amber-500/40'
      }`}
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#07090e]">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {product.isChefSelection && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase shadow-md">
                <Star className="w-2.5 h-2.5 fill-slate-950" />
                Seleção do Chef
              </span>
            )}
            {product.badge && !product.isChefSelection && (
              <span className="px-2.5 py-0.5 rounded-md bg-slate-950/90 border border-amber-500/30 text-amber-300 font-semibold text-[10px] tracking-wider uppercase shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Cart Quantity Indicator if already in cart */}
          {totalQuantityInCart > 0 && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-xs shadow-lg">
                <ShoppingBag className="w-3 h-3" />
                <span>{totalQuantityInCart}</span>
              </span>
            </div>
          )}

          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="px-3 py-1 bg-red-950/80 border border-red-500/50 text-red-200 font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Esgotado Hoje
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Category & Unit */}
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-amber-500/90 uppercase font-mono">
            <span>{product.categoryLabel}</span>
            <span className="text-slate-500 font-sans">{product.unit}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Accompaniments if any */}
          {product.accompaniments && (
            <p className="text-[11px] text-amber-200/80 italic font-serif line-clamp-1 border-t border-slate-800/80 pt-1.5">
              {product.accompaniments}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer with Price & Direct Stepper / Add Button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 flex items-center justify-between gap-3 border-t border-slate-800/60 mt-auto">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
            Valor
          </span>
          <div className="text-lg sm:text-xl font-black font-serif text-amber-400 tabular-nums">
            {formatGuarani(product.price)}
          </div>
          {showCurrencyDual && (
            <span className="text-[11px] text-emerald-400 font-mono block">
              ~ {formatReal(product.price)}
            </span>
          )}
        </div>

        {/* Direct Action */}
        <div>
          {!product.isAvailable ? (
            <span className="text-xs text-slate-500 font-semibold">Indisponível</span>
          ) : singleCartItem ? (
            /* Direct Stepper right on card for effortless quantity adjustments */
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-[#171f2c] border border-amber-400/50 p-1 rounded-xl shadow"
            >
              <button
                type="button"
                onClick={handleDirectDecrement}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                title="Diminuir"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-xs px-2 text-amber-300 tabular-nums">
                {singleCartItem.quantity}
              </span>
              <button
                type="button"
                onClick={handleDirectIncrement}
                className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-colors font-bold"
                title="Aumentar"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : hasOptions && totalQuantityInCart > 0 ? (
            <button
              onClick={handleQuickAdd}
              className="px-3 py-2 bg-amber-400/20 border border-amber-400/60 text-amber-300 hover:bg-amber-400 hover:text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Mais</span>
            </button>
          ) : (
            <button
              onClick={handleQuickAdd}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-emerald-500 text-slate-950 scale-95 shadow-md shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 hover:scale-[1.02] shadow-md shadow-amber-500/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Adicionado</span>
                </>
              ) : hasOptions ? (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Opções</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Pedir</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
