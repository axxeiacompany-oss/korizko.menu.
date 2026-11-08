import React from 'react';
import { CheckCircle2, MessageCircle, Clock, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderSummary,
}) => {
  const { storePhone } = useCart();
  if (!isOpen) return null;

  const cleanPhone = storePhone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(orderSummary);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#121824] border border-emerald-500/40 rounded-2xl p-6 text-center shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-black font-serif text-slate-100">
            Pedido Preparado!
          </h3>
          <p className="text-xs text-slate-300">
            Seu pedido foi estruturado e a janela do WhatsApp foi iniciada. Caso não tenha aberto automaticamente, clique no botão abaixo.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#162030] border border-slate-700/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Tempo Estimado de Preparo: 30 a 45 min</span>
          </div>
          <p className="text-[11px] text-slate-400">
            A equipe KORIZKO confirmará seu pedido assim que receber sua mensagem no WhatsApp.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Abrir WhatsApp do KORIZKO</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    </div>
  );
};
