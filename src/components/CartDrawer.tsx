import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Copy,
  Check,
  MapPin,
  User,
  Phone,
  CreditCard,
  DollarSign,
  QrCode,
  Building,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatGuarani, formatReal } from '../utils/currency';
import { OrderType, PaymentMethod } from '../types/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted?: (orderSummary: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOrderCompleted }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    showCurrencyDual,
    storePhone,
  } = useCart();

  // Form states
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressNeighborhood, setAddressNeighborhood] = useState('');
  const [addressReference, setAddressReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [cashChange, setCashChange] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Approximate flat delivery fee suggestion (e.g. ₲ 5.000, free over 80.000)
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 80000 ? 0 : 5000) : 0;
  const grandTotal = subtotal + deliveryFee;

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push('👑 *PEDIDO NOVO - KORIZKO CARDÁPIO DIGITAL*');
    lines.push('----------------------------------------');
    lines.push(`👤 *Cliente:* ${customerName || 'Não informado'}`);
    lines.push(`📱 *Telefone/WhatsApp:* ${customerPhone || 'Não informado'}`);
    lines.push(`🛵 *Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega (Delivery)' : 'Retirada no Balcão'}`);

    if (orderType === 'delivery') {
      const addressParts = [
        addressStreet ? `${addressStreet}, ${addressNumber || 'S/N'}` : '',
        addressNeighborhood ? `Bairro: ${addressNeighborhood}` : '',
        addressReference ? `(Ref: ${addressReference})` : '',
      ].filter(Boolean);
      lines.push(`📍 *Endereço:* ${addressParts.join(' - ') || 'A combinar'}`);
    }

    const paymentLabels: Record<PaymentMethod, string> = {
      dinheiro: `Dinheiro em Espécie ${cashChange ? `(Troco para: ${cashChange})` : '(Troco não necessário)'}`,
      pix: 'Pix',
      cartao: 'Cartão (Débito/Crédito na entrega)',
      transferencia: 'Transferência Bancária',
    };
    lines.push(`💳 *Forma de Pagamento:* ${paymentLabels[paymentMethod]}`);

    lines.push('');
    lines.push('📋 *ITENS DO PEDIDO:*');
    cart.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.quantity}x ${item.product.name}* - ${formatGuarani(item.totalPrice)}`);
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach((opt) => {
          lines.push(`   └ ${opt.groupTitle}: *${opt.choiceName}*`);
        });
      }
      if (item.notes) {
        lines.push(`   └ Obs: _"${item.notes}"_`);
      }
    });

    lines.push('');
    lines.push('----------------------------------------');
    lines.push(`💰 *Subtotal:* ${formatGuarani(subtotal)}`);
    if (orderType === 'delivery') {
      lines.push(`🛵 *Taxa de Entrega:* ${deliveryFee === 0 ? 'GRÁTIS' : formatGuarani(deliveryFee)}`);
    }
    lines.push(`⭐ *TOTAL A PAGAR:* ${formatGuarani(grandTotal)}`);
    if (showCurrencyDual) {
      lines.push(`   (Aproximadamente ${formatReal(grandTotal)})`);
    }

    if (generalNotes.trim()) {
      lines.push('');
      lines.push(`📝 *Observações Gerais:* ${generalNotes.trim()}`);
    }

    lines.push('----------------------------------------');
    lines.push('_KORIZKO - Pães Artesanais, Marmitas & Doces_');
    return lines.join('\n');
  };

  const handleSendWhatsApp = () => {
    if (!customerName.trim()) {
      setFormError('Por favor, informe seu nome para o pedido.');
      return;
    }
    if (orderType === 'delivery' && !addressStreet.trim()) {
      setFormError('Por favor, informe a rua e bairro para entrega.');
      return;
    }

    setFormError('');
    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const cleanPhone = storePhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    window.open(waUrl, '_blank');
    if (onOrderCompleted) {
      onOrderCompleted(message);
    }
  };

  const handleCopyMessage = () => {
    const message = buildWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#101622] border-l border-amber-500/30 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0d121c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 font-serif">
                Sua Sacola
              </h2>
              <span className="text-xs text-slate-400">
                {totalItems} {totalItems === 1 ? 'item adicionado' : 'itens adicionados'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded bg-red-950/30 border border-red-500/20"
                title="Limpar sacola"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-200">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Adicione marmitas executivas, combos promocionais ou pães artesanais para finalizar seu pedido.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer hover:bg-amber-300 transition-colors"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Items List */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase block">
                Itens Selecionados
              </span>

              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-[#141b27] border border-slate-800 space-y-2.5 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-amber-400 font-mono font-bold">
                        {formatGuarani(item.unitPrice)} un.
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options breakdown */}
                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                    <div className="space-y-0.5 text-[11px] text-slate-300 border-l border-amber-500/30 pl-2">
                      {item.selectedOptions.map((opt, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-slate-400">{opt.groupTitle}:</span>
                          <span className="font-medium text-amber-200">{opt.choiceName}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.notes && (
                    <p className="text-[11px] text-slate-400 italic bg-slate-900/50 p-1.5 rounded">
                      Obs: {item.notes}
                    </p>
                  )}

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 bg-[#0e131d] px-2 py-1 rounded-lg border border-slate-700/80">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-100 px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-amber-300">
                        {formatGuarani(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Type Toggle */}
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase block">
                Forma de Recebimento
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-[#141b27] text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Entrega (Delivery)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    orderType === 'takeaway'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-[#141b27] text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Retirada Balcão</span>
                </button>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase block">
                Dados do Cliente
              </span>

              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu Nome Completo *"
                    className="w-full pl-9 pr-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Seu WhatsApp (com DDD) *"
                    className="w-full pl-9 pr-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={addressStreet}
                        onChange={(e) => setAddressStreet(e.target.value)}
                        placeholder="Rua / Avenida *"
                        className="col-span-2 px-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        value={addressNumber}
                        onChange={(e) => setAddressNumber(e.target.value)}
                        placeholder="Nº / Apto"
                        className="col-span-1 px-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={addressNeighborhood}
                        onChange={(e) => setAddressNeighborhood(e.target.value)}
                        placeholder="Bairro *"
                        className="px-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        value={addressReference}
                        onChange={(e) => setAddressReference(e.target.value)}
                        placeholder="Ponto de Ref. (Ex: em frente à faculdade)"
                        className="px-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase block">
                Forma de Pagamento
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    paymentMethod === 'pix'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#141b27] border-slate-800 text-slate-300'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Pix</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('dinheiro')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    paymentMethod === 'dinheiro'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#141b27] border-slate-800 text-slate-300'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>Dinheiro</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cartao')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    paymentMethod === 'cartao'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#141b27] border-slate-800 text-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-sky-400" />
                  <span>Cartão</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    paymentMethod === 'transferencia'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#141b27] border-slate-800 text-slate-300'
                  }`}
                >
                  <Building className="w-4 h-4 text-purple-400" />
                  <span>Transferência</span>
                </button>
              </div>

              {paymentMethod === 'dinheiro' && (
                <div className="pt-1">
                  <input
                    type="text"
                    value={cashChange}
                    onChange={(e) => setCashChange(e.target.value)}
                    placeholder="Precisa de troco para quanto? (Ex: 100.000)"
                    className="w-full px-3 py-2 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            {/* General Observations */}
            <div className="space-y-1.5 border-t border-slate-800 pt-4">
              <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                Observações Adicionais
              </label>
              <textarea
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Ex: Tocar o interfone, embalar separado, etc."
                rows={2}
                className="w-full p-2.5 bg-[#141b27] border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Form Error Alert */}
            {formError && (
              <div className="p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
          </div>
        )}

        {/* Drawer Footer with Totals and WhatsApp CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#0d121c] border-t border-slate-800 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal dos itens:</span>
                <span className="font-mono font-semibold">{formatGuarani(subtotal)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Taxa de Entrega:</span>
                  <span className="font-mono font-semibold text-amber-300">
                    {deliveryFee === 0 ? 'Grátis' : formatGuarani(deliveryFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-slate-800 font-serif">
                <span>Total Estimado:</span>
                <div className="text-right">
                  <span className="text-amber-400 font-mono text-lg tabular-nums">
                    {formatGuarani(grandTotal)}
                  </span>
                  {showCurrencyDual && (
                    <span className="text-[11px] text-emerald-400 font-mono block -mt-0.5">
                      ~ {formatReal(grandTotal)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Big Action Button: WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido pelo WhatsApp</span>
            </button>

            {/* Secondary Action: Copy text */}
            <button
              onClick={handleCopyMessage}
              className="w-full py-2 px-3 bg-[#162030] hover:bg-[#1f2c42] text-slate-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Mensagem Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Mensagem do Pedido</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
