import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Star, AlertCircle } from 'lucide-react';
import { MenuItem, SelectedOption } from '../types/menu';
import { formatGuarani, formatReal } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, showCurrencyDual } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  // Reset when opening a new product
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes('');
      setValidationError('');

      // Pre-select first choice for required groups
      const initialChoices: Record<string, string> = {};
      product.optionGroups?.forEach((group) => {
        if (group.required && group.choices.length > 0) {
          initialChoices[group.id] = group.choices[0].id;
        }
      });
      setSelectedChoices(initialChoices);
    }
  }, [product]);

  if (!product) return null;

  // Calculate current unit price based on selected choices
  let optionsModifierTotal = 0;
  const currentSelectedOptions: SelectedOption[] = [];

  product.optionGroups?.forEach((group) => {
    const choiceId = selectedChoices[group.id];
    if (choiceId) {
      const choice = group.choices.find((c) => c.id === choiceId);
      if (choice) {
        optionsModifierTotal += choice.priceModifier || 0;
        currentSelectedOptions.push({
          groupId: group.id,
          groupTitle: group.title,
          choiceId: choice.id,
          choiceName: choice.name,
          priceModifier: choice.priceModifier,
        });
      }
    }
  });

  const unitPrice = product.price + optionsModifierTotal;
  const totalPrice = unitPrice * quantity;

  const handleSelectChoice = (groupId: string, choiceId: string) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [groupId]: choiceId,
    }));
    setValidationError('');
  };

  const handleAddToCart = () => {
    // Validate required groups
    if (product.optionGroups) {
      for (const group of product.optionGroups) {
        if (group.required && !selectedChoices[group.id]) {
          setValidationError(`Por favor, selecione uma opção para "${group.title}".`);
          return;
        }
      }
    }

    addToCart(product, quantity, currentSelectedOptions, notes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#121824] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] w-full bg-[#0a0d14] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

          {/* Badge */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            {product.isChefSelection && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow">
                <Star className="w-3 h-3 fill-slate-950" />
                Seleção do Chef
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md bg-[#0d121c]/90 border border-slate-700 text-slate-300 font-mono text-xs uppercase">
              {product.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 font-serif leading-snug">
              {product.name}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {product.description}
            </p>
            {product.accompaniments && (
              <div className="mt-3 p-3 rounded-xl bg-[#162030] border border-amber-500/20 text-xs text-amber-200/90 font-serif">
                <strong className="text-amber-400 font-sans uppercase text-[10px] tracking-wider block mb-1">
                  Acompanhamentos Inclusos:
                </strong>
                {product.accompaniments}
              </div>
            )}
          </div>

          {/* Validation Warning */}
          {validationError && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Option Groups */}
          {product.optionGroups && product.optionGroups.length > 0 && (
            <div className="space-y-5 border-t border-slate-800 pt-5">
              {product.optionGroups.map((group) => (
                <div key={group.id} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {group.title}
                    </span>
                    {group.required && (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Obrigatório
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {group.choices.map((choice) => {
                      const isSelected = selectedChoices[group.id] === choice.id;
                      return (
                        <label
                          key={choice.id}
                          onClick={() => handleSelectChoice(group.id, choice.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-400 text-white font-medium shadow-sm'
                              : 'bg-[#162030]/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-amber-400 bg-amber-400 text-slate-950'
                                  : 'border-slate-600 bg-slate-900'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <span>{choice.name}</span>
                          </div>

                          {choice.priceModifier ? (
                            <span className="font-mono text-amber-400 font-bold ml-2">
                              +{formatGuarani(choice.priceModifier)}
                            </span>
                          ) : null}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="border-t border-slate-800 pt-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Observações do Pedido (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem cebola, purê bem caprichado, ponto da carne, etc."
              rows={2}
              className="w-full p-3 bg-[#162030] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer with Stepper and Add to Cart */}
        <div className="p-4 sm:p-5 bg-[#0e131d] border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-center gap-3 bg-[#162030] p-1.5 rounded-xl border border-slate-700/60 self-center sm:self-auto">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-base px-2 tabular-nums text-slate-100">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
          >
            <span>Adicionar ao Pedido</span>
            <div className="text-right">
              <span className="font-mono font-black text-base tabular-nums">
                {formatGuarani(totalPrice)}
              </span>
              {showCurrencyDual && (
                <span className="text-[10px] text-slate-900/80 font-mono block -mt-0.5">
                  ~ {formatReal(totalPrice)}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
