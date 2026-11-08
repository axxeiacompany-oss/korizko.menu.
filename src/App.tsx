import React, { useState, useEffect, useMemo } from 'react';
import { gs } from './utils/currency';
import { FlyerModal } from './components/FlyerModal';

interface MenuItemDef {
  id: string;
  name: string;
  price: number;
  desc?: string;
  img?: string;
}

interface MenuCategoryDef {
  id: string;
  t: string;
  desc?: string;
  items: MenuItemDef[];
}

const WHATSAPP_NUMBER = '595991607393';

const MENU_DATA: MenuCategoryDef[] = [
  {
    id: 'marmitas',
    t: '🍱 Marmitas',
    desc: 'Por apenas Gs. 25.000 · Feitas na hora com sabor caseiro',
    items: [
      {
        id: 'milanesa_carne',
        name: 'Milanesa de Carne',
        price: 25000,
        desc: 'Acompanha arroz branco, feijão e purê de batata cremoso',
        img: '/assets/images/marmita_milanesa_1794006421763.jpg',
      },
      {
        id: 'milanesa_frango',
        name: 'Milanesa de Frango',
        price: 25000,
        desc: 'Acompanha arroz branco, feijão e purê de batata cremoso',
        img: '/assets/images/marmita_milanesa_1794006421763.jpg',
      },
      {
        id: 'parmegiana_carne',
        name: 'Parmegiana de Carne',
        price: 25000,
        desc: 'Bife à milanesa com molho rústico de tomate e queijo gratinado, arroz, feijão e purê',
        img: '/assets/images/parmegiana_carne_prato_1794008852734.jpg',
      },
      {
        id: 'parmegiana_frango',
        name: 'Parmegiana de Frango',
        price: 25000,
        desc: 'Filé de frango empanado com molho de tomate caseiro e queijo gratinado, arroz, feijão e purê',
        img: '/assets/images/parmegiana_carne_prato_1794008852734.jpg',
      },
      {
        id: 'strogonoff_carne',
        name: 'Strogonoff de Carne',
        price: 25000,
        desc: 'Carne macia em molho cremoso com cogumelos, arroz e batata palha fininha',
        img: '/assets/images/marmita_strogonoff_1794006422466.jpg',
      },
      {
        id: 'strogonoff_frango',
        name: 'Strogonoff de Frango',
        price: 25000,
        desc: 'Cubos tenros de frango com arroz branco e batata palha crocante',
        img: '/assets/images/marmita_strogonoff_1794006422466.jpg',
      },
      {
        id: 'frango_manteiga',
        name: 'Filé de Frango Grelhado na Manteiga',
        price: 25000,
        desc: 'Acompanha arroz, feijão, purê de batata e legumes salteados na manteiga',
        img: '/assets/images/frango_grelhado_manteiga_1794008853813.jpg',
      },
      {
        id: 'macarrao_almondegas',
        name: 'Macarrão com Almôndegas',
        price: 25000,
        desc: 'Spaghetti ao molho artesanal com almôndegas e queijo parmesão ralado',
        img: '/assets/images/macarrao_com_almondegas_1794008853909.jpg',
      },
    ],
  },
  {
    id: 'combos',
    t: '🥪 Combos Promocionais',
    desc: 'Lanche artesanal + Marmita + Bebida lata (Almoço & Janta)',
    items: [
      {
        id: 'combo_1',
        name: 'COMBO 1 (Lanche + Marmita + Bebida)',
        price: 40000,
        desc: '01 Pão recheado artesanal + 01 Marmita à escolha + 01 Bebida lata',
        img: '/assets/images/combo_1_individual_1794009125387.jpg',
      },
      {
        id: 'combo_2',
        name: 'COMBO 2 (Com Sobremesa)',
        price: 50000,
        desc: '01 Pão recheado + 01 Marmita + 01 Bebida lata + 01 Sobremesa à escolha',
        img: '/assets/images/combo_2_com_sobremesa_1794009098133.jpg',
      },
      {
        id: 'combo_3',
        name: 'COMBO 3 (Almoço & Janta / P/ 2)',
        price: 80000,
        desc: '01 Lanche recheado + 02 Marmitas completas + 02 Bebidas lata + 02 Sobremesas especiais',
        img: '/assets/images/combo_3_almoco_janta_1794008989021.jpg',
      },
      {
        id: 'combo_brownies',
        name: 'Combo 3 Brownies 70% Cacau',
        price: 50000,
        desc: 'Trio promocional com 3 unidades do brownie 70% (Economize Gs. 10.000)',
        img: '/assets/images/brownie_chocolate_artesanal_1794006424724.jpg',
      },
    ],
  },
  {
    id: 'paes',
    t: '🥖 Pães Artesanais',
    desc: 'Massas artesanais caseiras assadas diariamente',
    items: [
      {
        id: 'pao_calabresa',
        name: 'Pão Calabresa Artesanal',
        price: 25000,
        desc: 'Recheado com calabresa fatiada, muçarela derretida e orégano',
        img: '/assets/images/pao_recheado_artesanal_1794006424953.jpg',
      },
      {
        id: 'pao_presunto_queijo',
        name: 'Pão Presunto e Queijo',
        price: 25000,
        desc: 'Massa artesanal farta recheada com presunto nobre e queijo mussarela derretido',
        img: '/assets/images/pao_presunto_queijo_artesanal_1794008855211.jpg',
      },
      {
        id: 'pao_aveia_canela_mel',
        name: 'Pão de Aveia, Canela e Mel',
        price: 25000,
        desc: 'Pão integral rústico aromático feito com aveia em flocos, canela e mel puro',
        img: '/assets/images/pao_presunto_queijo_artesanal_1794008855211.jpg',
      },
      {
        id: 'pao_doce_leite',
        name: 'Pão de Doce de Leite',
        price: 25000,
        desc: 'Trança fofinha artesanal recheada com farto doce de leite cremoso',
        img: '/assets/images/pao_recheado_artesanal_1794006424953.jpg',
      },
      {
        id: 'pao_tradicional',
        name: 'Pão Tradicional Caseiro',
        price: 20000,
        desc: 'O autêntico pão branco caseiro de fermentação natural macio',
        img: '/assets/images/pao_recheado_artesanal_1794006424953.jpg',
      },
    ],
  },
  {
    id: 'doces',
    t: '🍰 Confeitaria & Sobremesas',
    desc: 'Receitas nobres da casa e doces irresistíveis',
    items: [
      {
        id: 'bolo_pudim',
        name: 'Bolo Pudim',
        price: 40000,
        desc: 'Pudim caramelizado super cremoso sobre bolo de chocolate úmido artesanal',
        img: '/assets/images/bolo_pudim_inteiro_1794009678189.jpg',
      },
      {
        id: 'brownie_unidade',
        name: 'Brownie de Chocolate 70% Cacau',
        price: 20000,
        desc: 'Intenso no sabor com casquinha craquelada crocante',
        img: '/assets/images/brownie_chocolate_artesanal_1794006424724.jpg',
      },
      {
        id: 'cuca_alema',
        name: 'Cuca Alemã Doce de Leite e Canela',
        price: 50000,
        desc: 'Farta cobertura de doce de leite com canela e farofa crocante alemã',
        img: '/assets/images/cuca_alema_doce_leite_1794008855213.jpg',
      },
    ],
  },
  {
    id: 'bebidas',
    t: '🥤 Bebidas Geladas',
    desc: 'Latas 350ml, sucos e energéticos',
    items: [
      { id: 'coca_zero_lata', name: 'Coca-Cola Zero Lata 350ml', price: 8000 },
      { id: 'guarana_lata', name: 'Guaraná Antarctica Lata 350ml', price: 8000 },
      { id: 'suco_natural', name: 'Suco Natural em Lata / Polpa 300ml', price: 10000 },
      { id: 'energetico_lata', name: 'Energético Lata 250ml', price: 18000 },
      { id: 'agua_mineral', name: 'Água Mineral 500ml', price: 5000 },
    ],
  },
];

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Checkout form fields matching template
  const [name, setName] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState<'Delivery' | 'Retiro'>('Delivery');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Efectivo');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [locLoading, setLocLoading] = useState(false);
  const [locLabel, setLocLabel] = useState('📍 Agregar mi ubicación actual');

  // Flyer modal
  const [flyerModal, setFlyerModal] = useState<{ isOpen: boolean; type: 'marmitas' | 'combos' }>({
    isOpen: false,
    type: 'marmitas',
  });

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle item quantity change
  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Compute Cart
  const cartData = useMemo(() => {
    const lines: Array<{ id: string; name: string; q: number; subtotal: number }> = [];
    let total = 0;
    let count = 0;

    MENU_DATA.forEach((cat) => {
      cat.items.forEach((item) => {
        const q = quantities[item.id] || 0;
        if (q > 0) {
          const sub = q * item.price;
          lines.push({ id: item.id, name: item.name, q, subtotal: sub });
          total += sub;
          count += q;
        }
      });
    });

    return { lines, total, count };
  }, [quantities]);

  // Geolocation handler matching template
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Tu navegador no permite obtener la ubicación.');
      return;
    }
    setLocLoading(true);
    setLocLabel('Buscando ubicación…');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const link = `https://maps.google.com/?q=${lat},${lng}`;
        setAddress((prev) => (prev ? `${prev}\n${link}` : link));
        setLocLabel('📍 Ubicación agregada');
        setLocLoading(false);
        setErrorMessage('');
      },
      () => {
        setLocLabel('📍 Agregar mi ubicación actual');
        setLocLoading(false);
        setErrorMessage('No pudimos obtener tu ubicación. Por favor escribí la dirección.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // WhatsApp send order handler matching template format
  const handleSendOrder = () => {
    if (cartData.count === 0) {
      setErrorMessage('Agregá al menos un plato a tu pedido.');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('Por favor, escribí tu nombre.');
      return;
    }
    if (tipoEntrega === 'Delivery' && !address.trim()) {
      setErrorMessage('Escribí la dirección o agregá tu ubicación para la entrega.');
      return;
    }

    setErrorMessage('');

    // Format WhatsApp message exactly as requested
    let msg = '👑 *NUEVO PEDIDO · KORIZKO*\n\n1️⃣ *Pedido:*\n';
    cartData.lines.forEach((l) => {
      msg += `• ${l.q} × ${l.name} — ${gs(l.subtotal)}\n`;
    });
    msg += `\n💰 *Total:* ${gs(cartData.total)}\n2️⃣ *Nombre:* ${name.trim()}\n3️⃣ *Entrega:* ${tipoEntrega}\n`;
    if (tipoEntrega === 'Delivery') {
      msg += `4️⃣ *Dirección:* ${address.trim()}\n`;
    }
    msg += `5️⃣ *Pago:* ${payment}`;
    if (notes.trim()) {
      msg += `\n📝 *Obs.:* ${notes.trim()}`;
    }

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header>
        <div className="wrap text-center">
          {/* Official brand emblem from user attachment */}
          <div className="brand-emblem">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_15.12.12_c7354d9c.jpeg"
              alt="KORIZKO"
            />
          </div>

          <h1>
            KORIZKO <span>Artesanal</span>
          </h1>
          <p className="tag">Pães artesanais · Bolos · Brownies · Marmitas</p>
          <p className="slogan">"O prazer também é uma necessidade."</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="info">
              🛵 Delivery y retiro · Armá tu pedido y envialo por WhatsApp
            </span>
          </div>

          {/* Quick links & theme toggle */}
          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[var(--muted)]">
            <button
              onClick={() => setFlyerModal({ isOpen: true, type: 'marmitas' })}
              className="hover:text-[var(--gold)] transition-colors cursor-pointer underline"
            >
              📄 Ver folheto oficial impresso
            </button>
            <span>·</span>
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="hover:text-[var(--gold)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Category Chips Nav */}
      <nav>
        <div className="wrap" id="chips">
          {MENU_DATA.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`}>
              {cat.t}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Menu List */}
      <main className="wrap" id="menu">
        {MENU_DATA.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2>{cat.t}</h2>
            {cat.desc && <p className="sec-desc">{cat.desc}</p>}

            <div>
              {cat.items.map((item) => {
                const count = quantities[item.id] || 0;
                return (
                  <div key={item.id} className="item">
                    {item.img && (
                      <div className="item-img">
                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).parentElement?.classList.add('hide');
                          }}
                        />
                      </div>
                    )}

                    <div className="n">
                      <b>{item.name}</b>
                      {item.desc && <span className="desc">{item.desc}</span>}
                      <i>{gs(item.price)}</i>
                    </div>

                    <div className="step">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label="Quitar"
                        className={count === 0 ? 'hide' : ''}
                      >
                        −
                      </button>
                      <output className={count === 0 ? 'hide' : ''}>{count}</output>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="add"
                        aria-label="Agregar"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Fixed Bottom Bar */}
      <div className="bar">
        <button
          id="open"
          disabled={cartData.count === 0}
          onClick={() => {
            setErrorMessage('');
            setIsSheetOpen(true);
          }}
        >
          <span id="cnt">
            {cartData.count === 0
              ? 'Tu pedido está vacío'
              : `Ver pedido (${cartData.count} ${cartData.count === 1 ? 'ítem' : 'ítems'})`}
          </span>
          <span id="tot">{cartData.count > 0 ? gs(cartData.total) : ''}</span>
        </button>
      </div>

      {/* Bottom Sheet Modal */}
      <div
        className={`sheet ${isSheetOpen ? 'open' : ''}`}
        id="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsSheetOpen(false);
        }}
      >
        <div className="panel" onClick={(e) => e.stopPropagation()}>
          <h3>
            Tu pedido{' '}
            <button
              className="x"
              id="close"
              aria-label="Cerrar"
              onClick={() => setIsSheetOpen(false)}
            >
              ✕
            </button>
          </h3>

          {/* Itemized Lines */}
          <div id="lines">
            {cartData.lines.map((l) => (
              <div key={l.id} className="line">
                <span>
                  <b>{l.q}</b> × {l.name}
                </span>
                <b>{gs(l.subtotal)}</b>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <span id="sum">{gs(cartData.total)}</span>
          </div>

          {/* Form fields */}
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            autoComplete="name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Tipo de entrega</label>
          <div className="seg">
            <label>
              <input
                type="radio"
                name="tipo"
                value="Delivery"
                checked={tipoEntrega === 'Delivery'}
                onChange={() => setTipoEntrega('Delivery')}
              />
              <span>🛵 Delivery</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                value="Retiro"
                checked={tipoEntrega === 'Retiro'}
                onChange={() => setTipoEntrega('Retiro')}
              />
              <span>🏪 Retiro</span>
            </label>
          </div>

          {tipoEntrega === 'Delivery' && (
            <div id="addrBox">
              <label htmlFor="addr">Dirección / ubicación</label>
              <textarea
                id="addr"
                rows={2}
                placeholder="Calle, número, barrio, referencia"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                className="loc"
                id="loc"
                type="button"
                disabled={locLoading}
                onClick={handleGetLocation}
              >
                {locLabel}
              </button>
            </div>
          )}

          <label htmlFor="pay">Forma de pago</label>
          <select id="pay" value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="Efectivo">Efectivo / Dinheiro</option>
            <option value="Transferencia">Transferencia Bancaria</option>
            <option value="Pix">Pix</option>
            <option value="Tarjeta">Tarjeta / Cartão</option>
          </select>

          <label htmlFor="obs">Observaciones (opcional)</label>
          <input
            id="obs"
            placeholder="Ej: sin cebolla, purê bem caprichado"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {errorMessage && (
            <p className="err" id="err" role="alert">
              {errorMessage}
            </p>
          )}

          <button className="send" id="send" onClick={handleSendOrder}>
            Enviar pedido por WhatsApp 📲
          </button>
        </div>
      </div>

      {/* Official Flyer Modal */}
      <FlyerModal
        isOpen={flyerModal.isOpen}
        initialType={flyerModal.type}
        onClose={() => setFlyerModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
