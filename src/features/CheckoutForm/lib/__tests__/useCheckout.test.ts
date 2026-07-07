import { renderHook, act } from '@testing-library/react';
import type { CheckoutFormData } from '../../model/types/CheckoutFormData';

// --- Mocks (must be declared before importing the hook) ------------------

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockDispatch = jest.fn();
jest.mock('@/shared/lib/hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

// Notification surface — captured per-test for assertions.
const mockNotify = jest.fn();
jest.mock('@/shared/ui/Notification', () => ({
  getNotify: jest.fn(() => ({ notify: mockNotify })),
}));

// i18next.t returns key + a `defaultValue` echo so we can assert the
// translation pipeline got the right backend message as the fallback.
jest.mock('i18next', () => ({
  t: jest.fn((key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key),
}));

// Stub refetchSession to a thunk-action with .unwrap() so the hook's await chain works.
jest.mock('@/entities/Session', () => ({
  refetchSession: jest.fn(() => ({ type: 'session/refetch', payload: undefined })),
}));

// Checkout mutation + delivery/payment queries.
const mockCheckoutUnwrap = jest.fn();
const mockCheckoutTrigger = jest.fn(() => ({ unwrap: mockCheckoutUnwrap }));
const mockDeleteCartUnwrap = jest.fn();
const mockDeleteCartTrigger = jest.fn(() => ({ unwrap: mockDeleteCartUnwrap }));

jest.mock('../../api/checkoutApi', () => ({
  useCheckoutMutation: () => [mockCheckoutTrigger, { isLoading: false }],
  useGetDeliveryMethodsQuery: () => ({ data: [{ id: 'storage-np', type: 'storage', code: 'new_post' }] }),
  useGetPaymentMethodsQuery: () => ({ data: [] }),
}));

// Purchase-GUID snapshot: the hook must capture the live cart GUID before any
// navigation (WayForPay URL redirect may not let the effect finish) and before
// the post-order cart-clear rotates it.
const mockSnapshotPurchaseGuid = jest.fn();
jest.mock('@/shared/lib/analytics/esputnikCartGuid', () => ({
  snapshotPurchaseGuid: () => mockSnapshotPurchaseGuid(),
}));

// Cart entity barrel: we only need the delete mutation hook and the
// centralised promocode predicates. The full barrel pulls in cartSlice which
// would trigger circular init (cartSlice → cartApi → @/entities/Cart),
// so we re-export the concrete modules directly.
/* eslint-disable @typescript-eslint/no-var-requires, global-require */
jest.mock('@/entities/Cart', () => {
  const codes = require('@/entities/Cart/model/types/promocodeCodes');
  const keyMod = require('@/entities/Cart/lib/getPromocodeErrorKey');
  return {
    __esModule: true,
    useDeleteCartMutation: () => [mockDeleteCartTrigger, { isLoading: false }],
    ...codes,
    ...keyMod,
  };
});
/* eslint-enable @typescript-eslint/no-var-requires, global-require */

/* eslint-disable @typescript-eslint/no-var-requires, global-require, import/first */
const { getNotify } = require('@/shared/ui/Notification') as { getNotify: jest.Mock };
const { refetchSession } = require('@/entities/Session') as { refetchSession: jest.Mock };
const { useCheckout } = require('../useCheckout') as typeof import('../useCheckout');
/* eslint-enable */

// --- Test data ----------------------------------------------------------

const baseFormData = {
  city_id: 'kyiv',
  delivery_method_id: 'storage-np',
  payment_method_id: 'cash',
  warehouse_id: 'wh-1',
  note: '',
  customer: {
    first_name: 'Іван', last_name: 'Петренко', middle_name: '', phone: '+380000000000', email: 'i@p.ua',
  },
  address: { street: '', house: '', flat: '' },
  call_reject: false,
  email_subscribe: false,
  privacy: true,
} as unknown as CheckoutFormData;

const businessError = (code: string, status = 422, message = `${code} message`) => ({
  status,
  data: { success: false, error: { code, message } },
});

const validationError = () => ({
  status: 422,
  data: { errors: { 'customer.phone': ['required'] } },
});

const setRefetchOutcome = (mode: 'resolve' | 'reject') => {
  mockDispatch.mockImplementation((action: any) => {
    if (action?.type === 'session/refetch') {
      return {
        unwrap: () => (mode === 'resolve' ? Promise.resolve({}) : Promise.reject(new Error('refetch failed'))),
      };
    }
    return action;
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  setRefetchOutcome('resolve');
});

describe('useCheckout.submitCheckoutForm', () => {
  describe('promocode race on checkout', () => {
    it.each([
      'PROMOCODE_ALREADY_USED',
      'PROMOCODE_EXPIRED',
      'PROMOCODE_NO_ELIGIBLE_ITEMS',
    ])('shows a localised toast for %s and re-throws so the form sees a failure', async (code) => {
      mockCheckoutUnwrap.mockRejectedValueOnce(businessError(code));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toMatchObject({
        data: { error: { code } },
      });

      expect(getNotify).toHaveBeenCalledTimes(1);
      const notifyArgs = getNotify.mock.calls[0][0];
      expect(notifyArgs.type).toBe('error');
      // Must not be the raw backend `message` — should resolve via i18n key
      // (mock falls back to the backend message only when key is missing).
      expect(typeof notifyArgs.content).toBe('string');

      expect(refetchSession).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();
      expect(mockDeleteCartTrigger).not.toHaveBeenCalled();
    });

    it('still re-throws even if refetchSession itself rejects (best-effort refresh)', async () => {
      setRefetchOutcome('reject');
      mockCheckoutUnwrap.mockRejectedValueOnce(businessError('PROMOCODE_EXPIRED'));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toMatchObject({
        data: { error: { code: 'PROMOCODE_EXPIRED' } },
      });
      expect(mockNotify).toHaveBeenCalledTimes(1);
    });
  });

  describe('non-promocode BusinessError (Edge Case 1)', () => {
    it('does NOT show promocode toast and does NOT dispatch refetchSession; re-throws to the form', async () => {
      mockCheckoutUnwrap.mockRejectedValueOnce(businessError('OUT_OF_STOCK', 422));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toMatchObject({
        data: { error: { code: 'OUT_OF_STOCK' } },
      });
      expect(getNotify).not.toHaveBeenCalled();
      expect(refetchSession).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('validation error', () => {
    it('throws form-field errors via getCheckoutFormErrors (existing contract)', async () => {
      mockCheckoutUnwrap.mockRejectedValueOnce(validationError());

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toEqual(
        expect.objectContaining({ 'customer.phone': expect.anything() }),
      );
      expect(getNotify).not.toHaveBeenCalled();
      expect(refetchSession).not.toHaveBeenCalled();
    });
  });

  describe('unknown / network error (no longer silently swallowed)', () => {
    it('re-throws raw FETCH_ERROR so the form surfaces a failure', async () => {
      const raw = { status: 'FETCH_ERROR', error: 'Network down' };
      mockCheckoutUnwrap.mockRejectedValueOnce(raw);

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toBe(raw);
      expect(getNotify).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('re-throws unknown BusinessError codes (not in race list)', async () => {
      mockCheckoutUnwrap.mockRejectedValueOnce(businessError('PROMOCODE_FUTURE_CODE'));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toMatchObject({
        data: { error: { code: 'PROMOCODE_FUTURE_CODE' } },
      });
      expect(getNotify).not.toHaveBeenCalled();
    });
  });

  describe('happy path', () => {
    it('navigates to checkout_success and best-effort deletes the cart on id response', async () => {
      mockCheckoutUnwrap.mockResolvedValueOnce({ redirect: false, order: 'order-42' });
      mockDeleteCartUnwrap.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCheckout());

      await act(async () => {
        await result.current.submitCheckoutForm(baseFormData);
      });

      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush.mock.calls[0][0]).toContain('order-42');
      expect(mockDeleteCartTrigger).toHaveBeenCalledTimes(1);
    });

    it('navigates to redirect URL and best-effort deletes the cart on url response', async () => {
      mockCheckoutUnwrap.mockResolvedValueOnce({ redirect: true, url: 'https://pay.example/abc' });
      mockDeleteCartUnwrap.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCheckout());

      await act(async () => {
        await result.current.submitCheckoutForm(baseFormData);
      });

      expect(mockPush).toHaveBeenCalledWith('https://pay.example/abc');
      expect(mockDeleteCartTrigger).toHaveBeenCalledTimes(1);
    });

    it('swallows a failing deleteCart so a successful order is not rolled back into a toast', async () => {
      mockCheckoutUnwrap.mockResolvedValueOnce({ redirect: false, order: 'order-77' });
      mockDeleteCartUnwrap.mockRejectedValueOnce(businessError('PROMOCODE_EXPIRED'));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).resolves.toBeUndefined();
      // Race toast must NOT fire post-success (the order is already placed).
      expect(getNotify).not.toHaveBeenCalled();
      expect(refetchSession).not.toHaveBeenCalled();
    });
  });

  describe('purchase GUID snapshot', () => {
    it('snapshots the purchase GUID before navigating on the order-id route', async () => {
      mockCheckoutUnwrap.mockResolvedValueOnce({ redirect: false, order: 'order-42' });
      mockDeleteCartUnwrap.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCheckout());

      await act(async () => {
        await result.current.submitCheckoutForm(baseFormData);
      });

      expect(mockSnapshotPurchaseGuid).toHaveBeenCalledTimes(1);
      // Order matters more than "before deleteCart": push() may hand off to an
      // external page, so the snapshot must precede any navigation.
      expect(mockSnapshotPurchaseGuid.mock.invocationCallOrder[0])
        .toBeLessThan(mockPush.mock.invocationCallOrder[0]);
    });

    it('snapshots the purchase GUID before navigating on the url-redirect route', async () => {
      mockCheckoutUnwrap.mockResolvedValueOnce({ redirect: true, url: 'https://pay.example/abc' });
      mockDeleteCartUnwrap.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCheckout());

      await act(async () => {
        await result.current.submitCheckoutForm(baseFormData);
      });

      expect(mockSnapshotPurchaseGuid).toHaveBeenCalledTimes(1);
      expect(mockSnapshotPurchaseGuid.mock.invocationCallOrder[0])
        .toBeLessThan(mockPush.mock.invocationCallOrder[0]);
    });

    it('does NOT snapshot when checkout fails (every catch branch re-throws first)', async () => {
      mockCheckoutUnwrap.mockRejectedValueOnce(businessError('OUT_OF_STOCK', 422));

      const { result } = renderHook(() => useCheckout());

      await expect(result.current.submitCheckoutForm(baseFormData)).rejects.toMatchObject({
        data: { error: { code: 'OUT_OF_STOCK' } },
      });
      expect(mockSnapshotPurchaseGuid).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
