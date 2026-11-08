import React, { useState } from 'react';
import { X, Check, Save, RotateCcw, AlertTriangle, Phone } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { useCart } from '../context/CartContext';
import { formatGuarani } from '../utils/currency';

interface AdminQuickManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateItems: (items: MenuItem[]) => void;
  onResetDefaults: () => void;
}

export const AdminQuickManageModal: React.FC<AdminQuickManageModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onUpdateItems,
  onResetDefaults,
}) => {
  const { storePhone, setStorePhone } = useCart();
  const [localItems, setLocalItems] = useState<MenuItem[]>(menuItems);
  const [phoneInput, setPhoneInput] = useState(storePhone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync when opened
  React.useEffect(() => {
    if (isOpen) {
      setLocalItems(menuItems);
      setPhoneInput(storePhone);
      setSaveSuccess(false);
    }
  }, [isOpen, menuItems, storePhone]);

  if (!isOpen) return null;

  const handleToggleAvailability = (id: string) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handlePriceChange = (id: string, newPriceStr: string) => {
    const val = parseInt(newPriceStr.replace(/\D/g, ''), 10) || 0;
    setLocalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: val } : item))
    );
  };

  const handleSaveAll = () => {
    onUpdateItems(localItems);
    setStorePhone(phoneInput.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#121824] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d121c]">
          <div>
            <h2 className="text-base font-bold text-slate-100 font-serif">
              Painel de Gestão Rápida · KORIZKO
            </h2>
            <p className="text-xs text-slate-400">
              Gerencie estoque diário (esgotado/disponível), ajuste preços e configure o número de WhatsApp.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* WhatsApp Settings */}
          <div className="p-4 rounded-xl bg-[#162030] border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Número de WhatsApp para Receber Pedidos</span>
            </label>
            <p className="text-[11px] text-slate-400">
              Formato internacional com código de país (Ex: +595981234567 para Paraguai ou +5545999998888 para Brasil).
            </p>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="+595 981 123456"
              className="w-full px-3 py-2 bg-[#0d121c] border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Menu Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Itens do Cardápio ({localItems.length})
              </span>
              <button
                type="button"
                onClick={onResetDefaults}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar Padrões Originais</span>
              </button>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 bg-[#0d121c]">
              {localItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 flex items-center justify-between gap-4 text-xs hover:bg-[#141b27] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200 truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-mono">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {item.description}
                    </span>
                  </div>

                  {/* Price input */}
                  <div className="w-28 shrink-0">
                    <label className="text-[9px] uppercase tracking-wider text-slate-500 block">
                      Preço (₲)
                    </label>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => handlePriceChange(item.id, e.target.value)}
                      className="w-full px-2 py-1 bg-[#162030] border border-slate-700 rounded text-xs text-amber-300 font-mono text-right"
                    />
                  </div>

                  {/* Stock Availability Toggle */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                        item.isAvailable
                          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                          : 'bg-red-950/60 border border-red-500/40 text-red-300'
                      }`}
                    >
                      {item.isAvailable ? 'Disponível' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0d121c] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Alterações são salvas instantaneamente no navegador.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Salvo!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
