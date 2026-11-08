export type CategoryId = 'todos' | 'marmitas' | 'combos' | 'paes' | 'confeitaria' | 'bebidas';

export interface Category {
  id: CategoryId;
  name: string;
  iconName?: string;
  description?: string;
}

export interface ProductOptionChoice {
  id: string;
  name: string;
  priceModifier?: number; // In Guaranis
}

export interface ProductOptionGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  choices: ProductOptionChoice[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  unit: string; // 'UN', 'G', 'LATA', etc.
  price: number; // in Guaranis (₲)
  description: string;
  accompaniments?: string;
  imageUrl: string;
  isChefSelection?: boolean;
  isAvailable: boolean;
  badge?: string; // e.g. "Mais Pedido", "Econômico", "Seleção do Chef"
  optionGroups?: ProductOptionGroup[];
}

export interface SelectedOption {
  groupId: string;
  groupTitle: string;
  choiceId: string;
  choiceName: string;
  priceModifier?: number;
}

export interface CartItem {
  cartItemId: string; // Unique combination of item ID and selected options
  product: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'takeaway';

export type PaymentMethod = 'dinheiro' | 'pix' | 'cartao' | 'transferencia';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressReference?: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  cashChangeNeededFor?: string;
  generalNotes?: string;
}
