import type { ICartItem } from '@/entities/Cart';
import { resolveBlockedCartItemIds } from '../resolveBlockedCartItemIds';

const item = (id: string, parent_id: string): ICartItem => ({
  id,
  parent_id,
  owner_id: 'o',
  quantity: 1,
  cost: { value: 100, symbol: '₴' },
  price: { value: 100, symbol: '₴' },
  old_price: false,
  picture: '',
  title: 't',
  url: '/u',
  options: [],
  category: 'c',
  brand: 'b',
  variant: 'v',
  promocode_discount: null,
});

describe('resolveBlockedCartItemIds', () => {
  it('maps a product-level id (parent_id) to the concrete cart-item id the mutation expects', () => {
    const items = [item('offer-1', 'prod-1'), item('offer-2', 'prod-2')];

    expect(resolveBlockedCartItemIds(items, 'prod-1')).toEqual(['offer-1']);
  });

  it('matches on the cart-item id when the backend keys the blocker at offer level', () => {
    const items = [item('offer-9', 'prod-9')];

    expect(resolveBlockedCartItemIds(items, 'offer-9')).toEqual(['offer-9']);
  });

  it('returns every cart-item id sharing the blocked product (multiple variants)', () => {
    const items = [item('offer-a', 'prod-1'), item('offer-b', 'prod-1'), item('offer-c', 'prod-2')];

    expect(resolveBlockedCartItemIds(items, 'prod-1')).toEqual(['offer-a', 'offer-b']);
  });

  it('returns an empty list when nothing matches or the cart is undefined', () => {
    expect(resolveBlockedCartItemIds([item('offer-1', 'prod-1')], 'nope')).toEqual([]);
    expect(resolveBlockedCartItemIds(undefined, 'prod-1')).toEqual([]);
  });
});
