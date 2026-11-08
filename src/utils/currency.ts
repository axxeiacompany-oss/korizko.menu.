/**
 * Currency utilities for KORIZKO Menu.
 * The primary currency is Paraguayan Guaraní (Gs. / ₲)
 */

export const DEFAULT_EXCHANGE_RATE = 1350;

export function gs(amount: number): string {
  if (isNaN(amount)) return 'Gs. 0';
  return 'Gs. ' + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatGuarani(amount: number): string {
  return gs(amount);
}

export function formatReal(amountInGs: number, rate: number = DEFAULT_EXCHANGE_RATE): string {
  if (isNaN(amountInGs) || rate <= 0) return 'R$ 0,00';
  const brl = amountInGs / rate;
  return `R$ ${brl.toFixed(2).replace('.', ',')}`;
}
