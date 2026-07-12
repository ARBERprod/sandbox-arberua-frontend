import { renderHook, act } from '@testing-library/react';
import type { ICartItem } from '@/entities/Cart';

// --- Mocks (declared before importing the hook) --------------------------

const mockDeleteUnwrap = jest.fn();
const mockDeleteTrigger = jest.fn(() => ({ unwrap: mockDeleteUnwrap }));
jest.mock('@/entities/Cart', () => ({
  __esModule: true,
  useDeleteProductMutation: () => [mockDeleteTrigger, { isLoading: false }],
}));

const mockNotify = jest.fn();
jest.mock('@/shared/ui/Notification', () => ({
  getNotify: jest.fn(() => ({ notify: mockNotify })),
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

/* eslint-disable @typescript-eslint/no-var-requires, global-require, import/first */
const { getNotify } = require('@/shared/ui/Notification') as { getNotify: jest.Mock };
const { usePickupItemRemoval } = require('../usePickupItemRemoval') as typeof import('../usePickupItemRemoval');
/* eslint-enable */

const cartItem = (id: string, parent_id: string): ICartItem => ({
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

const cartItems = [cartItem('offer-1', 'prod-1'), cartItem('offer-2', 'prod-2')];

beforeEach(() => {
  jest.clearAllMocks();
  mockDeleteUnwrap.mockResolvedValue(undefined);
});

describe('usePickupItemRemoval', () => {
  it('deletes the mapped cart-item id and refetches pickup on success', async () => {
    const onRemoved = jest.fn();
    const { result } = renderHook(() => usePickupItemRemoval({ cartItems, onRemoved }));

    await act(async () => {
      await result.current('prod-1');
    });

    expect(mockDeleteTrigger).toHaveBeenCalledTimes(1);
    expect(mockDeleteTrigger).toHaveBeenCalledWith({ itemId: 'offer-1' });
    expect(onRemoved).toHaveBeenCalledTimes(1);
    expect(getNotify).not.toHaveBeenCalled();
  });

  it('does nothing when no cart item matches the blocked product', async () => {
    const onRemoved = jest.fn();
    const { result } = renderHook(() => usePickupItemRemoval({ cartItems, onRemoved }));

    await act(async () => {
      await result.current('missing');
    });

    expect(mockDeleteTrigger).not.toHaveBeenCalled();
    expect(onRemoved).not.toHaveBeenCalled();
  });

  it('shows an error toast and does NOT refetch when the delete mutation fails', async () => {
    mockDeleteUnwrap.mockRejectedValueOnce(new Error('network'));
    const onRemoved = jest.fn();
    const { result } = renderHook(() => usePickupItemRemoval({ cartItems, onRemoved }));

    await act(async () => {
      await result.current('prod-1');
    });

    expect(mockDeleteTrigger).toHaveBeenCalledWith({ itemId: 'offer-1' });
    expect(onRemoved).not.toHaveBeenCalled();
    expect(getNotify).toHaveBeenCalledTimes(1);
    expect(getNotify.mock.calls[0][0].type).toBe('error');
  });

  it('refetches AND toasts on partial failure when one of several variant deletes rejects', async () => {
    // Two cart variants share one blocked parent product_id → two delete calls.
    const variants = [cartItem('offer-1a', 'prod-1'), cartItem('offer-1b', 'prod-1')];
    mockDeleteUnwrap.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('network'));
    const onRemoved = jest.fn();
    const { result } = renderHook(() => usePickupItemRemoval({ cartItems: variants, onRemoved }));

    await act(async () => {
      await result.current('prod-1');
    });

    expect(mockDeleteTrigger).toHaveBeenCalledTimes(2);
    // One variant left the cart → availability must be refetched off the smaller cart.
    expect(onRemoved).toHaveBeenCalledTimes(1);
    // The failed variant still surfaces an error so the shopper can retry it.
    expect(getNotify).toHaveBeenCalledTimes(1);
    expect(getNotify.mock.calls[0][0].type).toBe('error');
  });
});
