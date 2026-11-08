import React from 'react';
import { ShoppingBag, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatGuarani } from '../utils/currency';

interface HeaderProps {
  onOpenFlyer: (flyerType: 'marmitas' | 'combos') => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFlyer, onOpenAdmin }) => {
  const { totalItems, subtotal, setIsCartOpen, storePhone } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#0d121c]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-amber-400/50 overflow-hidden bg-black flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-colors">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.12.12_c7354d9c.jpeg"
                  alt="KORIZKO"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 font-serif uppercase">
                  KORIZKO
                </span>
                <span className="text-[10px] tracking-wider text-amber-200/70 font-sans uppercase">
                  Pães Artesanais · Marmitas · Doces
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean hover underlines) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#marmitas"
              className="hover:text-amber-300 transition-colors whitespace-nowrap hover:underline underline-offset-8 decoration-amber-400/50"
            >
              Marmitas Médias
            </a>
            <a
              href="#combos"
              className="hover:text-amber-300 transition-colors whitespace-nowrap hover:underline underline-offset-8 decoration-amber-400/50"
            >
              Combos Promocionais
            </a>
            <a
              href="#paes"
              className="hover:text-amber-300 transition-colors whitespace-nowrap hover:underline underline-offset-8 decoration-amber-400/50"
            >
              Pães & Doces
            </a>
            <button
              onClick={() => onOpenFlyer('marmitas')}
              className="text-amber-400/90 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 decoration-amber-400/50"
            >
              Folhetos Oficiais
            </button>
          </nav>

          {/* Zone 3: Primary Action (Cart Drawer Trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${storePhone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/40 transition-colors"
              title="Atendimento WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-amber-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label="Abrir Sacola de Pedidos"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="whitespace-nowrap font-sans font-bold">
                {totalItems > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <span>{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
                    <span className="text-amber-950/60 font-mono">·</span>
                    <span className="font-mono font-black">{formatGuarani(subtotal)}</span>
                  </span>
                ) : (
                  'Sacola'
                )}
              </span>

              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
