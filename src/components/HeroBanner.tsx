import React from 'react';
import { Utensils, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeroBannerProps {
  onOpenFlyer: (type: 'marmitas' | 'combos') => void;
  onExploreMenu: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenFlyer, onExploreMenu }) => {
  const { storePhone } = useCart();
  const cleanPhone = storePhone.replace(/[^0-9]/g, '');

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#050608] via-[#090b0f] to-[#0b0e14] border-b border-amber-500/20 py-8 sm:py-12">
      {/* Luxury gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        
        {/* Official Brand Logo Card matching user's image */}
        <div className="inline-block relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-600/20 blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
          <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 bg-black max-w-[280px] sm:max-w-[340px] mx-auto shadow-2xl shadow-black/80">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.12.12_c7354d9c.jpeg"
              alt="KORIZKO - Pães Artesanais, Bolos, Brownies"
              className="w-full h-auto object-contain block hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Operating status & simple order instructions */}
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141b27] border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Aberto para Pedidos</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">Almoço & Janta</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Faça seu pedido de forma simples e rápida: selecione seus pratos favoritos e envie direto para nossa cozinha no WhatsApp.
          </p>
        </div>

        {/* Quick price pills from the menu */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs">
          <button
            onClick={onExploreMenu}
            className="px-4 py-2 rounded-xl bg-[#141a24] border border-amber-500/30 text-slate-200 hover:border-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-amber-400 font-bold">Marmitas:</span>
            <span className="font-mono text-white font-bold">₲ 25.000</span>
          </button>
          <button
            onClick={onExploreMenu}
            className="px-4 py-2 rounded-xl bg-[#141a24] border border-amber-500/30 text-slate-200 hover:border-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-amber-400 font-bold">Combos:</span>
            <span className="font-mono text-white font-bold">A partir de Gs 40.000</span>
          </button>
          <button
            onClick={() => onOpenFlyer('marmitas')}
            className="px-3.5 py-2 rounded-xl bg-[#10141d] border border-slate-800 text-amber-300/80 hover:text-amber-200 hover:border-amber-500/40 transition-colors cursor-pointer text-xs"
          >
            📄 Ver Folheto Impresso
          </button>
        </div>

        {/* Simple 3-step order flow indicator */}
        <div className="pt-4 border-t border-slate-800/80 max-w-lg mx-auto grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
          <div className="space-y-0.5">
            <span className="font-bold text-amber-400 font-mono">1. Escolha</span>
            <span className="block text-[10px] text-slate-400">Seus itens no menu</span>
          </div>
          <div className="space-y-0.5 border-x border-slate-800">
            <span className="font-bold text-amber-400 font-mono">2. Revise</span>
            <span className="block text-[10px] text-slate-400">Na sacola rápida</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-amber-400 font-mono">3. Envie</span>
            <span className="block text-[10px] text-slate-400">No WhatsApp</span>
          </div>
        </div>

      </div>
    </div>
  );
};
