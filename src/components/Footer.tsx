import React from 'react';
import { Clock, MapPin, Phone, Settings, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenFlyer: (type: 'marmitas' | 'combos') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenFlyer }) => {
  const { storePhone } = useCart();

  return (
    <footer className="bg-[#090c12] border-t border-amber-500/20 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-2xl font-black font-serif tracking-widest text-slate-100 uppercase">
                KORIZKO
              </span>
            </div>
            <p className="text-xs text-amber-200/70 font-serif italic">
              "O prazer também é uma necessidade."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gastronomia artesanal com afeto. Marmitas executivas, pães artesanais recheados, brownies nobres e bolos caseiros.
            </p>
          </div>

          {/* Col 2: Horário de Funcionamento */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Horário de Atendimento</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <span className="font-semibold text-slate-300 block">Almoço:</span>
                <span>Segunda a Sábado · 11:00 às 14:30</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300 block">Janta:</span>
                <span>Segunda a Sábado · 18:00 às 22:30</span>
              </div>
              <div className="pt-1 text-[11px] text-amber-400/90 font-medium">
                Domingos: Sob encomenda prévia
              </div>
            </div>
          </div>

          {/* Col 3: Encomendas e Parcerias */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Pedidos & Informações</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                WhatsApp Oficial:{' '}
                <a
                  href={`https://wa.me/${storePhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-mono"
                >
                  {storePhone}
                </a>
              </p>
              <div className="flex flex-col gap-1 pt-1">
                <button
                  onClick={() => onOpenFlyer('marmitas')}
                  className="text-left text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  › Ver Cardápio Marmitas (PDF/Imagem)
                </button>
                <button
                  onClick={() => onOpenFlyer('combos')}
                  className="text-left text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  › Ver Promoções de Combos
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Pagamento & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Formas de Pagamento
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-1 bg-[#141b27] border border-slate-800 rounded text-slate-300">
                Pix
              </span>
              <span className="px-2 py-1 bg-[#141b27] border border-slate-800 rounded text-slate-300">
                Dinheiro / Efectivo
              </span>
              <span className="px-2 py-1 bg-[#141b27] border border-slate-800 rounded text-slate-300">
                Cartão
              </span>
              <span className="px-2 py-1 bg-[#141b27] border border-slate-800 rounded text-slate-300">
                Transferência
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-slate-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Gestão do Cardápio (Lojista)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KORIZKO. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Cardápio digital desenvolvido com</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>para KORIZKO</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
