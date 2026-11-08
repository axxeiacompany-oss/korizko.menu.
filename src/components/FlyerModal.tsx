import React, { useState } from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

interface FlyerModalProps {
  initialType?: 'marmitas' | 'combos';
  isOpen: boolean;
  onClose: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({
  initialType = 'marmitas',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'marmitas' | 'combos'>(initialType);

  if (!isOpen) return null;

  const flyers = {
    marmitas: {
      title: 'Folheto Oficial - Marmitas',
      image: '/assets/aistudio/image_195f09af.png',
      subtitle: 'Cardápio de Marmitas ₲ 25.000',
    },
    combos: {
      title: 'Folheto Oficial - Combos Especiais',
      image: '/assets/aistudio/image_aadd37f3.png',
      subtitle: 'Combos Almoço & Janta a partir de Gs 40.000',
    },
  };

  const currentFlyer = flyers[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#121824] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0d121c]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-[#162030] rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('marmitas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'marmitas'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Marmitas ₲ 25.000
              </button>
              <button
                onClick={() => setActiveTab('combos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'combos'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Combos a partir de Gs 40.000
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentFlyer.image}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
              title="Abrir imagem original"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Fechar folheto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
          <img
            src={currentFlyer.image}
            alt={currentFlyer.title}
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-amber-500/20"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0d121c] flex items-center justify-between text-xs text-slate-400">
          <span>{currentFlyer.subtitle}</span>
          <span className="text-amber-300 font-serif italic">KORIZKO · Sabor artesanal</span>
        </div>
      </div>
    </div>
  );
};
